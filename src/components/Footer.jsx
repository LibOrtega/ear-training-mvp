import { Link } from 'react-router-dom'
import { spaces, venue } from '../data/venue'
import './footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__about">
          <span className="brand__mark" aria-hidden="true">
            SJ
          </span>
          <h3>{venue.name}</h3>
          <p>{venue.intro}</p>
          <ul className="footer__social">
            {venue.social.map((item) => (
              <li key={item.name}>
                <a href={item.url} target="_blank" rel="noreferrer noopener">
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4>Salones</h4>
          <ul className="footer__links">
            {spaces.map((space) => (
              <li key={space.id}>
                <Link to={`/salones#${space.id}`}>{space.name}</Link>
              </li>
            ))}
            <li>
              <Link to="/paquetes">Paquetes y precios</Link>
            </li>
            <li>
              <Link to="/galeria">Galería</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4>Contacto</h4>
          <ul className="footer__links">
            <li>
              <a href={`tel:${venue.phoneLink}`}>{venue.phone}</a>
            </li>
            <li>
              <a href={`mailto:${venue.email}`}>{venue.email}</a>
            </li>
            <li>
              <a href={venue.mapsUrl} target="_blank" rel="noreferrer noopener">
                {venue.address}
              </a>
            </li>
            <li>{venue.schedule}</li>
          </ul>
          <Link to="/contacto" className="btn btn--gold footer__cta">
            Agendar visita
          </Link>
        </div>
      </div>

      <div className="container footer__bottom">
        <p>
          © {new Date().getFullYear()} {venue.name}. Todos los derechos reservados.
        </p>
        <p>Eventos sociales y corporativos desde {venue.since}.</p>
      </div>
    </footer>
  )
}

export default Footer
