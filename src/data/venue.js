// Toda la información editable del sitio vive aquí.
// Lo marcado con PENDIENTE son datos de ejemplo que hay que confirmar.

export const venue = {
  name: 'Grandalia',
  tagline: 'Salón de eventos',
  monogram: 'G',
  // PENDIENTE: confirmar la ciudad que quieren mostrar (se dedujo de la carretera).
  region: 'Delicias, Chihuahua',
  claim: 'El lugar donde tu celebración se vuelve inolvidable',
  // PENDIENTE: ajustar esta descripción con los espacios y servicios reales.
  intro:
    'Un salón de eventos rodeado de campo, a unos minutos de Delicias, para bodas, XV años y celebraciones de empresa. Nos encargamos del montaje y la coordinación para que tú solo tengas que disfrutar.',
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
  { label: 'Cotizaciones', value: 'Por WhatsApp el mismo día' },
]

// PENDIENTE: confirmar cifras y servicios de estas cuatro tarjetas.
export const highlights = [
  {
    title: 'Espacio para tu fiesta',
    text: 'Jardín, terraza y salón que se combinan según el número de invitados que esperas.',
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

// PENDIENTE: nombres, capacidades, medidas y características reales de cada espacio.
export const spaces = [
  {
    id: 'jardin',
    name: 'Jardín',
    // PENDIENTE: capacidad y superficie reales; si quedan en null no se muestran.
    capacity: null,
    area: null,
    bestFor: 'Bodas y XV años',
    description:
      'El espacio al aire libre, con pista central y zona para la ceremonia. Ideal para eventos grandes al atardecer.',
    features: [
      'Pista de baile',
      'Zona para ceremonia',
      'Iluminación de ambiente',
      'Área para banquete',
    ],
    photo: null,
  },
  {
    id: 'terraza',
    name: 'Terraza',
    // PENDIENTE: capacidad y superficie reales; si quedan en null no se muestran.
    capacity: null,
    area: null,
    bestFor: 'Eventos de empresa y graduaciones',
    description:
      'Terraza techada con vista al jardín, cómoda en cualquier temporada y lista para escenario o proyección.',
    features: ['Techo fijo', 'Espacio para escenario', 'Zona de registro', 'Barra de bebidas'],
    photo: null,
  },
  {
    id: 'salon-interior',
    name: 'Salón interior',
    // PENDIENTE: capacidad y superficie reales; si quedan en null no se muestran.
    capacity: null,
    area: null,
    bestFor: 'Bautizos, cumpleaños y comidas',
    description:
      'Un salón cerrado y cálido para celebraciones familiares y eventos de mediodía.',
    features: ['Renta por horas', 'Climatizado', 'Acceso a nivel', 'Área infantil'],
    photo: null,
  },
]

// PENDIENTE: definir los paquetes reales y sus precios.
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

// PENDIENTE: sustituir por fotos reales. Guárdalas en public/fotos/ y pon la ruta
// en `photo`, por ejemplo photo: '/fotos/jardin.jpg'.
export const gallery = [
  { id: 1, caption: 'Montaje de boda en el jardín', tone: 'a', photo: null },
  { id: 2, caption: 'Ceremonia al aire libre', tone: 'b', photo: null },
  { id: 3, caption: 'Cena montada en la terraza', tone: 'c', photo: null },
  { id: 4, caption: 'Barra de bebidas', tone: 'd', photo: null },
  { id: 5, caption: 'Pista de baile al anochecer', tone: 'e', photo: null },
  { id: 6, caption: 'Comida familiar en el salón interior', tone: 'f', photo: null },
  { id: 7, caption: 'Evento de empresa con escenario', tone: 'b', photo: null },
  { id: 8, caption: 'Vista del jardín', tone: 'a', photo: null },
]

// Cuando esté vacío, la sección de testimonios no se muestra.
// Agrega los reales así: { name: 'Mariana y Diego', event: 'Boda, marzo 2026', quote: '…' }
export const testimonials = []

// Cuando esté vacío, la sección de preguntas frecuentes no se muestra.
// Faltan las respuestas del salón para: cómo se aparta una fecha y cuánto es el
// anticipo, si se pueden meter proveedores externos, hasta qué hora puede durar
// el evento, qué pasa si llueve y si se puede visitar antes de contratar.
export const faqs = []
