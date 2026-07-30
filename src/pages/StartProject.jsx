import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useSiteData } from '../context/SiteDataContext.jsx'
import Reveal from '../components/Reveal.jsx'
import SendOptions from '../components/SendOptions.jsx'
import { buildMessage } from '../utils/contactLinks.js'

export default function StartProject() {
  const { data } = useSiteData()
  const [form, setForm] = useState({
    name: '', email: '', phone: '', projectType: '', subject: '', message: '', budget: '', timeline: '',
  })

  function update(field) {
    return (e) => setForm({ ...form, [field]: e.target.value })
  }

  if (!data) return null

  const { startProject, contact } = data

  const message = buildMessage({
    Name: form.name,
    Email: form.email,
    Phone: form.phone,
    'Project Type': form.projectType,
    Subject: form.subject,
    Budget: form.budget,
    Timeline: form.timeline,
    Message: form.message,
  })

  return (
    <section className="section start-project">
      <div className="container">
        <div className="breadcrumb">Home <span>›</span> {startProject.breadcrumb}</div>

        <Reveal as="div" className="start-project__hero">
          <div>
            <h1>{startProject.titleLines[0]}<br /><span className="accent">{startProject.titleAccent}</span>{startProject.titleEnd}</h1>
            <p>{startProject.description}</p>
          </div>
          <div className="perk-row">
            {startProject.perkRow.map((perk) => (
              <div key={perk.title}><strong>{perk.title}</strong><span>{perk.body}</span></div>
            ))}
          </div>
        </Reveal>

        <div className="start-project__grid">
          <Reveal as="form" className="project-form" onSubmit={(e) => e.preventDefault()}>
            <span className="eyebrow">Start A Project</span>
            <h2>Tell Us About Your Project</h2>

            <div className="contact-form__row">
              <input required placeholder="Your Name *" value={form.name} onChange={update('name')} />
              <input required type="email" placeholder="Your Email *" value={form.email} onChange={update('email')} />
            </div>
            <div className="contact-form__row">
              <input placeholder="Your Phone / WhatsApp" value={form.phone} onChange={update('phone')} />
              <select value={form.projectType} onChange={update('projectType')}>
                <option value="">Project Type</option>
                {startProject.projectTypes.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            <input placeholder="Subject" value={form.subject} onChange={update('subject')} />
            <textarea required rows={5} placeholder="Tell us about your project *" value={form.message} onChange={update('message')} />
            <div className="contact-form__row">
              <select value={form.budget} onChange={update('budget')}>
                <option value="">Budget Range</option>
                {startProject.budgetRanges.map((b) => <option key={b}>{b}</option>)}
              </select>
              <select value={form.timeline} onChange={update('timeline')}>
                <option value="">Timeline</option>
                {startProject.timelines.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>

            <div className="upload-box">Drag &amp; drop files here or click to browse (PDF, DOC, PNG, JPG up to 10MB)</div>

            <SendOptions
              contact={contact}
              subject={form.subject || `New project request from ${form.name || 'a visitor'}`}
              message={message || 'Hi, I would like to start a new project with you.'}
            />
            <p className="contact-form__note">🔒 Your information is 100% secure and will never be shared.</p>
          </Reveal>

          <aside className="start-project__side">
            <Reveal delay={100} className="side-card">
              <h3>What Happens Next?</h3>
              <ol className="steps-list">
                {startProject.steps.map((s, i) => (
                  <li key={s.title}>
                    <span className="steps-list__num">{i + 1}</span>
                    <div>
                      <strong>{s.title}</strong>
                      <p>{s.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal delay={180} className="side-card side-card--accent">
              <h3>Prefer to talk directly?</h3>
              <p>Schedule a free consultation call with our expert.</p>
              <a className="btn btn--light" href={`https://wa.me/${contact.whatsapp}`}>Schedule a Call</a>
            </Reveal>
          </aside>
        </div>

        <Reveal as="div" className="perks-strip">
          <h3>Why Work With Us?</h3>
          <div className="perks-strip__row">
            {startProject.perks.map((p) => <span key={p}>{p}</span>)}
          </div>
        </Reveal>

        <p className="section__lead" style={{ marginTop: '2rem' }}>
          Or <Link to="/projects">browse our past projects</Link> for inspiration.
        </p>
      </div>
    </section>
  )
}
