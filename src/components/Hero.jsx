import { Link } from 'react-router-dom'
import { heroFacts, venue } from '../data/venue'
import './hero.css'

function Hero() {
  return (
    <section className="hero">
      <div className="hero__backdrop" aria-hidden="true" />
      <div className="container hero__inner">
        <span className="eyebrow hero__eyebrow">
          {venue.tagline} · {venue.region}
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
          {heroFacts.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

export default Hero
