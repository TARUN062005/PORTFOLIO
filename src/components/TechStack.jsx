import { memo, useMemo } from 'react'
import { techStack } from '../data/portfolioData'
import useRevealOnScroll from '../hooks/useRevealOnScroll'
import './TechStack.css'

const TechStackItem = memo(function TechStackItem({ name, Icon, isVisible, delay }) {
  const itemStyle = useMemo(
    () => ({
      transitionDelay: isVisible ? `${delay}ms` : '0ms',
    }),
    [delay, isVisible],
  )

  return (
    <article
      style={itemStyle}
      className={`
        glass-panel group flex items-center gap-3 rounded-xl border border-slate-200/50 bg-white/50 p-4 
        transition-all duration-500 dark:border-slate-800/50 dark:bg-slate-900/50
        ${isVisible ? 'translate-y-0' : 'translate-y-1'}
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
  )
})

const TechStack = () => {
  const { elementRef, isVisible } = useRevealOnScroll({
    threshold: 0.01,
    rootMargin: '0px',
  })

  return (
    <section
      id="tech-stack"
      ref={elementRef}
      aria-labelledby="tech-stack-title"
      className="py-16 sm:py-24"
    >
      {/* Header Section */}
      <header className={`transition-transform duration-500 ease-out ${
        isVisible ? 'translate-y-0' : 'translate-y-1'
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
      <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 max-w-none">
        {techStack.map(({ name, icon: Icon }, index) => (
          <TechStackItem
            key={name}
            name={name}
            Icon={Icon}
            isVisible={isVisible}
            delay={index * 50}
          />
        ))}
      </div>
    </section>
  )
}

export default memo(TechStack)