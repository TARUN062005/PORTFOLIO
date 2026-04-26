import { useState, useMemo, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { projects } from "../data/portfolioData"
import { 
  FiSearch, 
  FiX, 
  FiGithub, 
  FiArrowUpRight, 
  FiLayers, 
  FiFilter,
  FiChevronDown,
  FiGrid,
  FiList
} from "react-icons/fi"

/**
 * Modern Project Card Component - Fully Responsive
 */
const ProjectCard = ({ project, index, viewMode }) => {
  const isGrid = viewMode === "grid"
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={`group relative flex overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/60 bg-white transition-all hover:shadow-2xl hover:shadow-cyan-500/10 dark:border-white/10 dark:bg-slate-900/50 ${
        isGrid ? 'flex-col' : 'flex-col sm:flex-row'
      }`}
    >
      {/* Image Container */}
      <div className={`relative overflow-hidden ${isGrid ? 'aspect-video' : 'aspect-video sm:aspect-auto sm:w-48 md:w-56 lg:w-64 sm:shrink-0'}`}>
        <img
          src={project.image || "/api/placeholder/800/450"}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        
        {/* Hover Actions */}
        <div className="absolute bottom-4 left-4 right-4 flex translate-y-4 gap-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          {project.liveUrl && (
            <a 
              href={project.liveUrl} 
              target="_blank" 
              rel="noreferrer" 
              className="flex-1 rounded-xl bg-white py-2 sm:py-2.5 text-center text-xs sm:text-sm font-bold text-slate-900 backdrop-blur-md transition-all hover:bg-cyan-50 active:scale-95"
            >
              Live Demo
            </a>
          )}
          {project.github && (
            <a 
              href={project.github} 
              target="_blank" 
              rel="noreferrer"
              className="rounded-xl bg-slate-900/80 p-2 sm:p-2.5 text-white backdrop-blur-md transition-all hover:bg-slate-800 active:scale-95"
              aria-label="View GitHub"
            >
              <FiGithub className="h-4 w-4 sm:h-5 sm:w-5" />
            </a>
          )}
        </div>
        
        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute left-3 top-3 sm:left-4 sm:top-4 rounded-full bg-amber-400 px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-bold text-slate-900 shadow-lg">
            ★ Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4 sm:p-5 md:p-6">
        <div className="mb-2 sm:mb-3 flex flex-wrap gap-1 sm:gap-1.5">
          {project.tags?.slice(0, 3).map(tag => (
            <span 
              key={tag} 
              className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400"
            >
              #{tag}
            </span>
          ))}
          {project.tags?.length > 3 && (
            <span className="text-[9px] sm:text-[10px] font-medium text-slate-400">
              +{project.tags.length - 3}
            </span>
          )}
        </div>
        
        <h3 className="mb-1.5 sm:mb-2 text-base sm:text-lg md:text-xl font-bold text-slate-900 dark:text-white line-clamp-2">
          {project.title}
        </h3>
        
        <p className="line-clamp-2 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {project.description}
        </p>
        
        <div className="mt-auto flex items-center justify-between pt-3 sm:pt-4">
          <span className="text-[10px] sm:text-xs font-medium text-slate-400">
            {project.date || "2024"}
          </span>
          <FiArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-300 transition-colors group-hover:text-cyan-500" />
        </div>
      </div>
    </motion.div>
  )
}

/**
 * Category Filter Button Component
 */
const CategoryButton = ({ tag, isActive, onClick, count }) => (
  <button
    onClick={onClick}
    className={`group relative rounded-full px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold transition-all duration-300 ${
      isActive
        ? "bg-slate-950 text-white shadow-lg shadow-slate-950/20 dark:bg-white dark:text-slate-950 dark:shadow-white/20"
        : "bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800"
    }`}
  >
    <span className="relative z-10">{tag}</span>
    {count > 0 && tag !== "All" && (
      <span className={`ml-1.5 text-[10px] sm:text-xs ${
        isActive 
          ? "text-slate-400 dark:text-slate-500" 
          : "text-slate-400"
      }`}>
        {count}
      </span>
    )}
    {isActive && (
      <motion.div
        layoutId="activeCategory"
        className="absolute inset-0 rounded-full bg-slate-950 dark:bg-white"
        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
      />
    )}
  </button>
)

