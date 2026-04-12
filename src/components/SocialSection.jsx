import { FaDiscord, FaGithub, FaLinkedin } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

const socials = [
  {
    name: 'LinkedIn',
    icon: FaLinkedin,
    url: 'https://linkedin.com/in/tarunvemuri/',
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
    name: 'Discord',
    icon: FaDiscord,
    url: 'https://discordapp.com/users/896411007797325824/',
    color1: '#5865F2',
    color2: '#4752C4',
    text: '#FFFFFF',
  },
  {
    name: 'Twitter',
    icon: FaXTwitter,
    url: 'https://x.com/TARUNVEMURI',
    color1: '#000000',
    color2: '#222222',
    text: '#FFFFFF',
  },
];

const SocialSection = () => {
  return (
    <section id="social" className="social-3d-scope px-4 pt-4 pb-0">
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
          display: flex;
          justify-content: center;
          align-items: center;
          gap: clamp(10px, 2vw, 18px);
          flex-wrap: wrap;
          margin: 0 auto;
          width: 100%;
          padding: 24px 4px 10px;
        }

        .cube-wrapper {
          flex: 0 1 auto;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .cube-link {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          -webkit-tap-highlight-color: transparent;
        }

        /* ================= CUBE ================= */
        .cube-btn {
          --w: clamp(150px, 20vw, 220px);
          --h: clamp(90px, 12vw, 120px);
          --d: clamp(16px, 2vw, 22px);

          position: relative;
          width: var(--w);
          height: var(--h);

          transform-style: preserve-3d;
          transform: rotateX(42deg) rotateZ(14deg);
          transition: transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);

          will-change: transform;
        }

        .cube-link:hover .cube-btn {
          transform: rotateX(15deg) rotateZ(0deg) translateY(-12px);
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
          font-size: clamp(0.88rem, 1.15vw, 1rem);
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
          gap: clamp(6px, 1vw, 10px);
          letter-spacing: 0.12em;
          font-family: 'Poppins', sans-serif;
        }

        .icon {
          font-size: clamp(1.6rem, 2.5vw, 2.5rem);
        }

        /* ================= MOBILE ================= */
        @media (max-width: 640px) {
          .social-container {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
            padding: 10px 10px 0px;
            width: 100%;
          }

          .cube-wrapper {
            width: 100%;
          }

          .cube-link {
            width: 100%;
          }

          .cube-btn {
            --w: 100%;
            --h: 95px;
            --d: 16px;
          }

          .icon {
            font-size: 1.6rem;
          }

          .front {
            font-size: 0.9rem;
          }
        }

        /* ================= EXTRA SMALL ================= */
        @media (max-width: 380px) {
          .social-container {
            gap: 12px;
            padding: 10px 5px 0px;
          }

          .cube-btn {
            --w: 100%;
            --h: 85px;
          }

          .icon {
            font-size: 1.4rem;
          }
        }
      `}</style>

      <div className="text-center mb-2">
        <h2 className="section-title text-center">
          Social Presence
        </h2>
      </div>

      <br className="block sm:hidden" />

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
  );
};

export default SocialSection;