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

        const minLoadTimePromise = new Promise(resolve => setTimeout(resolve, 2000))

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
          new Promise(res => setTimeout(res, 4000))
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
        .spinner-ring {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          border: 3px solid transparent;
          border-top-color: #06b6d4; /* cyan-500 */
          border-right-color: #0ea5e9; /* cyan-500 adjacent */
          animation: spin 1s linear infinite;
        }

        .spinner-ring-inner {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          border: 3px solid transparent;
          border-left-color: #3b82f6; /* blue-500 */
          border-bottom-color: #6366f1; /* blue-500 adjacent */
          animation: spin-reverse 0.75s linear infinite;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes spin-reverse {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(-360deg); }
        }
      `}</style>
      
      <div className="w-full max-w-md px-6 flex flex-col items-center gap-10">
        
        <div className="relative">
           <div className="spinner-ring"></div>
           <div className="spinner-ring-inner"></div>
        </div>

        <div className="text-center space-y-3">
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

        <div className="w-full max-w-[200px] flex flex-col gap-2 items-center">
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