const ProjectsPage = () => {
  const [activeTag, setActiveTag] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState("grid")
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const scrollRafRef = useRef(0)

  // Handle scroll for sticky header effects
  useEffect(() => {
    const updateScrollState = () => {
      scrollRafRef.current = 0
      const nextIsScrolled = window.scrollY > 10
      setIsScrolled((previous) => (previous === nextIsScrolled ? previous : nextIsScrolled))
    }

    const handleScroll = () => {
      if (!scrollRafRef.current) {
        scrollRafRef.current = window.requestAnimationFrame(updateScrollState)
      }
    }

    updateScrollState()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (scrollRafRef.current) {
        window.cancelAnimationFrame(scrollRafRef.current)
      }
    }
  }, [])

  // Normalize data once
  const allProjects = useMemo(() => projects.map(p => ({
    ...p,
    tags: p.tags || p.techStack || [],
    github: p.github || p.githubUrl || ""
  })), [])

  // Derived unique tags with counts
  const categories = useMemo(() => {
    const tagCounts = {}
    allProjects.forEach(p => {
      p.tags.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1
      })
    })
    
    return [
      { name: "All", count: allProjects.length },
      ...Object.entries(tagCounts)
        .sort((a, b) => b[1] - a[1])
        .map(([name, count]) => ({ name, count }))
    ]
  }, [allProjects])

  // Combined Filter Logic
  const filteredProjects = useMemo(() => {
    return allProjects.filter(project => {
      const matchesTag = activeTag === "All" || project.tags.includes(activeTag)
      const matchesSearch = searchQuery === "" || 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      return matchesTag && matchesSearch
    })
  }, [allProjects, activeTag, searchQuery])

  // Clear search
  const clearSearch = () => setSearchQuery("")

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#fafafa] to-white dark:from-[#020617] dark:to-[#0a0f1f] selection:bg-cyan-100 dark:selection:bg-cyan-900/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        
        {/* Header Section */}
        <header className="mb-8 sm:mb-12 lg:mb-16 max-w-3xl">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400"
          >
            <FiLayers className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="text-xs sm:text-sm font-bold uppercase tracking-widest">Portfolio</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-3 sm:mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-950 dark:text-white"
          >
            Crafting Digital <br /> 
            <span className="text-slate-400">Experiences.</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-3 sm:mt-4 text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-2xl"
          >
            A curated collection of {allProjects.length}+ projects showcasing my journey in web development, 
            from responsive designs to full-stack applications.
          </motion.p>
        </header>

        {/* Sticky Controls Bar */}
        <div className={`sticky top-0 z-20 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 transition-all duration-300 ${
          isScrolled 
            ? "bg-white/80 backdrop-blur-lg shadow-sm dark:bg-slate-950/80" 
            : ""
        }`}>
          {/* Mobile Filter Toggle */}
          <div className="flex items-center justify-between gap-3 lg:hidden">
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="flex flex-1 items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium dark:border-slate-800 dark:bg-slate-900"
            >
              <span className="flex items-center gap-2">
                <FiFilter className="h-4 w-4" />
                {activeTag === "All" ? "All Projects" : activeTag}
              </span>
              <FiChevronDown className={`h-4 w-4 transition-transform ${showMobileFilters ? 'rotate-180' : ''}`} />
            </button>
            
            <div className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white p-1 dark:border-slate-800 dark:bg-slate-900">
              <button
                onClick={() => setViewMode("grid")}
                className={`rounded-lg p-2 transition-colors ${
                  viewMode === "grid" 
                    ? "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white" 
                    : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                }`}
                aria-label="Grid view"
              >
                <FiGrid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`rounded-lg p-2 transition-colors ${
                  viewMode === "list" 
                    ? "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white" 
                    : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                }`}
                aria-label="List view"
              >
                <FiList className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Mobile Filters Dropdown */}
          <AnimatePresence>
            {showMobileFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 overflow-hidden lg:hidden"
              >
                <div className="flex flex-wrap gap-1.5 rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
                  {categories.slice(0, 8).map(({ name, count }) => (
                    <CategoryButton
                      key={name}
                      tag={name}
                      count={count}
                      isActive={activeTag === name}
                      onClick={() => {
                        setActiveTag(name)
                        setShowMobileFilters(false)
                      }}
                    />
                  ))}
                  {categories.length > 8 && (
                    <span className="rounded-full px-3 py-1.5 text-xs text-slate-400">
                      +{categories.length - 8} more
                    </span>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Desktop Controls */}
          <div className="hidden lg:flex lg:items-center lg:justify-between lg:gap-6">
            <div className="flex flex-wrap gap-2">
              {categories.slice(0, 8).map(({ name, count }) => (
                <CategoryButton
                  key={name}
                  tag={name}
                  count={count}
                  isActive={activeTag === name}
                  onClick={() => setActiveTag(name)}
                />
              ))}
              {categories.length > 8 && (
                <div className="relative group">
                  <button className="rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800">
                    +{categories.length - 8} more
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              {/* View Toggle */}
              <div className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white p-1 dark:border-slate-800 dark:bg-slate-900">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`rounded-lg p-2 transition-colors ${
                    viewMode === "grid" 
                      ? "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white" 
                      : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                  }`}
                  aria-label="Grid view"
                >
                  <FiGrid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`rounded-lg p-2 transition-colors ${
                    viewMode === "list" 
                      ? "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white" 
                      : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                  }`}
                  aria-label="List view"
                >
                  <FiList className="h-4 w-4" />
                </button>
              </div>

              {/* Search */}
              <div className="relative w-64 xl:w-72">
                <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-9 text-sm outline-none transition-all focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-600"
                />
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                  >
                    <FiX className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="mt-3 lg:hidden">
            <div className="relative">
              <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-9 text-sm outline-none transition-all focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                >
                  <FiX className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Active Filters Display */}
        {activeTag !== "All" && (
          <div className="mt-4 flex items-center gap-2">
            <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Active filter:</span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-100 px-3 py-1 text-xs sm:text-sm font-medium text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300">
              {activeTag}
              <button onClick={() => setActiveTag("All")} className="hover:text-cyan-900 dark:hover:text-cyan-100">
                <FiX className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              </button>
            </span>
          </div>
        )}

        {/* Results Count */}
        <div className="mb-4 sm:mb-6 mt-4 sm:mt-6">
          <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">
            Showing <span className="font-bold text-slate-700 dark:text-slate-300">{filteredProjects.length}</span> {filteredProjects.length === 1 ? 'project' : 'projects'}
            {searchQuery && (
              <span> matching <span className="font-medium text-slate-700 dark:text-slate-300">"{searchQuery}"</span></span>
            )}
          </p>
        </div>

        {/* Projects Grid/List */}
        <AnimatePresence mode="popLayout">
          {filteredProjects.length > 0 ? (
            <motion.div 
              layout
              className={`grid gap-4 sm:gap-5 md:gap-6 ${
                viewMode === "grid" 
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" 
                  : "grid-cols-1"
              }`}
            >
              {filteredProjects.map((project, idx) => (
                <ProjectCard 
                  key={project.title} 
                  project={project} 
                  index={idx} 
                  viewMode={viewMode}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center rounded-2xl sm:rounded-3xl border border-slate-200 bg-white py-12 sm:py-16 lg:py-20 text-center dark:border-slate-800 dark:bg-slate-900/50"
            >
              <div className="rounded-full bg-slate-100 p-4 sm:p-6 dark:bg-slate-800">
                <FiSearch className="h-6 w-6 sm:h-8 sm:w-8 text-slate-400" />
              </div>
              <h3 className="mt-4 sm:mt-6 text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                No projects found
              </h3>
              <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md px-4">
                We couldn't find any projects matching your criteria. Try adjusting your filters or search terms.
              </p>
              <button
                onClick={() => {
                  setActiveTag("All")
                  setSearchQuery("")
                }}
                className="mt-4 sm:mt-6 rounded-full bg-slate-900 px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-white transition-all hover:bg-slate-800 active:scale-95 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
              >
                Clear all filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}

export default ProjectsPage