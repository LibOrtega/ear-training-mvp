import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Al cambiar de ruta el navegador conserva el scroll anterior; aquí lo mandamos
// arriba, salvo cuando la URL trae un ancla concreta (por ejemplo /salones#terraza).
function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1))
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, hash])

  return null
}

export default ScrollManager
