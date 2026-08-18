import CtaBanner from '../components/CtaBanner'
import GalleryGrid from '../components/GalleryGrid'
import PageHeader from '../components/PageHeader'
import { gallery } from '../data/venue'
import usePageTitle from '../hooks/usePageTitle'

function GalleryPage() {
  usePageTitle('Galería')

  return (
    <>
      <PageHeader
        eyebrow="Galería"
        title="El recinto y los eventos que pasan por aquí"
        text="Fotos reales del salón y sus áreas. Vamos agregando más conforme se celebran los eventos; si quieres ver un montaje parecido al que imaginas, pídenoslo por WhatsApp."
      />

      <section className="section">
        <div className="container">
          <GalleryGrid items={gallery} />
        </div>
      </section>

      <CtaBanner
        title="Ven a verlo en persona"
        text="Las fotos ayudan, pero el jardín se entiende caminándolo. Agenda una visita guiada de 40 minutos cuando te acomode."
      />
    </>
  )
}

export default GalleryPage
