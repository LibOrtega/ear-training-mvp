import { Link } from 'react-router-dom'
import { heroFacts, venue } from '../data/venue'
import { optimize } from '../lib/images'
import './hero.css'

function Hero() {
  // La foto va detrás de un velo oscuro para que el título conserve contraste.
  // Sin foto, el fondo cae en el degradado que define hero.css.
  const backdrop = venue.heroPhoto
    ? {
        backgroundImage: `linear-gradient(150deg, rgba(11, 12, 14, 0.92) 0%, rgba(11, 12, 14, 0.66) 55%, rgba(11, 12, 14, 0.88) 100%), url(${optimize(
          venue.heroPhoto,
          1800,
        )})`,
      }
    : undefined

  return (
    <section className="hero">
      <div className="hero__backdrop" style={backdrop} aria-hidden="true" />
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
