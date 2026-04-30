import { memo, useCallback, useMemo, useState } from 'react'
import { techStack } from '../data/portfolioData'
import './TechStack.css'

const DEVICON_BASE = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/'
const CATEGORY_ORDER = ['all', 'frontend', 'backend', 'tools']

const CATEGORY_MAP = {
  frontend: new Set(['React', 'JavaScript', 'TypeScript', 'Next.js', 'Tailwind', 'HTML5', 'CSS3']),
  backend: new Set(['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Firebase', 'Python', 'Flask', 'Java']),
  tools: new Set(['Git', 'GitHub', 'Docker', 'Figma', 'Postman', 'AWS', 'Linux', 'Streamlit']),
}

const CATEGORY_LABELS = {
  all: 'All',
  frontend: 'Frontend',
  backend: 'Backend',
  tools: 'Tools',
}

const TechStackSlider = ({ items = techStack, duration = 30 }) => {
  const [activeCategory, setActiveCategory] = useState('all')

  const handleCategoryClick = useCallback((event) => {
    const nextCategory = event.currentTarget.dataset.category
    if (nextCategory) {
      setActiveCategory((previous) => (previous === nextCategory ? previous : nextCategory))
    }
  }, [])

  const filteredItems = useMemo(() => {
    if (activeCategory === 'all') {
      return items
    }

    const allowed = CATEGORY_MAP[activeCategory]
    return items.filter((item) => allowed?.has(item.name))
  }, [items, activeCategory])

  const useTwoRows = filteredItems.length > 15

  const [rowOneItems, rowTwoItems] = useMemo(() => {
    if (!useTwoRows) {
      return [filteredItems, []]
    }

    const midpoint = Math.ceil(filteredItems.length / 2)
    return [filteredItems.slice(0, midpoint), filteredItems.slice(midpoint)]
  }, [filteredItems, useTwoRows])

  const rowOneTrack = useMemo(() => [...rowOneItems, ...rowOneItems, ...rowOneItems], [rowOneItems])
  const rowTwoTrack = useMemo(() => [...rowTwoItems, ...rowTwoItems, ...rowTwoItems], [rowTwoItems])
  const rowOneStyle = useMemo(() => ({ '--duration': `${duration}s` }), [duration])
  const rowTwoStyle = useMemo(
    () => ({ '--duration': `${duration + 8}s`, animationDirection: 'reverse' }),
    [duration],
  )

  return (
    <section id="tech-stack" className="-mt-4 space-y-8 pt-1 lg:-mb-8">
      {/* Heading */}
      <div className="space-y-4">
        <div className="flex justify-center">
          <h2 className="section-title text-center">
            Tech Stack
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {CATEGORY_ORDER.map((category) => {
            const isActive = category === activeCategory
            return (
              <button
                key={category}
                type="button"
                onClick={handleCategoryClick}
                data-category={category}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/25 hover:bg-cyan-400'
                    : 'border border-slate-300 bg-white/70 text-slate-700 hover:border-cyan-500 hover:text-cyan-700 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-200 dark:hover:border-cyan-400 dark:hover:text-cyan-300'
                }`}
              >
                {CATEGORY_LABELS[category]}
              </button>
            )
          })}
        </div>
      </div>

      {/* Slider */}
      <div className="relative overflow-hidden py-4">
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-stone-100 to-transparent sm:w-20 lg:w-24 dark:from-slate-950" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-stone-100 to-transparent sm:w-20 lg:w-24 dark:from-slate-950" />

        <div className={useTwoRows ? 'space-y-5' : ''}>
          <div
            className="tech-slider-track flex w-max items-center gap-6 sm:gap-10 lg:gap-12"
            style={rowOneStyle}
          >
            {rowOneTrack.map(({ name, icon }, index) => (
              <MemoTechItem key={`r1-${icon}-${index}`} name={name} iconPath={icon} />
            ))}
          </div>

          {useTwoRows && rowTwoTrack.length > 0 && (
            <div
              className="tech-slider-track flex w-max items-center gap-6 sm:gap-10 lg:gap-12"
              style={rowTwoStyle}
            >
              {rowTwoTrack.map(({ name, icon }, index) => (
                <MemoTechItem key={`r2-${icon}-${index}`} name={name} iconPath={icon} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

/* ─── Single icon — no background box, just the logo ───────────────────── */
function TechItem({ name, iconPath }) {
  const [errored, setErrored] = useState(false)
  const src = useMemo(() => `${DEVICON_BASE}${iconPath}`, [iconPath])
  const handleImageError = useCallback(() => {
    setErrored(true)
  }, [])

  return (
    <div className="group flex flex-col items-center gap-2">
      {/* Logo — no box, no border, just the image */}
      {errored ? (
        <span className="select-none text-xs font-bold text-slate-400">
          {name.slice(0, 3).toUpperCase()}
        </span>
      ) : (
        <img
          src={src}
          alt={`${name} logo`}
          className="
            h-16 w-16 object-contain
            sm:h-20 sm:w-20
            lg:h-24 lg:w-24
            grayscale transition-all duration-300
            group-hover:grayscale-0 group-hover:scale-125 group-hover:drop-shadow-lg
          "
          loading="lazy"
          onError={handleImageError}
        />
      )}

      {/* Name — fades in on hover */}
      <span className="select-none whitespace-nowrap text-xs font-semibold text-slate-400 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        {name}
      </span>
    </div>
  )
}

const MemoTechItem = memo(TechItem)

export default memo(TechStackSlider)