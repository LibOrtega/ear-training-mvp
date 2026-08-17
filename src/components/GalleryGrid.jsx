import Photo from './Photo'
import './gallery-grid.css'

function GalleryGrid({ items }) {
  return (
    <ul className="gallery">
      {items.map((item, index) => (
        <li key={item.id} className={index % 5 === 0 ? 'gallery__item--wide' : undefined}>
          <Photo
            src={item.photo}
            alt={item.caption}
            label={item.caption}
            tone={item.tone}
            ratio={index % 5 === 0 ? '16 / 10' : '4 / 3'}
          />
          <p>{item.caption}</p>
        </li>
      ))}
    </ul>
  )
}

export default GalleryGrid
