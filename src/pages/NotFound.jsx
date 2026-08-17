import { Link } from 'react-router-dom'
import usePageTitle from '../hooks/usePageTitle'

function NotFound() {
  usePageTitle('Página no encontrada')

  return (
    <section className="section">
      <div className="container container--narrow" style={{ textAlign: 'center' }}>
        <span className="eyebrow">Error 404</span>
        <h1>Esta página no existe</h1>
        <p className="lead" style={{ marginBlock: '1.25rem 2rem' }}>
          Quizá cambiamos la dirección o el enlace venía incompleto. Desde el inicio puedes llegar a
          los salones, los paquetes y la galería.
        </p>
        <div className="btn-row" style={{ justifyContent: 'center' }}>
          <Link to="/" className="btn btn--primary">
            Volver al inicio
          </Link>
          <Link to="/contacto" className="btn btn--ghost">
            Contactarnos
          </Link>
        </div>
      </div>
    </section>
  )
}

export default NotFound
