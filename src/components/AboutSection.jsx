// AboutSection.jsx - Fixed version with proper overflow handling
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import { FiArrowRight, FiMail, FiGithub } from 'react-icons/fi'
import aboutMarkdown from '../data/about.js'

const mdComponents = {
  h2: ({ children }) => (
    <h2 className="mb-2 text-lg font-semibold text-slate-900 dark:text-white">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="mb-1.5 mt-2 text-sm font-semibold text-cyan-700 dark:text-cyan-300">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="mb-2 text-sm leading-relaxed text-slate-700 dark:text-white/80">
      {children}
    </p>
  ),
  strong: ({ children }) => (
    <strong className="font-bold text-amber-600 dark:text-amber-400">{children}</strong>
  ),
  em: ({ children }) => <em className="italic text-cyan-700 dark:text-cyan-300">{children}</em>,
  ul: ({ children }) => <ul className="mb-2 space-y-1 pl-1">{children}</ul>,
  li: ({ children }) => {
    return (
      <li className="flex items-start gap-1.5 text-sm text-slate-700 dark:text-white/70">
        <span className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400">▸</span>
        <span>{children}</span>
      </li>
    )
  },
  hr: () => <hr className="my-2 border-slate-300/80 dark:border-white/10" />,
  blockquote: ({ children }) => (
    <blockquote className="my-2 border-l-2 border-cyan-600/45 pl-2 text-sm italic text-slate-500 dark:border-cyan-500/50 dark:text-white/50">
      {children}
    </blockquote>
  ),
}

const TEXT_W = 440
const TEXT_H = 460
const IMG_W = 300
const IMG_H = 380
const GAP = 25

const AboutSection = () => {
  const wrapperRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end end'],
  })

  const textY = useTransform(scrollYProgress, [0, 0.76, 0.98], [0, 0, -26])
  const textOp = useTransform(scrollYProgress, [0, 0.84, 0.98], [1, 1, 0])
  const imageX = useTransform(scrollYProgress, [0, 0.74, 0.98], ['0%', '0%', '-95%'])
  const imageOp = useTransform(scrollYProgress, [0, 0.82, 0.96], [1, 1, 0])
  const imageScale = useTransform(scrollYProgress, [0, 0.74, 0.98], [1, 1, 0.92])
  const textScale = useTransform(scrollYProgress, [0, 0.76, 0.98], [1, 1, 0.97])

  const sp = { stiffness: 46, damping: 24, mass: 0.95 }
  const textYS = useSpring(textY, sp)
  const textOpS = useSpring(textOp, { stiffness: 68, damping: 26 })
  const imageXS = useSpring(imageX, { stiffness: 42, damping: 24, mass: 0.95 })
  const imageOpS = useSpring(imageOp, { stiffness: 72, damping: 26 })
  const imageScaleS = useSpring(imageScale, sp)
  const textScaleS = useSpring(textScale, sp)

  return (
    <section id="about" className="relative pt-12">
      {/* About Me heading */}
      <div className="mb-3 flex justify-center">
        <h2 className="section-title text-center">
          About Me
        </h2>
      </div>

      {/* Desktop: sticky animation */}
      <div
        ref={wrapperRef}
        className="relative hidden lg:block"
        style={{ height: '84vh' }}
      >
        <div className="sticky top-20 flex h-[64vh] items-start justify-center overflow-hidden px-8 pt-2 lg:px-12">
          <div className="relative flex items-center" style={{ gap: `${GAP}px` }}>
            {/* Text Card Container with overflow hidden to prevent background bleed */}
            <div className="relative overflow-hidden rounded-2xl" style={{ flexShrink: 0, zIndex: 20 }}>
              <motion.div
                className="relative"
                style={{ position: 'relative', opacity: textOpS, y: textYS, scale: textScaleS }}
              >
                <TextCard />
              </motion.div>
            </div>

            {/* Image Container with proper overflow handling */}
            <motion.div
              className="relative overflow-visible"
              style={{
                position: 'relative',
                opacity: imageOpS,
                x: imageXS,
                scale: imageScaleS,
                width: IMG_W,
                flexShrink: 0,
                zIndex: 10,
              }}
              className="overflow-visible"
            >
              <ImageEllipse />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile: stacked */}
      <div className="space-y-4 lg:hidden">
        <div className="flex justify-center">
          <ImageEllipse small />
        </div>

        <div>
          <TextCard mobile />
        </div>
      </div>
    </section>
  )
}

function ImageEllipse({ small = false }) {
  const w = small ? 210 : IMG_W
  const h = small ? 210 : IMG_H

  return (
    <div className="relative" style={{ width: w, height: h }}>
      <div
        className="relative h-full w-full overflow-hidden transition-all duration-300 hover:scale-105"
        style={{
          borderRadius: '50%',
          border: '2px solid rgba(34,211,238,0.4)',
          boxShadow: '0 0 30px rgba(34,211,238,0.15)',
        }}
      >
        <img
          src="/profile-avatar.svg"
          alt="TARUN VEMURI"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </div>

      {!small && (
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gradient-to-r from-cyan-600 to-emerald-600 px-3 py-0.5 text-[10px] font-bold tracking-wider text-white shadow-lg">
          TARUN · DEV
        </div>
      )}
    </div>
  )
}

function TextCard({ mobile = false }) {
  const w = mobile ? '100%' : TEXT_W
  const h = mobile ? 'auto' : TEXT_H

  return (
    <div
      className="flex flex-col overflow-hidden rounded-2xl border border-slate-300/80 bg-gradient-to-br from-white via-slate-50 to-slate-100 shadow-2xl shadow-slate-900/10 dark:border-slate-700/80 dark:bg-none"
      style={{
        width: w,
        height: h,
        background: undefined,
      }}
    >
      {/* Terminal header */}
      <div
        className="flex shrink-0 items-center gap-0.5 border-b border-slate-300/80 bg-white/80 px-4 py-2.5 dark:border-white/10 dark:bg-white/5"
        style={{}}
      >
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 select-none text-[10px] text-slate-500 dark:text-white/30">
          about.md
        </span>
      </div>

      {/* Content with custom scrollbar - NO background bleed */}
      <div
        className="custom-scrollbar flex-1 overflow-y-auto p-4"
        style={{ 
          scrollbarWidth: 'thin', 
          scrollbarColor: 'rgba(34,211,238,0.3) transparent',
          background: 'transparent'
        }}
      >
        <p className="mb-2 text-xs text-slate-500 dark:text-white/25">
          <span className="text-emerald-600 dark:text-emerald-400">~/portfolio</span>
          <span className="text-slate-500 dark:text-white/40"> $ </span>
          <span className="text-cyan-700 dark:text-cyan-300">cat about.md</span>
        </p>

        <ReactMarkdown components={mdComponents}>{aboutMarkdown}</ReactMarkdown>

        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            to="/about"
            className="group inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-emerald-500 px-3 py-1.5 text-xs font-semibold text-black transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
          >
            Full About
            <FiArrowRight className="transition-transform group-hover:translate-x-1" size={10} />
          </Link>
          <a
            href="mailto:TARUNVEMURI.dev@gmail.com"
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-500/40 hover:text-cyan-700 dark:border-white/10 dark:text-white/65 dark:hover:text-cyan-300"
          >
            <FiMail size={10} />
            Say Hello
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-500/40 hover:text-cyan-700 dark:border-white/10 dark:text-white/65 dark:hover:text-cyan-300"
          >
            <FiGithub size={10} />
            GitHub
          </a>
        </div>
      </div>
    </div>
  )
}

export default AboutSection