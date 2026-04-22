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
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    },
  }

  const skills = [
    { name: 'React & Next.js', level: 90 },
    { name: 'Node.js & Express', level: 85 },
    { name: 'Python & AI/ML', level: 80 },
    { name: 'Database Design', level: 85 },
    { name: 'Cloud & DevOps', level: 75 },
  ]

  return (
    <section
      id="about"
      ref={elementRef}
      className={`section-fade ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
    >
      <div className="flex justify-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={isVisible ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-2 flex justify-center">
            <span className="section-kicker">
              Who I Am
            </span>
          </div>
          <h2 className="section-title text-center">
            About Me
          </h2>
        </motion.div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className="glass-panel relative overflow-hidden p-6 sm:p-8"
      >
        {/* Animated background gradient */}
        <motion.div
          className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />

        <div className="relative">
          <motion.h3 
            variants={itemVariants}
            className="section-title text-center"
          >
            Crafting digital products with{' '}
            <span className="bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">
              intention
            </span>
            .
          </motion.h3>
          
          <motion.div variants={itemVariants} className="mt-6 flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 rounded-full bg-cyan-500/10 px-3 py-1">
              <FiCode className="h-3 w-3 text-cyan-500" />
              <span className="text-sm font-medium text-cyan-700 dark:text-cyan-300">Clean Code</span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1">
              <FiHeart className="h-3 w-3 text-emerald-500" />
              <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">User First</span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-purple-500/10 px-3 py-1">
              <FiUser className="h-3 w-3 text-purple-500" />
              <span className="text-sm font-medium text-purple-700 dark:text-purple-300">Team Player</span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-amber-500/10 px-3 py-1">
              <FiTrendingUp className="h-3 w-3 text-amber-500" />
              <span className="text-sm font-medium text-amber-700 dark:text-amber-300">Growth Mindset</span>
            </div>
          </motion.div>

          <motion.p 
            variants={itemVariants}
            className="section-body mt-6 max-w-4xl"
          >
            I am a <span className="font-semibold text-cyan-600 dark:text-cyan-400">Full Stack Developer</span> with a strong focus on clean architecture and resilient systems. 
            I enjoy translating business requirements into intuitive user interfaces and maintainable codebases. 
            My process blends product thinking, collaboration, and careful attention to quality so teams can ship confidently.
          </motion.p>
          
          <motion.p 
            variants={itemVariants}
            className="section-body mt-4 max-w-4xl"
          >
            Over the last few years, I have worked on dashboards, workflow platforms, and customer-facing applications 
            where performance and usability were equally important. I care deeply about writing code that scales with 
            both users and teams.
          </motion.p>

          {/* Skills Progress Bars */}
          <motion.div 
            variants={itemVariants}
            className="mt-8 space-y-4"
          >
            <h4 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-800 dark:text-white">
              <FiCoffee className="text-amber-500" />
              Technical Expertise
            </h4>
            {skills.map((skill) => (
              <div key={skill.name} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-slate-700 dark:text-slate-300">{skill.name}</span>
                  <span className="text-cyan-600 dark:text-cyan-400">{skill.level}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isVisible ? { width: `${skill.level}%` } : { width: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500"
                  />
                </div>
              </div>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div 
            variants={itemVariants}
            className="mt-8 flex flex-wrap justify-center gap-6 border-t border-slate-200 pt-6 dark:border-slate-700"
          >
            <div className="text-center">
              <p className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">3+</p>
              <p className="text-sm text-slate-500">Years Experience</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">15+</p>
              <p className="text-sm text-slate-500">Projects Completed</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">10+</p>
              <p className="text-sm text-slate-500">Happy Clients</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default About