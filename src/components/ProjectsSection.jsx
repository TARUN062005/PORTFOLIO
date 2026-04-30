import { Link } from 'react-router-dom'
import { memo, useMemo } from 'react'
import { projects } from '../data/portfolioData'
import ProjectStack from './ProjectStack'
import useRevealOnScroll from '../hooks/useRevealOnScroll'

const ProjectsSection = ({ showAllLink = true }) => {
  const { elementRef, isVisible } = useRevealOnScroll({
    threshold: 0.08,
    rootMargin: '0px 0px -10% 0px',
  })
  const stackProjects = useMemo(() => projects.slice(0, 3), [])

  return (
    <section
      id="projects"
      ref={elementRef}
      className={`projects-section section-fade space-y-4 pt-12 relative ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
    >
      <style>{`
        #projects {
          position: relative;
          padding-top: 2rem;
          --navbar-height: 88px;
          --header-height: 56px;
          --header-gap: 24px;
          --mobile-card-height: clamp(340px, 50vh, 420px);
          --card-gap: clamp(60px, 5vh, 100px);
          --stack-cards: 3;
          --card-step: calc(var(--mobile-card-height) + var(--card-gap));
          --header-boundary-height: calc(
            ((var(--stack-cards) - 1) * var(--card-step)) +
            var(--mobile-card-height) +
            var(--header-height) + 
            var(--header-gap)
          );
          --post-stack-buffer: clamp(0px, 0vh, 10px);
          --stack-boundary-height: calc(
            var(--header-boundary-height) +
            var(--header-height) +
            var(--header-gap) +
            var(--mobile-card-height) +
            var(--post-stack-buffer)
          );
          --header-top: var(--navbar-height);
          --card-top: calc(var(--navbar-height) + var(--header-height) + var(--header-gap));
        }

        .sticky-header-wrapper {
          position: relative;
          z-index: 40;
          background: transparent;
          padding: 15px 0;
          text-align: center;
        }

        .header-boundary {
          position: relative;
        }

        .stack-boundary {
          position: relative;
        }

        .mobile-scroll-stage {
          position: relative;
        }

        @media (max-width: 768px) {
          .projects-section {
            padding-top: 1.1rem;
            scroll-margin-top: 4.8rem;
          }

          .mobile-scroll-stage {
            display: grid;
            align-items: start;
          }

          .header-boundary,
          .stack-boundary {
            grid-area: 1 / 1;
          }

          .header-boundary {
            height: var(--header-boundary-height);
            z-index: 50;
            pointer-events: none;
          }

          .sticky-header-wrapper {
            position: sticky;
            background: transparent;
            padding: 0;
            top: var(--header-top);
            z-index: 60;
            pointer-events: none;
          }

         .sticky-header-bg {
  background: rgba(2, 6, 23, 0.85); /* semi-transparent instead of solid */
  backdrop-filter: blur(6px);       /* optional, improves blending */
  padding: 10px 0;
}
          .sticky-header-bg > * {
            pointer-events: auto;
          }

          .stack-boundary {
            min-height: var(--stack-boundary-height);
            z-index: 30;
            display: flex;
            flex-direction: column;
          }

          .projects-section .projects-stack-wrap {
            margin-top: 0;
            flex: 1;
            display: flex;
            flex-direction: column;
          }

          .projects-section .projects-view-all-mobile {
            padding-top: 0;
            position: relative;
            z-index: 20;
          }
        }
      `}</style>

      <div className="mobile-scroll-stage">
        <div className="header-boundary">
          <div className="sticky-header-wrapper projects-section__heading mx-auto w-full px-4">
            <div className="sticky-header-bg flex w-full items-center justify-center">
              <h2 className="section-title text-center text-white">
                Projects
              </h2>

              {showAllLink && (
                <Link
                  to="/projects"
                  className="absolute right-4 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-xl bg-cyan-500 px-7 py-3 text-sm font-semibold text-slate-950 transition duration-300 hover:-translate-y-[52%] hover:bg-cyan-400 sm:inline-flex"
                >
                  View All Projects
                </Link>
              )}
            </div>
          </div>
        </div>
        <br /><br /><br /><br/><br/>
        <div className="stack-boundary">
          <div className="projects-stack-wrap mt-1 sm:mt-6 w-full">
            <ProjectStack projects={stackProjects} />
          </div>
        </div>
      </div>

      {showAllLink && (
        <div className="projects-view-all-mobile flex justify-center pt-0 sm:hidden view-more -mt-10 relative z-50">
          <Link
            to="/projects"
            className="inline-flex items-center justify-center rounded-xl bg-cyan-500 px-7 py-3 text-sm font-semibold text-slate-950 transition duration-300 hover:-translate-y-0.5 hover:bg-cyan-400"
          >
            View All Projects
          </Link>
        </div>
      )}

    </section>
  )
}

export default memo(ProjectsSection)
