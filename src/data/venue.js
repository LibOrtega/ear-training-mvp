// Toda la información editable del sitio vive aquí.
// Lo marcado con PENDIENTE son datos de ejemplo que hay que confirmar.

export const venue = {
  name: 'Grandalia',
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
  // PENDIENTE: ajustar esta descripción con los espacios y servicios reales.
  intro:
    'Un centro de eventos rodeado de campo, a unos minutos de Delicias, para bodas, XV años y celebraciones de empresa. Nos encargamos del montaje y la coordinación para que tú solo tengas que disfrutar.',
  address: 'Carretera Rosales–Delicias, Haciendas Campestres, Chihuahua',
  // PENDIENTE: reemplazar por el enlace exacto del pin de Google Maps del salón.
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Grandalia+Haciendas+Campestres+Carretera+Rosales+Delicias+Chihuahua',
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
  aboutPhoto: '/fotos/fachada-vertical.jpg',
  social: [
    { name: 'Instagram', handle: '@grandaliaeventos', url: 'https://instagram.com/grandaliaeventos' },
    // PENDIENTE: confirmar la dirección exacta de la página de Facebook.
    { name: 'Facebook', handle: 'Grandalia Eventos', url: 'https://facebook.com/grandaliaeventos' },
  ],
}

// Datos que se muestran bajo el título de portada.
export const heroFacts = [
  { label: 'Dónde estamos', value: 'Haciendas Campestres' },
  { label: 'Atención', value: 'Lunes a sábado con cita' },
  { label: 'Cotizaciones', value: 'Por WhatsApp' },
]

// PENDIENTE: confirmar cifras y servicios de estas cuatro tarjetas.
export const highlights = [
  {
    title: 'Espacio para tu fiesta',
    text: 'Un salón amplio con pista de baile, escenario y audio profesional ya instalados.',
    icon: 'guests',
  },
  {
    title: 'Estacionamiento propio',
    text: 'Los invitados se estacionan dentro del predio, sin buscar lugar en la carretera.',
    icon: 'parking',
  },
  {
    title: 'Cocina equipada',
    text: 'Puedes traer tu banquete favorito o pedirnos que te recomendemos proveedores.',
    icon: 'kitchen',
  },
  {
    title: 'Coordinación incluida',
    text: 'Te acompañamos desde la firma del contrato hasta que se va el último invitado.',
    icon: 'planner',
  },
]

// El salón principal ya tiene foto y descripción reales.
// PENDIENTE: confirmar si existen la terraza y el jardín, o borrarlos de esta
// lista, y agregar la capacidad y la superficie de cada espacio.
export const spaces = [
  {
    id: 'salon-principal',
    name: 'Salón principal',
    capacity: null,
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
    id: 'terraza',
    name: 'Terraza',
    capacity: null,
    area: null,
    bestFor: 'Eventos de empresa y graduaciones',
    description:
      'Terraza techada, cómoda en cualquier temporada y lista para escenario o proyección.',
    features: ['Techo fijo', 'Espacio para escenario', 'Zona de registro', 'Barra de bebidas'],
    photo: '/fotos/terraza.jpg',
  },
  {
    id: 'jardin',
    name: 'Jardín',
    capacity: null,
    area: null,
    bestFor: 'Ceremonias y recepciones al aire libre',
    description:
      'El área al aire libre, para la ceremonia o el coctel de bienvenida antes de pasar al salón.',
    features: [
      'Zona para ceremonia',
      'Área para coctel de bienvenida',
      'Iluminación de ambiente',
    ],
    photo: '/fotos/jardin.jpg',
  },
]

export const packages = [
  {
    id: 'esencial',
    name: 'Esencial',
    price: 'Cotización a medida',
    unit: 'eventos pequeños',
    summary: 'Renta del espacio con lo indispensable, ideal si ya tienes tus proveedores.',
    includes: [
      'Renta del espacio con horario de montaje',
      'Mobiliario y mantelería',
      'Iluminación general y de pista',
      'Personal de limpieza',
    ],
    featured: false,
  },
  {
    id: 'celebracion',
    name: 'Celebración',
    price: 'Cotización a medida',
    unit: 'el más solicitado',
    summary: 'El paquete completo: banquete, bebidas y coordinación resueltos.',
    includes: [
      'Renta del espacio con horario extendido',
      'Menú a elegir',
      'Barra de bebidas',
      'Centros de mesa y mantelería de diseño',
      'Coordinación del evento y música',
    ],
    featured: true,
  },
  {
    id: 'gran-evento',
    name: 'Gran evento',
    price: 'Cotización a medida',
    unit: 'eventos grandes',
    summary: 'Producción completa del jardín para bodas y eventos de gran formato.',
    includes: [
      'Uso exclusivo de todo el recinto',
      'Ceremonia con montaje floral',
      'Banquete y mixología de barra',
      'Música en vivo',
      'Prueba de menú previa',
    ],
    featured: false,
  },
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

// Las rutas ya están puestas: basta con guardar los archivos en public/fotos/ con
// estos nombres. Mientras no existan, se muestra un marcador de color.
export const gallery = [
  { id: 1, photo: '/fotos/galeria-1.jpg', caption: 'Montaje de boda en el jardín', tone: 'a' },
  { id: 2, photo: '/fotos/galeria-2.jpg', caption: 'Ceremonia al aire libre', tone: 'b' },
  { id: 3, photo: '/fotos/galeria-3.jpg', caption: 'Cena montada en la terraza', tone: 'c' },
  { id: 4, photo: '/fotos/galeria-4.jpg', caption: 'Barra de bebidas', tone: 'd' },
  { id: 5, photo: '/fotos/galeria-5.jpg', caption: 'Pista de baile al anochecer', tone: 'e' },
  { id: 6, photo: '/fotos/galeria-6.jpg', caption: 'Comida familiar en el salón interior', tone: 'f' },
  { id: 7, photo: '/fotos/galeria-7.jpg', caption: 'Evento de empresa con escenario', tone: 'b' },
  { id: 8, photo: '/fotos/galeria-8.jpg', caption: 'Vista del jardín', tone: 'a' },
]

// Cuando esté vacío, la sección de testimonios no se muestra.
// Agrega los reales así: { name: 'Mariana y Diego', event: 'Boda, marzo 2026', quote: '…' }
export const testimonials = []

// Cuando esté vacío, la sección de preguntas frecuentes no se muestra.
// Faltan las respuestas del salón para: cómo se aparta una fecha y cuánto es el
// anticipo, si se pueden meter proveedores externos, hasta qué hora puede durar
// el evento, qué pasa si llueve y si se puede visitar antes de contratar.
export const faqs = []
