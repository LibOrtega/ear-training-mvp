import { Link } from 'react-router-dom'
import { venue } from '../data/venue'
import './hero.css'

function Hero() {
  return (
    <section className="hero">
      <div className="hero__backdrop" aria-hidden="true" />
      <div className="container hero__inner">
        <span className="eyebrow hero__eyebrow">
          {venue.tagline} · Guadalajara desde {venue.since}
        </span>
        <h1>{venue.claim}</h1>
        <p className="hero__text">{venue.intro}</p>
        <div className="btn-row">
          <Link to="/contacto" className="btn btn--gold">
            Consultar disponibilidad
          </Link>
          <Link to="/salones" className="btn btn--on-dark">
            Ver los salones
          </Link>
        </div>
        <dl className="hero__facts">
          <div>
            <dt>Capacidad</dt>
            <dd>60 a 400 invitados</dd>
          </div>
          <div>
            <dt>Espacios</dt>
            <dd>Jardín, terraza y salón</dd>
          </div>
          <div>
            <dt>Eventos al año</dt>
            <dd>Más de 180</dd>
          </div>
        </dl>
      </div>
    </section>
  )
}

export default Hero
