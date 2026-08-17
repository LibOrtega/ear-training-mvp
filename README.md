# Grandalia · sitio web

Sitio del centro de eventos Grandalia (carretera Rosales–Delicias, Haciendas Campestres): presenta
los espacios, los paquetes y una galería, y recibe solicitudes de cotización que llegan por
WhatsApp. Está hecho con React 19, Vite y React Router, sin backend ni base de datos.

## Requisitos

- Node.js 20 o superior
- npm 10 o superior

## Puesta en marcha

```bash
npm install
npm run dev      # servidor de desarrollo en http://localhost:5173
npm run build    # genera la versión de producción en dist/
npm run preview  # sirve dist/ para revisarlo antes de publicar
npm run lint     # revisa el código con ESLint
```

## Estructura

```
src/
  data/venue.js      Todos los textos, precios y datos de contacto del salón
  components/        Piezas reutilizables (navbar, tarjetas, formulario, galería…)
  pages/             Una vista por ruta: inicio, salones, paquetes, galería, contacto
  hooks/             usePageTitle, para el título de cada página
  index.css          Sistema de diseño: colores, tipografías, botones y utilidades
```

Rutas disponibles: `/`, `/salones`, `/paquetes`, `/galeria`, `/contacto`.

## Qué falta por completar

Todo el contenido editable vive en `src/data/venue.js`, marcado con `PENDIENTE` donde hace falta
información real:

1. **Ya está puesto**: nombre, dirección, WhatsApp (639 119 0106), horario de atención, Instagram
   y Facebook.
2. **Espacios** (`spaces`): faltan los nombres reales, la capacidad y la superficie de cada uno.
   Si `capacity` y `area` quedan en `null`, simplemente no se muestran.
3. **Paquetes** (`packages`): hoy los tres dicen "Cotización a medida". Si quieren publicar
   precios, se cambian ahí, igual que los servicios adicionales de `src/pages/Packages.jsx`.
4. **Testimonios** (`testimonials`) y **preguntas frecuentes** (`faqs`): están vacíos y sus
   secciones no se muestran. En cuanto se llenen, aparecen solas.
5. **Correo** (`venue.email`): está vacío, así que no aparece en el sitio. Al ponerlo se muestra
   en el pie de página y en contacto, y el formulario ofrece enviar también por correo.
6. **Enlace de Google Maps** (`venue.mapsUrl`): ahora es una búsqueda; conviene sustituirlo por el
   pin exacto del salón.
7. **Logo**: el monograma "G" y el favicon (`public/favicon.svg`) se pueden reemplazar por el logo
   real.

## Fotografías

Las rutas ya están escritas en `src/data/venue.js`, así que solo hay que dejar los archivos en
`public/fotos/` con estos nombres exactos y aparecen solos:

| Archivo                       | Dónde se usa                         | Orientación   |
| ----------------------------- | ------------------------------------ | ------------- |
| `fachada-vertical.jpg`        | Sección "Quiénes somos" del inicio   | Vertical      |
| `jardin.jpg`                  | Tarjeta y detalle del jardín         | Horizontal    |
| `terraza.jpg`                 | Tarjeta y detalle de la terraza      | Horizontal    |
| `salon-interior.jpg`          | Tarjeta y detalle del salón interior | Horizontal    |
| `galeria-1.jpg` … `galeria-8.jpg` | Galería                          | Horizontal    |

Mientras un archivo no exista, en su lugar se muestra un marcador de color: el componente `Photo`
detecta que la imagen no cargó y no deja un hueco roto. Eso permite ir subiendo las fotos de a
poco.

Recomendaciones para que el sitio cargue rápido: JPG o WebP, máximo 1600 px de ancho y menos de
400 kB por archivo. Los nombres no deben llevar acentos ni espacios.

Si quieres otros nombres, más fotos en la galería o cambiar los textos que acompañan cada imagen,
todo eso se edita en `src/data/venue.js`.

## Formulario de cotización

`QuoteForm` valida los datos en el navegador y arma un mensaje con el resumen del evento (nombre,
teléfono, tipo de evento, fecha, invitados, espacio y comentarios). Al enviar abre WhatsApp en el
teléfono o la computadora del visitante con ese texto ya escrito y dirigido al número del salón;
el visitante solo presiona enviar. No se guarda nada en ningún servidor, así que no hay nada que
configurar ni contraseñas que cuidar.

La consecuencia de este enfoque es que el mensaje sale del WhatsApp del visitante, así que si
abandona la conversación sin enviarla, la solicitud no llega. Si más adelante quieres que las
solicitudes lleguen solas (por correo o a una hoja de cálculo), el único punto a cambiar es la
función `handleSubmit` de `src/components/QuoteForm.jsx`.

## Publicación

`npm run build` deja el sitio estático en `dist/`, listo para Netlify, Vercel, Cloudflare Pages o
cualquier hosting. La configuración ya está incluida:

- `netlify.toml`: comando de build, carpeta publicada, la redirección de SPA que hace que
  `/salones` o `/contacto` funcionen al recargar, y cabeceras de caché.
- `vercel.json`: lo equivalente para Vercel.

Como es una SPA con rutas, cualquier otro hosting necesita esa misma regla: servir `index.html`
para todas las rutas que no correspondan a un archivo.

### Conectar el dominio

Una vez creado el sitio en Netlify o Vercel y apuntado a este repositorio, el dominio se conecta
desde el panel del registrador donde se compró. Los registros DNS habituales son:

| Tipo    | Nombre | Valor                                       |
| ------- | ------ | ------------------------------------------- |
| `A`     | `@`    | la IP que indique el hosting                |
| `CNAME` | `www`  | el subdominio que asigne el hosting         |

Los valores exactos los da el propio panel de Netlify o Vercel al agregar el dominio; conviene
copiarlos de ahí en lugar de escribirlos de memoria. El certificado HTTPS se emite solo, unos
minutos después de que el DNS propague.

Cuando el dominio esté definido, hay que agregarlo en `index.html` como `og:url` y etiqueta
canónica, y publicar un `sitemap.xml` en `public/`, para que el sitio aparezca bien en Google y al
compartirlo en redes.
