import { useEffect, useRef, useState } from 'react'

const useRevealOnScroll = (options = {}) => {
  const elementRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  const defaultOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -10% 0px',
    ...options,
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // ✅ Always toggle both ways
        setIsVisible(entry.intersectionRatio > 0.15)
      },
      {
        threshold: [0, 0.1, 0.2, 0.4, 0.6],
        rootMargin: defaultOptions.rootMargin,
      }
    )

    const el = elementRef.current
    if (el) observer.observe(el)

    return () => {
      if (el) observer.unobserve(el)
      observer.disconnect()
    }
  }, [defaultOptions.rootMargin])

  return { elementRef, isVisible }
}

export default useRevealOnScroll