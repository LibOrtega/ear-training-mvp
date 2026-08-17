import { faqs } from '../data/venue'
import './faq.css'

function Faq() {
  return (
    <div className="faq">
      {faqs.map((item) => (
        <details key={item.question} name="faq">
          <summary>
            {item.question}
            <span className="faq__sign" aria-hidden="true" />
          </summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </div>
  )
}

export default Faq
