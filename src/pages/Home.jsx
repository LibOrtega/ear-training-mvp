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
import { gallery, packages, spaces, venue } from '../data/venue'
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
            src={null}
            alt={`Jardín de ${venue.name}`}
            label="Fotografía del jardín en un montaje de boda"
            tone="e"
            ratio="4 / 5"
            className="about__photo"
          />
          <div className="about__text">
            <SectionHead
              eyebrow="Quiénes somos"
              title="Un salón familiar con oficio de más de una década"
              text={`Abrimos en ${venue.since} con un jardín y 12 mesas prestadas. Hoy somos tres espacios, un equipo de 20 personas y más de 1,800 eventos celebrados sin cancelar ni uno.`}
            />
            <p>
              Trabajamos con un número limitado de eventos por semana para poder revisar cada
              montaje contigo. Nada de plantillas: te sentamos con la coordinadora, recorres el
              recinto y armamos el plano de mesas antes de que firmes.
            </p>
            <ul className="check-list about__list">
              <li>Contrato claro, con precios cerrados y sin cargos sorpresa</li>
              <li>Planta de luz de respaldo y protocolo de lluvia por escrito</li>
              <li>Proveedores propios opcionales, nunca obligatorios</li>
              <li>Prueba de montaje e iluminación una semana antes</li>
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
            title="Precios claros desde el primer correo"
            text="Los montos incluyen renta, mobiliario, personal y limpieza. Puedes cambiar cualquier elemento por otro de valor equivalente."
            align="center"
          />
          <div className="grid-3 grid-3--packages">
            {packages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
          <p className="home__footnote">
            Los precios varían según el día de la semana y la temporada.{' '}
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

      <CtaBanner />
    </>
  )
}

export default Home
