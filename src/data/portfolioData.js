/**
 * Tech stack — Devicons CDN for real multi-color logos.
 * CDN base: https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/
 * Browse icons: https://devicon.dev
 *
 * `icon` = path after the base URL (folder/file.svg)
 */
export const techStack = [
  { name: 'React',       icon: 'react/react-original.svg' },
  { name: 'JavaScript',  icon: 'javascript/javascript-original.svg' },
  { name: 'TypeScript',  icon: 'typescript/typescript-original.svg' },
  { name: 'Python',      icon: 'python/python-original.svg' },
  { name: 'Node.js',     icon: 'nodejs/nodejs-original.svg' },
  { name: 'Next.js',     icon: 'nextjs/nextjs-original.svg' },
  { name: 'Tailwind',    icon: 'tailwindcss/tailwindcss-original.svg' },
  { name: 'Express',     icon: 'express/express-original.svg' },
  { name: 'MongoDB',     icon: 'mongodb/mongodb-original.svg' },
  { name: 'PostgreSQL',  icon: 'postgresql/postgresql-original.svg' },
  { name: 'Firebase',    icon: 'firebase/firebase-original.svg' },
  { name: 'Docker',      icon: 'docker/docker-original.svg' },
  { name: 'Git',         icon: 'git/git-original.svg' },
  { name: 'GitHub',      icon: 'github/github-original.svg' },
  { name: 'Figma',       icon: 'figma/figma-original.svg' },
  { name: 'HTML5',       icon: 'html5/html5-original.svg' },
  { name: 'CSS3',        icon: 'css3/css3-original.svg' },
  { name: 'Streamlit',   icon: 'streamlit/streamlit-original.svg' },
  { name: 'Postman',     icon: 'postman/postman-original.svg' },
  { name: 'AWS',         icon: 'amazonwebservices/amazonwebservices-plain-wordmark.svg' },
  { name: 'Java',        icon: 'java/java-original.svg' },
  { name: 'Flask',       icon: 'flask/flask-original.svg' },
  { name: 'Linux',       icon: 'linux/linux-original.svg' },
]

export const projects = [
  {
    title: 'AI vs. Human Academic Essay Authenticity',
    description:
      'A machine-learning based application that detects whether an academic essay is AI-generated or human-written.',
    bullets: [
      'Built a text-classification workflow for AI vs human writing.',
      'Focused on clear inference output for usability.',
      'Packaged as a practical project for academic integrity use-cases.',
    ],
    techStack: ['Python', 'Streamlit'],
    image: '/projects/pulseboard.svg',
    githubUrl: 'https://github.com/p4rz1v4l26/AI-vs.-Human-Academic-Essay-Authenticity-Challenge-',
    liveUrl: '',
  },
  {
    title: 'JobGramm',
    description:
      'A job platform where users explore listings, apply through a candidate dashboard, manage profiles, and track applications securely.',
    bullets: [
      'Built featured listings and detailed search flows.',
      'Implemented secure authentication and profile management.',
      'Added application tracking and cross-device-friendly UX.',
    ],
    techStack: ['React', 'Node.js', 'MongoDB', 'HTML5', 'CSS3'],
    image: '/projects/shipright.svg',
    githubUrl: 'https://github.com/p4rz1v4l26/JobGram_local',
    liveUrl: 'https://jobgramm.netlify.app/',
  },
  {
    title: 'ChatGenius',
    description:
      "An AI chatbot powered by OpenAI's ChatGPT for YouTube Live integrations, helping streamers improve audience engagement.",
    bullets: [
      'Integrated OpenAI-powered conversational responses.',
      'Designed it for streamer workflows and live audience interaction.',
      'Optimized for easy integration with chatbot tools.',
    ],
    techStack: ['Node.js', 'APIs'],
    image: '/projects/flowsync.svg',
    githubUrl: 'https://github.com/p4rz1v4l26/ChatGenius',
    liveUrl: '',
  },
]
