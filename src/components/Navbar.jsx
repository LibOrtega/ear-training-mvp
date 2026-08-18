import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { venue } from '../data/venue'
import Logo from './Logo'
import './navbar.css'

const links = [
  { to: '/', label: 'Inicio' },
  { to: '/salones', label: 'Salones' },
  { to: '/galeria', label: 'Galería' },
  { to: '/contacto', label: 'Contacto' },
]

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">
        <Link to="/" className="brand" aria-label={`${venue.name}, inicio`}>
          <Logo />
        </Link>

        <nav className={`navbar__nav${menuOpen ? ' is-open' : ''}`} aria-label="Navegación principal">
          <ul>
            {links.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} end={link.to === '/'}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <a className="navbar__phone" href={`tel:${venue.phoneLink}`}>
            {venue.phone}
          </a>
          <Link to="/contacto" className="btn btn--gold navbar__cta">
            Pedir cotización
          </Link>
        </nav>

        <button
          type="button"
          className="navbar__toggle"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className={menuOpen ? 'is-open' : ''} />
        </button>
      </div>
    </header>
  )
}

export default Navbar
