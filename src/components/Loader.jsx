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
        .wrapper-grid {
          --animation-duration: 2.1s;
          --cube-color: #0000;
          --highlight-color: #00cc44;
          --cube-width: 48px;
          --cube-height: 48px;
          --font-size: 1.8em;

          position: relative;
          inset: 0;

          display: grid;
          grid-template-columns: repeat(7, var(--cube-width));
          grid-template-rows: auto;
          grid-gap: 0;

          width: calc(7 * var(--cube-width));
          height: var(--cube-height);
          perspective: 350px;

          font-family: "Poppins", sans-serif;
          font-size: var(--font-size);
          font-weight: 800;
          color: transparent;
        }

        .cube {
          position: relative;
          transform-style: preserve-3d;
        }

        .face {
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          width: var(--cube-width);
          height: var(--cube-height);
          background-color: var(--cube-color);
        }
        .face-left,
        .face-right,
        .face-back,
        .face-front {
          box-shadow:
            inset 0 0 2px 1px #0001,
            inset 0 0 12px 1px #fff1;
        }
        .face-front {
          transform: rotateY(0deg) translateZ(calc(var(--cube-width) / 2));
        }
        .face-back {
          transform: rotateY(180deg) translateZ(calc(var(--cube-width) / 2));
          opacity: 0.6;
        }
        .face-left {
          transform: rotateY(-90deg) translateZ(calc(var(--cube-width) / 2));
          opacity: 0.6;
        }
        .face-right {
          transform: rotateY(90deg) translateZ(calc(var(--cube-width) / 2));
          opacity: 0.6;
        }
        .face-top {
          height: var(--cube-width);
          transform: rotateX(90deg) translateZ(calc(var(--cube-width) / 2));
          opacity: 0.8;
        }
        .face-bottom {
          height: var(--cube-width);
          transform: rotateX(-90deg)
            translateZ(calc(var(--cube-height) - var(--cube-width) * 0.5));
          opacity: 0.8;
        }

        .cube:nth-child(1) {
          z-index: 0;
          animation-delay: 0s;
        }
        .cube:nth-child(2) {
          z-index: 1;
          animation-delay: 0.2s;
        }
        .cube:nth-child(3) {
          z-index: 2;
          animation-delay: 0.4s;
        }
        .cube:nth-child(4) {
          z-index: 3;
          animation-delay: 0.6s;
        }
        .cube:nth-child(5) {
          z-index: 2;
          animation-delay: 0.8s;
        }
        .cube:nth-child(6) {
          z-index: 1;
          animation-delay: 1s;
        }
        .cube:nth-child(7) {
          z-index: 0;
          animation-delay: 1.2s;
        }

        .cube {
          animation: translate-z var(--animation-duration) ease-in-out infinite;
        }
        .cube .face {
          animation:
            face-color var(--animation-duration) ease-in-out infinite,
            /* face-glow var(--animation-duration) ease-in-out infinite, */ edge-glow
              var(--animation-duration) ease-in-out infinite;
          animation-delay: inherit;
        }
        .cube .face.face-front {
          animation:
            face-color var(--animation-duration) ease-in-out infinite,
            face-glow var(--animation-duration) ease-in-out infinite,
            edge-glow var(--animation-duration) ease-in-out infinite;
          animation-delay: inherit;
        }

        @keyframes translate-z {
          0%,
          40%,
          100% {
            transform: translateZ(-2px);
          }
          30% {
            transform: translateZ(16px) translateY(-1px);
          }
        }
        @keyframes face-color {
          0%,
          50%,
          100% {
            background-color: var(--cube-color);
          }
          10% {
            background-color: var(--highlight-color);
          }
        }
        @keyframes face-glow {
          0%,
          50%,
          100% {
            color: #fff0;
            filter: none;
          }
          30% {
            color: #fff;
            filter: drop-shadow(0 14px 10px var(--highlight-color));
          }
        }
        @keyframes edge-glow {
          0%,
          40%,
          100% {
            box-shadow:
              inset 0 0 2px 1px #0001,
              inset 0 0 12px 1px #fff1;
          }
          30% {
            box-shadow: 0 0 2px 0px var(--highlight-color);
          }
        }
      `}</style>
      
      <div className="w-full max-w-md px-6 flex flex-col items-center gap-0">

        <div className="wrapper-grid -mt-6 mb-6">
          <div className="cube">
            <div className="face face-front">L</div>
            <div className="face face-back"></div>
            <div className="face face-right"></div>
            <div className="face face-left"></div>
            <div className="face face-top"></div>
            <div className="face face-bottom"></div>
          </div>

          <div className="cube">
            <div className="face face-front">O</div>
            <div className="face face-back"></div>
            <div className="face face-right"></div>
            <div className="face face-left"></div>
            <div className="face face-top"></div>
            <div className="face face-bottom"></div>
          </div>

          <div className="cube">
            <div className="face face-front">A</div>
            <div className="face face-back"></div>
            <div className="face face-right"></div>
            <div className="face face-left"></div>
            <div className="face face-top"></div>
            <div className="face face-bottom"></div>
          </div>

          <div className="cube">
            <div className="face face-front">D</div>
            <div className="face face-back"></div>
            <div className="face face-right"></div>
            <div className="face face-left"></div>
            <div className="face face-top"></div>
            <div className="face face-bottom"></div>
          </div>

          <div className="cube">
            <div className="face face-front">I</div>
            <div className="face face-back"></div>
            <div className="face face-right"></div>
            <div className="face face-left"></div>
            <div className="face face-top"></div>
            <div className="face face-bottom"></div>
          </div>

          <div className="cube">
            <div className="face face-front">N</div>
            <div className="face face-back"></div>
            <div className="face face-right"></div>
            <div className="face face-left"></div>
            <div className="face face-top"></div>
            <div className="face face-bottom"></div>
          </div>

          <div className="cube">
            <div className="face face-front">G</div>
            <div className="face face-back"></div>
            <div className="face face-right"></div>
            <div className="face face-left"></div>
            <div className="face face-top"></div>
            <div className="face face-bottom"></div>
          </div>
        </div>
        
        <div className="text-center space-y-1">
          <p className="text-cyan-600 dark:text-cyan-400 font-medium tracking-wide">
            {greetingTime}, welcome to my portfolio
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-800 dark:text-slate-100">
            Hi, I'm VEMURI PRINCE TARUN
          </h2>
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