import { motion } from 'framer-motion'
import useRevealOnScroll from '../hooks/useRevealOnScroll'
import { FiUser, FiCode, FiHeart, FiCoffee, FiTrendingUp } from 'react-icons/fi'

const About = () => {
  const { elementRef, isVisible } = useRevealOnScroll()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
    },
  }

  const highlights = [
    { icon: FiCode, label: 'Clean Code', color: 'cyan' },
    { icon: FiHeart, label: 'User First', color: 'emerald' },
    { icon: FiUser, label: 'Team Player', color: 'purple' },
    { icon: FiTrendingUp, label: 'Growth Mindset', color: 'amber' },
  ]

  return (
    <section
      id="about"
      ref={elementRef}
      className={`w-full py-20 px-6 md:px-12 lg:px-20 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      {/* HEADER */}
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={isVisible ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="section-kicker">Who I Am</span>
          <h2 className="section-title mt-2">About Me</h2>
        </motion.div>
      </div>

      {/* MAIN CONTAINER */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        className="mt-10 max-w-6xl mx-auto rounded-2xl border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-white/[0.04] backdrop-blur-md p-6 sm:p-10"
      >
        {/* TITLE */}
        <motion.h3
          variants={itemVariants}
          className="text-center text-xl sm:text-2xl font-semibold text-slate-800 dark:text-white"
        >
          Crafting digital products with{' '}
          <span className="bg-gradient-to-r from-cyan-500 to-emerald-500 bg-clip-text text-transparent">
            intention
          </span>
        </motion.h3>

        {/* HIGHLIGHTS */}
        <motion.div
          variants={itemVariants}
          className="mt-6 flex flex-wrap justify-center gap-3"
        >
          {highlights.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10"
            >
              <item.icon className="w-3.5 h-3.5 text-cyan-500" />
              <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
                {item.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* CONTENT */}
        <motion.div
          variants={itemVariants}
          className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start"
        >
          {/* LEFT TEXT */}
          <div className="space-y-5 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            <p>
              I am a <span className="font-semibold text-cyan-600 dark:text-cyan-400">Full Stack Developer</span> focused on building scalable,
              maintainable, and high-performance systems.
            </p>

            <p>
              I design clean architectures, build efficient APIs, and create responsive interfaces
              that deliver reliable user experiences across platforms.
            </p>

            <p>
              My approach combines system design, performance optimization, and
              practical product thinking to build solutions that scale.
            </p>
          </div>

          {/* RIGHT STATS */}
          <div className="grid grid-cols-2 gap-5">
            {[
              { value: '3+', label: 'Years Experience' },
              { value: '15+', label: 'Projects Built' },
              { value: '10+', label: 'Technologies' },
              { value: '100%', label: 'Commitment' },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-xl border border-slate-200 dark:border-white/10 p-5 text-center bg-white dark:bg-white/[0.03]"
              >
                <p className="text-2xl font-bold text-cyan-500">{item.value}</p>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* REMOVED: Skills Progress Bars (bad UX here) */}

      </motion.div>
    </section>
  )
}

export default About