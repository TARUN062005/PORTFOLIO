import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { projects } from '../data/portfolioData'
import ProjectCard from './ProjectCard'
import { FiSearch, FiX } from 'react-icons/fi'

const ProjectsPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [])

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTech, setSelectedTech] = useState('all')
  
  const allTechs = [...new Set(projects.flatMap(p => p.techStack))].sort()
  
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTech = selectedTech === 'all' || project.techStack.includes(selectedTech)
    return matchesSearch && matchesTech
  })

  return (
    <main className="min-h-screen bg-stone-100 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      {/* Animated Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: ['0%', '100%', '0%'],
            y: ['0%', '50%', '0%'],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-cyan-300/25 blur-3xl dark:bg-cyan-600/20"
        />
        <motion.div
          animate={{
            x: ['0%', '-100%', '0%'],
            y: ['0%', '-50%', '0%'],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute right-0 top-32 h-80 w-80 rounded-full bg-emerald-300/25 blur-3xl dark:bg-emerald-500/20"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 pt-28 sm:px-8 lg:px-12">
        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4 pb-12"
        >
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search projects by name or technology..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-2xl border border-slate-300 bg-white/80 px-11 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 sm:px-12 sm:py-4 sm:text-base dark:border-slate-700 dark:bg-slate-900/80 dark:text-white"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 hover:bg-slate-200 dark:hover:bg-slate-700"
              >
                <FiX className="h-4 w-4 text-slate-400" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            <button
              onClick={() => setSelectedTech('all')}
              className={`rounded-full px-2.5 py-1.5 text-xs font-semibold transition-all sm:px-4 sm:py-2 sm:text-sm ${
                selectedTech === 'all'
                  ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 shadow-lg'
                  : 'border border-slate-300 bg-white/50 text-slate-700 hover:border-cyan-500 dark:border-slate-700 dark:text-slate-300'
              }`}
            >
              All
            </button>
            {allTechs.map((tech) => (
              <button
                key={tech}
                onClick={() => setSelectedTech(tech)}
                className={`rounded-full px-2.5 py-1.5 text-xs font-semibold transition-all sm:px-4 sm:py-2 sm:text-sm ${
                  selectedTech === tech
                    ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 shadow-lg'
                    : 'border border-slate-300 bg-white/50 text-slate-700 hover:border-cyan-500 dark:border-slate-700 dark:text-slate-300'
                }`}
              >
                {tech}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="section-subtitle pb-12"
        >
          Showing {filteredProjects.length} of {projects.length} projects
        </motion.p>

        {/* Main Content: Sticky Header + Projects Grid */}
        <div className="flex flex-col gap-12 lg:flex-row pb-20">
          {/* Left Side: Sticky Title */}
          <aside className="lg:w-1/3">
            <div className="sticky top-28 self-start space-y-4">
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="section-kicker"
              >
                Archive
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="section-title text-4xl lg:text-5xl"
              >
                Full Project
                <span className="bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent"> Archive</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="section-body max-w-sm"
              >
                A deeper view into shipped interfaces, design systems, and engineering decisions across {projects.length} products.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Link
                  to="/"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition duration-300 hover:-translate-y-0.5 hover:border-cyan-500 hover:bg-cyan-500/10 hover:text-cyan-700 dark:border-slate-700 dark:text-slate-200 dark:hover:border-cyan-400 mt-4"
                >
                  ← Back to Home
                </Link>
              </motion.div>
            </div>
          </aside>

          {/* Right Side: Scrolling Cards */}
          <div className="lg:w-2/3">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedTech + searchTerm}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-24"
              >
                {filteredProjects.length > 0 ? (
                  filteredProjects.map((project, index) => (
                    <div key={project.title} className="sticky top-32">
                      <ProjectCard project={project} index={index} />
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <p className="text-xl font-semibold text-slate-600 dark:text-slate-400">
                      No projects found
                    </p>
                    <p className="mt-2 text-slate-500">Try adjusting your search or filter</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </main>
  )
}

export default ProjectsPage