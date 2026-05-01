import { memo } from 'react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { SiLeetcode } from 'react-icons/si'

const socials = [
  {
    name: 'LinkedIn',
    icon: FaLinkedin,
    url: 'https://www.linkedin.com/in/vemuri-prince-tarun-9b8821326',
    color1: '#0A66C2',
    color2: '#004182',
    text: '#FFFFFF',
  },
  {
    name: 'GitHub',
    icon: FaGithub,
    url: 'https://github.com/TARUN062005',
    color1: '#333333',
    color2: '#1a1a1a',
    text: '#FFFFFF',
  },
  {
    name: 'LeetCode',
    icon: SiLeetcode,
    url: 'https://leetcode.com/u/TARUN06_/',
    color1: '#FFA116',
    color2: '#FFB84D',
    text: '#0f172a',
  },
  {
    name: 'Twitter',
    icon: FaXTwitter,
    url: 'https://x.com/princet40578627',
    color1: '#000000',
    color2: '#222222',
    text: '#FFFFFF',
  },
];

const SocialSection = () => {
  return (
    <section id="social" className="social-3d-scope space-y-4 pb-0 pt-3">
      <style>{`
        .social-3d-scope {
          perspective: 1400px;
          --border-color: #111111;
          --main-text: #111111;
        }

        .dark .social-3d-scope {
          --border-color: #FFFFFF;
          --main-text: #FFFFFF;
        }

        /* ================= LAYOUT ================= */
        .social-container {
          display: grid;
          grid-template-columns: minmax(0, 1fr);
          gap: 14px;
          margin: 0 auto;
          width: 100%;
          padding: 18px 16px 16px;
        }

        @media (min-width: 560px) {
          .social-container {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 16px;
            padding: 20px;
          }
        }

        @media (min-width: 1024px) {
          .social-container {
            grid-template-columns: repeat(4, minmax(0, 1fr));
            padding: 22px 24px 18px;
          }
        }

        .cube-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
        }

        .cube-link {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          -webkit-tap-highlight-color: transparent;
        }

        /* ================= CUBE ================= */
        .cube-btn {
          --w: 100%;
          --h: clamp(108px, 12vw, 132px);
          --d: clamp(14px, 1.8vw, 18px);

          position: relative;
          width: var(--w);
          height: var(--h);

          transform-style: preserve-3d;
          transform: rotateX(42deg) rotateZ(14deg);
          transition: transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);

          will-change: transform;
        }

        .cube-link:hover .cube-btn {
          transform: rotateX(15deg) rotateZ(0deg) translateY(-8px);
        }

        .cube-link:active .cube-btn {
          transform: scale(0.96) rotateX(10deg);
        }

        /* ================= FACES ================= */
        .face {
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          backface-visibility: hidden;

          background: transparent;
          border: 2px solid var(--border-color);
          transition: all 0.35s ease;
        }

        .cube-link:hover .face {
          background: var(--color2);
          border-color: transparent;
        }

        .front {
          width: var(--w);
          height: var(--h);
          transform: translateZ(calc(var(--d) / 2));
          color: var(--main-text);
          font-weight: 600;
          font-size: clamp(0.84rem, 1.08vw, 0.96rem);
        }

        .cube-link:hover .front {
          background: linear-gradient(135deg, var(--color1), var(--color2));
          color: var(--text);
          box-shadow: 0 14px 30px -10px var(--color1);
        }

        .back {
          width: var(--w);
          height: var(--h);
          transform: rotateY(180deg) translateZ(calc(var(--d) / 2));
        }

        .right, .left { width: var(--d); height: var(--h); }
        .right { right: 0; transform: rotateY(90deg) translateZ(calc(var(--d) / 2)); }
        .left { left: 0; transform: rotateY(-90deg) translateZ(calc(var(--d) / 2)); }

        .top, .bottom { width: var(--w); height: var(--d); }
        .top { top: 0; transform: rotateX(90deg) translateZ(calc(var(--d) / 2)); }
        .bottom { bottom: 0; transform: rotateX(-90deg) translateZ(calc(var(--d) / 2)); }

        /* ================= CONTENT ================= */
        .content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: clamp(6px, 1vw, 9px);
          letter-spacing: 0.12em;
          font-family: 'Poppins', sans-serif;
          text-transform: uppercase;
        }

        .icon {
          font-size: clamp(1.35rem, 2.1vw, 2rem);
        }

        /* ================= MOBILE ================= */
        @media (max-width: 640px) {
          .social-container { padding: 16px 12px 12px; }

          .cube-btn {
            --w: 100%;
            --h: 108px;
            --d: 14px;
          }

          .icon { font-size: 1.35rem; }
          .front { font-size: 0.82rem; }
        }

        /* ================= EXTRA SMALL ================= */
        @media (max-width: 380px) {
          .social-container {
            grid-template-columns: minmax(0, 1fr);
            gap: 10px;
            padding: 14px 10px 10px;
          }

          .cube-btn {
            --w: 100%;
            --h: 98px;
          }

          .icon { font-size: 1.25rem; }
        }
      `}</style>

      <div className="text-center">
        <h2 className="section-title text-center">
          Social Presence
        </h2>
        <p className="section-subtitle mt-2">
          Connect with me across platforms.
        </p>
      </div>

      <div className="social-container pb-0">
        {socials.map(({ name, icon: Icon, url, color1, color2, text }) => (
          <div key={name} className="cube-wrapper">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="cube-link"
              style={{
                '--color1': color1,
                '--color2': color2,
                '--text': text,
              }}
            >
              <div className="cube-btn">
                <div className="face front">
                  <div className="content">
                    <Icon className="icon" />
                    <span>{name}</span>
                  </div>
                </div>

                <div className="face back"></div>
                <div className="face right"></div>
                <div className="face left"></div>
                <div className="face top"></div>
                <div className="face bottom"></div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}

export default memo(SocialSection)