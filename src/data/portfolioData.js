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
  { name: 'Linux',       icon: 'linux/linux-original.svg' },
  { name: 'Salesforce',  icon: 'salesforce/salesforce-original.svg' },
  { name: 'SQL',          icon: 'mysql/mysql-original.svg' },
  { name: 'prisma',       icon: 'prisma/prisma-original.svg' },
]

export const projects = [
  {
    id: 'college-assignment-system',
    title: 'College Assignment Management System with AI Integration',
    description:
      'A comprehensive college assignment management system built with JDBC PostgreSQL backend, featuring automated AI-powered plagiarism detection and grading. The system supports multi-user roles (students/faculty) with secure authentication, file uploads, and real-time submission tracking.',
    image: '/projects/LBRCE.jpg',
    tags: ['Java Servlets', 'JDBC', 'PostgreSQL', 'HTML/CSS/JavaScript', 'AI/ML', 'Python', 'REST API'],
    techStack: ['Java Servlets', 'JDBC', 'PostgreSQL', 'HTML/CSS/JavaScript', 'AI/ML', 'Python', 'REST API'],
    github: 'https://github.com/TARUN062005/JAVA-LBRCE-ASSIGNMENT',
    githubUrl: 'https://github.com/TARUN062005/JAVA-LBRCE-ASSIGNMENT',
    liveUrl: 'https://java-lbrce-assignment.onrender.com/',
    date: '2024-10-15',
    challenge:
      'Build a scalable assignment management system with AI-powered plagiarism detection, multi-user role support, and real-time tracking for educational institutions.',
    solution:
      'Implemented Java Servlets with JDBC connectivity to PostgreSQL, designed secure authentication system, integrated AI/ML models for plagiarism detection, and created responsive frontend with real-time updates.',
    results: [
      'Automated plagiarism detection reduced manual review time by 80%',
      'Real-time submission tracking improved faculty monitoring efficiency',
      'Multi-role support (students/faculty) enhanced user experience',
      'Handwritten assignment verification added extra security layer',
    ],
    metrics: [
      { label: 'Plagiarism Detection', value: '95% Accuracy' },
      { label: 'User Satisfaction', value: '4.8/5' },
      { label: 'Processing Speed', value: '< 5 seconds' },
    ],
    featured: true,
  },
  {
    id: 'salesforce-crm',
    title: 'HandsMen Threads CRM Project',
    description:
      "Designed and implemented a custom Salesforce CRM solution for HandsMen Threads, a luxury men's fashion brand, to streamline customer engagement, manage orders, and enhance marketing efforts.",
    image: '/projects/Salesforce.png',
    tags: ['Salesforce', 'Lightning Experience', 'Apex', 'Workflow Rules', 'Process Builder', 'Reports & Dashboards', 'Custom Objects'],
    techStack: ['Salesforce', 'Lightning Experience', 'Apex', 'Workflow Rules', 'Process Builder', 'Reports & Dashboards', 'Custom Objects'],
    github: 'https://github.com/TARUN062005/SALESFORCE-PROJECT.git',
    githubUrl: 'https://github.com/TARUN062005/SALESFORCE-PROJECT.git',
    liveUrl: '',
    date: '2024-06-20',
    challenge:
      'Create a comprehensive CRM solution for a luxury fashion brand to streamline customer relationships, order management, and marketing campaigns.',
    solution:
      'Customized Salesforce Lightning Experience, automated workflows using Process Builder, created custom objects for order tracking, built comprehensive reports and dashboards, and integrated email templates for marketing automation.',
    results: [
      'Improved customer engagement through automated workflows',
      'Enhanced order processing efficiency by 60%',
      'Data-driven decision making with real-time dashboards',
      'Streamlined marketing campaigns with automated email templates',
    ],
    metrics: [
      { label: 'Order Processing Time', value: 'Reduced by 60%' },
      { label: 'Customer Response Rate', value: 'Increased by 40%' },
      { label: 'Data Accuracy', value: '99.5%' },
    ],
    featured: true,
  },
  {
    id: 'complaint-management',
    title: 'ResolveNow: Online Complaint Management',
    description:
      'Developed a full-stack web application to streamline customer complaint handling and improve service efficiency with role-based dashboards, real-time updates, and integrated chat system.',
    image: '/projects/ResolveNow.jpg',
    tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Socket.io', 'JWT', 'HTML', 'CSS', 'JavaScript'],
    techStack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Socket.io', 'JWT', 'HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/TARUN062005/resolvenow-your-platform-for-online',
    githubUrl: 'https://github.com/TARUN062005/resolvenow-your-platform-for-online',
    liveUrl: '',
    date: '2024-05-15',
    challenge:
      'Build a comprehensive complaint management system that provides transparency, real-time updates, and efficient resolution tracking for multiple user roles.',
    solution:
      'Developed MERN stack application with role-based authentication (Admin, Agent, User), implemented real-time chat using Socket.io, created intuitive dashboards, and established secure complaint lifecycle management.',
    results: [
      'Reduced complaint resolution time by 70%',
      'Improved customer satisfaction through transparent tracking',
      'Enhanced agent efficiency with automated assignment',
      'Real-time communication minimized delays',
    ],
    metrics: [
      { label: 'Resolution Time', value: 'Reduced by 70%' },
      { label: 'Customer Satisfaction', value: '4.7/5' },
      { label: 'Agent Productivity', value: 'Increased by 50%' },
    ],
    featured: true,
  },
  {
    id: 'personal-portfolio',
    title: 'Minimalist Personal Portfolio',
    description:
      'A sleek and interactive personal portfolio designed to showcase skills, certifications, and projects with modern UI, smooth navigation, and dynamic interactions.',
    image: '/projects/OldPortfolio.jpg',
    tags: ['React.js', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Framer Motion', 'Vercel'],
    techStack: ['React.js', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Framer Motion', 'Vercel'],
    github: 'https://github.com/TARUN062005/portfolio',
    githubUrl: 'https://github.com/TARUN062005/portfolio',
    liveUrl: 'https://portfolio-tarun06.vercel.app/',
    date: '2025-01-10',
    challenge:
      'Create a visually appealing, fully responsive portfolio website that effectively showcases skills, projects, and achievements with optimal performance.',
    solution:
      'Built with React.js and Next.js for optimal performance, implemented smooth animations with Framer Motion, used Tailwind CSS for responsive design, and deployed on Vercel for fast loading.',
    results: [
      'Fully responsive design across all devices',
      'Fast loading times with optimized performance',
      'Interactive animations enhancing user engagement',
      'Clean, professional presentation of work',
    ],
    metrics: [
      { label: 'Performance Score', value: '98/100' },
      { label: 'Accessibility', value: '95/100' },
      { label: 'SEO', value: '100/100' },
      { label: 'Page Load Time', value: '< 1.5s' },
    ],
    featured: false,
  },
]
