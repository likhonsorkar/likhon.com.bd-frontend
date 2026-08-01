import { useEffect, useState } from 'react'

/** Inline SVG icons keyed by social platform name (icons only — labels/links stay in JSON). */
const ICONS = {
  facebook: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.91h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94Z" />
    </svg>
  ),
  github: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.53 9.53 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M6.94 8.5H3.56V20.5H6.94V8.5ZM5.25 3.5A1.97 1.97 0 1 0 5.27 7.44 1.97 1.97 0 0 0 5.25 3.5ZM20.5 20.5h-3.37v-6.28c0-1.5-.03-3.42-2.08-3.42-2.09 0-2.41 1.63-2.41 3.31v6.39H9.27V8.5h3.24v1.64h.05c.45-.85 1.55-1.74 3.19-1.74 3.42 0 4.05 2.25 4.05 5.18v7.12Z" />
    </svg>
  ),
  twitter: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
      <path d="M18.9 3H21.7l-6.08 6.95L22.8 21h-5.6l-4.38-5.73L7.8 21H5l6.5-7.43L4 3h5.74l3.96 5.24L18.9 3Zm-.98 16.3h1.55L7.16 4.6H5.5l12.42 14.7Z" />
    </svg>
  ),
  x: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
      <path d="M18.9 3H21.7l-6.08 6.95L22.8 21h-5.6l-4.38-5.73L7.8 21H5l6.5-7.43L4 3h5.74l3.96 5.24L18.9 3Zm-.98 16.3h1.55L7.16 4.6H5.5l12.42 14.7Z" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M12 2c2.72 0 3.06.01 4.12.06 1.06.05 1.79.22 2.43.46.66.26 1.22.6 1.77 1.15.55.55.9 1.11 1.15 1.77.24.64.41 1.37.46 2.43.05 1.06.06 1.4.06 4.13s-.01 3.06-.06 4.12c-.05 1.06-.22 1.79-.46 2.43a4.9 4.9 0 0 1-1.15 1.77 4.9 4.9 0 0 1-1.77 1.15c-.64.24-1.37.41-2.43.46-1.06.05-1.4.06-4.12.06s-3.06-.01-4.13-.06c-1.06-.05-1.79-.22-2.43-.46a4.9 4.9 0 0 1-1.77-1.15 4.9 4.9 0 0 1-1.15-1.77c-.24-.64-.41-1.37-.46-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.13c.05-1.06.22-1.79.46-2.43.26-.66.6-1.22 1.15-1.77A4.9 4.9 0 0 1 5.44 2.52c.64-.24 1.37-.41 2.43-.46C8.94 2.01 9.28 2 12 2Zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 8.25A3.25 3.25 0 1 1 12 8.75a3.25 3.25 0 0 1 0 6.5ZM17.5 6.75a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4Z" />
    </svg>
  ),
  default: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M10 13a5 5 0 0 0 7.07 0l2.83-2.83a5 5 0 0 0-7.07-7.07l-1.5 1.5" />
      <path d="M14 11a5 5 0 0 0-7.07 0L4.1 13.83a5 5 0 0 0 7.07 7.07l1.5-1.5" />
    </svg>
  ),
}

function SocialIcon({ platform }) {
  return ICONS[platform?.toLowerCase()] || ICONS.default
}

export default function About() {
  const [about, setAbout] = useState(null)
  const [status, setStatus] = useState('loading') // loading | success | error

  useEffect(() => {
    let cancelled = false

    fetch('/data.json', { headers: { Accept: 'application/json' } })
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load about data (${res.status})`)
        return res.json()
      })
      .then((json) => {
        if (!cancelled) {
          setAbout(json.aboutme)
          setStatus('success')
        }
      })
      .catch(() => {
        if (!cancelled) setStatus('error')
      })

    return () => {
      cancelled = true
    }
  }, [])

  if (status === 'loading') {
    return (
      <section className="about about--state" id="about">
        <div className="about__spinner" aria-label="Loading about section" />
      </section>
    )
  }

  if (status === 'error' || !about) {
    return (
      <section className="about about--state" id="about">
        <p>Couldn&rsquo;t load the About section right now.</p>
      </section>
    )
  }

  const { name, title, shortDescription, longDescription, profileImage, skills, cv, social } = about

  return (
    <section className="about" id="about">
      <div className="about__bg" aria-hidden="true">
        <span className="about__blob about__blob--1" />
        <span className="about__blob about__blob--2" />
        <span className="about__shape about__shape--1" />
        <span className="about__shape about__shape--2" />
        <span className="about__shape about__shape--3" />
        <span className="about__shape about__shape--4" />
      </div>

      <div className="about__container">
        <div className="about__media">
          <div className="about__image-wrap">
            <span className="about__image-ring" />
            <span className="about__image-glow" />
            <img src={profileImage} alt={name} className="about__image" />
          </div>
        </div>

        <div className="about__panel">
          <span className="about__eyebrow">About Me</span>
          <h2 className="about__name">{name}</h2>
          <p className="about__title">{title}</p>
          <p className="about__short">{shortDescription}</p>

          <div className="about__long">
            {longDescription.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          <div className="about__skills">
            {skills.map((skill, i) => (
              <span key={skill} className="about__skill" style={{ animationDelay: `${i * 55}ms` }}>
                {skill}
              </span>
            ))}
          </div>

          <div className="about__actions">
            <a href={cv} download className="about__btn about__btn--primary">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 3v12m0 0 4-4m-4 4-4-4" />
                <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
              </svg>
              Download CV
            </a>
            <a href="#contact" className="about__btn about__btn--ghost">
              Hire Me
            </a>
          </div>

          <div className="about__social">
            {social.map((s) => (
              <a
                key={s.platform}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="about__social-link"
                aria-label={s.label}
                title={s.label}
              >
                <SocialIcon platform={s.platform} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
