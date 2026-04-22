import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { projects } from '../data/portfolioData'
import { 
  FiExternalLink, 
  FiGithub, 
  FiArrowRight, 
  FiCode, 
  FiLayers,
  FiZap,
  FiCalendar,
  FiUsers
} from 'react-icons/fi'

const ProjectsPage = () => {
  const [activeIndex, setActiveIndex] = useState(null)
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const heroRef = useRef(null)
  const isHeroInView = useInView(heroRef, { once: true })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    },
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-slate-950 text-white">
      {/* Animated Background Gradient */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-emerald-500/5" />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute -right-32 bottom-20 h-96 w-96 rounded-full bg-emerald-500/10 blur-[120px]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#94a3b808_1px,transparent_1px),linear-gradient(to_bottom,#94a3b808_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      <div className="relative z-10">
        {/* HERO SECTION */}
        <section ref={heroRef} className="w-full px-6 pb-20 pt-32 lg:px-12 xl:px-16">
          <motion.div
            initial="hidden"
            animate={isHeroInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="mx-auto max-w-7xl"
          >
            <motion.div variants={itemVariants} className="mb-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-300">
                <FiZap className="h-4 w-4" />
                Featured Work
              </span>
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="text-5xl font-black leading-tight sm:text-7xl lg:text-8xl"
            >
              Selected
              <span className="bg-gradient-to-r from-cyan-300 via-emerald-300 to-amber-200 bg-clip-text text-transparent"> Work</span>
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="mt-6 max-w-2xl text-lg text-slate-400"
            >
              A curated collection of projects focused on performance, user experience, and scalable architecture. Each project represents a unique challenge and innovative solution.
            </motion.p>

            {/* Stats */}
            <motion.div 
              variants={itemVariants}
              className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3"
            >
              <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                <div className="rounded-xl bg-cyan-500/20 p-3">
                  <FiLayers className="h-6 w-6 text-cyan-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{projects.length}+</div>
                  <div className="text-sm text-slate-400">Projects Completed</div>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                <div className="rounded-xl bg-emerald-500/20 p-3">
                  <FiCode className="h-6 w-6 text-emerald-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">10+</div>
                  <div className="text-sm text-slate-400">Technologies Used</div>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                <div className="rounded-xl bg-amber-500/20 p-3">
                  <FiCalendar className="h-6 w-6 text-amber-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">2024</div>
                  <div className="text-sm text-slate-400">Latest Update</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* PROJECTS GRID */}
        <section className="px-6 pb-32 lg:px-12 xl:px-16">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-white">Featured Projects</h2>
              <p className="mt-2 text-slate-400">Click on any project to explore details</p>
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={containerVariants}
              className="space-y-6"
            >
              {projects.map((project, index) => {
                const isActive = activeIndex === index
                const isHovered = hoveredIndex === index

                return (
                  <motion.div
                    key={project.title}
                    variants={itemVariants}
                    onClick={() => setActiveIndex(isActive ? null : index)}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className="group relative cursor-pointer"
                  >
                    {/* Card Container */}
                    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/90 to-slate-950/90 backdrop-blur-xl transition-all duration-500 hover:border-cyan-400/30">
                      {/* Background Image with Parallax Effect */}
                      <motion.div
                        className="absolute inset-0 z-0"
                        animate={{
                          scale: isHovered ? 1.05 : 1,
                        }}
                        transition={{ duration: 0.6 }}
                      >
                        <div
                          className="h-full w-full"
                          style={{
                            backgroundImage: `url(${project.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            filter: isActive ? 'brightness(0.3)' : 'brightness(0.2)',
                            transition: 'filter 0.4s ease',
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
                      </motion.div>

                      {/* Content */}
                      <div className="relative z-10 p-8 lg:p-12">
                        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                          <div className="flex-1">
                            {/* Project Number */}
                            <div className="mb-4 flex items-center gap-3">
                              <span className="font-mono text-sm text-cyan-400">
                                {String(index + 1).padStart(2, '0')}
                              </span>
                              <div className="h-px w-8 bg-gradient-to-r from-cyan-400/50 to-transparent" />
                            </div>

                            {/* Title */}
                            <motion.h3
                              layout
                              className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl"
                            >
                              {project.title}
                            </motion.h3>

                            {/* Description */}
                            <motion.p
                              layout
                              className="mt-4 max-w-2xl text-slate-300"
                            >
                              {project.description}
                            </motion.p>

                            {/* Tech Stack - Always Visible */}
                            <div className="mt-6 flex flex-wrap gap-2">
                              {project.techStack.slice(0, 4).map((tech) => (
                                <span
                                  key={tech}
                                  className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300 backdrop-blur-sm"
                                >
                                  {tech}
                                </span>
                              ))}
                              {project.techStack.length > 4 && (
                                <span className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-medium text-cyan-400 backdrop-blur-sm">
                                  +{project.techStack.length - 4} more
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Action Button */}
                          <motion.div
                            animate={{ rotate: isActive ? 90 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur-sm transition-colors group-hover:border-cyan-400/50 group-hover:bg-cyan-500/10"
                          >
                            <FiArrowRight className="h-5 w-5 text-white transition-colors group-hover:text-cyan-400" />
                          </motion.div>
                        </div>

                        {/* Expandable Content */}
                        <AnimatePresence>
                          {isActive && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="mt-8 border-t border-white/10 pt-8">
                                <div className="grid gap-8 lg:grid-cols-2">
                                  {/* Left Column - Details */}
                                  <div className="space-y-6">
                                    <div>
                                      <h4 className="mb-3 flex items-center gap-2 text-lg font-semibold text-white">
                                        <FiZap className="text-cyan-400" />
                                        Key Features
                                      </h4>
                                      <ul className="space-y-2">
                                        {project.features?.map((feature, i) => (
                                          <li key={i} className="flex items-start gap-2 text-slate-300">
                                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-cyan-400" />
                                            <span>{feature}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>

                                    <div>
                                      <h4 className="mb-3 flex items-center gap-2 text-lg font-semibold text-white">
                                        <FiCode className="text-emerald-400" />
                                        Full Tech Stack
                                      </h4>
                                      <div className="flex flex-wrap gap-2">
                                        {project.techStack.map((tech) => (
                                          <span
                                            key={tech}
                                            className="rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 text-sm text-slate-300 backdrop-blur-sm"
                                          >
                                            {tech}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  </div>

                                  {/* Right Column - Links & Info */}
                                  <div className="space-y-6">
                                    <div>
                                      <h4 className="mb-3 flex items-center gap-2 text-lg font-semibold text-white">
                                        <FiUsers className="text-amber-400" />
                                        Project Links
                                      </h4>
                                      <div className="flex flex-wrap gap-4">
                                        <a
                                          href={project.githubUrl}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          onClick={(e) => e.stopPropagation()}
                                          className="group flex items-center gap-3 rounded-xl border border-white/20 bg-white/5 px-5 py-3 backdrop-blur-sm transition-all hover:border-cyan-400/50 hover:bg-cyan-500/10"
                                        >
                                          <FiGithub className="h-5 w-5 transition-colors group-hover:text-cyan-400" />
                                          <span className="font-medium">View Source</span>
                                          <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </a>

                                        {project.liveUrl && (
                                          <a
                                            href={project.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            className="group flex items-center gap-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 px-5 py-3 font-semibold text-black shadow-lg shadow-cyan-500/25 transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-cyan-500/40"
                                          >
                                            <FiExternalLink className="h-5 w-5" />
                                            <span>Live Demo</span>
                                            <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                          </a>
                                        )}
                                      </div>
                                    </div>

                                    {/* Project Stats */}
                                    {project.stats && (
                                      <div>
                                        <h4 className="mb-3 text-lg font-semibold text-white">Impact</h4>
                                        <div className="grid grid-cols-2 gap-3">
                                          {project.stats.map((stat, i) => (
                                            <div key={i} className="rounded-lg border border-white/10 bg-white/5 p-3 backdrop-blur-sm">
                                              <div className="text-xl font-bold text-cyan-400">{stat.value}</div>
                                              <div className="text-xs text-slate-400">{stat.label}</div>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Hover Indicator */}
                      <motion.div
                        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-cyan-500 to-emerald-500"
                        initial={{ width: '0%' }}
                        animate={{ width: isActive ? '100%' : isHovered ? '100%' : '0%' }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-16 text-center"
            >
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-12">
                <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-emerald-500/10 blur-3xl" />
                
                <h3 className="text-2xl font-bold text-white sm:text-3xl">
                  Interested in collaborating?
                </h3>
                <p className="mx-auto mt-4 max-w-xl text-slate-300">
                  I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                </p>
                <div className="mt-8 flex justify-center gap-4">
                  <a
                    href="mailto:princetarunvemuri@gmail.com"
                    className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 px-6 py-3 text-sm font-bold text-black shadow-lg shadow-cyan-500/25 transition-all hover:scale-[1.05] hover:shadow-xl hover:shadow-cyan-500/40"
                  >
                    Get in Touch
                    <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                  </a>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-bold text-white backdrop-blur-sm transition-all hover:border-cyan-400/40 hover:bg-white/10"
                  >
                    <FiGithub size={16} />
                    GitHub
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default ProjectsPage