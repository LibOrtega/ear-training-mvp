import { useEffect } from 'react'
import { venue } from '../data/venue'

function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} · ${venue.name}` : `${venue.name} · ${venue.tagline}`
  }, [title])
}

export default usePageTitle
