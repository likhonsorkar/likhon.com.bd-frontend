import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useSiteData } from '../context/SiteDataContext.jsx'

export default function Navbar() {
  const { data } = useSiteData()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  if (!data) return null

  const { site, nav } = data

  return (
    <header className={`navbar ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="navbar__inner">
        <Link to="/" className="navbar__brand" onClick={() => setOpen(false)}>
          <span className="navbar__logo">
            <img src={site.logo} alt={`${site.shortName} logo`} />
          </span>
          <span className="navbar__brandtext">
            <strong>{site.shortName}<span className="accent">{site.domain}</span></strong>
            <small>{site.tagline}</small>
          </span>
        </Link>

        <nav className="navbar__links navbar__links--desktop">
          {nav.links.map((link) =>
            link.type === 'route' ? (
              <NavLink key={link.label} to={link.href} end={link.href === '/'}>
                {link.label}
              </NavLink>
            ) : (
              <a key={link.label} href={link.href}>
                {link.label}
              </a>
            )
          )}
        </nav>

        <Link to={nav.cta.href} className="btn btn--primary navbar__cta">
          {nav.cta.label}
        </Link>

        <button
          className={`navbar__toggle ${open ? 'is-open' : ''}`}
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile menu overlay */}
      <div className={`navbar__overlay ${open ? 'is-open' : ''}`} onClick={() => setOpen(false)} aria-hidden={!open} />
      <nav className={`navbar__links navbar__links--mobile ${open ? 'is-open' : ''}`}>
        {nav.links.map((link, i) =>
          link.type === 'route' ? (
            <NavLink
              key={link.label}
              to={link.href}
              end={link.href === '/'}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              {link.label}
            </NavLink>
          ) : (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              {link.label}
            </a>
          )
        )}
        <Link
          to={nav.cta.href}
          className="btn btn--primary navbar__links-cta"
          onClick={() => setOpen(false)}
          style={{ transitionDelay: `${nav.links.length * 40}ms` }}
        >
          {nav.cta.label}
        </Link>
      </nav>
    </header>
  )
}
