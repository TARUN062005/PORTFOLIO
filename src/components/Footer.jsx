import { memo, useCallback, useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  FiArrowUp,
  FiMail,
  FiMapPin,
  FiPhone,
} from 'react-icons/fi'
import { FaDiscord, FaGithub, FaLinkedin } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

const socialLinks = [
  {
    name: 'GitHub',
    icon: FaGithub,
    href: 'https://github.com/TARUN062005',
  },
  {
    name: 'LinkedIn',
    icon: FaLinkedin,
    href: 'https://linkedin.com/in/tarunvemuri',
  },
  {
    name: 'X',
    icon: FaXTwitter,
    href: 'https://x.com/TARUNVEMURI',
  },
  {
    name: 'Discord',
    icon: FaDiscord,
    href: 'https://discordapp.com/users/896411007797325824/',
  },
]

const quickLinks = [
  { name: 'Home', id: 'home' },
  { name: 'About', id: 'about' },
  { name: 'Projects', id: 'projects' },
  { name: 'Contact', id: 'contact' },
]

const contactInfo = [
  { icon: FiMail, text: 'princetarunvemuri@gmail.com', href: 'mailto:princetarunvemuri@gmail.com' },
  { icon: FiPhone, text: '+91 9550186473', href: 'tel:+919550186473' },
  { icon: FiMapPin, text: 'Vijayawada, India', href: '' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { y: 18, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.45 },
  },
}

const Footer = ({ onNavClick }) => {
  const currentYear = useMemo(() => new Date().getFullYear(), [])

  const handleQuickLinkClick = useCallback(
    (event) => {
      const sectionId = event.currentTarget.dataset.sectionId
      if (sectionId) {
        onNavClick?.(sectionId)
      }
    },
    [onNavClick],
  )

  const handleBackToTop = useCallback(() => {
    onNavClick?.('home')
  }, [onNavClick])

  const handleNewsletterSubmit = useCallback((event) => {
    event.preventDefault()
  }, [])

  return (
    <footer className="mt-6 pb-5 sm:mt-8 sm:pb-8">
      <style>{`
        .footer-social-card {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          max-width: 260px;
          height: 52px;
          border-radius: 14px;
          background: #e7e7e7;
          overflow: hidden;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.08);
        }

        .footer-social-label {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: 700;
          color: #0f172a;
          opacity: 1;
          transition: opacity 0.25s ease;
          z-index: 2;
          pointer-events: none;
        }

        .footer-social-icons {
          position: absolute;
          inset: 0;
          display: flex;
          opacity: 0;
          transition: opacity 0.25s ease;
          z-index: 1;
        }

        .footer-social-link {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0f172a;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .footer-social-link svg {
          width: 18px;
          height: 18px;
        }

        .footer-social-card:hover .footer-social-label {
          opacity: 0;
        }

        .footer-social-card:hover .footer-social-icons {
          opacity: 1;
        }

        .footer-social-link:hover {
          background: rgba(255, 255, 255, 0.6);
          transform: translateY(-2px);
        }

        .dark .footer-social-card { background: #162124; }
        .dark .footer-social-label { color: #e2e8f0; }
        .dark .footer-social-link { color: #e2e8f0; }
        .dark .footer-social-link:hover { background: rgba(255, 255, 255, 0.08); }

        @media (max-width: 768px) {
          .footer-social-card { height: 44px; border-radius: 12px; max-width: 220px; }
          .footer-social-label { font-size: 12px; }
          .footer-mobile-grid {
            display: grid;
            grid-template-columns: minmax(0, 0.82fr) minmax(0, 1.18fr);
            gap: 12px 8px;
          }
          .footer-intro { grid-column: 1 / -1; }
          .footer-contact a { white-space: nowrap; font-size: 11px; }
        }

        @media (hover: none) {
          .footer-social-label { display: none; }
          .footer-social-icons { opacity: 1; }
        }
      `}</style>

      {/* Container class removed to match Contact box exactly. 
          Assuming parent container handles horizontal margins.
      */}
      <motion.div
        className="w-full overflow-hidden rounded-3xl border border-black/80 bg-white/60 p-6 shadow-xl backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/70 sm:p-8 lg:p-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className="footer-mobile-grid grid grid-cols-1 gap-5 md:grid-cols-4 md:gap-8">
          
          {/* INTRO */}
          <motion.div variants={itemVariants} className="footer-intro space-y-3 sm:space-y-4">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white sm:text-xl">TARUN</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Full Stack Developer and AI/ML Engineer creating practical, high-impact digital products.
            </p>

            {/* SOCIAL CARD */}
            <div className="footer-social-card">
              <span className="footer-social-label">Follow</span>
              <div className="footer-social-icons">
                {socialLinks.map((item) => {
                  const Icon = item.icon
                  return (
                    <a
                      key={item.name}
                      className="footer-social-link"
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.name}
                    >
                      <Icon />
                    </a>
                  )
                })}
              </div>
            </div>
          </motion.div>

          {/* NAVIGATION */}
          <motion.div variants={itemVariants} className="footer-nav">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3 sm:mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 sm:space-y-3">
              {quickLinks.map((link) => (
                <motion.li key={link.name} whileHover={{ x: 2 }}>
                  <button
                    onClick={handleQuickLinkClick}
                    data-section-id={link.id}
                    className="text-sm text-slate-600 hover:text-cyan-700 dark:text-slate-300 dark:hover:text-cyan-300"
                  >
                    {link.name}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* CONTACT INFO */}
          <motion.div variants={itemVariants} className="footer-contact">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3 sm:mb-4">
              Contact
            </h4>
            <ul className="space-y-2.5 sm:space-y-3">
              {contactInfo.map((info) => {
                const Icon = info.icon

                return (
                <motion.li key={info.text} className="flex gap-2.5 text-sm sm:gap-3">
                  <span className="mt-0.5 text-slate-500"><Icon size={16} /></span>
                  {info.href ? (
                    <a href={info.href} className="text-slate-600 dark:text-slate-300 hover:text-cyan-600 transition-colors">
                      {info.text}
                    </a>
                  ) : (
                    <span className="text-slate-600 dark:text-slate-300">{info.text}</span>
                  )}
                </motion.li>
                )
              })}
            </ul>
          </motion.div>

          {/* NEWSLETTER (Desktop only) */}
          <motion.div variants={itemVariants} className="hidden md:block">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">
              Newsletter
            </h4>
            <form className="space-y-3" onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                placeholder="Your email"
                className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <button className="w-full rounded-lg bg-cyan-500 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-400 transition-colors">
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>

        {/* COPYRIGHT & BACK TO TOP */}
        <div className="footer-bottom-mobile mt-5 flex flex-row items-center justify-between gap-3 border-t border-slate-200 dark:border-slate-700 pt-4 text-xs font-medium text-slate-500 sm:mt-10 sm:pt-6">
          <p>© {currentYear} TARUN VEMURI</p>

          <motion.button
            onClick={handleBackToTop}
            className="rounded-full bg-slate-900 dark:bg-slate-100 p-2 text-white dark:text-slate-900 shadow-lg"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.9 }}
          >
            <FiArrowUp size={14} />
          </motion.button>
        </div>
      </motion.div>
    </footer>
  )
}

export default memo(Footer)