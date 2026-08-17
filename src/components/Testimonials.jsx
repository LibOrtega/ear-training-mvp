import { testimonials } from '../data/venue'
import './testimonials.css'

function Testimonials() {
  return (
    <ul className="testimonials">
      {testimonials.map((item) => (
        <li key={item.name}>
          <blockquote>
            <p>{item.quote}</p>
            <footer>
              <cite>{item.name}</cite>
              <span>{item.event}</span>
            </footer>
          </blockquote>
        </li>
      ))}
    </ul>
  )
}

export default Testimonials
