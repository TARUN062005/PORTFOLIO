import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'

const WELCOME_LINES = [
  '  ████████╗  █████╗  ██████╗  ██╗   ██╗ ███╗   ██╗',
  '  ╚══██╔══╝ ██╔══██╗ ██╔══██╗ ██║   ██║ ████╗  ██║',
  '     ██║    ███████║ ██████╔╝ ██║   ██║ ██╔██╗ ██║',
  '     ██║    ██╔══██║ ██╔══██║ ██║   ██║ ██║╚██╗██║',
  '     ██║    ██║  ██║ ██║  ██║ ╚██████╔╝ ██║ ╚████║',
  '     ╚═     ╚═╝  ╚═╝╚═╝  ╚═╝  ╚═════╝  ╚═╝  ╚═══╝',
  '',
  '> Initializing secure connection...',
  '> Welcome to Vemuri Prince Tarun Terminal.',
  '> Type "help" to begin exploration.',
  '------------------------------------------------',
]

const THEME_CONFIG = {
  dark: { bg: 'rgba(10, 15, 25, 0.92)', text: '#f8fafc', accent: '#38bdf8', border: 'rgba(56, 189, 248, 0.2)' },
  light: { bg: 'rgba(240, 244, 248, 0.92)', text: '#0f172a', accent: '#0284c7', border: 'rgba(14, 116, 144, 0.25)' },
  'blue-matrix': { bg: 'rgba(2, 10, 25, 0.95)', text: '#67e8f9', accent: '#22d3ee', border: 'rgba(34, 211, 238, 0.3)' },
  espresso: { bg: 'rgba(28, 18, 12, 0.95)', text: '#fef3c7', accent: '#f59e0b', border: 'rgba(245, 158, 11, 0.28)' },
  'green-goblin': { bg: 'rgba(6, 20, 12, 0.95)', text: '#bbf7d0', accent: '#22c55e', border: 'rgba(34, 197, 94, 0.3)' },
  ubuntu: { bg: 'rgba(48, 10, 36, 0.95)', text: '#ffffff', accent: '#e95420', border: 'rgba(233, 84, 32, 0.3)' },
}

