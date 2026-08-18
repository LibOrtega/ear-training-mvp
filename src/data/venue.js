// Toda la información editable del sitio vive aquí.
// Lo marcado con PENDIENTE son datos de ejemplo que hay que confirmar.

export const venue = {
  name: 'Grandalia',
  siteUrl: 'https://grandaliaeventos.com',
  // El letrero de la fachada dice "Centro de eventos" y el logo "Centro social".
  // PENDIENTE: confirmar cuál de los dos se queda.
  tagline: 'Centro de eventos',
  // Logo real. Mientras el archivo no exista se dibuja la flor en vectores.
  logo: '/fotos/logo.png',
  // Foto de fondo de la portada; se muestra oscurecida detrás del título.
  heroPhoto:
    'https://res.cloudinary.com/dozhrm24l/image/upload/v1787011836/RET07413_nln8qr.jpg',
  // PENDIENTE: confirmar la ciudad que quieren mostrar (se dedujo de la carretera).
  region: 'Delicias, Chihuahua',
  claim: 'El lugar donde tu celebración se vuelve inolvidable',
  intro:
    'Un salón para hasta 400 invitados, con jardín para la ceremonia, a unos minutos de Delicias. La pista de baile, el escenario y el audio ya están instalados, y el estacionamiento es dentro del predio.',
  address: 'Carretera Rosales–Delicias, Haciendas Campestres, Chihuahua',
  mapsUrl: 'https://maps.app.goo.gl/NfiDvbXxc3t9UoJ3A',
  coordinates: '28.1831918, -105.5380766',
  // Mapa embebido en la página de contacto. Queda apagado porque no se pudo
  // comprobar que cargue; para activarlo, pega aquí la URL del iframe que da
  // Google en Compartir > Insertar un mapa y revisa que se vea en el navegador:
  // 'https://www.google.com/maps/embed?origin=mfe&pb=!1m3!2m1!1s28.1831918,-105.5380766!6i15'
  mapEmbed: null,
  phone: '639 119 0106',
  phoneLink: '+526391190106',
  // Formato internacional sin signos ni espacios, como lo pide wa.me.
  whatsapp: '526391190106',
  // PENDIENTE: si tienen correo de contacto, agrégalo aquí y aparecerá en el sitio.
  email: '',
  hours: [
    { days: 'Lunes a viernes', time: '10:00 a 13:00 h y 15:00 a 18:00 h' },
    { days: 'Sábados', time: '10:00 a 13:00 h' },
  ],
  // Foto vertical que acompaña la sección "Quiénes somos" del inicio.
  aboutPhoto:
    'https://res.cloudinary.com/dozhrm24l/image/upload/v1787013363/8752fbf6-7ceb-47c2-8665-1fed229cc978_qfwmwd.jpg',
  social: [
    { name: 'Instagram', handle: '@grandaliaeventos', url: 'https://instagram.com/grandaliaeventos' },
    // PENDIENTE: confirmar la dirección exacta de la página de Facebook.
    { name: 'Facebook', handle: 'Grandalia Eventos', url: 'https://facebook.com/grandaliaeventos' },
  ],
}

// Datos que se muestran bajo el título de portada.
export const heroFacts = [
  { label: 'Capacidad', value: 'Hasta 400 invitados' },
  { label: 'Dónde estamos', value: 'Haciendas Campestres' },
  { label: 'Cotizaciones', value: 'En cita, sin costo' },
]

export const highlights = [
  {
    title: 'Hasta 400 invitados',
    text: 'El salón recibe hasta 400 personas sentadas, con montaje de mesas redondas alrededor de la pista.',
    icon: 'guests',
  },
  {
    title: 'Estacionamiento propio',
    text: 'Tus invitados se estacionan dentro del predio, sin buscar lugar sobre la carretera.',
    icon: 'parking',
  },
  {
    title: 'Pista, escenario y audio',
    text: 'La pista de baile de madera, el escenario con pantallas y el equipo de audio ya están instalados.',
    icon: 'audio',
  },
  {
    title: 'Jardín para la ceremonia',
    text: 'El área exterior se monta con pasillo, sillas y altar, para que la ceremonia sea aquí mismo.',
    icon: 'garden',
  },
]

