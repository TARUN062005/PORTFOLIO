// AboutPage.jsx - Ultra Premium Editorial Design
import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  FiArrowLeft, FiCode, FiCpu, FiTerminal, FiGlobe, 
  FiCommand, FiAward, FiBookOpen, FiBriefcase
} from 'react-icons/fi'

const education = [
  {
    degree: 'B.Tech in Computer Science (AI & ML)',
    school: 'Presidency University, Bengaluru',
    year: '2021 - 2025',
    desc: 'Specializing in Artificial Intelligence and Machine Learning, focusing on scalable algorithms and data models.'
  },
  {
    degree: 'Pre-University (Class XII)',
    school: 'Creative Public School and Jr. College, Pune',
    year: '2020',
    desc: 'Completed with a CGPA of 9.05. Strong foundation in mathematics and computer science.'
  },
  {
    degree: 'Secondary Education (Class X)',
    school: 'Shri Shivaji Vidyalaya, Beed',
    year: '2018',
    desc: 'Completed with a CGPA of 9.40. Active participant in science exhibitions and coding clubs.'
  }
]

const pillars = [
  { 
    title: 'Frontend Mastery', 
    icon: FiCode, 
    desc: 'Crafting buttery-smooth, pixel-perfect interfaces using React, Framer Motion, and Tailwind CSS.', 
    col: 'from-cyan-500/20 to-blue-500/20',
    text: 'text-cyan-400'
  },
  { 
    title: 'Backend Scalability', 
    icon: FiTerminal, 
    desc: 'Building resilient, secure, and fast APIs with Node.js, Express, and modern database architectures.', 
    col: 'from-emerald-500/20 to-teal-500/20',
    text: 'text-emerald-400'
  },
  { 
    title: 'AI Integration', 
    icon: FiCpu, 
    desc: 'Bridging the gap between complex machine learning models and intuitive user experiences.', 
    col: 'from-purple-500/20 to-pink-500/20',
    text: 'text-purple-400'
  }
]

const AboutPage = () => {
  const containerRef = useRef(null)
  
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])

  return (
    <main ref={containerRef} className="relative min-h-screen bg-[#020617] text-slate-200 selection:bg-cyan-500/30 overflow-hidden font-sans">
      {/* Cinematic Animated Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <motion.div 
          style={{ y: yBg }}
          className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-600/10 blur-[150px] rounded-full mix-blend-screen" 
        />
        <motion.div 
          style={{ y: yBg }}
          className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-600/10 blur-[150px] rounded-full mix-blend-screen" 
        />
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-24 lg:px-12 pt-32">
        
        {/* Navigation */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          <Link
            to="/"
            className="group inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors"
          >
            <div className="p-2 rounded-full bg-white/5 border border-white/10 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/30 transition-all">
              <FiArrowLeft className="transform group-hover:-translate-x-1 transition-transform" />
            </div>
            Back to Home
          </Link>
        </motion.div>

        {/* Hero Section */}
        <header className="mb-24">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-xs font-mono mb-8 backdrop-blur-sm"
          >
            <FiCommand className="animate-spin-slow" /> IDENTITY_MODULE.load(TARUN)
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl lg:text-8xl font-black tracking-tighter mb-6 leading-[1.1]"
          >
            Engineering <br className="hidden md:block"/>
            <span className="relative">
              <span className="absolute -inset-1 blur-xl bg-gradient-to-r from-cyan-400 to-emerald-400 opacity-30"></span>
              <span className="relative bg-gradient-to-r from-cyan-300 via-emerald-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                Digital Experiences.
              </span>
            </span>
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col md:flex-row gap-8 items-start md:items-center mt-12"
          >
            <p className="text-slate-400 text-lg md:text-xl max-w-2xl leading-relaxed">
              I am a Full Stack Developer blending strong architectural principles with obsessive attention to UI/UX detail. 
              I build products that look beautiful and perform brilliantly.
            </p>
            
            <div className="flex gap-4 shrink-0">
              <div className="text-center px-6 py-4 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-sm">
                <div className="text-3xl font-black text-white">3+</div>
                <div className="text-xs uppercase tracking-widest text-slate-500 mt-1">Years Coding</div>
              </div>
              <div className="text-center px-6 py-4 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-sm">
                <div className="text-3xl font-black text-white">15+</div>
                <div className="text-xs uppercase tracking-widest text-slate-500 mt-1">Projects</div>
              </div>
            </div>
          </motion.div>
        </header>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent mb-24"
        />

        {/* Philosophy & Approach Grid */}
        <div className="mb-24">
          <div className="flex items-center gap-3 mb-10">
            <FiAward className="text-cyan-400 text-xl" />
            <h2 className="text-2xl font-bold tracking-tight text-white">Core Pillars</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map((pillar, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className={`relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br ${pillar.col} border border-white/10 group hover:-translate-y-2 transition-transform duration-500`}
              >
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 group-hover:scale-150 transition-all duration-700">
                  <pillar.icon size={100} />
                </div>
                <div className={`p-4 rounded-2xl bg-black/20 inline-flex mb-6 backdrop-blur-sm border border-white/5 ${pillar.text}`}>
                  <pillar.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{pillar.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm">
                  {pillar.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Education Timeline */}
        <div className="mb-24">
          <div className="flex items-center gap-3 mb-12">
            <FiBookOpen className="text-cyan-400 text-xl" />
            <h2 className="text-2xl font-bold tracking-tight text-white">Educational Journey</h2>
          </div>

          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-700 before:to-transparent">
            {education.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#020617] bg-slate-800 text-slate-500 group-hover:text-cyan-400 group-hover:bg-slate-700 group-hover:border-cyan-500/30 transition-colors shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 absolute left-0 md:left-1/2 md:-translate-x-1/2 z-10">
                  <div className="w-2 h-2 bg-current rounded-full" />
                </div>
                
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-cyan-500/20 transition-all duration-300 ml-14 md:ml-0 backdrop-blur-sm">
                  <div className="flex flex-col gap-1 mb-2">
                    <span className="text-xs font-mono text-cyan-500 px-2 py-1 rounded bg-cyan-500/10 w-fit">{item.year}</span>
                    <h4 className="text-lg font-bold text-white mt-2">{item.degree}</h4>
                  </div>
                  <div className="text-sm font-medium text-slate-300 mb-3">{item.school}</div>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Global Presence Map or Contact Banner */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 to-black border border-white/10 p-10 md:p-16 text-center shadow-2xl"
        >
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-cyan-500/20 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-emerald-500/20 blur-[100px] rounded-full pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-center">
            <FiGlobe className="text-4xl text-cyan-400 mb-6" />
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">
              Ready to build something <br className="hidden md:block"/> extraordinary?
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto mb-10 text-lg">
              I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
            </p>
            <a 
              href="mailto:princetarunvemuri@gmail.com"
              className="px-8 py-4 rounded-full bg-white text-black font-bold text-sm tracking-wide hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] flex items-center gap-2"
            >
              Let's Talk <FiCommand />
            </a>
          </div>
        </motion.div>

      </div>
    </main>
  )
}

export default AboutPage
