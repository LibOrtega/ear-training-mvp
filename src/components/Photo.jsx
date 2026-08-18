import { useState } from 'react'
import { fill, optimize, retina } from '../lib/images'
import './photo.css'

// Mientras no exista la fotografía se dibuja un marcador decorativo con el mismo
// encuadre que tendrá la imagen final. Si el archivo aún no está en public/fotos/
// la imagen falla y también cae en el marcador, para no dejar un hueco roto.
// `crop` (por ejemplo '3:2') pide el recorte a Cloudinary en los huecos donde la
// proporción es fija y la foto puede venir en cualquier orientación.
function Photo({
  src,
  alt,
  tone = 'a',
  ratio = '4 / 3',
  label,
  width = 1200,
  crop,
  className = '',
}) {
  const [failed, setFailed] = useState(false)
  const classes = ['photo', `photo--${tone}`, className].filter(Boolean).join(' ')
  const showImage = Boolean(src) && !failed

  return (
    <figure className={classes} style={{ aspectRatio: ratio }}>
      {showImage ? (
        <img
          src={crop ? fill(src, width, crop) : optimize(src, width)}
          srcSet={retina(src, width, crop)}
          alt={alt}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="photo__placeholder">
          <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
            <path d="M6 34l10.5-12 7.5 8.5L31 22l11 12" />
            <circle cx="17" cy="16" r="3.5" />
            <rect x="4" y="8" width="40" height="32" rx="3" />
          </svg>
          <span className="photo__label">{label ?? alt}</span>
        </span>
      )}
    </figure>
  )
}

export default Photo
