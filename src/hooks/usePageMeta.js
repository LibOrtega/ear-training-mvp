import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { venue } from '../data/venue'

// Título de la pestaña y etiqueta canónica de cada página. La canónica le dice a
// Google cuál es la dirección oficial de la vista que está viendo, para que no
// trate /salones y /galeria como copias de la portada.
function usePageMeta(title) {
  const { pathname } = useLocation()

  useEffect(() => {
    document.title = title ? `${title} · ${venue.name}` : `${venue.name} · ${venue.tagline}`
  }, [title])

  useEffect(() => {
    if (!venue.siteUrl) return

    let link = document.querySelector('link[rel="canonical"]')
    if (!link) {
      link = document.createElement('link')
      link.rel = 'canonical'
      document.head.appendChild(link)
    }
    link.href = `${venue.siteUrl}${pathname === '/' ? '/' : pathname}`
  }, [pathname])
}

export default usePageMeta
