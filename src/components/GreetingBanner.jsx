import { useEffect, useMemo, useState } from 'react'

const GreetingBanner = () => {
  const [isVisible, setIsVisible] = useState(true)
  const [isMounted, setIsMounted] = useState(true)

  const greeting = useMemo(() => {
    const hour = new Date().getHours()

    if (hour < 12) {
      return 'Good Morning'
    }

    if (hour < 18) {
      return 'Good Afternoon'
    }

    return 'Good Evening'
  }, [])

  useEffect(() => {
    const hideTimer = window.setTimeout(() => {
      setIsVisible(false)
    }, 2000)

    const unmountTimer = window.setTimeout(() => {
      setIsMounted(false)
    }, 2600)

    return () => {
      window.clearTimeout(hideTimer)
      window.clearTimeout(unmountTimer)
    }
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div
      className={`pointer-events-none fixed left-1/2 top-20 z-[60] w-max max-w-[calc(100vw-1rem)] -translate-x-1/2 rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-center text-xs font-semibold text-slate-800 shadow-[0_18px_36px_-24px_rgba(15,23,42,0.65)] backdrop-blur-md transition-all duration-500 sm:text-sm dark:border-white/10 dark:bg-black/30 dark:text-slate-100 ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-3 opacity-0'
      }`}
    >
      {greeting}, welcome to my portfolio
    </div>
  )
}

export default GreetingBanner
