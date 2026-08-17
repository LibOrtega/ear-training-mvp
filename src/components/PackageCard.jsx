import { Link } from 'react-router-dom'
import './package-card.css'

function PackageCard({ pkg }) {
  return (
    <article className={`package${pkg.featured ? ' package--featured' : ''}`}>
      {pkg.featured && <span className="package__badge">El más elegido</span>}
      <h3>{pkg.name}</h3>
      <p className="package__price">{pkg.price}</p>
      <p className="package__unit">{pkg.unit}</p>
      <p className="package__summary">{pkg.summary}</p>
      <hr className="divider" />
      <ul className="check-list">
        {pkg.includes.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <Link
        to="/contacto"
        className={`btn ${pkg.featured ? 'btn--gold' : 'btn--ghost'} package__cta`}
      >
        Solicitar cotización
      </Link>
    </article>
  )
}

export default PackageCard
