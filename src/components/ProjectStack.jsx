import { useEffect, useRef, useState } from 'react'
import { FiExternalLink, FiGithub } from 'react-icons/fi'

const MobileProjectStack = ({ projects }) => {
  return (
    <div className="mobile-stack">
      <style>{`
        .mobile-stack {
            padding-bottom: 0;
            padding-top: calc(var(--header-height, 56px) + var(--header-gap, 24px));
            flex: 1;
            display: flex;
            flex-direction: column;
        }

        .mobile-stack-list {
          width: min(100%, 420px);
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .mobile-card {
          position: sticky;
          top: var(--card-top, 144px);
          z-index: 1;
          height: var(--mobile-card-height, 350px);
          max-width: 420px;
          margin-bottom: var(--card-gap, 96px);
          border-radius: 20px;
          overflow: hidden;
          clip-path: inset(0 round 18px);
          background: #0a0f1e;
          border: 1px solid rgba(255,255,255,0.1);
          box-shadow: 0 -10px 30px rgba(0,0,0,0.5);
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }

        .mobile-card:nth-child(1) { z-index: 1; }
        .mobile-card:nth-child(2) { z-index: 2; }
        .mobile-card:nth-child(3) { z-index: 3; }
        .mobile-card:last-child { margin-bottom: var(--post-stack-buffer, 64px); }

        .mobile-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 25px 50px rgba(0,0,0,0.35);
        }

        .mobile-card-inner {
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .mobile-media {
          height: 180px;
          background-size: cover;
          background-position: center;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        .mobile-content {
          padding: 16px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          flex: 1;
          gap: 10px;
        }

        .mobile-title {
          color: #edb899;
          font-weight: 900;
          font-size: 1rem;
        }

        .mobile-desc {
          color: #e2e8f0;
          font-size: 0.8rem;
          line-height: 1.5;
        }

        .mobile-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 10px;
          gap: 10px;
          flex-wrap: wrap;
        }

        .mobile-tech {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }

        .mobile-pill {
          font-size: 10px;
          padding: 4px 8px;
          border-radius: 999px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.1);
        }

        .mobile-actions {
          display: flex;
          gap: 8px;
        }

        .mobile-btn {
          height: 34px;
          padding: 0 12px;
          border-radius: 999px;
          font-size: 0.7rem;
          display: flex;
          align-items: center;
          gap: 6px;
          border: 1px solid rgba(148,163,184,0.4);
          background: rgba(15,23,42,0.9);
        }

        .mobile-btn-demo {
          border-color: rgba(16,185,129,0.6);
        }

        @media (max-width: 480px) {
          .mobile-stack {
            position: relative;
            width: 100%;
          }

          .mobile-stack-list {
            padding-top: 0;
            gap: 0;
          }

          .mobile-card {
            margin-bottom: var(--card-gap, 96px);
            height: var(--mobile-card-height, 340px);
          }
          
          .mobile-card:last-child {
            margin-bottom: var(--post-stack-buffer, 64px);
          }

          .mobile-media {
            height: 150px;
          }

          .mobile-content {
            padding: 14px;
          }

          .mobile-title {
            font-size: 0.9rem;
          }

          .mobile-desc {
            font-size: 0.72rem;
          }
        }
      `}</style>

      <div className="mobile-stack-list">
        {projects.map((project) => (
          <div
            key={project.title}
            className="mobile-card"
          >
            <div className="mobile-card-inner">
              <div
                className="mobile-media"
                style={{ backgroundImage: `url(${project.image})` }}
              />

              <div className="mobile-content">
                <h3 className="mobile-title">{project.title}</h3>
                <p className="mobile-desc">{project.description}</p>

                <div className="mobile-footer">
                  <div className="mobile-tech">
                    {project.techStack?.slice(0, 3).map((tech) => (
                      <span key={tech} className="mobile-pill">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mobile-actions">
                    <a href={project.githubUrl} target="_blank" className="mobile-btn">
                      <FiGithub size={13} /> GitHub
                    </a>

                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" className="mobile-btn mobile-btn-demo">
                        <FiExternalLink size={13} /> Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const ProjectStack = ({ projects }) => {
  const [hoveredIndex, setHoveredIndex] = useState(0)
  const hoverTimerRef = useRef(null)
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') {
      return false
    }

    return window.innerWidth <= 768
  })

  useEffect(() => {
    const updateViewport = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    updateViewport()
    window.addEventListener('resize', updateViewport)

    return () => window.removeEventListener('resize', updateViewport)
  }, [])

  if (!projects || projects.length < 2) return null

  if (isMobile) {
    return <MobileProjectStack projects={projects.slice(0, 3)} />
  }

  const orderedProjects = [
    { project: projects[hoveredIndex], sourceIndex: hoveredIndex },
    { project: projects[(hoveredIndex + 1) % 3], sourceIndex: (hoveredIndex + 1) % 3 },
    { project: projects[(hoveredIndex + 2) % 3], sourceIndex: (hoveredIndex + 2) % 3 },
  ]

  return (
    <div className="uiverse-stack-wrapper">
      <style>{`
        .uiverse-stack-wrapper {
          position: relative;
          width: 100%;
          max-width: 1000px;
          height: auto;
          min-height: 420px;
          margin: 20px auto 0;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .uiverse-stack-wrapper .stack-area {
          position: relative;
          width: 100%;
          max-width: 900px;
          height: 380px;
          margin: 0 auto;
        }

        .uiverse-stack-wrapper .project-card {
          position: absolute;
          width: 100%;
          height: 100%;
          left: 50%;
          border-radius: 20px;
          transition: all 1.05s cubic-bezier(0.16, 1, 0.3, 1);
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 10px 10px 30px rgba(0, 0, 0, 0.3);
          cursor: pointer;
          will-change: transform;
          transform-style: preserve-3d;
          backface-visibility: hidden;
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.06) 0%,
            rgba(0, 0, 0, 0.4) 100%
          );
        }

        .dark .uiverse-stack-wrapper .project-card {
          border: 1px solid rgba(255, 255, 255, 1);
        }

        .uiverse-stack-wrapper .project-card[data-index='2'] {
          z-index: 1;
          top: -60px;
          transform: translateX(calc(-50% - 40px)) rotateZ(-8deg);
          filter: brightness(0.5);
        }

        .uiverse-stack-wrapper .project-card[data-index='1'] {
          z-index: 2;
          top: -30px;
          transform: translateX(calc(-50% - 20px)) rotateZ(-8deg);
          filter: brightness(0.7);
        }

        .uiverse-stack-wrapper .project-card[data-index='0'] {
          z-index: 3;
          top: 0;
          transform: translateX(-50%) rotateZ(-8deg);
        }

        .uiverse-stack-wrapper .project-card.active {
          z-index: 10 !important;
          top: 0 !important;
          left: 50% !important;
          transform: translate(0, 0) translateX(-50%) scale(1.06) rotateZ(0deg) !important;
          filter: brightness(1) !important;
          box-shadow:
            0 30px 60px rgba(0, 0, 0, 0.6),
            0 0 0 1px rgba(34, 211, 238, 0.25);
        }

        .uiverse-stack-wrapper .card-layout {
          display: flex;
          width: 100%;
          height: 100%;
        }

        .uiverse-stack-wrapper .card-media {
          width: 45%;
          height: 100%;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          border-left: 1px solid rgba(255, 255, 255, 0.12);
          filter: brightness(0.85) contrast(1.05);
        }

        .dark .uiverse-stack-wrapper .card-media {
          border-left: 1px solid rgba(255, 255, 255, 1);
        }

        .uiverse-stack-wrapper .card-details {
          width: 55%;
          height: 100%;
          padding: 24px;
          background: rgba(0, 0, 0, 0.9);
          backdrop-filter: blur(15px);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transform-origin: left;
          transform: perspective(1400px) rotateY(-92deg);
          transition: transform 1.1s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .uiverse-stack-wrapper .project-card.active .card-details {
          transform: perspective(2000px) rotateY(0deg);
        }

        .uiverse-stack-wrapper .project-card:not(.active) .card-details {
          transition-delay: 0.08s;
        }

        .uiverse-stack-wrapper .card-title {
          color: #edb899;
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          font-size: 1.15rem;
          letter-spacing: 0.04em;
        }

        .uiverse-stack-wrapper .card-desc {
          color: #e2e8f0;
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          font-size: 0.85rem;
          line-height: 1.5;
          margin: 10px 0;
          opacity: 0.85;
        }

        .uiverse-stack-wrapper .card-body {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .uiverse-stack-wrapper .card-footer-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-top: 14px;
          flex-wrap: wrap;
        }

        .uiverse-stack-wrapper .card-tech-stack {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          flex: 1 1 auto;
          min-width: 0;
        }

        .uiverse-stack-wrapper .card-actions {
          width: auto;
          display: flex;
          align-items: center;
          gap: 8px;
          justify-content: flex-end;
          flex-wrap: wrap;
          flex-shrink: 0;
        }

        .uiverse-stack-wrapper .tech-pill {
          font-size: 10px;
          background: rgba(255, 255, 255, 0.1);
          padding: 4px 10px;
          border-radius: 6px;
          color: #fff;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .uiverse-stack-wrapper .action-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 18px;
          background: #edb899;
          color: #000;
          border-radius: 30px;
          font-size: 0.8rem;
          font-weight: 800;
          text-decoration: none;
          transition: all 0.25s ease;
        }

        .uiverse-stack-wrapper .action-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
        }

        .uiverse-stack-wrapper .stack-demo-link {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0 11px;
          height: 34px;
          border-radius: 999px;
          border: 1px solid rgba(16, 185, 129, 0.55);
          background:
            radial-gradient(circle at 16% 20%, rgba(52, 211, 153, 0.2) 0%, rgba(52, 211, 153, 0) 55%),
            linear-gradient(145deg, rgba(15, 23, 42, 0.9), rgba(2, 132, 199, 0.15));
          color: #ecfeff;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.02em;
          text-decoration: none;
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
          box-shadow: 0 10px 20px -14px rgba(16, 185, 129, 0.8);
        }

        .uiverse-stack-wrapper .stack-demo-link:hover {
          transform: translateY(-2px);
          border-color: rgba(16, 185, 129, 0.85);
          box-shadow: 0 14px 30px -16px rgba(16, 185, 129, 0.9);
        }

        .uiverse-stack-wrapper .stack-demo-link__dot {
          width: 0.4rem;
          height: 0.4rem;
          border-radius: 999px;
          background: #34d399;
          box-shadow: 0 0 0 3px rgba(52, 211, 153, 0.2);
          animation: stack-demo-pulse 1.7s ease-in-out infinite;
        }

        .uiverse-stack-wrapper .stack-demo-link__icon {
          opacity: 0.9;
          transform: translateX(0);
          transition: transform 0.2s ease, opacity 0.2s ease;
        }

        .uiverse-stack-wrapper .stack-demo-link:hover .stack-demo-link__icon {
          opacity: 1;
          transform: translateX(1px);
        }

        @keyframes stack-demo-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(0.7); }
        }

        .uiverse-stack-wrapper .stack-github-btn {
          border: 1px solid rgba(148, 163, 184, 0.4);
          background: rgba(15, 23, 42, 0.9);
          border-radius: 999px;
          padding: 0 12px;
          height: 34px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.72rem;
          font-weight: 700;
          color: #e2e8f0;
          text-decoration: none;
          cursor: pointer;
          flex-shrink: 0;
          transition: all 0.25s ease;
        }

        .uiverse-stack-wrapper .stack-github-btn:hover {
          border-color: rgba(148, 163, 184, 0.6);
          background: rgba(15, 23, 42, 1);
          transform: translateY(-2px);
        }

        .uiverse-stack-wrapper .stack-github-btn .stack-github-icon {
          color: #e2e8f0;
          opacity: 1;
          transition: opacity 0.25s ease;
        }

        .uiverse-stack-wrapper .stack-github-btn .stack-github-text {
          position: static;
          opacity: 1;
          width: auto;
          color: #e2e8f0;
          font-weight: 700;
          transition: opacity 0.25s ease;
        }

        @media (max-width: 768px) {
          .uiverse-stack-wrapper {
            min-height: auto;
            margin-top: 18px;
            align-items: stretch;
          }

          .uiverse-stack-wrapper .stack-area {
            position: static;
            display: flex;
            flex-direction: column;
            gap: 12px;
            height: auto;
            max-width: 430px;
            width: min(100%, 430px);
            margin-inline: auto;
          }

          .uiverse-stack-wrapper .project-card {
            position: relative;
            top: auto !important;
            left: auto !important;
            right: auto !important;
            margin: 0 auto;
            width: 100%;
            height: auto;
            min-height: 0;
            border-radius: 20px;
            opacity: 1;
            filter: none;
            z-index: auto !important;
            transform: none !important;
            box-shadow: 0 14px 28px rgba(2, 6, 23, 0.18);
          }

          .uiverse-stack-wrapper .project-card + .project-card {
            margin-top: 0;
          }

          .uiverse-stack-wrapper .project-card.active {
            z-index: auto !important;
            top: auto !important;
            left: auto !important;
            transform: none !important;
            box-shadow:
              0 18px 36px rgba(2, 6, 23, 0.22),
              0 0 0 1px rgba(34, 211, 238, 0.35);
          }

          .uiverse-stack-wrapper .card-layout {
            flex-direction: row;
            align-items: stretch;
            min-height: 210px;
          }

          .uiverse-stack-wrapper .project-card:nth-child(even) .card-layout {
            flex-direction: row-reverse;
          }

          .uiverse-stack-wrapper .card-details {
            width: 61%;
            height: auto;
            padding: 14px 14px 13px;
            transform: none !important;
            background: linear-gradient(180deg, rgba(3, 7, 22, 0.92) 0%, rgba(2, 6, 23, 0.98) 100%);
          }

          .uiverse-stack-wrapper .card-media {
            width: 39%;
            height: auto;
            min-height: 210px;
            border-top: 0;
            border-left: 0;
            border-bottom: 0;
          }

          .uiverse-stack-wrapper .card-body {
            display: flex;
            flex-direction: column;
            gap: 8px;
          }

          .uiverse-stack-wrapper .card-footer-row {
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
            gap: 10px;
            margin-top: 10px;
            flex-wrap: wrap;
          }

          .uiverse-stack-wrapper .card-tech-stack {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            flex: 1 1 auto;
            min-width: 0;
          }

          .uiverse-stack-wrapper .card-title {
            font-size: 1.02rem;
            line-height: 1.28;
          }

          .uiverse-stack-wrapper .card-desc {
            font-size: 0.8rem;
            line-height: 1.45;
            margin: 9px 0 11px;
            opacity: 0.9;
          }

          .uiverse-stack-wrapper .card-actions {
            width: auto;
            display: flex;
            align-items: center;
            gap: 8px;
            justify-content: flex-end;
            flex-wrap: wrap;
            flex-shrink: 0;
          }

          .uiverse-stack-wrapper .stack-github-btn,
          .uiverse-stack-wrapper .stack-github-btn:hover {
            width: auto;
            height: 34px;
            padding: 0 11px;
            border-radius: 999px;
            gap: 6px;
            background: rgba(15, 23, 42, 0.9);
            border: 1px solid rgba(148, 163, 184, 0.38);
          }

          .uiverse-stack-wrapper .stack-github-btn .stack-github-text,
          .uiverse-stack-wrapper .stack-github-btn:hover .stack-github-text {
            position: static;
            width: auto;
            opacity: 1;
            font-size: 0.72rem;
            letter-spacing: 0.02em;
          }

          .uiverse-stack-wrapper .stack-github-btn .stack-github-icon,
          .uiverse-stack-wrapper .stack-github-btn:hover .stack-github-icon {
            opacity: 1;
          }

          .uiverse-stack-wrapper .stack-demo-link {
            height: 34px;
            padding: 0 11px;
            font-size: 0.72rem;
            gap: 0.4rem;
            box-shadow: 0 10px 20px -14px rgba(16, 185, 129, 0.8);
          }
        }

        @media (max-width: 480px) {
          .uiverse-stack-wrapper {
            min-height: auto;
          }

          .uiverse-stack-wrapper .stack-area {
            height: auto;
            max-width: 100%;
            gap: 10px;
          }

          .uiverse-stack-wrapper .project-card {
            height: auto;
            border-radius: 18px;
            width: 100%;
          }

          .uiverse-stack-wrapper .card-details {
            width: 62%;
            height: auto;
            padding: 13px;
          }

          .uiverse-stack-wrapper .card-media {
            width: 38%;
            min-height: 190px;
          }

          .uiverse-stack-wrapper .card-title {
            font-size: 0.95rem;
          }

          .uiverse-stack-wrapper .card-desc {
            font-size: 0.72rem;
            line-height: 1.4;
            margin: 8px 0 10px;
          }

          .uiverse-stack-wrapper .stack-github-btn {
            height: 34px;
            padding: 0 10px;
          }

          .uiverse-stack-wrapper .stack-demo-link {
            font-size: 0.7rem;
            height: 34px;
            padding: 0 10px;
          }
        }
      `}</style>

      <div className="stack-area">
        {orderedProjects.map(({ project, sourceIndex }, index) => (
          <div
            key={project.title}
            data-index={index}
            className={`project-card ${index === 0 ? 'active' : ''}`}
            onMouseEnter={() => {
              if (hoverTimerRef.current) {
                window.clearTimeout(hoverTimerRef.current)
              }

              hoverTimerRef.current = window.setTimeout(() => {
                setHoveredIndex((previous) => (previous !== sourceIndex ? sourceIndex : previous))
              }, 950)
            }}
            onMouseLeave={() => {
              if (hoverTimerRef.current) {
                window.clearTimeout(hoverTimerRef.current)
              }
            }}
            onClick={() => {
              setHoveredIndex((previous) => (previous !== sourceIndex ? sourceIndex : previous))
            }}
          >
            <div className="card-layout">
              <div className="card-details">
                <div className="card-body">
                  <h3 className="card-title">{project.title}</h3>
                  <p className="card-desc">{project.description}</p>
                </div>

                <div className="card-footer-row">
                  <div className="card-tech-stack">
                    {project.techStack?.slice(0, 3).map((tech) => (
                      <span key={tech} className="tech-pill">{tech}</span>
                    ))}
                  </div>

                  <div className="card-actions">
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="stack-github-btn" aria-label="GitHub">
                    <FiGithub className="stack-github-icon" size={18} />
                    <span className="stack-github-text">GitHub</span>
                  </a>

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Demo"
                      className="stack-demo-link"
                    >
                      <span className="stack-demo-link__dot" aria-hidden="true" />
                      <span>View Demo</span>
                      <FiExternalLink className="stack-demo-link__icon" size={15} />
                    </a>
                  )}
                  </div>
                </div>
              </div>

              <div
                className="card-media"
                style={{
                  backgroundImage: `url(${project.image})`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProjectStack