import { memo, useEffect, useMemo, useRef } from 'react'
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
  FiZap,
  FiLayers,
  FiDatabase,
  FiServer,
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

          {/* Hero Section with Bento Grid */}
          <motion.header 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-500/10 px-3 py-1.5 text-xs font-semibold tracking-wide text-cyan-200">
              <FiCommand /> ABOUT_PROFILE.load()
            </div>
            
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <h1 className="max-w-4xl text-4xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
                  Building products where
                  <span className="bg-gradient-to-r from-cyan-300 via-emerald-300 to-amber-200 bg-clip-text text-transparent"> design meets systems thinking.</span>
                </h1>
                <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
                  I am Tarun, a full stack developer focused on fast interfaces, clean architecture, and meaningful user outcomes.
                </p>
              </div>

              {/* Bento Stats Grid */}
              <div className="grid grid-cols-2 gap-3">
                {stats.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-4 backdrop-blur-sm transition-all hover:border-cyan-400/30"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-emerald-500/0 opacity-0 transition-opacity duration-500 group-hover:opacity-10" />
                    <div className="relative">
                      <div className="text-3xl font-black text-white">{item.value}</div>
                      <div className="text-xs uppercase tracking-[0.18em] text-slate-400">{item.label}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.header>

          {/* Bento Grid Layout for Main Content */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:grid-rows-2">
            {/* Bio Card - Spans 2 columns */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-950/80 p-6 backdrop-blur-md lg:col-span-2"
            >
              <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl" />
              <div className="relative">
                <TextCard mobile />
              </div>
            </motion.section>

            {/* Quick Links Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 p-6 backdrop-blur-sm"
            >
              <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
                <FiZap className="text-cyan-400" />
                Quick Connect
              </h3>
              <div className="space-y-3">
                <a
                  href="mailto:princetarunvemuri@gmail.com"
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 transition-all hover:border-cyan-400/40 hover:bg-white/10"
                >
                  <FiMail className="text-cyan-400" />
                  <div>
                    <div className="text-sm font-medium text-white">Email Me</div>
                    <div className="text-xs text-slate-400">princetarunvemuri@gmail.com</div>
                  </div>
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 transition-all hover:border-cyan-400/40 hover:bg-white/10"
                >
                  <FiGithub className="text-cyan-400" />
                  <div>
                    <div className="text-sm font-medium text-white">GitHub</div>
                    <div className="text-xs text-slate-400">View my code</div>
                  </div>
                </a>
                <Link
                  to="/projects"
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 transition-all hover:border-cyan-400/40 hover:bg-white/10"
                >
                  <FiLayers className="text-cyan-400" />
                  <div>
                    <div className="text-sm font-medium text-white">Projects</div>
                    <div className="text-xs text-slate-400">See my work</div>
                  </div>
                </Link>
              </div>
            </motion.div>

            {/* Core Pillars - Spans full width */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-3"
            >
              <div className="mb-6 flex items-center gap-2">
                <div className="rounded-full bg-cyan-500/20 p-2">
                  <FiAward className="text-cyan-300" />
                </div>
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
                    className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br ${pillar.col} p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/10`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="relative">
                      <div className={`mb-4 inline-flex rounded-2xl border border-white/10 bg-black/25 p-3 ${pillar.text}`}>
                        <pillar.icon size={20} />
                      </div>
                      <h3 className="mb-2 text-lg font-semibold text-white">{pillar.title}</h3>
                      <p className="text-sm leading-relaxed text-slate-300">{pillar.desc}</p>
                    </div>
                  </motion.article>
                ))}
              </div>
            </motion.section>

            {/* Education Timeline */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-3"
            >
              <div className="mb-6 flex items-center gap-2">
                <div className="rounded-full bg-emerald-500/20 p-2">
                  <FiBookOpen className="text-emerald-300" />
                </div>
                <h2 className="text-2xl font-bold text-white">Education Timeline</h2>
              </div>
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-8 top-0 h-full w-0.5 bg-gradient-to-b from-cyan-500/50 via-emerald-500/50 to-transparent" />
                
                <div className="space-y-6">
                  {education.map((item, index) => (
                    <motion.article
                      key={item.degree}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.45, delay: index * 0.08 }}
                      className="relative ml-16"
                    >
                      {/* Timeline Dot */}
                      <div className="absolute -left-10 top-4 h-4 w-4 rounded-full border-2 border-cyan-400 bg-slate-900 ring-4 ring-cyan-500/20" />
                      
                      <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-5 backdrop-blur-sm transition-all hover:border-cyan-400/30">
                        <div className="mb-3 flex items-center gap-3">
                          <span className="rounded-full bg-cyan-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-cyan-200">
                            {item.year}
                          </span>
                          {index === 0 && (
                            <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
                              Current
                            </span>
                          )}
                        </div>
                        <h3 className="text-lg font-semibold text-white">{item.degree}</h3>
                        <p className="text-sm text-cyan-100/80">{item.school}</p>
                        <p className="mt-2 text-sm leading-relaxed text-slate-300">{item.desc}</p>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </div>
            </motion.section>
          </div>

          {/* CTA Section */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="relative mt-16 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 px-6 py-12 text-center sm:px-10"
          >
            <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-cyan-500/20 blur-[90px]" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-52 w-52 rounded-full bg-emerald-500/20 blur-[90px]" />
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="mx-auto mb-6 h-16 w-16 rounded-full border-2 border-cyan-400/30 bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 p-3"
              >
                <FiGlobe className="h-full w-full text-cyan-300" />
              </motion.div>
              <h2 className="text-2xl font-black tracking-tight text-white sm:text-4xl">Let's build something memorable.</h2>
              <p className="mx-auto mt-4 max-w-xl text-sm text-slate-300 sm:text-base">
                Open to collaborations, freelance projects, and product teams shipping bold ideas.
              </p>
              <div className="mt-7 flex justify-center gap-4">
                <a
                  href="mailto:princetarunvemuri@gmail.com"
                  className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-500/25 transition-all hover:scale-[1.05] hover:shadow-xl hover:shadow-cyan-500/40"
                >
                  Say Hello
                  <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-bold text-white backdrop-blur-sm transition-all hover:border-cyan-400/40 hover:bg-white/10"
                >
                  <FiServer size={16} />
                  Resume
                </a>
              </div>
            </div>
          </motion.section>
        </div>
      </main>
    )
  }

  return (
    <section id="about" className="relative scroll-mt-24 pt-12 sm:scroll-mt-28">
      <style>{`
        #about {
          --about-navbar-offset: 5.6rem;
          scroll-margin-top: var(--about-navbar-offset);
        }

        @media (max-width: 768px) {
          #about {
            --about-navbar-offset: 4.8rem;
          }
        }
      `}</style>
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

      {/* Mobile: Modern Bento Grid Layout */}
      <div className="space-y-4 lg:hidden">
        <div className="flex justify-center">
          <ImageEllipse small />
        </div>

        <div>
          <TextCard mobile />
        </div>

        {/* Mobile Quick Stats */}
        <div className="grid grid-cols-2 gap-3">
          {stats.map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-slate-300/80 bg-gradient-to-br from-white to-slate-50 p-3 text-center dark:border-white/10 dark:from-white/[0.08] dark:to-white/[0.02]"
            >
              <div className="text-2xl font-black text-cyan-600 dark:text-cyan-400">{item.value}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">{item.label}</div>
            </div>
          ))}
        </div>

        {/* Mobile Quick Links */}
        <div className="flex gap-2">
          <Link
            to="/about"
            className="flex-1 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 px-4 py-3 text-center text-sm font-semibold text-white shadow-lg"
          >
            Full About →
          </Link>
          <a
            href="mailto:princetarunvemuri@gmail.com"
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white/80 px-4 py-3 text-sm font-semibold text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-white"
          >
            <FiMail size={14} />
            Contact
          </a>
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
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="relative h-full w-full overflow-hidden"
        style={{
          borderRadius: '50%',
          border: '2px solid rgba(34,211,238,0.4)',
          boxShadow: '0 0 30px rgba(34,211,238,0.15)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-emerald-500/20" />
        <img
          src="/profile-avatar.svg"
          alt="TARUN VEMURI"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </motion.div>

      {!small && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gradient-to-r from-cyan-600 to-emerald-600 px-3 py-0.5 text-[10px] font-bold tracking-wider text-white shadow-lg"
        >
          TARUN · DEV
        </motion.div>
      )}
    </div>
  )
}

function TextCard({ mobile = false }) {
  const w = mobile ? '100%' : TEXT_W
  const h = mobile ? 'auto' : TEXT_H

  return (
    <div
      className="flex flex-col overflow-hidden rounded-2xl border border-slate-300/80 bg-gradient-to-br from-white via-slate-50 to-slate-100 shadow-2xl shadow-slate-900/10 dark:border-slate-700/80 dark:from-slate-900/90 dark:via-slate-900/80 dark:to-slate-950/90"
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

export default memo(AboutSection)