import { useEffect, useRef, useState } from 'react'

const useRevealOnScroll = (options = {}) => {
  const elementRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  const { threshold = 0.15, rootMargin = '0px 0px -10% 0px' } = options

  useEffect(() => {
    const element = elementRef.current
    if (!element) {
      return undefined
    }

    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true)
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const nextIsVisible = entry.intersectionRatio >= threshold
        setIsVisible((previous) => (previous === nextIsVisible ? previous : nextIsVisible))
      },
      {
        threshold,
        rootMargin,
      }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
      observer.disconnect()
    }
  }, [rootMargin, threshold])

  return { elementRef, isVisible }
}

export default useRevealOnScroll