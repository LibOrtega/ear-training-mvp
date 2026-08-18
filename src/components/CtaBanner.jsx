import { Link } from 'react-router-dom'
import { venue } from '../data/venue'
import './cta-banner.css'

function CtaBanner({
  title = '¿Ya tienes fecha en mente?',
  text = 'Escríbenos por WhatsApp y te confirmamos si está libre. Cotizar no cuesta ni compromete a nada.',
}) {
  return (
    <section className="cta-banner">
      <div className="container cta-banner__inner">
        <div>
          <span className="eyebrow">Agenda tu visita</span>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
        <div className="cta-banner__actions">
          <Link to="/contacto" className="btn btn--gold">
            Pedir cotización
          </Link>
          <a href={`tel:${venue.phoneLink}`} className="btn btn--on-dark">
            Llamar {venue.phone}
          </a>
        </div>
      </div>
    </section>
  )
}

export default CtaBanner
