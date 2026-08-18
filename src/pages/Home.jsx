import { Link } from 'react-router-dom'
import CtaBanner from '../components/CtaBanner'
import GalleryGrid from '../components/GalleryGrid'
import Hero from '../components/Hero'
import Highlights from '../components/Highlights'
import Photo from '../components/Photo'
import SectionHead from '../components/SectionHead'
import SpaceCard from '../components/SpaceCard'
import Testimonials from '../components/Testimonials'
import { gallery, providers, spaces, testimonials, venue } from '../data/venue'
import usePageTitle from '../hooks/usePageTitle'
import './home.css'

function Home() {
  usePageTitle()

  return (
    <>
      <Hero />

      <section className="section section--tight">
        <div className="container">
          <Highlights />
        </div>
      </section>

      <section className="section section--cream">
        <div className="container about">
          <Photo
            src={venue.aboutPhoto}
            alt={`Fachada de ${venue.name}`}
            label="Fotografía de la fachada"
            tone="e"
            ratio="4 / 5"
            width={700}
            className="about__photo"
          />
          <div className="about__text">
            <SectionHead
              eyebrow="Quiénes somos"
              title="Un centro de eventos a minutos de la ciudad"
              text={`${venue.name} está sobre la carretera Rosales–Delicias, en Haciendas Campestres: lo suficientemente cerca para llegar rápido y lo suficientemente lejos para que la fiesta dure.`}
            />
            <p>
              Trabajamos con un número limitado de eventos por semana para poder revisar cada
              montaje contigo. Nada de plantillas: recorres el salón, platicamos lo que imaginas y
              armamos el plano de mesas antes de que firmes.
            </p>
            <ul className="check-list about__list">
              <li>Cotización clara y por escrito, sin cargos sorpresa</li>
              <li>Estacionamiento dentro del predio para todos tus invitados</li>
              <li>Puedes traer a tus proveedores o usar los que te recomendamos</li>
              <li>Acompañamiento el día del evento, de principio a fin</li>
            </ul>
            <div className="btn-row">
              <Link to="/contacto" className="btn btn--primary">
                Agendar una visita
              </Link>
              <a
                href={`https://wa.me/${venue.whatsapp}`}
                className="btn btn--ghost"
                target="_blank"
                rel="noreferrer noopener"
              >
                Escribir por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Nuestros espacios"
            title="Un salón para la fiesta y un jardín para la ceremonia"
            text="El salón recibe hasta 400 invitados sentados. El jardín se usa para la ceremonia o el coctel de bienvenida, antes de pasar adentro."
            align="center"
          />
          <div className="grid-3">
            {spaces.map((space, index) => (
              <SpaceCard key={space.id} space={space} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--cream">
        <div className="container quoting">
          <div>
            <SectionHead
              eyebrow="Cotizaciones"
              title="Cada evento se cotiza en una cita"
              text="No manejamos paquetes cerrados. Agendas una cita, conoces el salón, nos cuentas cómo imaginas tu evento y ahí mismo te explicamos todo lo que incluye y cuánto costaría."
            />
            <div className="btn-row">
              <Link to="/contacto" className="btn btn--primary">
                Agendar una cita
              </Link>
              <a
                href={`https://wa.me/${venue.whatsapp}`}
                className="btn btn--ghost"
                target="_blank"
                rel="noreferrer noopener"
              >
                Preguntar por WhatsApp
              </a>
            </div>
          </div>

          <div className="card quoting__providers">
            <h3>Contamos con los mejores proveedores de la ciudad</h3>
            <p>
              Ya trabajamos con gente de confianza para cada parte del evento, así que no tienes
              que salir a buscar por tu cuenta. Si ya tienes a tu proveedor favorito, también
              puedes traerlo.
            </p>
            <ul className="check-list">
              {providers.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {gallery.length > 0 && (
        <section className="section">
          <div className="container">
            <SectionHead
              eyebrow="Galería"
              title="Cómo se ve el salón montado"
              text="Una muestra del recinto y de eventos recientes. Si quieres ver fotos de un montaje parecido al tuyo, pídelas por WhatsApp."
            />
            <GalleryGrid items={gallery.slice(0, 4)} />
            <div className="home__gallery-cta">
              <Link to="/galeria" className="btn btn--ghost">
                Ver la galería completa
              </Link>
            </div>
          </div>
        </section>
      )}

      {testimonials.length > 0 && (
        <section className="section section--ink">
          <div className="container">
            <SectionHead
              eyebrow="Testimonios"
              title="Lo que dicen quienes ya celebraron aquí"
              align="center"
            />
            <Testimonials />
          </div>
        </section>
      )}

      <CtaBanner />
    </>
  )
}

export default Home
