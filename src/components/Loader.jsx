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
    let completionTimer = null

    const criticalAssets = ['/profile-avatar.svg']
    criticalAssets.forEach((src) => {
      const img = new Image()
      img.src = src
    })

    void import('./ProjectsPage')

    const start = window.performance.now()
    const duration = 4000

    const tick = () => {
      if (!isMounted) {
        return
      }

      const elapsed = window.performance.now() - start
      const percentage = Math.min(100, Math.round((elapsed / duration) * 100))
      setProgress((previous) => (percentage > previous ? percentage : previous))

      if (elapsed >= duration) {
        setIsFadingOut(true)
        completionTimer = window.setTimeout(onComplete, 500)
        return
      }

      window.requestAnimationFrame(tick)
    }

    window.requestAnimationFrame(tick)

    return () => {
      isMounted = false
      if (completionTimer) {
        window.clearTimeout(completionTimer)
      }
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
          height: 180px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 0;
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
      
      <div className="w-full max-w-md px-6 flex flex-col items-center gap-0">

        <div className="loader-container">
          {[...Array(21)].map((_, i) => (
            <div key={i} className="loader-item" style={{ '--i': i }}></div>
          ))}
        </div>
        
        <div className="text-center space-y-1 -mt-2">
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