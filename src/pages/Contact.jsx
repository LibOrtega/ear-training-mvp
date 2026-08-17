import Faq from '../components/Faq'
import PageHeader from '../components/PageHeader'
import QuoteForm from '../components/QuoteForm'
import SectionHead from '../components/SectionHead'
import { venue } from '../data/venue'
import usePageTitle from '../hooks/usePageTitle'
import './contact.css'

function Contact() {
  usePageTitle('Contacto y cotización')

  return (
    <>
      <PageHeader
        eyebrow="Contacto"
        title="Cotiza tu evento"
        text="Llena el formulario y te respondemos el mismo día hábil con disponibilidad y precio. Si prefieres hablar con alguien, marca o escríbenos por WhatsApp."
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
                  <span>Teléfono</span>
                  <a href={`tel:${venue.phoneLink}`}>{venue.phone}</a>
                </li>
                <li>
                  <span>WhatsApp</span>
                  <a
                    href={`https://wa.me/${venue.whatsapp}`}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    Abrir conversación
                  </a>
                </li>
                <li>
                  <span>Correo</span>
                  <a href={`mailto:${venue.email}`}>{venue.email}</a>
                </li>
                <li>
                  <span>Dirección</span>
                  <a href={venue.mapsUrl} target="_blank" rel="noreferrer noopener">
                    {venue.address}
                  </a>
                </li>
                <li>
                  <span>Horario</span>
                  {venue.schedule}
                </li>
              </ul>
            </div>

            <div className="card contact__card contact__card--soft">
              <h3>Cómo trabajamos</h3>
              <ol className="contact__steps">
                <li>
                  <strong>Cotización</strong>
                  Recibes precio y disponibilidad por escrito el mismo día hábil.
                </li>
                <li>
                  <strong>Visita guiada</strong>
                  Recorres el recinto con la coordinadora, sin costo ni compromiso.
                </li>
                <li>
                  <strong>Apartado</strong>
                  Con 30 % de anticipo y contrato firmado la fecha queda bloqueada.
                </li>
                <li>
                  <strong>Montaje</strong>
                  Definimos plano de mesas, menú e iluminación un mes antes.
                </li>
              </ol>
            </div>
          </aside>
        </div>
      </section>

      <section className="section section--cream">
        <div className="container container--narrow">
          <SectionHead eyebrow="Preguntas frecuentes" title="Lo que más nos preguntan" align="center" />
          <Faq />
        </div>
      </section>
    </>
  )
}

export default Contact
