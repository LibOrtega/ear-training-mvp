import CtaBanner from '../components/CtaBanner'
import PageHeader from '../components/PageHeader'
import SpaceDetail from '../components/SpaceDetail'
import { spaces } from '../data/venue'
import usePageTitle from '../hooks/usePageTitle'

function Spaces() {
  usePageTitle('Salones')

  return (
    <>
      <PageHeader
        eyebrow="Espacios"
        title="Elige el salón según tu evento"
        text="Puedes rentar cada espacio por separado o combinarlos cuando el evento es grande. Todos incluyen mobiliario, estacionamiento dentro del predio y limpieza."
      />

      <section className="section">
        <div className="container">
          {spaces.map((space, index) => (
            <SpaceDetail key={space.id} space={space} index={index} />
          ))}
        </div>
      </section>

      <CtaBanner
        title="¿No sabes cuál te conviene?"
        text="Cuéntanos cuántos invitados esperas y a qué hora quieres la fiesta; nosotros te decimos qué espacio funciona mejor y cuánto costaría."
      />
    </>
  )
}

export default Spaces
