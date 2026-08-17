import { Link } from 'react-router-dom'
import Photo from './Photo'
import './space-detail.css'

const tones = ['a', 'b', 'f']

function SpaceDetail({ space, index = 0 }) {
  return (
    <article
      id={space.id}
      className={`space-detail${index % 2 === 1 ? ' space-detail--reverse' : ''}`}
    >
      <Photo
        src={space.photo}
        alt={space.name}
        label={`Fotografía de ${space.name}`}
        tone={tones[index % tones.length]}
        ratio="5 / 4"
        className="space-detail__photo"
      />

      <div className="space-detail__body">
        <span className="tag">{space.bestFor}</span>
        <h2>{space.name}</h2>
        <dl className="space-detail__specs">
          <div>
            <dt>Capacidad</dt>
            <dd>{space.capacity}</dd>
          </div>
          <div>
            <dt>Superficie</dt>
            <dd>{space.area}</dd>
          </div>
        </dl>
        <p className="lead">{space.description}</p>
        <ul className="check-list">
          {space.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
        <Link to="/contacto" className="btn btn--ghost space-detail__cta">
          Cotizar este espacio
        </Link>
      </div>
    </article>
  )
}

export default SpaceDetail
