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
    title: 'ResilientSOS: Fault-Tolerant Distributed Communication System',
    description:
      'An offline-first distributed platform handling zero-connectivity alerts with fault tolerance and consistency.',
    bullets: [
      'Engineered offline-first using PouchDB and background sync.',
      'Implemented chunked data transfer with atomic reassembly.',
      'Utilized Server-Sent Events (SSE) for real-time coordination (170+ concurrent requests).',
      'Integrated deduplication, caching, and rate limiting for high-stress scenarios.'
    ],
    techStack: ['JavaScript', 'PouchDB', 'Distributed Systems'],
    image: '/projects/pulseboard.svg',
    githubUrl: 'https://github.com/TARUN062005',
    liveUrl: '',
  },
  {
    title: 'AI-Enhanced Assignment Evaluation System',
    description:
      'A scalable platform bridging Java workflows with Python microservices for automated academic grading.',
    bullets: [
      'Built with Java (Servlets) and Python microservices.',
      'Integrated ML pipelines for plagiarism detection and context-aware evaluation.',
      'Designed hybrid architecture separating heavy AI workloads from application logic.',
    ],
    techStack: ['Java', 'Python', 'Machine Learning'],
    image: '/projects/shipright.svg',
    githubUrl: 'https://github.com/TARUN062005',
    liveUrl: '',
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
    githubUrl: 'https://github.com/TARUN062005/ChatGenius',
    liveUrl: '',
  },
]
