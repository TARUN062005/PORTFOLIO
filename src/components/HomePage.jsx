import { useEffect, useMemo, useState } from 'react'
import Navbar from './Navbar'
import Hero from './Hero'
import AboutSection from './AboutSection'
import TechStackSlider from './TechStackSlider'
import ProjectsSection from './ProjectsSection'
import SocialSection from './SocialSection'
import Contact from './Contact'
import Footer from './Footer'

const HomePage = ({ isDarkMode, onToggleTheme }) => {
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

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [])

  useEffect(() => {
    let rafId = 0

    const updateActiveSection = () => {
      const marker = window.scrollY + 140
      let currentSection = 'home'

      sections.forEach(({ id }) => {
        const section = document.getElementById(id)
        if (!section) {
          return
        }

        const sectionTop = section.offsetTop
        const sectionBottom = sectionTop + section.offsetHeight

        if (marker >= sectionTop && marker < sectionBottom) {
          currentSection = id
        }
      })

      setActiveSection((previous) => (previous === currentSection ? previous : currentSection))
      rafId = 0
    }

    const handleScroll = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(updateActiveSection)
      }
    }

    updateActiveSection()
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

  const handleNavClick = (sectionId) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

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
        {/* About: sticky animation — compact spacing */}
        <div className="lg:contents">
          <AboutSection />
        </div>
        <TechStackSlider />
        <ProjectsSection />
        <SocialSection />
        <Contact />
        <Footer onNavClick={handleNavClick} />
      </main>
    </div>
  )
}

export default HomePage