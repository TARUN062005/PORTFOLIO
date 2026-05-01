import { memo, useCallback, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FiArrowLeft,
  FiDownload,
  FiMail,
  FiMapPin,
  FiPhone,
  FiGithub,
  FiLinkedin,
  FiExternalLink,
  FiCode,
  FiTerminal,
  FiCpu,
  FiCloud,
} from 'react-icons/fi'
import Navbar from './Navbar'

// --- Data Constants ---
const CONTACT_ITEMS = [
  { icon: FiMapPin, label: 'Andhra Pradesh', sub: 'India' },
  { icon: FiPhone, label: '+91 9550186473', href: 'tel:+919550186473', sub: 'Work' },
  { icon: FiMail, label: 'princetarunvemuri@gmail.com', href: 'mailto:princetarunvemuri@gmail.com', sub: 'Personal' },
]

const EXPERTISE = [
  { 
    title: 'Frontend', 
    icon: FiCode, 
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind'],
    color: 'from-blue-500/20 to-cyan-500/20'
  },
  { 
    title: 'Backend', 
    icon: FiTerminal, 
    items: ['Node.js', 'Express', 'MongoDB', 'Python'],
    color: 'from-emerald-500/20 to-teal-500/20'
  },
  { 
    title: 'Cloud & Infra', 
    icon: FiCloud, 
    items: ['AWS', 'Azure', 'Docker', 'Vercel'],
    color: 'from-purple-500/20 to-pink-500/20'
  },
  { 
    title: 'Systems', 
    icon: FiCpu, 
    items: ['Java', 'C', 'Salesforce Apex', 'ML'],
    color: 'from-orange-500/20 to-red-500/20'
  },
]

const TIMELINE = [
  {
    date: '2025',
    title: 'Full-Stack Intern',
    company: 'TheSmartBridge',
    desc: 'Engineered MERN applications with real-time sync.',
  },
  {
    date: '2024 - Present',
    title: 'B.Tech CSE',
    company: 'LBRCE',
    desc: 'Focusing on Distributed Systems & AI. Current CGPA: 9.2',
  },
  {
    date: '2023',
    title: 'Industrial Trainee',
    company: 'MSME-CITD',
    desc: 'Lower-level systems and product design workflows.',
  },
  {
    date: '2021 - 2023',
    title: 'Diploma CE',
    company: 'AANM & VVRSR',
    desc: 'Foundation in Computer Engineering. 93.67% Aggregate.',
  },
]

// --- Sub-Components for Modern UI ---

const GlassCard = ({ children, className = "" }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`rounded-3xl border border-white/10 bg-white/40 p-6 backdrop-blur-md transition-all hover:bg-white/60 dark:bg-white/[0.03] dark:hover:bg-white/[0.06] ${className}`}
  >
    {children}
  </motion.div>
)

const SectionHeader = ({ title, subtitle }) => (
  <div className="mb-10">
    <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
      {title}
    </h2>
    <div className="mt-2 h-1.5 w-12 rounded-full bg-cyan-500" />
    {subtitle && <p className="mt-4 text-slate-600 dark:text-slate-400">{subtitle}</p>}
  </div>
)

