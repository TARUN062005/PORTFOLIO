import { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import HomePage from './components/HomePage'
import About from './components/About'
import Loader from './components/Loader'
import NotFound from './components/NotFound'

const ProjectsPage = lazy(() => import('./components/ProjectsPage'))

const SITE_URL = 'https://tarunvemuri.vercel.app'
const DEFAULT_IMAGE = `${SITE_URL}/web.png`

const routeMetadata = {
  '/': {
    title: 'VEMURI PRINCE TARUN | Software Engineer',
    description: 'Portfolio of VEMURI PRINCE TARUN, Full Stack Developer, AWS Cloud Enthusiast, and AI Developer.',
    ogType: 'website',
  },
  '/projects': {
    title: 'VEMURI PRINCE TARUN - PROJECTS',
    description: 'Selected projects by VEMURI PRINCE TARUN across full-stack, cloud, and AI development.',
    ogType: 'website',
  },
  '/about': {
    title: 'VEMURI PRINCE TARUN - ABOUT',
    description: 'About VEMURI PRINCE TARUN, a full-stack developer focused on cloud, systems, and product engineering.',
    ogType: 'website',
  },
}

const buildUrl = (path) => {
  if (path === '/' || !path) return SITE_URL
  return `${SITE_URL}${path}`
}

const upsertMetaTag = ({ name, property, content }) => {
  const selector = name ? `meta[name="${name}"]` : `meta[property="${property}"]`
  let tag = document.head.querySelector(selector)

  if (!tag) {
    tag = document.createElement('meta')
    if (name) tag.setAttribute('name', name)
    if (property) tag.setAttribute('property', property)
    document.head.appendChild(tag)
  }

  tag.setAttribute('content', content)
}

const upsertCanonical = (href) => {
  let link = document.head.querySelector('link[rel="canonical"]')
  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    document.head.appendChild(link)
  }
  link.setAttribute('href', href)
}

const upsertJsonLd = (data) => {
  const id = 'person-jsonld'
  let script = document.head.querySelector(`#${id}`)
  if (!script) {
    script = document.createElement('script')
    script.setAttribute('id', id)
    script.setAttribute('type', 'application/ld+json')
    document.head.appendChild(script)
  }
  script.textContent = JSON.stringify(data)
}

const removeJsonLd = () => {
  const script = document.head.querySelector('#person-jsonld')
  if (script) script.remove()
}

const SeoManager = () => {
  const location = useLocation()

  useEffect(() => {
    const { pathname } = location
    const meta = routeMetadata[pathname] ?? routeMetadata['/']
    const pageUrl = buildUrl(pathname)

    document.title = meta.title

    upsertMetaTag({ name: 'description', content: meta.description })
    upsertMetaTag({ property: 'og:title', content: meta.title })
    upsertMetaTag({ property: 'og:description', content: meta.description })
    upsertMetaTag({ property: 'og:type', content: meta.ogType })
    upsertMetaTag({ property: 'og:url', content: pageUrl })
    upsertMetaTag({ property: 'og:image', content: DEFAULT_IMAGE })

    upsertMetaTag({ name: 'twitter:card', content: 'summary_large_image' })
    upsertMetaTag({ name: 'twitter:title', content: meta.title })
    upsertMetaTag({ name: 'twitter:description', content: meta.description })
    upsertMetaTag({ name: 'twitter:image', content: DEFAULT_IMAGE })

    upsertCanonical(pageUrl)

    if (pathname === '/') {
      upsertJsonLd({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'VEMURI PRINCE TARUN',
        url: SITE_URL,
      })
    } else {
      removeJsonLd()
    }
  }, [location])

  return null
}

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
      <SeoManager />
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
