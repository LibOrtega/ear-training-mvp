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
        title="Eventos que ya pasaron por aquí"
        text="Bodas, XV años, cenas de empresa y comidas familiares. Todas las fotos son de eventos reales celebrados en el recinto."
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
