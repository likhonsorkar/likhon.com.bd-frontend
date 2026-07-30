import { useMemo, useState } from 'react'
import { useSiteData } from '../context/SiteDataContext.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import Reveal from '../components/Reveal.jsx'

export default function Projects() {
  const { data } = useSiteData()
  const [active, setActive] = useState('All Projects')

  const categories = useMemo(() => {
    if (!data) return ['All Projects']
    const unique = Array.from(new Set(data.projects.map((p) => p.category)))
    return ['All Projects', ...unique]
  }, [data])

  const filtered = useMemo(() => {
    if (!data) return []
    if (active === 'All Projects') return data.projects
    return data.projects.filter((p) => p.category === active)
  }, [data, active])

  if (!data) return null

  return (
    <section className="section projects-page">
      <div className="container">
        <Reveal as="div" className="reveal--center">
          <span className="eyebrow eyebrow--center">Our Projects</span>
          <h1 className="section__title section__title--center">
            Projects That Deliver <span className="accent">Results</span>
          </h1>
          <p className="section__lead">
            We build powerful, scalable and high-performance web solutions that help businesses grow and succeed online.
          </p>
        </Reveal>

        <div className="projects-filter">
          {categories.map((c) => (
            <button
              key={c}
              className={`chip ${active === c ? 'is-active' : ''}`}
              onClick={() => setActive(c)}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="project-grid">
          {filtered.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 4) * 70}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>

        {filtered.length === 0 && <p className="section__lead">No projects in this category yet.</p>}
      </div>
    </section>
  )
}
