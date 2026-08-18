import { Link } from 'react-router-dom'
import Photo from './Photo'
import './space-detail.css'

const tones = ['a', 'b', 'f']

function SpaceDetail({ space, index = 0 }) {
  const specs = [
    { label: 'Capacidad', value: space.capacity },
    { label: 'Superficie', value: space.area },
  ].filter((spec) => Boolean(spec.value))

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
        ratio={space.ratio ?? '5 / 4'}
        width={900}
        className="space-detail__photo"
      />

      <div className="space-detail__body">
        <span className="tag">{space.bestFor}</span>
        <h2>{space.name}</h2>
        {specs.length > 0 && (
          <dl className="space-detail__specs">
            {specs.map((spec) => (
              <div key={spec.label}>
                <dt>{spec.label}</dt>
                <dd>{spec.value}</dd>
              </div>
            ))}
          </dl>
        )}
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
