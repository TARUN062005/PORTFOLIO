import { useEffect, useMemo, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import {
  FiArrowLeft,
  FiArrowRight,
  FiAward,
  FiBookOpen,
  FiCode,
  FiCommand,
  FiCpu,
  FiGithub,
  FiGlobe,
  FiMail,
  FiTerminal,
} from 'react-icons/fi'
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

const education = [
  {
    degree: 'B.Tech in Computer Science (AI & ML)',
    school: 'Presidency University, Bengaluru',
    year: '2021 - 2025',
    desc: 'Specializing in Artificial Intelligence and Machine Learning, focusing on scalable algorithms and data models.',
  },
  {
    degree: 'Pre-University (Class XII)',
    school: 'Creative Public School and Jr. College, Pune',
    year: '2020',
    desc: 'Completed with a CGPA of 9.05. Strong foundation in mathematics and computer science.',
  },
  {
    degree: 'Secondary Education (Class X)',
    school: 'Shri Shivaji Vidyalaya, Beed',
    year: '2018',
    desc: 'Completed with a CGPA of 9.40. Active participant in science exhibitions and coding clubs.',
  },
]

const pillars = [
  {
    title: 'Frontend Mastery',
    icon: FiCode,
    desc: 'Designing smooth, performant interfaces with React, Framer Motion, and Tailwind CSS.',
    col: 'from-cyan-500/20 to-blue-500/20',
    text: 'text-cyan-400',
  },
  {
    title: 'Backend Scalability',
    icon: FiTerminal,
    desc: 'Building resilient APIs and services with Node.js, strong architecture, and secure defaults.',
    col: 'from-emerald-500/20 to-teal-500/20',
    text: 'text-emerald-400',
  },
  {
    title: 'AI Integration',
    icon: FiCpu,
    desc: 'Connecting intelligent models to practical product experiences users can trust and enjoy.',
    col: 'from-fuchsia-500/20 to-orange-500/20',
    text: 'text-fuchsia-300',
  },
]

const AboutSection = ({ variant = 'section' }) => {
  const isPage = variant === 'page'
  const wrapperRef = useRef(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    if (isPage) {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    }
  }, [isPage])

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end end'],
  })

  const { scrollYProgress: pageScrollProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const bgY = useTransform(pageScrollProgress, [0, 1], ['0%', '35%'])
  const heroGlow = useTransform(pageScrollProgress, [0, 0.25], [0.45, 0.15])

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

  const stats = useMemo(
    () => [
      { label: 'Years Coding', value: '3+' },
      { label: 'Projects Built', value: '15+' },
    ],
    [],
  )

  if (isPage) {
    return (
      <main
        ref={sectionRef}
        className="relative min-h-screen overflow-hidden bg-[#04111f] px-5 pb-16 pt-32 text-slate-100 sm:px-8 lg:px-12 xl:px-16"
      >
        <div className="pointer-events-none fixed inset-0 z-0">
          <motion.div
            style={{ y: bgY, opacity: heroGlow }}
            className="absolute -left-16 top-0 h-[36rem] w-[36rem] rounded-full bg-cyan-500/25 blur-[120px]"
          />
          <motion.div
            style={{ y: bgY }}
            className="absolute -right-16 bottom-0 h-[32rem] w-[32rem] rounded-full bg-emerald-500/20 blur-[120px]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#94a3b810_1px,transparent_1px),linear-gradient(to_bottom,#94a3b810_1px,transparent_1px)] bg-[size:28px_28px]" />
        </div>

        <div className="relative z-10">
          <div className="mb-10">
            <Link
              to="/"
              className="group inline-flex items-center gap-2 text-sm font-medium text-slate-300 transition-colors hover:text-cyan-300"
            >
              <span className="rounded-full border border-white/15 bg-white/5 p-2 transition-all group-hover:-translate-x-0.5 group-hover:border-cyan-400/40">
                <FiArrowLeft />
              </span>
              Back to Home
            </Link>
          </div>

          <header className="mb-16">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-500/10 px-3 py-1.5 text-xs font-semibold tracking-wide text-cyan-200">
              <FiCommand /> ABOUT_PROFILE.load()
            </div>
            <h1 className="max-w-4xl text-4xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
              Building products where
              <span className="bg-gradient-to-r from-cyan-300 via-emerald-300 to-amber-200 bg-clip-text text-transparent"> design meets systems thinking.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
              I am Tarun, a full stack developer focused on fast interfaces, clean architecture, and meaningful user outcomes.
            </p>

            <div className="mt-8 grid max-w-md grid-cols-2 gap-3">
              {stats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 backdrop-blur"
                >
                  <div className="text-2xl font-black text-white">{item.value}</div>
                  <div className="text-xs uppercase tracking-[0.18em] text-slate-400">{item.label}</div>
                </div>
              ))}
            </div>
          </header>

          <section className="mb-16 rounded-3xl border border-white/10 bg-white/[0.03] p-4 shadow-2xl shadow-black/30 backdrop-blur-md sm:p-6">
            <TextCard mobile />
          </section>

          <section className="mb-16">
            <div className="mb-8 flex items-center gap-2 text-cyan-300">
              <FiAward />
              <h2 className="text-2xl font-bold text-white">Core Pillars</h2>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {pillars.map((pillar, index) => (
                <motion.article
                  key={pillar.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br ${pillar.col} p-6`}
                >
                  <div className={`mb-4 inline-flex rounded-2xl border border-white/10 bg-black/25 p-3 ${pillar.text}`}>
                    <pillar.icon size={20} />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-white">{pillar.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-300">{pillar.desc}</p>
                </motion.article>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <div className="mb-8 flex items-center gap-2 text-cyan-300">
              <FiBookOpen />
              <h2 className="text-2xl font-bold text-white">Education Timeline</h2>
            </div>
            <div className="space-y-4">
              {education.map((item, index) => (
                <motion.article
                  key={item.degree}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur"
                >
                  <span className="rounded-full bg-cyan-500/15 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-cyan-200">
                    {item.year}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold text-white">{item.degree}</h3>
                  <p className="text-sm text-cyan-100/80">{item.school}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">{item.desc}</p>
                </motion.article>
              ))}
            </div>
          </section>

          <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 px-6 py-10 text-center sm:px-10">
            <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-cyan-500/20 blur-[90px]" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-52 w-52 rounded-full bg-emerald-500/20 blur-[90px]" />
            <div className="relative">
              <FiGlobe className="mx-auto mb-4 text-3xl text-cyan-300" />
              <h2 className="text-2xl font-black tracking-tight text-white sm:text-4xl">Let’s build something memorable.</h2>
              <p className="mx-auto mt-4 max-w-xl text-sm text-slate-300 sm:text-base">
                Open to collaborations, freelance projects, and product teams shipping bold ideas.
              </p>
              <a
                href="mailto:princetarunvemuri@gmail.com"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-slate-900 transition hover:scale-[1.03]"
              >
                Say Hello <FiCommand />
              </a>
            </div>
          </section>
        </div>
      </main>
    )
  }

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
        className="relative hidden max-w-none lg:block"
        style={{ height: '150vh' }}
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
          background: 'transparent',
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
            href="mailto:princetarunvemuri@gmail.com"
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