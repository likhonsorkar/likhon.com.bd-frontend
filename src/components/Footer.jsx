import { Link } from 'react-router-dom'
import { useSiteData } from '../context/SiteDataContext.jsx'

export default function Footer() {
  const { data } = useSiteData()
  if (!data) return null

  const { site, footer, contact, nav } = data

  return (
    <footer className="footer" id="contact-footer">
      <div className="footer__top container">
        <div className="footer__brand">
          <Link to="/" className="navbar__brand">
            <span className="navbar__logo">
              <img src={site.logo} alt={`${site.shortName} logo`} />
            </span>
            <strong>{site.shortName}<span className="accent">{site.domain}</span></strong>
          </Link>
          <p>{footer.description}</p>
          <div className="footer__social">
            {footer.social.map((s) => (
              <a key={s.label} href={s.href} aria-label={s.label}>{s.short}</a>
            ))}
          </div>
        </div>

        <div className="footer__col">
          <h4>Quick Links</h4>
          {nav.links.map((link) =>
            link.type === 'route' ? (
              <Link key={link.label} to={link.href}>{link.label}</Link>
            ) : (
              <a key={link.label} href={link.href}>{link.label}</a>
            )
          )}
        </div>

        <div className="footer__col">
          <h4>Services</h4>
          {footer.services.map((s) => <span key={s}>{s}</span>)}
        </div>

        <div className="footer__col">
          <h4>Technologies</h4>
          {footer.technologies.map((t) => <span key={t}>{t}</span>)}
        </div>

        <div className="footer__col">
          <h4>Need Help?</h4>
          <a href={`https://wa.me/${contact.whatsapp}`}>WhatsApp +{contact.whatsapp}</a>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
          <span>{contact.location}</span>
        </div>
      </div>

      <div className="footer__bottom container">
        <span>© {new Date().getFullYear()} {footer.copyright}</span>
        <span>{footer.signature}</span>
      </div>
    </footer>
  )
}
