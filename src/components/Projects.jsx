import { FiExternalLink, FiGithub, FiGrid } from 'react-icons/fi'
import { projects } from '../data/portfolioData'
import useRevealOnScroll from '../hooks/useRevealOnScroll'
import { motion } from 'framer-motion'
import { memo, useMemo, useState } from 'react'

const Projects = () => {
  const { elementRef, isVisible } = useRevealOnScroll()
  const [filter, setFilter] = useState('all')
  
  const techCategories = useMemo(
    () => ['all', ...new Set(projects.flatMap((project) => project.techStack))].slice(0, 8),
    [],
  )

  const filteredProjects = useMemo(
    () => (filter === 'all' ? projects : projects.filter((project) => project.techStack.includes(filter))),
    [filter],
  )

  return (
    <section
      id="projects"
      ref={elementRef}
      className={`section-fade ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
    >
      <style>{`
        .projects-uiverse-btn {
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
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          min-height: 42px;
          min-width: 108px;
        }

        .projects-uiverse-btn::before {
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

        .projects-uiverse-btn:hover::before {
          filter: blur(15px);
        }

        .projects-uiverse-btn:active::before {
          filter: blur(5px);
          transform: translateY(1px);
        }

        .projects-uiverse-btn:active {
          box-shadow:
            inset 0 0 5px #ffffffa9,
            inset 0 35px 30px #000;
          margin-top: 3px;
        }

        .projects-btn-flex {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .projects-demo-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.64rem 0.98rem;
          border-radius: 999px;
          border: 1px solid rgba(14, 116, 144, 0.42);
          background:
            radial-gradient(circle at 18% 18%, rgba(34, 211, 238, 0.2) 0%, rgba(34, 211, 238, 0) 60%),
            linear-gradient(140deg, rgba(255, 255, 255, 0.95), rgba(224, 242, 254, 0.95));
          color: #0f172a;
          font-size: 0.82rem;
          font-weight: 800;
          text-decoration: none;
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
          box-shadow: 0 10px 20px -14px rgba(2, 132, 199, 0.55);
        }

        .projects-demo-link:hover {
          transform: translateY(-2px);
          border-color: rgba(14, 116, 144, 0.62);
          box-shadow: 0 14px 24px -14px rgba(2, 132, 199, 0.75);
        }

        .dark .projects-demo-link {
          border-color: rgba(34, 211, 238, 0.35);
          background:
            radial-gradient(circle at 18% 18%, rgba(34, 211, 238, 0.14) 0%, rgba(34, 211, 238, 0) 62%),
            linear-gradient(140deg, rgba(2, 6, 23, 0.92), rgba(15, 23, 42, 0.92));
          color: #e2e8f0;
          box-shadow: 0 10px 22px -14px rgba(34, 211, 238, 0.65);
        }

        .dark .projects-demo-link:hover {
          border-color: rgba(34, 211, 238, 0.62);
          box-shadow: 0 14px 26px -14px rgba(34, 211, 238, 0.82);
        }
      `}</style>

      <div className="text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="section-kicker"
        >
          Portfolio
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="section-title mt-4"
        >
          Selected work with
          <span className="bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent"> measurable impact</span>
        </motion.h2>
      </div>

      {/* Filter Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.3 }}
        className="mt-8 flex flex-wrap justify-center gap-1.5 sm:gap-2"
      >
        {techCategories.map((tech) => (
          <button
            key={tech}
            onClick={() => setFilter(tech)}
            className={`rounded-full px-2.5 py-1.5 text-xs font-semibold transition-all duration-300 sm:px-4 sm:py-2 sm:text-sm ${
              filter === tech
                ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 shadow-lg shadow-cyan-500/25'
                : 'border border-slate-300 bg-white/50 text-slate-700 hover:border-cyan-500 hover:bg-cyan-500/10 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-300'
            }`}
          >
            {tech === 'all' ? 'All Projects' : tech}
          </button>
        ))}
      </motion.div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:gap-8 xl:grid-cols-3 max-w-none">
        {filteredProjects.map((project, index) => (
          <motion.article
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -4 }}
            className="glass-panel group flex h-full flex-col justify-between overflow-hidden p-6 transition-all duration-300 hover:border-cyan-500/50 hover:shadow-xl"
          >
            {/* Project Image Thumbnail */}
            <div className="relative -mx-6 -mt-6 mb-4 h-48 overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
              <div className="absolute bottom-3 left-3 flex gap-1">
                {project.techStack.slice(0, 3).map((tech) => (
                  <span key={tech} className="rounded-full bg-black/50 px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="card-title">{project.title}</h3>
              <p className="card-text mt-3 line-clamp-3">
                {project.description}
              </p>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="projects-uiverse-btn"
              >
                <span className="projects-btn-flex">
                  <FiGithub size={16} />
                  Code
                </span>
              </motion.a>
              {project.liveUrl && (
                <motion.a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 2 }}
                  className="projects-demo-link"
                >
                  <FiExternalLink size={16} />
                  View Demo
                </motion.a>
              )}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}

export default memo(Projects)