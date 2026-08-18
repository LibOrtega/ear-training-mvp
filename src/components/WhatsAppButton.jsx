import { venue } from '../data/venue'
import './whatsapp-button.css'

const message = encodeURIComponent(
  `Hola, me interesa rentar ${venue.name} para un evento. ¿Me comparten disponibilidad?`,
)

function WhatsAppButton() {
  return (
    <a
      className="wa-button"
      href={`https://wa.me/${venue.whatsapp}?text=${message}`}
      target="_blank"
      rel="noreferrer noopener"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.9.53 3.68 1.46 5.2L2 22l5.1-1.6a9.9 9.9 0 0 0 4.94 1.3c5.44 0 9.84-4.4 9.84-9.84C21.88 6.4 17.48 2 12.04 2Zm5.7 13.9c-.24.68-1.4 1.3-1.93 1.35-.53.05-1.02.24-3.44-.9-2.42-1.15-3.9-3.7-4.02-3.87-.12-.17-.9-1.28-.85-2.42.05-1.14.66-1.68.9-1.92.23-.24.5-.28.66-.28.17 0 .34 0 .49.01.16.01.37-.06.57.45.2.5.7 1.73.76 1.85.06.13.1.28.01.44-.08.17-.4.57-.6.77-.1.1-.24.22-.1.45.13.24.6 1 1.28 1.6.87.79 1.6 1.03 1.83 1.15.23.11.37.1.5-.05.14-.15.6-.68.76-.92.16-.24.32-.19.53-.11.22.08 1.4.66 1.64.78.24.12.4.18.46.28.06.1.06.6-.18 1.28Z" />
      </svg>
      <span>Escríbenos</span>
    </a>
  )
}

export default WhatsAppButton