// Los dos espacios ya tienen foto, descripción y características reales.
// PENDIENTE: la superficie en metros de cada uno, si la tienen a mano.
export const spaces = [
  {
    id: 'salon-principal',
    name: 'Salón principal',
    capacity: 'Hasta 400 invitados',
    // PENDIENTE: superficie en metros cuadrados, si la tienen a mano.
    area: null,
    bestFor: 'Bodas y XV años',
    description:
      'El corazón del centro de eventos: pista de baile de madera al centro, escenario con pantallas y audio profesional, y cortinas de luces cálidas que envuelven el área de mesas.',
    features: [
      'Pista de baile amplia',
      'Escenario con pantallas y audio profesional',
      'Iluminación de ambiente y juego de luces en pista',
      'Techo decorado con telas e iluminación',
      'Montaje de mesas redondas con mantelería',
    ],
    photo:
      'https://res.cloudinary.com/dozhrm24l/image/upload/v1787011836/RET07413_nln8qr.jpg',
  },
  {
    id: 'jardin',
    name: 'Jardín',
    capacity: null,
    area: null,
    bestFor: 'Ceremonias y coctel de bienvenida',
    description:
      'El área exterior donde se montan las ceremonias al atardecer: pasillo con alfombra, sillas, carpa para el altar y letras iluminadas, con el jardín y la fachada como fondo. También funciona para el coctel de bienvenida antes de pasar al salón.',
    features: [
      'Montaje de ceremonia con pasillo y sillas',
      'Carpa para el altar',
      'Letras y palmeras iluminadas',
      'Salas exteriores para la bienvenida',
      'Piso firme, sin escalones',
    ],
    photo:
      'https://res.cloudinary.com/dozhrm24l/image/upload/v1787014953/7d45afc0-3746-4f94-af6c-148b349afa76_w9aox0.jpg',
    ratio: '4 / 3',
  },
]

// Con qué proveedores se trabaja. PENDIENTE: ajustar la lista a los servicios
// que de verdad se ofrecen o se consiguen.
export const providers = [
  'Banquete y servicio de meseros',
  'Música, DJ y grupo versátil',
  'Decoración y arreglos florales',
  'Fotografía y video',
  'Mesa de postres y repostería',
  'Mobiliario y mantelería especial',
]

export const eventTypes = [
  'Boda',
  'XV años',
  'Evento de empresa',
  'Graduación',
  'Bautizo o primera comunión',
  'Cumpleaños',
  'Otro',
]

// La galería solo muestra las fotos que existen; si queda vacía, la sección no
// aparece. Para agregar más, pega la URL de Cloudinary y escribe el pie de foto.
// `ratio` conserva la orientación de cada foto ('3 / 4' vertical, '4 / 3' u
// '3 / 2' horizontal), `wide` la extiende a dos columnas y `tone` solo define el
// color del marcador en caso de que la imagen no cargara.
export const gallery = [
  {
    id: 'fachada',
    photo:
      'https://res.cloudinary.com/dozhrm24l/image/upload/v1787013363/8752fbf6-7ceb-47c2-8665-1fed229cc978_qfwmwd.jpg',
    caption: 'La entrada, sobre la carretera Rosales–Delicias',
    ratio: '3 / 4',
    tone: 'f',
  },
  {
    id: 'salon-montado',
    photo:
      'https://res.cloudinary.com/dozhrm24l/image/upload/v1787011836/RET07413_nln8qr.jpg',
    caption: 'El salón montado, con la pista de baile al centro',
    ratio: '3 / 2',
    wide: true,
    tone: 'e',
  },
  {
    id: 'ceremonia-jardin',
    photo:
      'https://res.cloudinary.com/dozhrm24l/image/upload/v1787014953/7d45afc0-3746-4f94-af6c-148b349afa76_w9aox0.jpg',
    caption: 'Ceremonia montada en el jardín, al atardecer',
    ratio: '4 / 3',
    wide: true,
    tone: 'b',
  },
  {
    id: 'jardin-atardecer',
    photo:
      'https://res.cloudinary.com/dozhrm24l/image/upload/v1787014802/e5ab70f8-139c-48d7-8b6e-3ed6173bafee_c2mszu.jpg',
    caption: 'El jardín al atardecer, con las salas exteriores',
    ratio: '3 / 4',
    tone: 'a',
  },
  {
    id: 'recepcion',
    photo:
      'https://res.cloudinary.com/dozhrm24l/image/upload/v1787014694/f471d113-da6c-4bf2-9ee9-191be0135df3_bagwt1.jpg',
    caption: 'La recepción, de doble altura y con candelabros',
    ratio: '3 / 4',
    tone: 'f',
  },
]

// Cuando esté vacío, la sección de testimonios no se muestra.
// Agrega los reales así: { name: 'Mariana y Diego', event: 'Boda, marzo 2026', quote: '…' }
export const testimonials = []

// Cuando esté vacío, la sección de preguntas frecuentes no se muestra.
// Faltan las respuestas del salón para: cómo se aparta una fecha y cuánto es el
// anticipo, si se pueden meter proveedores externos, hasta qué hora puede durar
// el evento, qué pasa si llueve y si se puede visitar antes de contratar.
export const faqs = []
