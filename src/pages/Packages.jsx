import Faq from '../components/Faq'
import PackageCard from '../components/PackageCard'
import PageHeader from '../components/PageHeader'
import SectionHead from '../components/SectionHead'
import { faqs, packages, venue } from '../data/venue'
import usePageTitle from '../hooks/usePageTitle'
import './packages.css'

// PENDIENTE: confirmar qué servicios adicionales se ofrecen y su costo.
const extras = [
  'Horas extra de evento',
  'Barra de bebidas',
  'Mesa de postres',
  'Música en vivo o DJ',
  'Montaje floral y decoración',
  'Servicio de banquete',
]

function Packages() {
  usePageTitle('Paquetes')

  return (
    <>
      <PageHeader
        eyebrow="Paquetes"
        title="Cada evento se cotiza a su medida"
        text="Estos son los tres formatos con los que trabajamos. El precio depende del espacio, la fecha y el número de invitados, así que lo armamos contigo y te lo mandamos por escrito."
      />

      <section className="section">
        <div className="container grid-3 grid-3--packages">
          {packages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </section>

      <section className="section section--cream">
        <div className="container packages__extras">
          <SectionHead
            eyebrow="Servicios adicionales"
            title="Añade solo lo que quieras"
            text="Cualquiera de estos servicios se puede sumar a tu paquete. Si prefieres traer a tu proveedor, no hay penalización."
          />
          <ul className="extras check-list">
            {extras.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="packages__note">
            Pídenos el desglose por WhatsApp al {venue.phone} y te lo mandamos el mismo día de
            atención.
          </p>
        </div>
      </section>

      {faqs.length > 0 && (
        <section className="section">
          <div className="container container--narrow">
            <SectionHead
              eyebrow="Dudas frecuentes"
              title="Antes de apartar tu fecha"
              align="center"
            />
            <Faq />
          </div>
        </section>
      )}
    </>
  )
}

export default Packages
