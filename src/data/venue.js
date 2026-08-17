// Toda la información editable del salón vive aquí.
// Cambia estos valores por los reales antes de publicar el sitio.

export const venue = {
  name: 'Salón Jacarandá',
  tagline: 'Salón de eventos',
  claim: 'El lugar donde tu celebración se vuelve inolvidable',
  intro:
    'Un salón de eventos con jardín, terraza techada y capacidad para 400 invitados. Nos encargamos del montaje, la iluminación y la coordinación para que tú solo tengas que disfrutar.',
  since: 2012,
  address: 'Av. de los Fresnos 1450, Col. Jardines del Valle, Guadalajara, Jal.',
  mapsUrl: 'https://maps.google.com/?q=Guadalajara+Jalisco',
  phone: '33 1234 5678',
  phoneLink: '+523312345678',
  whatsapp: '523312345678',
  email: 'contacto@salonjacaranda.mx',
  schedule: 'Visitas guiadas de lunes a sábado, 10:00 a 19:00 h',
  social: [
    { name: 'Instagram', url: 'https://instagram.com' },
    { name: 'Facebook', url: 'https://facebook.com' },
    { name: 'TikTok', url: 'https://tiktok.com' },
  ],
}

export const highlights = [
  {
    title: '400 invitados',
    text: 'Tres espacios que se combinan según el tamaño de tu evento, desde 60 hasta 400 personas sentadas.',
    icon: 'guests',
  },
  {
    title: 'Estacionamiento propio',
    text: '120 cajones con vigilancia toda la noche y acceso independiente para proveedores.',
    icon: 'parking',
  },
  {
    title: 'Cocina equipada',
    text: 'Puedes traer tu banquete favorito o elegir alguno de nuestros menús de autor.',
    icon: 'kitchen',
  },
  {
    title: 'Coordinación incluida',
    text: 'Una coordinadora te acompaña desde la firma del contrato hasta el último invitado.',
    icon: 'planner',
  },
]

export const spaces = [
  {
    id: 'jardin-jacaranda',
    name: 'Jardín Jacarandá',
    capacity: '250 a 400 invitados',
    area: '1,200 m²',
    bestFor: 'Bodas y XV años',
    description:
      'Nuestro espacio más amplio: jardín arbolado con pista central, pérgola para la ceremonia y una fuente iluminada al anochecer. Incluye carpa opcional en temporada de lluvias.',
    features: [
      'Pérgola para ceremonia civil o religiosa',
      'Pista de baile de 90 m²',
      'Iluminación arquitectónica y de ambiente',
      'Carpa impermeable disponible',
      'Suite para novios con baño privado',
    ],
    photo: null,
  },
  {
    id: 'terraza-almendro',
    name: 'Terraza Almendro',
    capacity: '120 a 220 invitados',
    area: '640 m²',
    bestFor: 'Eventos de empresa y graduaciones',
    description:
      'Terraza techada con vista al jardín, climatizada y lista para proyección. Funciona igual de bien para una cena de gala que para una convención con escenario.',
    features: [
      'Techo fijo y muros corredizos de cristal',
      'Pantalla de 3 m, proyector y audio profesional',
      'Wi-Fi de fibra óptica para 300 dispositivos',
      'Escenario modular de 24 m²',
      'Zona de registro independiente',
    ],
    photo: null,
  },
  {
    id: 'salon-azahar',
    name: 'Salón Azahar',
    capacity: '60 a 120 invitados',
    area: '310 m²',
    bestFor: 'Bautizos, cumpleaños y comidas',
    description:
      'Un salón interior cálido, perfecto para celebraciones familiares. Se renta por horas y es el favorito para eventos de mediodía.',
    features: [
      'Renta por bloques de 5 horas',
      'Área de juegos infantiles a la vista',
      'Barra de bebidas incluida',
      'Aire acondicionado y calefacción',
      'Acceso a nivel, sin escalones',
    ],
    photo: null,
  },
]

