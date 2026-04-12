// AboutPage.jsx - Premium Bento Grid Design
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  FiCode, FiCpu, FiTerminal, FiGlobe, FiCommand
} from 'react-icons/fi'

const journey = [
  {
    institution: 'Shri Shivaji Vidyalaya, Beed',
    duration: 'Secondary Education',
    description: 'Completed secondary education with a CGPA of 9.40.',
    year: '2018',
    icon: '🎓',
  },
  {
    institution: 'Creative Public School and Jr. College, Pune',
    duration: 'Pre-University',
    description: 'Completed pre-university education with a CGPA of 9.05.',
    year: '2020',
    icon: '📚',
  },
  {
    institution: 'Presidency University, Bengaluru',
    duration: 'B.Tech · In Progress',
    description: 'Computer Science and Technology with specialization in AI & ML.',
    year: '2021-2025',
    icon: '💻',
  },
]

const pillars = [
  { 
    title: 'AI & Data', 
    icon: FiCpu, 
    desc: 'Model deployment & ML Pipelines.', 
    color: 'text-purple-400',
    bgGradient: 'from-purple-500/10 to-pink-500/10'
  },
  { 
    title: 'Frontend', 
    icon: FiCode, 
    desc: 'Framer Motion & Pixel perfection.', 
    color: 'text-cyan-400',
    bgGradient: 'from-cyan-500/10 to-blue-500/10'
  },
  { 
    title: 'Backend', 
    icon: FiTerminal, 
    desc: 'Node.js & Resilient Architecture.', 
    color: 'text-emerald-400',
    bgGradient: 'from-emerald-500/10 to-teal-500/10'
  }
]

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [])
  
  const [hoveredStat, setHoveredStat] = useState(null)

  return (
    <main className="min-h-screen bg-[#020617] text-slate-200 selection:bg-cyan-500/30 overflow-hidden">
      {/* Cinematic Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-emerald-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-12">
        {/* Header: Minimal & Bold */}
        <header className="mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 text-xs font-mono mb-6"
          >
            <FiCommand className="animate-spin-slow" /> system.vitals_load(TARUN)
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl lg:text-7xl font-black tracking-tighter mb-4"
          >
            Engineering with <br />
            <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              Precision & Empathy.
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg max-w-2xl"
          >
            Full Stack engineer specializing in AI/ML integration and seamless user experiences.
          </motion.p>
        </header>

        {/* The Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          
          {/* Main Terminal Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="md:col-span-8 group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md hover:border-cyan-500/30 transition-all duration-300"
            whileHover={{ borderColor: 'rgba(34,211,238,0.3)' }}
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
              </div>
              <span className="text-xs font-mono text-slate-500 ml-4">tarun_profile.sh</span>
            </div>
            
            <p className="text-xl lg:text-2xl leading-relaxed text-slate-300">
              I'm a <span className="text-white font-semibold">Full Stack Engineer</span> specializing in 
              bridging the gap between <span className="text-cyan-400">complex AI models</span> and 
              <span className="text-emerald-400"> seamless user experiences</span>. 
              My philosophy is simple: if the code is clean but the UX is frustrating, the project isn't finished.
            </p>
          </motion.div>

          {/* Quick Stats - Interactive Orbit */}
          <div className="md:col-span-4 grid grid-cols-2 gap-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              onHoverStart={() => setHoveredStat('shipped')}
              onHoverEnd={() => setHoveredStat(null)}
              className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col justify-center items-center group hover:bg-cyan-500/10 hover:border-cyan-500/30 transition-all duration-300"
            >
              <span className="text-3xl font-bold text-white group-hover:scale-110 transition-transform">15+</span>
              <span className="text-[10px] uppercase tracking-widest text-cyan-500 mt-2">Shipped</span>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              onHoverStart={() => setHoveredStat('exp')}
              onHoverEnd={() => setHoveredStat(null)}
              className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col justify-center items-center group hover:bg-emerald-500/10 hover:border-emerald-500/30 transition-all duration-300"
            >
              <span className="text-3xl font-bold text-white group-hover:scale-110 transition-transform">3Y</span>
              <span className="text-[10px] uppercase tracking-widest text-emerald-500 mt-2">Exp</span>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="col-span-2 bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 border border-white/10 rounded-3xl p-6 relative overflow-hidden hover:border-white/20 transition-all duration-300"
            >
              <FiGlobe className="absolute -right-4 -bottom-4 text-7xl opacity-10 rotate-12" />
              <p className="text-sm font-medium">Based in Bengaluru</p>
              <p className="text-[10px] text-slate-400">UTC+5:30</p>
            </motion.div>
          </div>

          {/* Core Pillars - Visual Cards */}
          {pillars.map((pillar, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 + i * 0.05 }}
              className={`md:col-span-4 bg-gradient-to-br ${pillar.bgGradient} border border-white/10 rounded-3xl p-8 hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300 group`}
              whileHover={{ y: -5 }}
            >
              <pillar.icon className={`text-3xl ${pillar.color} mb-4 group-hover:scale-110 transition-transform`} />
              <h3 className="text-lg font-bold mb-2 text-white">{pillar.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{pillar.desc}</p>
            </motion.div>
          ))}

          {/* The "Experience" Timeline */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="md:col-span-12 mt-12"
          >
            <h2 className="text-sm font-mono text-cyan-500 mb-8 flex items-center gap-2">
              <FiCode /> EDUCATION_HISTORY
            </h2>
            <div className="flex flex-col lg:flex-row gap-6">
              {journey.map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex-1 relative pl-8 border-l border-white/10 group hover:border-cyan-500/30 transition-colors"
                >
                  <motion.div 
                    className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-white/20 group-hover:bg-cyan-500 transition-colors"
                    whileHover={{ scale: 1.2 }}
                  />
                  <span className="text-[10px] font-mono text-slate-500">{item.year}</span>
                  <h4 className="text-md font-bold text-white mt-1">{item.institution}</h4>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-2">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Back to Home Link */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="md:col-span-12 mt-8 flex justify-center"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 font-semibold text-sm"
            >
              ← Back to Home
            </Link>
          </motion.div>
        </div>
      </div>
    </main>
  )
}

export default AboutPage
