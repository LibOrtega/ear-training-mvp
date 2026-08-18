import CtaBanner from '../components/CtaBanner'
import PageHeader from '../components/PageHeader'
import SpaceDetail from '../components/SpaceDetail'
import { spaces } from '../data/venue'
import usePageMeta from '../hooks/usePageMeta'

function Spaces() {
  usePageMeta('Salones')

  return (
    <>
      <PageHeader
        eyebrow="Espacios"
        title="El salón y el jardín"
        text="El salón recibe hasta 500 invitados sentados, con pista de baile y escenario ya montados. El jardín se usa para ceremonias, cocteles o eventos completos al aire libre, y los dos se pueden combinar."
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