export const packages = [
  {
    id: 'esencial',
    name: 'Esencial',
    price: 'Desde $58,000 MXN',
    unit: 'hasta 100 invitados',
    summary: 'Renta del salón con lo indispensable, ideal si ya tienes tus proveedores.',
    includes: [
      '6 horas de evento más 3 de montaje',
      'Mobiliario para 100 personas',
      'Mantelería blanca o negra',
      'Iluminación general y de pista',
      'Personal de limpieza y seguridad',
    ],
    featured: false,
  },
  {
    id: 'celebracion',
    name: 'Celebración',
    price: 'Desde $124,000 MXN',
    unit: 'hasta 200 invitados',
    summary: 'El paquete que elige la mayoría: banquete, bebidas y coordinación resueltos.',
    includes: [
      '8 horas de evento más 4 de montaje',
      'Menú de tres tiempos a elegir',
      'Barra libre nacional 6 horas',
      'Centros de mesa y mantelería de diseño',
      'Coordinadora de evento y DJ',
      'Suite para festejados',
    ],
    featured: true,
  },
  {
    id: 'gran-jacaranda',
    name: 'Gran Jacarandá',
    price: 'Cotización a medida',
    unit: 'desde 200 invitados',
    summary: 'Producción completa del jardín para bodas y eventos de gran formato.',
    includes: [
      'Uso exclusivo de todo el recinto',
      'Ceremonia en la pérgola con montaje floral',
      'Banquete de autor y mixología de barra',
      'Grupo versátil y show de pirotecnia fría',
      'Prueba de menú para 6 personas',
      'Hospedaje de cortesía para los festejados',
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

export const gallery = [
  { id: 1, caption: 'Montaje de boda en el Jardín Jacarandá', tone: 'a', photo: null },
  { id: 2, caption: 'Ceremonia civil en la pérgola', tone: 'b', photo: null },
  { id: 3, caption: 'Cena de gala en la Terraza Almendro', tone: 'c', photo: null },
  { id: 4, caption: 'Barra de mixología', tone: 'd', photo: null },
  { id: 5, caption: 'Pista de baile al anochecer', tone: 'e', photo: null },
  { id: 6, caption: 'Comida familiar en el Salón Azahar', tone: 'f', photo: null },
  { id: 7, caption: 'Convención con escenario y pantalla', tone: 'b', photo: null },
  { id: 8, caption: 'Fuente iluminada del jardín', tone: 'a', photo: null },
]

export const testimonials = [
  {
    name: 'Mariana y Diego',
    event: 'Boda, marzo 2026',
    quote:
      'Nos casamos en el jardín con 320 invitados y todo salió al minuto. La coordinadora resolvió cosas que nosotros ni notamos.',
  },
  {
    name: 'Grupo Ferreta',
    event: 'Cena anual de fin de año',
    quote:
      'Llevamos tres años haciendo la cena de la empresa en la terraza. El audio y la proyección funcionan sin sorpresas.',
  },
  {
    name: 'Familia Ordóñez',
    event: 'XV años de Renata',
    quote:
      'El paquete Celebración nos ahorró contratar por separado. La comida gustó tanto que todavía nos preguntan por el salón.',
  },
]

export const faqs = [
  {
    question: '¿Cómo aparto una fecha?',
    answer:
      'Con el 30 % de anticipo firmamos contrato y la fecha queda bloqueada. El resto se puede pagar en mensualidades hasta 15 días antes del evento.',
  },
  {
    question: '¿Puedo llevar mis propios proveedores?',
    answer:
      'Sí. Puedes traer banquete, música y decoración con la única condición de que entreguen sus documentos de seguridad una semana antes del montaje.',
  },
  {
    question: '¿Hasta qué hora puede durar el evento?',
    answer:
      'El permiso municipal nos permite música hasta la 2:00 h. Después de esa hora se puede extender una hora más con volumen reducido.',
  },
  {
    question: '¿Qué pasa si llueve?',
    answer:
      'El jardín cuenta con carpa impermeable y la terraza techada funciona como plan alterno sin costo extra si se avisa con 48 horas de anticipación.',
  },
  {
    question: '¿Se puede visitar el salón antes de contratar?',
    answer:
      'Claro, las visitas guiadas duran unos 40 minutos y son con cita de lunes a sábado. Te mostramos el recinto montado cuando hay evento próximo.',
  },
]