const AboutSection = ({ variant = 'section' }) => {
  const isPage = variant === 'page'
  const navigate = useNavigate()
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { amount: 0.35 })
  const [history, setHistory] = useState([
    { type: 'command', content: 'startup' },
    ...WELCOME_LINES.map((line) => ({ type: 'output', content: line })),
  ])
  const [theme, setTheme] = useState('dark')
  const inputRef = useRef(null)
  const outputRef = useRef(null)
  const inputValueRef = useRef('')
  const commandHistoryRef = useRef([])
  const historyIndexRef = useRef(-1)

  // Strictly matched height for symmetry
  const CONTAINER_HEIGHT = 'h-[320px] sm:h-[360px] md:h-[420px] lg:h-[460px]'

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
  }, [history])

  const scrollToSection = useCallback((sectionId) => {
    const section = document.getElementById(sectionId)
    if (section) section.scrollIntoView({ behavior: 'smooth' })
  }, [])

  const commandHandlers = useMemo(() => ({
    help: (out) => out.push(
      'about          - about Sat Naing',
      'clear          - clear the terminal',
      'echo           - print out anything',
      'education      - my education background',
      'email          - send an email to me',
      'gui            - go to my about section in GUI',
      'help           - check available commands',
      'history        - view command history',
      "projects       - view projects that I've coded",
      '',
      'socials        - check out my social accounts',
      'themes         - check available themes',
      'welcome        - display hero section',
      'whoami         - about current user'
    ),
    about: (out) => out.push(
      'Hello, I am VEMURI PRINCE TARUN!.',
      "I'm a passionate Full-Stack Developer, Tech Enthusiast, and aspiring Cloud Engineer from Andhra Pradesh.",
      'My journey in tech began during my diploma studies when I discovered my love for building things that solve real-world problems.',
      "Currently pursuing my B.Tech in Computer Science Engineering with a CGPA of 9.20%, I've gained hands-on experience in Salesforce development and full-stack web applications through internships and personal projects.",
      'I specialize in building scalable applications using modern technologies like React.js, Node.js, MongoDB, and Salesforce.',
      'My approach combines technical expertise with a user-focused mindset to create efficient and innovative solutions.'
    ),
    home: (out) => { out.push('Loading home...', 'Loaded.'); scrollToSection('home') },
    'tech-stack': (out) => { out.push('Loading tech stack...', 'Loaded.'); scrollToSection('tech-stack') },
    projects: (out) => { out.push('Loading projects...', 'Loaded.'); scrollToSection('projects') },
    socials: (out) => { out.push('Loading socials...', 'Loaded.'); scrollToSection('social') },
    contact: (out) => { out.push('Loading contact...', 'Loaded.'); scrollToSection('contact') },
    email: (out) => { out.push('Opening email...'); window.location.href = 'mailto:princetarunvemuri@gmail.com' },
    gui: (out) => { out.push('Opening /about...'); navigate('/about') },
    themes: (out) => out.push('dark', 'light', 'blue-matrix', 'espresso', 'green-goblin', 'ubuntu', 'Use: themes set <theme-name>'),
    welcome: (out) => out.push(...WELCOME_LINES),
    history: (out) => {
      const items = history.filter((item) => item.type === 'command').map((item) => item.content)
      if (!items.length) {
        out.push('No commands yet.')
        return
      }
      items.forEach((item, index) => out.push(`${index + 1}. ${item}`))
    },
    whoami: (out) => out.push('visitor'),
    education: (out) => out.push('B.Tech in Computer Science and Engineering - LBRCE (2024 - 2027)', 'Diploma in Computer Engineering - AANM & VVRSR (2021 - 2024)'),
    echo: (out, args) => out.push(args || ''),
    clear: () => {},
  }), [history, navigate, scrollToSection])

  const handleCommand = (raw) => {
    const trimmed = raw.trim()
    if (!trimmed) return
    const [base, ...args] = trimmed.toLowerCase().split(' ')
    const next = [{ type: 'command', content: trimmed }]

    commandHistoryRef.current.push(trimmed)
    historyIndexRef.current = commandHistoryRef.current.length
    
    if (base === 'clear') {
      setHistory([])
      return
    }

    if (base === 'themes' && args[0] === 'set') {
      const targetTheme = args.slice(1).join(' ').trim()
      if (THEME_CONFIG[targetTheme]) {
        setTheme(targetTheme)
        next.push({ type: 'output', content: `Theme set to ${targetTheme}.` })
      } else {
        next.push({ type: 'output', content: 'Theme not found.' })
      }
      setHistory(prev => [...prev, ...next])
      return
    }
    
    const handler = commandHandlers[base]
    if (handler) {
      const out = []
      handler(out, args.join(' '))
      out.forEach(l => next.push({ type: 'output', content: l }))
    } else {
      next.push({ type: 'output', content: `Error: Unknown command "${base}".` })
    }
    setHistory(prev => [...prev, ...next])
  }

  const currentTheme = THEME_CONFIG[theme] || THEME_CONFIG.dark

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleCommand(inputValueRef.current)
      event.target.value = ''
      inputValueRef.current = ''
      return
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      if (!commandHistoryRef.current.length) return
      historyIndexRef.current = Math.max(historyIndexRef.current - 1, 0)
      const value = commandHistoryRef.current[historyIndexRef.current] || ''
      if (inputRef.current) {
        inputRef.current.value = value
      }
      inputValueRef.current = value
      return
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      if (!commandHistoryRef.current.length) return
      historyIndexRef.current = Math.min(
        historyIndexRef.current + 1,
        commandHistoryRef.current.length
      )
      const value = commandHistoryRef.current[historyIndexRef.current] || ''
      if (inputRef.current) {
        inputRef.current.value = value
      }
      inputValueRef.current = value
    }
  }

  return (
    <section ref={sectionRef} id="about" className={`relative w-full overflow-hidden flex flex-col items-center justify-center ${isPage ? 'pt-24 pb-14' : 'py-10 md:py-16'}`}>
      <style>{`
        .custom-terminal-scroll::-webkit-scrollbar { width: 3px; }
        .custom-terminal-scroll::-webkit-scrollbar-track { background: transparent; }
        .custom-terminal-scroll::-webkit-scrollbar-thumb { 
          background: ${currentTheme.accent}30; 
          border-radius: 4px; 
        }
        .custom-terminal-scroll:hover::-webkit-scrollbar-thumb { background: ${currentTheme.accent}60; }
      `}</style>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 w-full">
        {/* CENTERED HEADER */}
        <div className="mb-10 text-center">
          <h2 className="section-title">
            About Me
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.45fr_0.75fr] lg:items-center">
          
          {/* TERMINAL INTERFACE */}
          <motion.div 
            initial={false}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className={`relative flex flex-col overflow-hidden rounded-2xl border ${CONTAINER_HEIGHT} shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-md transition-colors duration-300`}
            style={{ backgroundColor: currentTheme.bg, borderColor: currentTheme.border }}
          >
            {/* Header Bar */}
            <div className="flex items-center justify-between bg-black/40 px-5 py-3 border-b border-white/5">
              <div className="flex gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-red-500/50" />
                <div className="h-2.5 w-2.5 rounded-full bg-amber-500/50" />
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/50" />
              </div>
              <span className="font-mono text-[9px] text-white/30 uppercase tracking-[0.2em]">root@tarun_terminal</span>
            </div>

            {/* Scrollable Output */}
            <div 
              ref={outputRef}
              className="custom-terminal-scroll flex-1 overflow-y-auto overflow-x-hidden p-5 sm:p-6 font-mono text-[11px] sm:text-[14px] leading-relaxed"
              style={{ color: currentTheme.text }}
            >
              {history.map((line, i) => (
                <div key={`${line.type}-${i}`} className="mb-2 break-words">
                  {line.type === 'command' ? (
                    <div className="flex flex-wrap items-start gap-2">
                      <span style={{ color: currentTheme.accent }} className="font-bold break-all text-[10px] sm:text-[13px]">visitor@terminal.tarun.dev:~$</span>
                      <span className="min-w-0 break-words font-medium text-[11px] sm:text-[14px]">{line.content}</span>
                    </div>
                  ) : (
                    <div className="opacity-80 whitespace-pre-wrap leading-relaxed">{line.content}</div>
                  )}
                </div>
              ))}

              {/* Input Prompt */}
              <div className="mt-3 flex flex-wrap items-start gap-2">
                <span style={{ color: currentTheme.accent }} className="font-bold break-all text-[10px] sm:text-[13px]">visitor@terminal.tarun.dev:~$</span>
                <input
                  ref={inputRef}
                  onChange={(e) => (inputValueRef.current = e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="min-w-0 flex-1 bg-transparent border-none text-[11px] sm:text-[14px] text-white outline-none focus:ring-0"
                  autoComplete="off"
                  spellCheck={false}
                />
              </div>
            </div>
          </motion.div>

          {/* IMAGE BOX - SYMMETRICAL HEIGHT */}
          <motion.div 
            initial={false}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className={`relative group overflow-hidden rounded-2xl border border-white/10 ${CONTAINER_HEIGHT} shadow-[0_20px_50px_rgba(0,0,0,0.5)]`}
          >
            <img 
              src="/profile.jpg" 
              alt="Vemuri Prince Tarun" 
              className="h-full w-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
            />
            {/* Visual Glass Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/10 to-transparent opacity-95" />
            
            {/* Branding Info */}
            <div className="absolute bottom-8 left-8">
              <div className="h-1 w-12 bg-cyan-500 mb-4" />
              <p className="font-mono text-[10px] text-cyan-400/80 tracking-widest mb-1 italic">DEVELOPER_PROFILE</p>
              <h3 className="font-mono text-2xl md:text-3xl font-bold text-white tracking-tighter uppercase">
                Vemuri Prince Tarun
              </h3>
            </div>

            {/* Micro-Interaction status */}
            <div className="absolute top-6 right-6 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
              <div className="h-1.5 w-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
              <span className="font-mono text-[9px] text-white/60 tracking-wider">SYSTEM_READY</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

export default memo(AboutSection)