import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import GreetingBanner from './components/GreetingBanner'
import HomePage from './components/HomePage'
import ProjectsPage from './components/ProjectsPage'
import AboutPage from './components/AboutPage'

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('portfolio-theme')
    if (savedTheme) {
      return savedTheme === 'dark'
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode)
    localStorage.setItem('portfolio-theme', isDarkMode ? 'dark' : 'light')
  }, [isDarkMode])

  useEffect(() => {
    const avatar = new Image()
    avatar.src = '/profile-avatar.svg'
  }, [])

  return (
    <BrowserRouter>
      <GreetingBanner />
      <Routes>
        <Route path="/" element={<HomePage isDarkMode={isDarkMode} onToggleTheme={() => setIsDarkMode((previous) => !previous)} />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
