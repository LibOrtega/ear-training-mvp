import { useState } from 'react'
import { venue } from '../data/venue'
import { optimize, retina } from '../lib/images'
import './logo.css'

const petal = 'M32 30C28 22.5 28 13.5 32 6C36 13.5 36 22.5 32 30Z'
const angles = [0, -28, 28, -56, 56, -84, 84]

// Aproximación en vectores de la flor del logo, para no depender de un archivo
// de imagen. Se usa mientras no exista `venue.logo` o si ese archivo no carga.
export function LotusMark({ className = '' }) {
  return (
    <svg
      className={`lotus ${className}`.trim()}
      viewBox="0 0 64 32"
      aria-hidden="true"
      focusable="false"
    >
      {angles.map((angle) => (
        <path
          key={angle}
          d={petal}
          fill="currentColor"
          opacity={Math.abs(angle) === 28 ? 0.72 : 1}
          transform={`rotate(${angle} 32 30)`}
        />
      ))}
    </svg>
  )
}

function Logo({ withText = true }) {
  const [failed, setFailed] = useState(false)

  if (venue.logo && !failed) {
    return (
      <img
        className="logo__image"
        src={optimize(venue.logo, 320)}
        srcSet={retina(venue.logo, 320)}
        alt={`${venue.name}, ${venue.tagline}`}
        onError={() => setFailed(true)}
      />
    )
  }

  return (
    <span className="logo">
      <LotusMark className="logo__mark" />
      {withText && (
        <span className="logo__text">
          <strong>{venue.name}</strong>
          <small>{venue.tagline}</small>
        </span>
      )}
    </span>
  )
}

export default Logo
