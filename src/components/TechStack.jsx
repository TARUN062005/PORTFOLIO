import { techStack } from '../data/portfolioData'
import useRevealOnScroll from '../hooks/useRevealOnScroll'
import './TechStack.css'

const TechStack = () => {
  const { elementRef, isVisible } = useRevealOnScroll()

  return (
    <section
      id="tech-stack"
      ref={elementRef}
      aria-labelledby="tech-stack-title"
      className="py-16 sm:py-24"
    >
      {/* Header Section */}
      <header className={`transition-all duration-700 ease-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
          Skills & Ecosystem
        </p>
        <h2 
          id="tech-stack-title"
          className="section-title mt-3"
        >
          Tools I use to ship <span className="text-cyan-600 dark:text-cyan-400">reliable products.</span>
        </h2>
      </header>

      {/* Grid Container */}
      <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {techStack.map(({ name, icon: Icon }, index) => (
          <article
            key={name}
            style={{ 
              transitionDelay: isVisible ? `${index * 50}ms` : '0ms' 
            }}
            className={`
              glass-panel group flex items-center gap-3 rounded-xl border border-slate-200/50 bg-white/50 p-4 
              transition-all duration-500 dark:border-slate-800/50 dark:bg-slate-900/50
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
              hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10 dark:hover:border-cyan-400/40
            `}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 p-2 text-slate-600 transition-colors group-hover:bg-cyan-500/10 group-hover:text-cyan-600 dark:bg-slate-800 dark:text-slate-400 dark:group-hover:bg-cyan-400/10 dark:group-hover:text-cyan-400">
              <Icon size={24} strokeWidth={1.5} />
            </div>
            
            <span className="truncate text-sm font-medium text-slate-600 transition-colors group-hover:text-slate-900 dark:text-slate-400 dark:group-hover:text-slate-100">
              {name}
            </span>
          </article>
        ))}
      </div>
    </section>
  )
}

export default TechStack