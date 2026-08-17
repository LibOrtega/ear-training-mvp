import { useMemo, useState } from 'react'
import { eventTypes, spaces, venue } from '../data/venue'
import './quote-form.css'

const emptyForm = {
  name: '',
  phone: '',
  email: '',
  eventType: '',
  date: '',
  guests: '',
  space: '',
  message: '',
}

const dateFormatter = new Intl.DateTimeFormat('es-MX', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

function formatDate(value) {
  // El input type="date" entrega AAAA-MM-DD; se interpreta como fecha local
  // para que no se corra un día según la zona horaria.
  const [year, month, day] = value.split('-').map(Number)
  return dateFormatter.format(new Date(year, month - 1, day))
}

function validate(form) {
  const errors = {}

  if (form.name.trim().length < 3) {
    errors.name = 'Escribe tu nombre completo.'
  }

  const digits = form.phone.replace(/\D/g, '')
  if (digits.length < 10) {
    errors.phone = 'Necesitamos un teléfono a 10 dígitos para llamarte.'
  }

  if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) {
    errors.email = 'Revisa el correo, parece incompleto.'
  }

  if (!form.eventType) {
    errors.eventType = 'Elige el tipo de evento.'
  }

  if (!form.date) {
    errors.date = 'Indica la fecha que te interesa.'
  }

  const guests = Number(form.guests)
  if (!form.guests || Number.isNaN(guests) || guests < 1) {
    errors.guests = 'Indica cuántos invitados esperas, aunque sea aproximado.'
  }

  return errors
}

function buildMessage(form) {
  const space = spaces.find((item) => item.id === form.space)

  return [
    `Hola, quiero cotizar un evento en ${venue.name}.`,
    `Nombre: ${form.name.trim()}`,
    `Teléfono: ${form.phone.trim()}`,
    form.email && `Correo: ${form.email.trim()}`,
    `Tipo de evento: ${form.eventType}`,
    `Fecha: ${formatDate(form.date)}`,
    `Invitados: ${form.guests}`,
    space && `Espacio de interés: ${space.name}`,
    form.message.trim() && `Comentarios: ${form.message.trim()}`,
  ]
    .filter(Boolean)
    .join('\n')
}

function QuoteForm() {
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(null)

  const today = useMemo(() => new Date().toISOString().slice(0, 10), [])

  const update = (field) => (event) => {
    const { value } = event.target
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => {
      if (!prev[field]) return prev
      const next = { ...prev }
      delete next[field]
      return next
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const found = validate(form)
    setErrors(found)

    if (Object.keys(found).length > 0) {
      const firstField = Object.keys(found)[0]
      document.getElementById(firstField)?.focus()
      return
    }

    const text = buildMessage(form)
    const whatsappUrl = `https://wa.me/${venue.whatsapp}?text=${encodeURIComponent(text)}`
    const mailUrl = venue.email
      ? `mailto:${venue.email}?subject=${encodeURIComponent(
          `Cotización de evento · ${form.name.trim()}`,
        )}&body=${encodeURIComponent(text)}`
      : null

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
    setSent({ name: form.name.trim().split(' ')[0], whatsappUrl, mailUrl, text })
    setForm(emptyForm)
  }

  if (sent) {
    return (
      <div className="quote quote--sent" role="status">
        <span className="tag">Solicitud lista</span>
        <h3>Gracias, {sent.name}</h3>
        <p>
          Abrimos WhatsApp con tu solicitud lista para que solo le des enviar. En cuanto nos llegue
          te contestamos con disponibilidad y cotización, dentro de nuestro horario de atención.
        </p>
        <pre className="quote__summary">{sent.text}</pre>
        <div className="btn-row">
          <a
            className="btn btn--gold"
            href={sent.whatsappUrl}
            target="_blank"
            rel="noreferrer noopener"
          >
            Abrir WhatsApp de nuevo
          </a>
          {sent.mailUrl && (
            <a className="btn btn--ghost" href={sent.mailUrl}>
              Enviar por correo
            </a>
          )}
          <button type="button" className="btn btn--ghost" onClick={() => setSent(null)}>
            Hacer otra solicitud
          </button>
        </div>
      </div>
    )
  }

  return (
    <form className="quote" onSubmit={handleSubmit} noValidate>
      <div className="quote__grid">
        <div className="field">
          <label htmlFor="name">Nombre completo</label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={form.name}
            onChange={update('name')}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && (
            <p className="field__error" id="name-error">
              {errors.name}
            </p>
          )}
        </div>

        <div className="field">
          <label htmlFor="phone">Teléfono o WhatsApp</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="639 123 4567"
            value={form.phone}
            onChange={update('phone')}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
          />
          {errors.phone && (
            <p className="field__error" id="phone-error">
              {errors.phone}
            </p>
          )}
        </div>

        <div className="field">
          <label htmlFor="email">
            Correo <span className="field__optional">(opcional)</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={update('email')}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <p className="field__error" id="email-error">
              {errors.email}
            </p>
          )}
        </div>

        <div className="field">
          <label htmlFor="eventType">Tipo de evento</label>
          <select
            id="eventType"
            name="eventType"
            value={form.eventType}
            onChange={update('eventType')}
            aria-invalid={Boolean(errors.eventType)}
            aria-describedby={errors.eventType ? 'eventType-error' : undefined}
          >
            <option value="">Selecciona una opción</option>
            {eventTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.eventType && (
            <p className="field__error" id="eventType-error">
              {errors.eventType}
            </p>
          )}
        </div>

        <div className="field">
          <label htmlFor="date">Fecha del evento</label>
          <input
            id="date"
            name="date"
            type="date"
            min={today}
            value={form.date}
            onChange={update('date')}
            aria-invalid={Boolean(errors.date)}
            aria-describedby={errors.date ? 'date-error' : undefined}
          />
          {errors.date && (
            <p className="field__error" id="date-error">
              {errors.date}
            </p>
          )}
        </div>

        <div className="field">
          <label htmlFor="guests">Número de invitados</label>
          <input
            id="guests"
            name="guests"
            type="number"
            inputMode="numeric"
            min="1"
            step="10"
            placeholder="150"
            value={form.guests}
            onChange={update('guests')}
            aria-invalid={Boolean(errors.guests)}
            aria-describedby={errors.guests ? 'guests-error' : undefined}
          />
          {errors.guests && (
            <p className="field__error" id="guests-error">
              {errors.guests}
            </p>
          )}
        </div>

        <div className="field field--full">
          <label htmlFor="space">
            Espacio de interés <span className="field__optional">(opcional)</span>
          </label>
          <select id="space" name="space" value={form.space} onChange={update('space')}>
            <option value="">Que nos recomienden según el evento</option>
            {spaces.map((space) => (
              <option key={space.id} value={space.id}>
                {space.capacity ? `${space.name} · ${space.capacity}` : space.name}
              </option>
            ))}
          </select>
        </div>

        <div className="field field--full">
          <label htmlFor="message">
            Cuéntanos más <span className="field__optional">(opcional)</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            placeholder="Horario aproximado, si necesitas banquete, montaje que imaginas…"
            value={form.message}
            onChange={update('message')}
          />
        </div>
      </div>

      <div className="quote__footer">
        <button type="submit" className="btn btn--primary">
          Enviar por WhatsApp
        </button>
        <p className="quote__note">
          Al enviar se abre WhatsApp con tu solicitud escrita; solo tienes que darle enviar.
          Cotizar no cuesta ni compromete a nada.
        </p>
      </div>
    </form>
  )
}

export default QuoteForm
