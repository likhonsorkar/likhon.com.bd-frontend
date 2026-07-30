import { Link } from 'react-router-dom'

export default function ProjectCard({ project }) {
  return (
    <article className="project-card">
      <div className="project-card__media">
        {project.image ? (
          <img src={project.image} alt={project.title} />
        ) : (
          <div className="project-card__placeholder">
            <span>{project.title.slice(0, 2).toUpperCase()}</span>
          </div>
        )}
        <span className="project-card__tag">{project.category}</span>
      </div>
      <div className="project-card__body">
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
        <div className="project-card__stack">
          {project.stack.map((s) => (
            <span key={s}>{s}</span>
          ))}
        </div>
        <Link to={`/projects/${project.slug}`} className="project-card__link">
          View Details →
        </Link>
      </div>
    </article>
  )
}
