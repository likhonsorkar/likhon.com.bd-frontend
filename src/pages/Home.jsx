import { Link } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { useSiteData } from '../context/SiteDataContext.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import Reveal from '../components/Reveal.jsx'
import SendOptions from '../components/SendOptions.jsx'
import { useReveal } from '../hooks/useReveal.js'
import { useCountUp } from '../hooks/useCountUp.js'
import { buildMessage } from '../utils/contactLinks.js'
import About from '../components/About.jsx'

function StatItem({ stat }) {
  const [ref, visible] = useReveal()
  const value = useCountUp(stat.value, { start: visible })
  return (
    <div ref={ref}>
      <strong>{value}{stat.suffix}</strong>
      <span>{stat.label}</span>
    </div>
  )
}

export default function Home() {
  const { data } = useSiteData()
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  const featuredProjects = useMemo(() => {
    if (!data) return []
    return data.projects.filter((p, i) => p.featured || i < 4).slice(0, 4)
  }, [data])

  if (!data) return null

  const { hero, stats, technologies, team, projectsSection, testimonialsSection, contact, site } = data

  const message = buildMessage({
    Name: form.name,
    Email: form.email,
    Subject: form.subject,
    Message: form.message,
  })

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero__bg" aria-hidden="true">
          <span className="hero__blob hero__blob--1" />
          <span className="hero__blob hero__blob--2" />
          <span className="hero__grid-lines" />
        </div>
        <div className="container hero__grid">
          <div className="hero__copy">
            <span className="eyebrow eyebrow--pill hero__eyebrow-in">✦ {hero.eyebrow}</span>
            <h1 className="hero__title-in">
              {hero.titleLines[0]}<br />
              {hero.titleLines[1]}<br />
              {hero.titleLines[2]}<span className="accent">{hero.titleAccent}</span>
            </h1>
            <p className="hero__desc-in">{hero.description}</p>
            <div className="hero__actions hero__actions-in">
              <Link to={hero.primaryCta.href} className="btn btn--primary">{hero.primaryCta.label} →</Link>
              <Link to={hero.secondaryCta.href} className="btn btn--ghost">{hero.secondaryCta.label} ▸</Link>
            </div>
            <div className="hero__stats hero__stats-in">
              {stats.map((s) => <StatItem key={s.label} stat={s} />)}
            </div>
          </div>

          <div className="hero__art hero__art-in" aria-hidden="true">
            <div className="hero__card">
              <div className="hero__card-bar" />
              <div className="hero__card-chart">
                {[40, 65, 30, 80, 55, 90, 45].map((h, i) => (
                  <span key={i} style={{ height: `${h}%`, animationDelay: `${i * 90}ms` }} />
                ))}
              </div>
              <div className="hero__card-rows">
                <span /><span /><span />
              </div>
            </div>
            <span className="hero__float hero__float--1">{'</>'}</span>
            <span className="hero__float hero__float--2">
              <img src={site.logo} alt="" />
            </span>
            <span className="hero__float hero__float--3">⬡</span>
          </div>
        </div>
      </section>

      {/* TECHNOLOGIES */}
      <section className="section" id="technologies">
        <div className="container">
          <Reveal as="div" className="reveal--center">
            <span className="eyebrow eyebrow--center">{technologies.eyebrow}</span>
            <h2 className="section__title section__title--center">
              {technologies.title}<span className="accent">{technologies.titleAccent}</span>
            </h2>
          </Reveal>
          <div className="tech-grid">
            {technologies.items.map((t, i) => (
              <Reveal key={t.name} delay={i * 70} className="tech-card">
                <span className={`tech-card__badge tech-card__badge--${t.tag.toLowerCase()}`}>{t.tag}</span>
                <img src={t.icon} alt={`${t.name} logo`} />
                <h3>{t.name}</h3>
                <p>{t.blurb}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section>
        <About/>
      </section>
      {/* TEAM */}
      <section className="section section--dark" id="team">
        <div className="container team-layout">
          <Reveal className="team-intro">
            <span className="eyebrow">{team.eyebrow}</span>
            <h2 className="section__title section__title--light">
              {team.titleLines[0]}<br />{team.titleLines[1]}<br /><span className="accent">{team.titleAccent}</span>
            </h2>
            <p>{team.description}</p>
          </Reveal>
          <div className="team-grid">
            {team.members.map((member, i) => (
              <Reveal key={member.name} delay={i * 80} className="team-card">
                <img src={member.photo} alt={member.name} />
                <h3>{member.name}</h3>
                <p>{member.role}</p>
                <div className="team-card__stack">
                  {member.stack.map((s) => <span key={s}>{s}</span>)}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="section" id="projects">
        <div className="container">
          <Reveal as="div" className="section__head">
            <div>
              <span className="eyebrow">{projectsSection.eyebrow}</span>
              <h2 className="section__title">{projectsSection.title}<span className="accent">{projectsSection.titleAccent}</span></h2>
            </div>
            <Link to="/projects" className="btn btn--ghost">{projectsSection.viewAllLabel} →</Link>
          </Reveal>
          <div className="project-grid">
            {featuredProjects.map((p, i) => (
              <Reveal key={p.slug} delay={i * 80}>
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section section--tint" id="testimonials">
        <div className="container">
          <Reveal as="div" className="reveal--center">
            <span className="eyebrow eyebrow--center">{testimonialsSection.eyebrow}</span>
            <h2 className="section__title section__title--center">
              {testimonialsSection.title}<span className="accent">{testimonialsSection.titleAccent}</span>
            </h2>
          </Reveal>
          <div className="testimonial-grid">
            {testimonialsSection.items.map((t, i) => (
              <Reveal key={t.name} delay={i * 90} className="testimonial-card">
                <span className="testimonial-card__quote">&ldquo;</span>
                <p>{t.quote}</p>
                <div className="testimonial-card__author">
                  <div className="testimonial-card__avatar">{t.name.split(' ').map((w) => w[0]).join('')}</div>
                  <div>
                    <strong>{t.name}</strong>
                    <span>{t.location}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="section" id="contact">
        <div className="container contact-layout">
          <Reveal className="contact-copy">
            <span className="eyebrow">{data.contact.eyebrow}</span>
            <h2 className="section__title">{data.contact.titleLines[0]}<br />{data.contact.titleLines[1]}</h2>
            <p>{data.contact.description}</p>
            <ul className="contact-list">
              <li><strong>WhatsApp</strong> {contact.whatsapp}</li>
              <li><strong>Email</strong> {contact.email}</li>
              <li><strong>Website</strong> {contact.website}</li>
            </ul>
          </Reveal>

          <Reveal delay={100} as="form" className="contact-form" onSubmit={(e) => e.preventDefault()}>
            <div className="contact-form__row">
              <input
                required
                placeholder="Your Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <input
                required
                type="email"
                placeholder="Your Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <input
              placeholder="Subject"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
            />
            <textarea
              required
              rows={4}
              placeholder="Your Message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
            <SendOptions
              contact={contact}
              subject={form.subject || `New enquiry from ${form.name || 'website visitor'}`}
              message={message || 'Hi, I would like to get in touch.'}
            />
          </Reveal>
        </div>
      </section>
    </>
  )
}
