import Photo from './Photo'
import './gallery-grid.css'

// Cada foto conserva su orientación: `ratio` viene de los datos y `wide` permite
// que una foto horizontal ocupe dos columnas cuando vale la pena destacarla.
function GalleryGrid({ items }) {
  return (
    <ul className="gallery">
      {items.map((item) => (
        <li key={item.id} className={item.wide ? 'gallery__item--wide' : undefined}>
          <Photo
            src={item.photo}
            alt={item.caption}
            label={item.caption}
            tone={item.tone}
            ratio={item.ratio ?? '4 / 3'}
            width={item.wide ? 900 : 600}
          />
          <p>{item.caption}</p>
        </li>
      ))}
    </ul>
  )
}

export default GalleryGrid
