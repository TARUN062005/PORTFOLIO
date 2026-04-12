import { useState } from 'react'
import { motion } from 'framer-motion'
import { projects } from '../data/portfolioData'
import { FiExternalLink, FiGithub } from 'react-icons/fi'

const ProjectsPage = () => {
  const [activeIndex, setActiveIndex] = useState(null)

  return (
    <main className="bg-slate-950 text-white min-h-screen">
      
      {/* HERO */}
      <section className="px-6 pt-28 pb-16 max-w-6xl mx-auto">
        <h1 className="text-4xl sm:text-6xl font-black leading-tight">
          Selected Work
        </h1>
        <p className="mt-4 text-slate-400 max-w-xl">
          A curated collection of projects focused on performance, UX, and scalable architecture.
        </p>
      </section>

      {/* PROJECTS */}
      <section className="space-y-32 pb-32">
        {projects.map((project, index) => {
          const isActive = activeIndex === index

          return (
            <motion.div
              key={project.title}
              onClick={() => setActiveIndex(isActive ? null : index)}
              className="relative cursor-pointer"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              
              {/* BACKGROUND IMAGE */}
              <div
                className="absolute inset-0 z-0"
                style={{
                  backgroundImage: `url(${project.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  filter: isActive ? 'brightness(0.4)' : 'brightness(0.25)',
                }}
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

              {/* CONTENT */}
              <div className="relative z-10 max-w-5xl mx-auto px-6 py-20">

                <motion.h2
                  layout
                  className="text-3xl sm:text-5xl font-bold"
                >
                  {project.title}
                </motion.h2>

                <motion.p
                  layout
                  className="mt-4 text-slate-300 max-w-2xl"
                >
                  {project.description}
                </motion.p>

                {/* EXPAND AREA */}
                <motion.div
                  layout
                  initial={false}
                  animate={{ height: isActive ? 'auto' : 0, opacity: isActive ? 1 : 0 }}
                  className="overflow-hidden"
                >
                  <div className="mt-6 space-y-4">
                    
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs rounded-full bg-white/10 border border-white/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-4">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20"
                      >
                        <FiGithub /> Code
                      </a>

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500 text-black font-semibold"
                        >
                          <FiExternalLink /> Live
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>

              </div>
            </motion.div>
          )
        })}
      </section>
    </main>
  )
}

export default ProjectsPage