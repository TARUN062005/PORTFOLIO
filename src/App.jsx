import { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage'
import About from './components/About'
import Loader from './components/Loader'
import NotFound from './components/NotFound'

const ProjectsPage = lazy(() => import('./components/ProjectsPage'))

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

  const handleLoaderComplete = useCallback(() => {
    setIsAppReady(true)
  }, [])

  const handleToggleTheme = useCallback(() => {
    setIsDarkMode((previous) => !previous)
  }, [])

  return (
    <BrowserRouter>
      {!isAppReady && <Loader onComplete={handleLoaderComplete} />}
      
      {isAppReady && (
        <div className="animate-[fadeIn_0.5s_ease-out_forwards]">
          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
          `}</style>
          <Routes>
            <Route path="/" element={<HomePage isDarkMode={isDarkMode} onToggleTheme={handleToggleTheme} />} />
            <Route
              path="/projects"
              element={
                <Suspense fallback={<div className="min-h-screen bg-stone-100 dark:bg-slate-950" />}>
                  <ProjectsPage isDarkMode={isDarkMode} onToggleTheme={handleToggleTheme} />
                </Suspense>
              }
            />
            <Route path="/about" element={<About isDarkMode={isDarkMode} onToggleTheme={handleToggleTheme} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      )}
    </BrowserRouter>
  )
}

export default App
