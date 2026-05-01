import { memo, useCallback, useMemo } from 'react'
import { FiFolder, FiGithub, FiHome, FiLinkedin, FiMail, FiMoon, FiSun, FiUser } from 'react-icons/fi'

const NAV_ICONS = {
  home: FiHome,
  about: FiUser,
  projects: FiFolder,
  contact: FiMail,
}

const Navbar = ({ sections, activeSection, onNavClick, isDarkMode, onToggleTheme }) => {
  const navItems = useMemo(() => sections.filter((section) => NAV_ICONS[section.id]), [sections])

  const handleNavItemClick = useCallback(
    (event) => {
      const sectionId = event.currentTarget.dataset.sectionId
      if (sectionId) {
        onNavClick(sectionId)
      }
    },
    [onNavClick],
  )

  const handleThemeToggle = useCallback(() => {
    onToggleTheme()
  }, [onToggleTheme])

  return (
    <header className="fixed inset-x-0 top-4 z-[9999] flex justify-center px-3 sm:top-5">
      <nav className="menu portfolio-menu">
        {navItems.map((section) => {
          const Icon = NAV_ICONS[section.id]
          const isActive = activeSection === section.id

          return (
            <button
              key={section.id}
              type="button"
              onClick={handleNavItemClick}
              data-section-id={section.id}
              aria-label={section.label}
              className={`menu-link ${isActive ? 'is-selected' : ''}`}
            >
              <span className="menu-link-icon">
                <Icon size={19} />
              </span>
              <span className="menu-link-title">{section.label}</span>
            </button>
          )
        })}

        <a
          href="https://www.linkedin.com/in/vemuri-prince-tarun-9b8821326"
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
          className="menu-link"
        >
          <span className="menu-link-icon">
            <FiLinkedin size={19} />
          </span>
          <span className="menu-link-title">LinkedIn</span>
        </a>

        <a
          href="https://github.com/TARUN062005"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
          className="menu-link"
        >
          <span className="menu-link-icon">
            <FiGithub size={19} />
          </span>
          <span className="menu-link-title">GitHub</span>
        </a>

        <button
          type="button"
          onClick={handleThemeToggle}
          aria-label="Toggle theme"
          className="menu-link"
        >
          <span className="menu-link-icon">
            {isDarkMode ? <FiSun size={19} /> : <FiMoon size={19} />}
          </span>
          <span className="menu-link-title">Theme</span>
        </button>
      </nav>
    </header>
  )
}

export default memo(Navbar)
