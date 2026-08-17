import Faq from '../components/Faq'
import PackageCard from '../components/PackageCard'
import PageHeader from '../components/PageHeader'
import SectionHead from '../components/SectionHead'
import { packages } from '../data/venue'
import usePageTitle from '../hooks/usePageTitle'
import './packages.css'

const extras = [
  { name: 'Hora extra de evento', price: '$6,500 MXN' },
  { name: 'Carpa para el jardín', price: '$18,000 MXN' },
  { name: 'Barra de mixología (3 h)', price: '$220 MXN por persona' },
  { name: 'Mesa de postres', price: '$9,800 MXN' },
  { name: 'Grupo versátil (4 h)', price: 'Desde $32,000 MXN' },
  { name: 'Pirotecnia fría', price: '$7,400 MXN' },
]

function Packages() {
  usePageTitle('Paquetes y precios')

  return (
    <>
      <PageHeader
        eyebrow="Paquetes"
        title="Precios cerrados, sin letras chiquitas"
        text="Estos son nuestros paquetes base para 2026. Todos incluyen IVA, personal de servicio, seguridad, estacionamiento y limpieza final."
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
            text="Cualquiera de estos servicios se puede sumar a los paquetes Esencial y Celebración. Si prefieres traer a tu proveedor, no hay penalización."
          />
          <ul className="extras">
            {extras.map((item) => (
              <li key={item.name}>
                <span>{item.name}</span>
                <strong>{item.price}</strong>
              </li>
            ))}
          </ul>
          <p className="packages__note">
            Viernes y domingos tienen 15 % de descuento sobre la renta del espacio. Enero y febrero
            son temporada baja.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container container--narrow">
          <SectionHead eyebrow="Dudas frecuentes" title="Antes de apartar tu fecha" align="center" />
          <Faq />
        </div>
      </section>
    </>
  )
}

export default Packages
