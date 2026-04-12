import { FiArrowRight, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { FaDiscord } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import useRevealOnScroll from '../hooks/useRevealOnScroll'

const heroSocials = [
  {
    name: 'GitHub',
    icon: FiGithub,
    href: 'https://github.com/TARUN062005',
  },
  {
    name: 'LinkedIn',
    icon: FiLinkedin,
    href: 'https://linkedin.com/in/tarunvemuri/',
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
  {
    name: 'Email',
    icon: FiMail,
    href: 'mailto:princetarunvemuri@gmail.com',
  },
]

const Hero = ({ onNavClick }) => {
  const { elementRef, isVisible } = useRevealOnScroll()

  return (
    <section
      id="home"
      ref={elementRef}
      className={`section-fade flex flex-col gap-10 lg:flex-row lg:items-center ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
    >
      <style>{`
        .hero-uiverse-btn {
          padding: 12px 20px;
          border: none;
          font-size: 0.95rem;
          font-weight: 700;
          cursor: pointer;
          position: relative;
          background: linear-gradient(90deg, #5bfcc4, #f593e4, #71a4f0);
          border-radius: 12px;
          color: #fff;
          transition: all 0.3s ease;
          box-shadow:
            inset 0 0 5px #ffffffa9,
            inset 0 35px 30px #000,
            0 5px 10px #000000cc;
          text-shadow: 1px 1px 1px #000;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
        }

        .hero-uiverse-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          margin: auto;
          border-radius: 12px;
          filter: blur(0);
          z-index: -1;
          box-shadow: none;
          background: conic-gradient(
            #00000000 80deg,
            #40baf7,
            #f34ad7,
            #5bfcc4,
            #00000000 280deg
          );
          transition: all 0.3s ease;
        }

        .hero-uiverse-btn:hover::before {
          filter: blur(15px);
        }

        .hero-uiverse-btn:active::before {
          filter: blur(5px);
          transform: translateY(1px);
        }

        .hero-uiverse-btn:active {
          box-shadow:
            inset 0 0 5px #ffffffa9,
            inset 0 35px 30px #000;
          margin-top: 3px;
        }

        .hero-social-card {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 6px;
          padding: 6px;
          width: 100%;
          max-width: 300px;
          height: 52px;
          border-radius: 14px;
          background: #e7e7e7;
          overflow: hidden;
          box-shadow:
            0 4px 10px rgba(0, 0, 0, 0.12),
            0 2px 4px rgba(0, 0, 0, 0.08);
        }

        .hero-social-label {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: 700;
          color: #0f172a;
          transition: opacity 0.25s ease;
          z-index: 1;
        }

        .hero-social-icons {
          position: relative;
          z-index: 2;
          display: flex;
          width: 100%;
          gap: 6px;
          opacity: 0;
          transform: translateY(6px);
          transition: all 0.25s ease;
        }

        .hero-social-link {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 40px;
          border-radius: 10px;
          color: #0f172a;
          text-decoration: none;
          transition: all 0.25s ease;
        }

        .hero-social-link:hover {
          background: rgba(255, 255, 255, 0.6);
          transform: translateY(-2px);
        }

        .hero-social-card:hover .hero-social-label {
          opacity: 0;
        }

        .hero-social-card:hover .hero-social-icons {
          opacity: 1;
          transform: translateY(0);
        }

        .dark .hero-social-card {
          background: #162124;
        }

        .dark .hero-social-label,
        .dark .hero-social-link {
          color: #e2e8f0;
        }

        .dark .hero-social-link:hover {
          background: rgba(255, 255, 255, 0.08);
        }

        @media (max-width: 480px) {
          .hero-social-card {
            max-width: 100%;
            height: 50px;
            border-radius: 12px;
            padding: 5px;
          }

          .hero-social-icons {
            gap: 4px;
          }

          .hero-social-link {
            height: 38px;
            border-radius: 9px;
          }
        }

        @media (hover: none) {
          .hero-social-label {
            display: none;
          }

          .hero-social-icons {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div className="w-full space-y-6 lg:w-3/5">
        <p className="section-kicker">
          Available for Full-Time Roles
        </p>

        <div className="space-y-4">
          <p className="section-subtitle not-italic">
            Carpe diem. Seize the day.
          </p>
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-5xl dark:text-slate-100">
            TARUN VEMURI
          </h1>
          <h2 className="text-xl font-semibold text-slate-700 sm:text-2xl dark:text-slate-300">
            Full Stack Developer | AI/ML Engineer
          </h2>
          <p className="section-body max-w-2xl">
            I build intelligent, scalable, and high-performance products using React, Node.js, Flask, and machine learning.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => onNavClick('projects')}
            className="hero-uiverse-btn"
          >
            View Projects
            <FiArrowRight size={16} />
          </button>
          <button
            type="button"
            onClick={() => onNavClick('contact')}
            className="hero-uiverse-btn"
          >
            Contact
          </button>
        </div>

        <div className="hero-social-card mt-3" aria-label="Hero social links">
          <span className="hero-social-label">Connect</span>
          <div className="hero-social-icons">
            {heroSocials.map((item) => {
              const Icon = item.icon
              return (
                <a
                  key={item.name}
                  className="hero-social-link"
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.name}
                  title={item.name}
                >
                  <Icon size={18} />
                </a>
              )
            })}
          </div>
        </div>
      </div>

      <div className="w-full lg:w-2/5">
        <div className="glass-panel relative overflow-hidden p-6 sm:p-8">
          <div className="absolute -right-14 -top-14 h-36 w-36 rounded-full bg-cyan-300/25 blur-2xl dark:bg-cyan-500/20" />
          <div className="absolute -bottom-16 -left-12 h-36 w-36 rounded-full bg-emerald-300/30 blur-2xl dark:bg-emerald-500/20" />

          <div className="relative space-y-5">
            <p className="small-label">
              Current Focus
            </p>
            <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-200">
              <li className="rounded-lg border border-slate-200/80 bg-white/60 px-4 py-3 dark:border-slate-700/80 dark:bg-slate-900/60">
                Building robust SaaS frontends with React and Tailwind CSS.
              </li>
              <li className="rounded-lg border border-slate-200/80 bg-white/60 px-4 py-3 dark:border-slate-700/80 dark:bg-slate-900/60">
                Designing APIs and services with Node.js and PostgreSQL.
              </li>
              <li className="rounded-lg border border-slate-200/80 bg-white/60 px-4 py-3 dark:border-slate-700/80 dark:bg-slate-900/60">
                Improving performance, accessibility, and DX across projects.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
