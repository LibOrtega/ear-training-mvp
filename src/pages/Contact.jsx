import Faq from '../components/Faq'
import PageHeader from '../components/PageHeader'
import QuoteForm from '../components/QuoteForm'
import SectionHead from '../components/SectionHead'
import { faqs, venue } from '../data/venue'
import usePageTitle from '../hooks/usePageTitle'
import './contact.css'

function Contact() {
  usePageTitle('Contacto y cotización')

  return (
    <>
      <PageHeader
        eyebrow="Contacto"
        title="Cotiza tu evento"
        text="Llena el formulario y tu solicitud nos llega directo por WhatsApp; te respondemos con disponibilidad y precio en cuanto la veamos. Si prefieres hablar con alguien, también puedes marcarnos."
      />

      <section className="section">
        <div className="container contact">
          <div className="contact__form">
            <QuoteForm />
          </div>

          <aside className="contact__info">
            <div className="card contact__card">
              <h3>Datos de contacto</h3>
              <ul className="contact__list">
                <li>
                  <span>WhatsApp</span>
                  <a
                    href={`https://wa.me/${venue.whatsapp}`}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {venue.phone}
                  </a>
                </li>
                <li>
                  <span>Llamada</span>
                  <a href={`tel:${venue.phoneLink}`}>Marcar al {venue.phone}</a>
                </li>
                {venue.email && (
                  <li>
                    <span>Correo</span>
                    <a href={`mailto:${venue.email}`}>{venue.email}</a>
                  </li>
                )}
                <li>
                  <span>Dirección</span>
                  <a href={venue.mapsUrl} target="_blank" rel="noreferrer noopener">
                    {venue.address}
                  </a>
                </li>
                <li>
                  <span>Horario de atención</span>
                  {venue.hours.map((item) => (
                    <span key={item.days} className="contact__hours">
                      {item.days}: {item.time}
                    </span>
                  ))}
                </li>
              </ul>
            </div>

            <div className="card contact__card contact__card--soft">
              <h3>Cómo trabajamos</h3>
              <ol className="contact__steps">
                <li>
                  <strong>Cotización</strong>
                  Nos llega tu solicitud por WhatsApp y te contestamos con precio y
                  disponibilidad.
                </li>
                <li>
                  <strong>Visita</strong>
                  Recorres el salón con nosotros, sin costo ni compromiso.
                </li>
                <li>
                  <strong>Apartado</strong>
                  Con el anticipo y el contrato firmado, tu fecha queda bloqueada.
                </li>
                <li>
                  <strong>Montaje</strong>
                  Definimos plano de mesas, menú e iluminación antes del evento.
                </li>
              </ol>
            </div>
          </aside>
        </div>
      </section>

      {faqs.length > 0 && (
        <section className="section section--cream">
          <div className="container container--narrow">
            <SectionHead
              eyebrow="Preguntas frecuentes"
              title="Lo que más nos preguntan"
              align="center"
            />
            <Faq />
          </div>
        </section>
      )}
    </>
  )
}

export default Contact
