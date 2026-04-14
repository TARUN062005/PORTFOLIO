import { useState, useEffect, useMemo } from 'react'

const Loader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0)
  const [isFadingOut, setIsFadingOut] = useState(false)

  const greetingTime = useMemo(() => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good Morning'
    if (hour < 18) return 'Good Afternoon'
    return 'Good Evening'
  }, [])

  useEffect(() => {
    let isMounted = true

    const loadAssets = async () => {
      try {
        const { projects } = await import('../data/portfolioData.js')
        
        // 1. ONLY PRELOAD CRITICAL INITIAL ASSETS
        const imagesToPreload = [
          '/profile-avatar.svg',
          ...projects.slice(0, 2).map((p) => p.image).filter(Boolean)
        ]

        const routeModulesToPreload = [
          import('./ProjectsPage')
        ]

        const totalTasks = imagesToPreload.length + routeModulesToPreload.length
        let completedTasks = 0

        const minLoadTimePromise = new Promise(resolve => setTimeout(resolve, 3500))

        const updateProgress = () => {
          if (!isMounted) return
          completedTasks++
          const percentage = Math.floor((completedTasks / totalTasks) * 100)
          
          // 3. PREVENT JITTER
          setProgress(prev => {
            if (percentage < prev) return prev
            return percentage
          })
        }

        const imagePromises = imagesToPreload.map((src) => {
          return new Promise((resolve) => {
            const img = new Image()
            img.src = src
            img.onload = () => { updateProgress(); resolve(); }
            img.onerror = () => { updateProgress(); resolve(); }
          })
        })

        const routePromises = routeModulesToPreload.map(modulePromise => 
          modulePromise.then(() => updateProgress()).catch(() => updateProgress())
        )

        // 2. NON-BLOCKING RACE CONDITION
        await Promise.race([
          Promise.all([...imagePromises, ...routePromises, minLoadTimePromise]),
          new Promise(res => setTimeout(res, 5000))
        ])

        if (isMounted) {
          // 5. FIX DEMO SMOOTH FINISH
          const interval = setInterval(() => {
            setProgress(prev => {
              const next = prev + 2
              if (next >= 100) {
                clearInterval(interval)
                if (isMounted) {
                  setIsFadingOut(true)
                  setTimeout(onComplete, 600)
                }
                return 100
              }
              return next
            })
          }, 16)
        }
      } catch (err) {
        console.error("Failed to load assets:", err)
        if (isMounted) {
          setProgress(100)
          setIsFadingOut(true)
          setTimeout(onComplete, 600)
        }
      }
    }

    loadAssets()

    return () => {
      isMounted = false
    }
  // 4. FIX BUG: ONLY DEPEND ON onComplete
  }, [onComplete])

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 transition-all duration-700 ease-in-out ${
        isFadingOut ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100 scale-100'
      }`}
    >
      <style>{`
        .loader-container {
          position: relative;
          height: 250px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 2rem;
        }

        .loader-item {
          position: absolute;
          background-color: transparent;
          width: calc(var(--i) * 2.5vmin);
          aspect-ratio: 1;
          border-radius: 50%;
          border: .9vmin solid rgb(0, 200, 255);
          transform-style: preserve-3d;
          transform: rotateX(70deg) translateZ(50px);
          animation: my-move 3s ease-in-out calc(var(--i) * 0.08s) infinite;
          box-shadow: 0px 0px 15px rgba(124, 124, 124, 0.4),
            inset 0px 0px 15px rgba(124, 124, 124, 0.4);
        }

        @keyframes my-move {
          0%,
          100% {
            transform: rotateX(70deg) translateZ(50px) translateY(0px);
            filter: hue-rotate(0deg);
          }

          50% {
            transform: rotateX(70deg) translateZ(50px) translateY(-50vmin);
            filter: hue-rotate(180deg);
          }
        }
      `}</style>
      
      <div className="w-full max-w-md px-6 flex flex-col items-center gap-6">

        <div className="loader-container">
          {[...Array(21)].map((_, i) => (
            <div key={i} className="loader-item" style={{ '--i': i }}></div>
          ))}
        </div>
        
        <div className="text-center space-y-3 mt-4">
          <p className="text-cyan-600 dark:text-cyan-400 font-medium tracking-wide">
            {greetingTime}, welcome to my portfolio
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-800 dark:text-slate-100">
            Hi, I'm VEMURI PRINCE TARUN
          </h1>
          <p className="text-sm font-medium text-slate-500 tracking-wider uppercase opacity-80 pt-2">
            Loading experience...
          </p>
        </div>

        <div className="w-full max-w-[200px] flex flex-col gap-2 items-center z-10 mt-2">
          <div className="w-full h-1.5 overflow-hidden bg-slate-200 dark:bg-slate-800 rounded-full relative">
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-[width] duration-300 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <p className="text-xs font-bold text-slate-400 tabular-nums tracking-widest">
            {progress}%
          </p>
        </div>

      </div>
    </div>
  )
}

export default Loader