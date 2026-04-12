import { FiFolder, FiGithub, FiHome, FiLinkedin, FiMail, FiMoon, FiSun, FiUser } from 'react-icons/fi'

const Navbar = ({ sections, activeSection, onNavClick, isDarkMode, onToggleTheme }) => {
  const navIcons = {
    home: FiHome,
    about: FiUser,
    projects: FiFolder,
    contact: FiMail,
  }

  const navItems = sections.filter((section) => navIcons[section.id])

  return (
    <header className="fixed inset-x-0 top-4 z-[9999] flex justify-center px-3 sm:top-5">
      <nav className="menu portfolio-menu">
        {navItems.map((section) => {
          const Icon = navIcons[section.id]
          const isActive = activeSection === section.id

          return (
            <button
              key={section.id}
              type="button"
              onClick={() => onNavClick(section.id)}
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
          href="https://www.linkedin.com/in/TARUN-VEMURI/"
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
          href="https://github.com/p4rz1v4l26"
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
          onClick={onToggleTheme}
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

export default Navbar
