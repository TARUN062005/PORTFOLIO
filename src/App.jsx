import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage'
import ProjectsPage from './components/ProjectsPage'
import AboutPage from './components/AboutPage'
import Loader from './components/Loader'
import NotFound from './components/NotFound'

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('portfolio-theme')
    if (savedTheme) {
      return savedTheme === 'dark'
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })
  
  const [isAppReady, setIsAppReady] = useState(() => {
    const validPaths = ['/', '/projects', '/about']
    return !validPaths.includes(window.location.pathname)
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode)
    localStorage.setItem('portfolio-theme', isDarkMode ? 'dark' : 'light')
  }, [isDarkMode])

  useEffect(() => {
    if (isAppReady) {
      import('./data/portfolioData.js').then(({ projects }) => {
        projects.slice(2).forEach(p => {
          if (p.image) {
            const img = new Image()
            img.src = p.image
          }
        })
      }).catch(console.error)
    }
  }, [isAppReady])

  return (
    <BrowserRouter>
      {!isAppReady && <Loader onComplete={() => setIsAppReady(true)} />}
      
      {isAppReady && (
        <div className="animate-[fadeIn_0.5s_ease-out_forwards]">
          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
          `}</style>
          <Routes>
            <Route path="/" element={<HomePage isDarkMode={isDarkMode} onToggleTheme={() => setIsDarkMode((previous) => !previous)} />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      )}
    </BrowserRouter>
  )
}

export default App
