import { memo, useState } from 'react'
import { motion } from 'framer-motion'
import { FiExternalLink, FiGithub } from 'react-icons/fi'

const ProjectCard = ({ project, index }) => {
  const [isSelected, setIsSelected] = useState(false)

  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="uiverse-container"
    >
      <style>{`
        .uiverse-container {
          --card-border-color: rgba(15, 23, 42, 0.45);
          --card-edge-highlight: rgba(2, 6, 23, 0.3);
          --card-details-bg: rgba(248, 250, 252, 0.9);
          --card-title-color: #0f172a;
          --card-desc-color: #1e293b;
          --card-button-bg: #082f49;
          --card-button-text: #ecfeff;
          padding: 0;
          margin: 0;
          position: relative;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .dark .uiverse-container {
          --card-border-color: rgba(255, 255, 255, 1);
          --card-edge-highlight: rgba(255, 255, 255, 0.95);
          --card-details-bg: rgba(2, 6, 23, 0.82);
          --card-title-color: #a5f3fc;
          --card-desc-color: #f1f5f9;
          --card-button-bg: #22d3ee;
          --card-button-text: #082f49;
        }

        .cards {
          position: relative;
          width: min(380px, 90vw);
          height: auto;
          aspect-ratio: 4 / 3;
        }

        .card {
          z-index: 1;
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 10px;
          transition: all .5s ease-out;
          overflow: hidden;
          transform: translateX(0px) translateY(0px) perspective(905px) rotateX(0deg) rotateY(0deg) rotateZ(-8deg);
          border: 1px solid var(--card-border-color);
          box-shadow: -1px -1px 0 var(--card-edge-highlight);
        }

        /* ✅ EXACT OFFSETS FROM YOUR CSS */
        .card.one {
          top: -142px;
          left: -176px;
          background:
            linear-gradient(180deg, rgba(14, 116, 144, 0.78) 0%, rgba(8, 47, 73, 0.9) 100%),
            url('${project.image}');
          background-size: cover;
          background-position: center;
        }

        .card.two {
          top: -115px;
          left: -148px;
          background:
            linear-gradient(180deg, rgba(34, 197, 94, 0.74) 0%, rgba(6, 95, 70, 0.9) 99%),
            url('${project.image}');
          background-size: cover;
          background-position: center;
        }

        .card.three {
          top: -86px;
          left: -118px;
          background:
            linear-gradient(180deg, rgba(34, 211, 238, 0.58) 0%, rgba(14, 116, 144, 0.6) 100%),
            url('${project.image}');
          background-size: cover;
          background-position: center;
          background-blend-mode: overlay;
        }

        /* ✅ HOVER EFFECT */
        .card:hover {
          z-index: 4;
          transform: perspective(1000px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) !important;
          transition: all .5s ease-out;
        }

        .card.open {
          z-index: 4;
          transform: perspective(1000px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) !important;
        }

        .cardDetails {
          width: 74%;
          height: 100%;
          padding: 18px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: flex-start;
          background: var(--card-details-bg);
          transition: .5s;
          transform-origin: left;
          transform: perspective(2000px) rotateY(-90deg);
          overflow-y: auto;
        }

        .card:hover .cardDetails {
          transform: perspective(2000px) rotateY(0deg);
        }

        .card.open .cardDetails {
          transform: perspective(2000px) rotateY(0deg);
        }

        .cardDetailsHeader {
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          color: var(--card-title-color);
          font-size: 1.15rem;
        }

        .cardDesc {
          font-family: 'Poppins', sans-serif;
          font-size: 0.85rem;
          color: var(--card-desc-color);
          margin-top: 8px;
          line-height: 1.5;
        }

        .cardActions {
          display: flex;
          gap: 8px;
        }

        .cardDetailsButton {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 6px 11px;
          border-radius: 25px;
          background-color: var(--card-button-bg);
          color: var(--card-button-text);
          border: 1px solid var(--card-border-color);
          font-weight: 600;
          font-size: 0.78rem;
          text-decoration: none;
        }

        @media (max-width: 640px) {
          .cards {
            width: min(320px, 92vw);
          }

          .card.one {
            top: -105px;
            left: -136px;
          }

          .card.two {
            top: -86px;
            left: -114px;
          }

          .card.three {
            top: -66px;
            left: -92px;
          }

          .cardDetails {
            width: 82%;
            padding: 14px;
          }

          .cardDesc {
            font-size: 0.76rem;
          }
        }

        @media (max-width: 380px) {
          .cards {
            width: min(290px, 90vw);
            aspect-ratio: 5 / 4;
          }

          .card.one {
            top: -84px;
            left: -104px;
          }

          .card.two {
            top: -68px;
            left: -88px;
          }

          .card.three {
            top: -54px;
            left: -72px;
          }

          .cardDetails {
            width: 84%;
            padding: 12px;
          }

          .cardDesc {
            font-size: 0.72rem;
            line-height: 1.32;
          }
        }
      `}</style>

      <div className="cards" onClick={() => setIsSelected((previous) => !previous)}>
        <div className="card one" />
        <div className="card two" />
        <div className={`card three ${isSelected ? 'open' : ''}`}>
          <div className="cardDetails">
            <div className="flex flex-col">
              <span className="cardDetailsHeader">{project.title}</span>
              <p className="cardDesc">{project.description}</p>
            </div>
            
            <div className="cardActions">
              <a href={project.githubUrl} target="_blank" rel="noreferrer" className="cardDetailsButton">
                <FiGithub size={12}/> GitHub
              </a>
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noreferrer" className="cardDetailsButton">
                  <FiExternalLink size={12}/> Live
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

export default memo(ProjectCard)