import './photo.css'

// Mientras no haya fotografías reales, `src` puede venir vacío y se dibuja
// un marcador decorativo con el mismo encuadre que tendrá la imagen final.
function Photo({ src, alt, tone = 'a', ratio = '4 / 3', label, className = '' }) {
  const classes = ['photo', `photo--${tone}`, className].filter(Boolean).join(' ')

  return (
    <figure className={classes} style={{ aspectRatio: ratio }}>
      {src ? (
        <img src={src} alt={alt} loading="lazy" decoding="async" />
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
