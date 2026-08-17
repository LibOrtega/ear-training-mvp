import { highlights } from '../data/venue'
import Icon from './Icon'
import './highlights.css'

function Highlights() {
  return (
    <ul className="highlights">
      {highlights.map((item) => (
        <li key={item.title} className="highlight">
          <span className="highlight__icon">
            <Icon name={item.icon} />
          </span>
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </li>
      ))}
    </ul>
  )
}

export default Highlights
