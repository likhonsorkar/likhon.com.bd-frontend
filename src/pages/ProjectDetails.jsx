import { Link, useParams } from 'react-router-dom'
import { useSiteData } from '../context/SiteDataContext.jsx'
import Reveal from '../components/Reveal.jsx'

export default function ProjectDetails() {
  const { slug } = useParams()
  const { data } = useSiteData()

  if (!data) return null

  const project = data.projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <section className="section">
        <div className="container">
          <h1 className="section__title">Project not found</h1>
          <Link to="/projects" className="btn btn--ghost">← Back to Projects</Link>
        </div>
      </section>
    )
  }

  const hasFullDetails = Boolean(project.overview)

  return (
    <section className="section project-details">
      <div className="container">
        <Link to="/projects" className="back-link">← Back to Projects</Link>

        <Reveal as="div" className="project-details__hero">
          <div>
            <span className="chip chip--accent">{project.featured ? 'Featured Project' : project.category}</span>
            <h1>{project.title}<br /><span className="accent">({project.tagline})</span></h1>
            <p>{project.summary}</p>
            {hasFullDetails && (
              <div className="project-details__actions">
                <a className="btn btn--primary" href="#" onClick={(e) => e.preventDefault()}>Live Demo ↗</a>
                <a className="btn btn--ghost" href="#" onClick={(e) => e.preventDefault()}>View Source Code</a>
              </div>
            )}
          </div>
          <div className="project-details__media">
            {project.image ? (
              <img src={project.image} alt={project.title} />
            ) : (
              <div className="project-card__placeholder project-card__placeholder--lg">
                <span>{project.title.slice(0, 2).toUpperCase()}</span>
              </div>
            )}
          </div>
        </Reveal>

        {hasFullDetails ? (
          <>
            <Reveal as="div" className="project-meta">
              {Object.entries(project.meta).map(([key, value]) => (
                <div key={key}>
                  <span>{key.replace(/([A-Z])/g, ' $1')}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </Reveal>

            <div className="project-details__grid">
              <Reveal>
                <h2>Project Overview</h2>
                <p>{project.overview}</p>
              </Reveal>
              <Reveal delay={80}>
                <h2>Key Features</h2>
                <ul className="checklist">
                  {project.features.map((f) => <li key={f}>{f}</li>)}
                </ul>
              </Reveal>
            </div>

            <h2>Technologies Used</h2>
            <div className="stack-pills">
              {project.stackFull.map((s) => <span key={s}>{s}</span>)}
            </div>

            <div className="project-details__results">
              <Reveal className="results-card">
                <h2>Results / Impact</h2>
                <div className="results-grid">
                  {project.results.map((r) => (
                    <div key={r.label}>
                      <strong>{r.value}</strong>
                      <span>{r.label}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={80} className="results-quote">
                <h2>What Client Says</h2>
                <p>&ldquo;{project.testimonial.quote}&rdquo;</p>
                <strong>{project.testimonial.author}</strong>
                <span>{project.testimonial.title}</span>
              </Reveal>
            </div>
          </>
        ) : (
          <div className="project-details__grid">
            <Reveal>
              <h2>Project Overview</h2>
              <p>{project.summary} Full case study details for this project are coming soon.</p>
            </Reveal>
            <Reveal delay={80}>
              <h2>Technologies Used</h2>
              <div className="stack-pills">
                {project.stack.map((s) => <span key={s}>{s}</span>)}
              </div>
            </Reveal>
          </div>
        )}

        <Reveal as="div" className="cta-banner">
          <div>
            <h3>Have a similar project in mind?</h3>
            <p>Let&rsquo;s build something amazing together!</p>
          </div>
          <Link to="/start-a-project" className="btn btn--primary">Let&rsquo;s Talk →</Link>
        </Reveal>
      </div>
    </section>
  )
}
