import { memo, useMemo, useState } from 'react'
import { FiMail, FiMapPin, FiPhone, FiSend } from 'react-icons/fi'
import useRevealOnScroll from '../hooks/useRevealOnScroll'

const initialFormValues = {
  name: '',
  email: '',
  message: '',
}

const Contact = () => {
  const { elementRef, isVisible } = useRevealOnScroll()

  const [formValues, setFormValues] = useState(initialFormValues)
  const [errors, setErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  const contactItems = useMemo(
    () => [
      { label: 'Email', value: 'princetarunvemuri@gmail.com', icon: FiMail },
      { label: 'Location', value: 'Vijayawada, India', icon: FiMapPin },
    ],
    [],
  )

  const validate = () => {
    const e = {}
    if (!formValues.name.trim()) e.name = 'Please enter your name.'
    if (!formValues.email.trim()) e.email = 'Please enter your email.'
    else if (!/^\S+@\S+\.\S+$/.test(formValues.email)) e.email = 'Invalid email.'
    if (!formValues.message.trim()) e.message = 'Enter a message.'
    else if (formValues.message.length < 20) e.message = 'Min 20 chars.'
    return e
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormValues((p) => ({ ...p, [name]: value }))
    setErrors((p) => ({ ...p, [name]: '' }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) return setErrors(errs)
    setIsSubmitted(true)
    setFormValues(initialFormValues)
  }

  return (
    <section
      id="contact"
      ref={elementRef}
      className={`
        -mt-4 space-y-4 pt-0
        transition-all duration-700 ease-out
        ${isVisible ? 'opacity-100' : 'opacity-0'}
      `}
    >
      <style>{`
        .contact-send-btn {
          font-family: inherit;
          font-size: clamp(0.95rem, 2.4vw, 1.25rem);
          background: royalblue;
          color: white;
          padding: 0.7em 1em;
          padding-left: 0.9em;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: none;
          border-radius: 16px;
          overflow: hidden;
          transition: all 0.2s;
          cursor: pointer;
          width: 100%;
        }

        .contact-send-btn .contact-send-text {
          display: block;
          margin-left: 0.3em;
          transition: all 0.3s ease-in-out;
          font-size: 0.9rem;
          font-weight: 700;
          letter-spacing: 0.02em;
        }

        .contact-send-btn .contact-send-icon {
          display: block;
          transform-origin: center center;
          transition: transform 0.3s ease-in-out;
        }

        .contact-send-btn:hover .contact-send-svg-wrapper {
          animation: contact-fly-1 0.6s ease-in-out infinite alternate;
        }

        .contact-send-btn:hover .contact-send-icon {
          transform: translateX(1.2em) rotate(45deg) scale(1.1);
        }

        .contact-send-btn:hover .contact-send-text {
          transform: translateX(5em);
        }

        .contact-send-btn:active {
          transform: scale(0.95);
        }

        @keyframes contact-fly-1 {
          from {
            transform: translateY(0.1em);
          }

          to {
            transform: translateY(-0.1em);
          }
        }

        @media (max-width: 480px) {
          .contact-send-btn {
            padding: 0.62em 0.9em;
          }

          .contact-send-btn:hover .contact-send-text {
            transform: translateX(3.4em);
          }
        }
      `}</style>

      {/* HEADER */}
      <div
        className={`
          text-center transition-all duration-700 ease-out
          ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}
        `}
      >
        <h2 className="section-title">
          Contact Me
        </h2>
        <p className="section-subtitle mt-2">
          Open for roles and collaborations.
        </p>
      </div>

      {/* MAIN CARD */}
      <div className="w-full overflow-hidden rounded-3xl border border-black/80 bg-white/60 shadow-xl backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/70">
        <div className="grid lg:grid-cols-[0.95fr_1.05fr]">

          {/* LEFT */}
          <div
            className={`
              p-6 sm:p-8 lg:p-10 transition-all duration-700 ease-out
              ${isVisible
                ? 'translate-x-0 opacity-100'
                : '-translate-x-28 opacity-0'}
            `}
          >
            <h3 className="card-title text-xl sm:text-2xl">
              Let’s build something meaningful.
            </h3>

            <p className="section-body mt-3">
              Share your idea and I’ll respond soon.
            </p>

            <div className="mt-6 space-y-3">
              {contactItems.map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.label} className="p-3 rounded-xl bg-white dark:bg-slate-800">
                    <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                      <Icon size={14} /> {item.label}
                    </p>
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{item.value}</p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* RIGHT */}
          <form
            onSubmit={handleSubmit}
            className={`
              p-6 sm:p-8 lg:p-10 space-y-4
              transition-all duration-700 ease-out delay-150
              ${isVisible
                ? 'translate-x-0 opacity-100'
                : 'translate-x-28 opacity-0'}
            `}
          >
            <input
              name="name"
              value={formValues.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full rounded-xl border p-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 dark:text-slate-100"
            />
            <input
              name="email"
              value={formValues.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full rounded-xl border p-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 dark:text-slate-100"
            />
            <textarea
              name="message"
              value={formValues.message}
              onChange={handleChange}
              placeholder="Message"
              rows={5}
              className="w-full rounded-xl border p-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 dark:text-slate-100"
            />
            <button type="submit" className="contact-send-btn">
              <span className="contact-send-svg-wrapper">
                <FiSend className="contact-send-icon" size={18} />
              </span>
              <span className="contact-send-text">Send Message</span>
            </button>
          </form>

        </div>
      </div>
    </section>
  )
}

export default memo(Contact)