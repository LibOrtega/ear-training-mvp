import { Link } from 'react-router-dom'
import Icon from './Icon'
import Photo from './Photo'
import './space-card.css'

const tones = ['a', 'b', 'f']

function SpaceCard({ space, index = 0 }) {
  const meta = [space.capacity, space.area].filter(Boolean).join(' · ')

  return (
    <article className="space-card">
      <Photo
        src={space.photo}
        alt={space.name}
        label={`Fotografía de ${space.name}`}
        tone={tones[index % tones.length]}
        ratio="3 / 2"
        width={700}
        crop="3:2"
        className="space-card__photo"
      />
      <div className="space-card__body">
        <span className="tag">{space.bestFor}</span>
        <h3>{space.name}</h3>
        {meta && <p className="space-card__meta">{meta}</p>}
        <p>{space.description}</p>
        <Link to={`/salones#${space.id}`} className="text-link">
          Conocer el espacio <Icon name="arrow" className="icon--sm" />
        </Link>
      </div>
    </article>
  )
}

export default SpaceCard
