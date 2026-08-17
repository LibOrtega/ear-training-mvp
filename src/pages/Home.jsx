import { Link } from 'react-router-dom'
import CtaBanner from '../components/CtaBanner'
import GalleryGrid from '../components/GalleryGrid'
import Hero from '../components/Hero'
import Highlights from '../components/Highlights'
import PackageCard from '../components/PackageCard'
import Photo from '../components/Photo'
import SectionHead from '../components/SectionHead'
import SpaceCard from '../components/SpaceCard'
import Testimonials from '../components/Testimonials'
import { gallery, packages, spaces, testimonials, venue } from '../data/venue'
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
            label="Aquí va la foto vertical de la fachada"
            tone="e"
            ratio="4 / 5"
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
              <li>Contrato claro, con precios cerrados y sin cargos sorpresa</li>
              <li>Estacionamiento dentro del predio para todos tus invitados</li>
              <li>Puedes traer a tus proveedores o usar los que te recomendamos</li>
              <li>Acompañamiento el día del evento, de principio a fin</li>
            </ul>
            <div className="btn-row">
              <Link to="/contacto" className="btn btn--primary">
                Agendar una visita
              </Link>
              <Link to="/paquetes" className="btn btn--ghost">
                Ver paquetes
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Nuestros espacios"
            title="Tres salones para tres tamaños de fiesta"
            text="Puedes rentarlos por separado o combinar jardín y terraza para eventos de gran formato."
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
        <div className="container">
          <SectionHead
            eyebrow="Paquetes"
            title="Armamos el paquete según tu evento"
            text="Puedes rentar solo el espacio o dejarnos el banquete, las bebidas y la coordinación. Te mandamos el desglose completo por WhatsApp."
            align="center"
          />
          <div className="grid-3 grid-3--packages">
            {packages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
          <p className="home__footnote">
            El precio depende del día de la semana, la temporada y el número de invitados.{' '}
            <Link to="/paquetes" className="text-link">
              Ver qué incluye cada paquete
            </Link>
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Galería"
            title="Cómo se ve el salón montado"
            text="Una muestra de eventos recientes. Si quieres ver fotos de un montaje parecido al tuyo, pídelas por WhatsApp."
          />
          <GalleryGrid items={gallery.slice(0, 4)} />
          <div className="home__gallery-cta">
            <Link to="/galeria" className="btn btn--ghost">
              Ver la galería completa
            </Link>
          </div>
        </div>
      </section>

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
