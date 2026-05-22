import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { FiChevronDown } from 'react-icons/fi'
import Navbar from './Navbar'
import Hero from './Hero'
import AboutSection from './AboutSection'
import TechStackSlider from './TechStackSlider'
import ProjectsSection from './ProjectsSection'
import SocialSection from './SocialSection'
import Contact from './Contact'
import Footer from './Footer'

const HomePage = ({ isDarkMode, onToggleTheme }) => {
  const location = useLocation()
  const sections = useMemo(
    () => [
      { id: 'home', label: 'Home' },
      { id: 'about', label: 'About' },
      { id: 'tech-stack', label: 'Tech Stack' },
      { id: 'projects', label: 'Projects' },
      { id: 'contact', label: 'Contact' },
    ],
    [],
  )

  const [activeSection, setActiveSection] = useState('home')
  const [hideScrollCue, setHideScrollCue] = useState(
    () => sessionStorage.getItem('home-scroll-cue-hidden') === 'true',
  )
  const hideScrollCueRef = useRef(hideScrollCue)

  useEffect(() => {
    hideScrollCueRef.current = hideScrollCue
  }, [hideScrollCue])

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [])

  useEffect(() => {
    const target = location.hash?.replace('#', '')
    if (!target) return
    const section = document.getElementById(target)
    if (!section) return

    requestAnimationFrame(() => {
      const navHeader = document.querySelector('header')
      const navHeight = navHeader ? navHeader.getBoundingClientRect().height : 72
      const extraGap = 18
      const offset = navHeight + extraGap
      const targetTop = section.getBoundingClientRect().top + window.scrollY - offset

      window.scrollTo({
        top: Math.max(targetTop, 0),
        behavior: 'smooth',
      })
    })
  }, [location.hash])

  useEffect(() => {
    let rafId = 0

    const updateScrollState = () => {
      const marker = window.scrollY + 140
      let currentSection = 'home'

      for (const { id } of sections) {
        const section = document.getElementById(id)
        if (!section) {
          continue
        }

        const sectionTop = section.offsetTop
        const sectionBottom = sectionTop + section.offsetHeight

        if (marker >= sectionTop && marker < sectionBottom) {
          currentSection = id
        }
      }

      setActiveSection((previous) => (previous === currentSection ? previous : currentSection))

      if (!hideScrollCueRef.current && window.scrollY > 24) {
        hideScrollCueRef.current = true
        setHideScrollCue(true)
        sessionStorage.setItem('home-scroll-cue-hidden', 'true')
      }

      rafId = 0
    }

    const handleScroll = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(updateScrollState)
      }
    }

    updateScrollState()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
      if (rafId) {
        window.cancelAnimationFrame(rafId)
      }
    }
  }, [sections])

  const handleNavClick = useCallback((sectionId) => {
    const section = document.getElementById(sectionId)
    if (section) {
      const navHeader = document.querySelector('header')
      const navHeight = navHeader ? navHeader.getBoundingClientRect().height : 72
      const extraGap = 18
      const offset = navHeight + extraGap
      const targetTop = section.getBoundingClientRect().top + window.scrollY - offset

      window.scrollTo({
        top: Math.max(targetTop, 0),
        behavior: 'smooth',
      })
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-stone-100 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-cyan-300/25 blur-3xl dark:bg-cyan-600/20" />
        <div className="absolute right-0 top-52 h-72 w-72 rounded-full bg-emerald-300/25 blur-3xl dark:bg-emerald-500/20" />
      </div>

      <Navbar
        sections={sections}
        activeSection={activeSection}
        onNavClick={handleNavClick}
        isDarkMode={isDarkMode}
        onToggleTheme={onToggleTheme}
      />

      <main className="relative flex w-full flex-col gap-12 px-5 pb-20 pt-28 sm:px-8 lg:px-12 xl:px-16">
        <Hero onNavClick={handleNavClick} />
        <div className="lg:contents">
          <AboutSection />
        </div>
        <TechStackSlider />
        <ProjectsSection />
        <SocialSection />
        <Contact />
        <Footer onNavClick={handleNavClick} />
      </main>

      {!hideScrollCue && activeSection === 'home' && (
        <div className="pointer-events-none fixed bottom-5 left-1/2 z-[9998] -translate-x-1/2">
          <div className="flex animate-bounce items-center gap-1 rounded-full border border-white/35 bg-white/10 px-3 py-1.5 text-xs font-semibold tracking-wide text-slate-900 backdrop-blur-md dark:border-white/20 dark:bg-white/5 dark:text-slate-100">
            Scroll
            <FiChevronDown size={14} />
          </div>
        </div>
      )}
    </div>
  )
}

export default HomePage