const About = ({ isDarkMode, onToggleTheme }) => {
  const navigate = useNavigate()
  const sections = useMemo(() => [{ id: 'home', label: 'Home' }, { id: 'about', label: 'About' }], [])

  const handleNavClick = useCallback((id) => {
    id === 'home' ? navigate('/') : document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }, [navigate])

  return (
    <div className="relative min-h-screen bg-[#f8fafc] text-slate-900 transition-colors duration-500 dark:bg-[#020617] dark:text-slate-100">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] h-[40%] w-[40%] rounded-full bg-cyan-400/10 blur-[120px] dark:bg-cyan-600/10" />
        <div className="absolute top-[40%] -right-[10%] h-[40%] w-[40%] rounded-full bg-emerald-400/10 blur-[120px] dark:bg-emerald-500/10" />
      </div>

      <Navbar 
        sections={sections} 
        activeSection="about" 
        onNavClick={handleNavClick} 
        isDarkMode={isDarkMode} 
        onToggleTheme={onToggleTheme} 
      />

      <main className="relative z-10 mx-auto max-w-7xl px-6 pb-24 pt-32 lg:px-8">
        
        {/* Hero Section - The "Bento" Header */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <GlassCard className="lg:col-span-2 flex flex-col justify-center py-10 lg:px-10">
            <motion.span 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="mb-4 inline-block text-sm font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400"
            >
              Full-Stack Developer
            </motion.span>
            <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white sm:text-6xl">
              Vemuri Prince Tarun<span className="text-cyan-500">.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
              Transforming complex problems into elegant, scalable digital experiences. 
              Currently specializing in <span className="font-semibold text-slate-900 dark:text-white">Cloud Architecture</span> and 
              the <span className="font-semibold text-slate-900 dark:text-white">MERN Stack</span>.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href="/VEMURI_PRINCE_TARUN.pdf" className="group flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-bold text-white transition hover:bg-cyan-500 dark:bg-white dark:text-slate-950 dark:hover:bg-cyan-400">
                <FiDownload className="transition group-hover:-translate-y-1" />
                Resume
              </a>
              <Link to="/" className="flex items-center gap-2 rounded-full border border-slate-200 px-6 py-3 text-sm font-bold transition hover:border-cyan-500 dark:border-white/10">
                <FiArrowLeft />
                Home
              </Link>
            </div>
          </GlassCard>

          <GlassCard className="flex flex-col justify-between">
            <div className="space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-tighter text-slate-400">Reach Me</h3>
              {CONTACT_ITEMS.map((item) => (
                <a key={item.label} href={item.href} className="group flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-600 group-hover:bg-cyan-500 group-hover:text-white transition-all">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500">{item.sub}</p>
                    <p className="text-sm font-semibold">{item.label}</p>
                  </div>
                </a>
              ))}
            </div>
            <div className="mt-8 flex gap-4 pt-6 border-t border-slate-200 dark:border-white/5">
              <a href="https://github.com/TARUN062005" target="_blank" rel="noreferrer" className="p-2 text-slate-400 hover:text-cyan-500 transition-colors"><FiGithub size={20}/></a>
              <a href="https://www.linkedin.com/in/vemuri-prince-tarun-9b8821326" target="_blank" rel="noreferrer" className="p-2 text-slate-400 hover:text-cyan-500 transition-colors"><FiLinkedin size={20}/></a>
            </div>
          </GlassCard>
        </div>

        {/* Expertise Section */}
        <section className="mt-24">
          <SectionHeader title="Technical Arsenal" subtitle="Technologies I use to bring ideas to life." />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {EXPERTISE.map((skill) => (
              <GlassCard key={skill.title} className={`group overflow-hidden relative border-none bg-gradient-to-br ${skill.color}`}>
                <div className="relative z-10">
                  <skill.icon size={24} className="mb-4 text-slate-700 dark:text-slate-200" />
                  <h3 className="text-xl font-bold mb-4">{skill.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map(i => (
                      <span key={i} className="text-xs font-medium px-2 py-1 bg-white/50 dark:bg-black/20 rounded-md">
                        {i}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="absolute -right-4 -bottom-4 opacity-10 transition-transform group-hover:scale-110">
                  <skill.icon size={100} />
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* Journey Timeline */}
        <section className="mt-24">
          <SectionHeader title="Professional Path" />
          <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent dark:before:via-slate-800 md:before:mx-auto md:before:translate-x-0">
            {TIMELINE.map((item, idx) => (
              <div key={idx} className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group`}>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white bg-slate-100 text-cyan-600 shadow-xl dark:border-slate-900 dark:bg-slate-800 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  <div className="h-2 w-2 rounded-full bg-current" />
                </div>
                <GlassCard className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)]">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-widest">{item.date}</span>
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">{item.title}</h4>
                  <p className="text-sm font-medium text-slate-500 mb-2">{item.company}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{item.desc}</p>
                </GlassCard>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <motion.section 
          whileHover={{ scale: 1.01 }}
          className="mt-24 overflow-hidden rounded-[2.5rem] bg-slate-900 px-8 py-16 text-center text-white dark:bg-cyan-950/30 dark:border dark:border-cyan-500/20"
        >
          <h2 className="text-3xl font-bold sm:text-5xl">Have a project in mind?</h2>
          <p className="mx-auto mt-6 max-w-2xl text-slate-400">
            I’m currently looking for new opportunities and collaborations. 
            Whether you have a question or just want to say hi, my inbox is always open.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-6">
            <a href="mailto:princetarunvemuri@gmail.com" className="flex items-center gap-2 rounded-full bg-cyan-500 px-8 py-4 font-bold text-slate-950 transition hover:bg-cyan-400">
              <FiMail /> Say Hello
            </a>
            <a href="https://www.linkedin.com/in/vemuri-prince-tarun-9b8821326" target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-full bg-white/10 px-8 py-4 font-bold backdrop-blur-sm transition hover:bg-white/20">
              <FiLinkedin /> LinkedIn <FiExternalLink size={14}/>
            </a>
          </div>
        </motion.section>
      </main>
    </div>
  )
}

export default memo(About)