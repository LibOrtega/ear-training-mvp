# Grandalia · sitio web

Sitio del centro de eventos Grandalia (carretera Rosales–Delicias, Haciendas Campestres): presenta
los espacios y una galería, y recibe solicitudes de cotización que llegan por
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
  pages/             Una vista por ruta: inicio, salones, galería, contacto
  hooks/             usePageTitle, para el título de cada página
  index.css          Sistema de diseño: colores, tipografías, botones y utilidades
```

Rutas disponibles: `/`, `/salones`, `/galeria`, `/contacto`. La antigua `/paquetes` redirige a
`/contacto`, porque no se publican paquetes: todo se cotiza en la cita.

## Qué falta por completar

Todo el contenido editable vive en `src/data/venue.js`, marcado con `PENDIENTE` donde hace falta
información real:

1. **Ya está puesto**: nombre, dirección, WhatsApp (639 119 0106), horario de atención, Instagram,
   Facebook, la capacidad del salón (400 invitados) y la foto del salón montado.
2. **Espacios** (`spaces`): son dos, el salón principal y el jardín. Falta la foto y la descripción
   real del jardín, y la superficie en metros de cada uno. Si `capacity` y `area` quedan en `null`,
   simplemente no se muestran.
3. **Proveedores** (`providers`): la lista de servicios con los que se trabaja, que aparece en la
   sección de cotizaciones del inicio. No se publican paquetes ni precios.
4. **Testimonios** (`testimonials`) y **preguntas frecuentes** (`faqs`): están vacíos y sus
   secciones no se muestran. En cuanto se llenen, aparecen solas.
5. **Correo** (`venue.email`): está vacío, así que no aparece en el sitio. Al ponerlo se muestra
   en el pie de página y en contacto, y el formulario ofrece enviar también por correo.
6. **Enlace de Google Maps** (`venue.mapsUrl`): ahora es una búsqueda; conviene sustituirlo por el
   pin exacto del salón.
7. **Logo**: mientras `venue.logo` no exista, el encabezado dibuja la flor en vectores. El favicon
   (`public/favicon.svg`) también se puede reemplazar por el logo real.
8. **Giro**: el letrero de la fachada dice "Centro de eventos" y el logo "Centro social"; el sitio
   usa el primero.

## Fotografías

Las rutas ya están escritas en `src/data/venue.js`, así que solo hay que dejar los archivos en
`public/fotos/` con estos nombres exactos y aparecen solos:

| Archivo                       | Dónde se usa                         | Orientación   |
| ----------------------------- | ------------------------------------ | ------------- |
| `logo.png`                    | Encabezado y pie de página           | Horizontal    |
| `fachada-vertical.jpg`        | Sección "Quiénes somos" del inicio   | Vertical      |
| `jardin.jpg`                  | Tarjeta y detalle del jardín         | Horizontal    |
| `galeria-1.jpg` … `galeria-8.jpg` | Galería                          | Horizontal    |

Mientras un archivo no exista, en su lugar se muestra un marcador de color: el componente `Photo`
detecta que la imagen no cargó y no deja un hueco roto. Eso permite ir subiendo las fotos de a
poco.

El logo funciona igual: si `public/fotos/logo.png` no existe, `Logo` dibuja la flor en vectores
junto al nombre. Conviene que el archivo sea PNG con fondo transparente (o SVG, cambiando la ruta
en `venue.logo`), porque en el encabezado se ve sobre fondo claro y en el pie sobre fondo oscuro.

Recomendaciones para que el sitio cargue rápido: JPG o WebP, máximo 1600 px de ancho y menos de
400 kB por archivo. Los nombres no deben llevar acentos ni espacios.

### Alternativa: imágenes en Cloudinary

En lugar de archivos locales, cualquier campo `photo` (y `venue.logo`) acepta una URL completa de
Cloudinary, pegada tal como la entrega el panel:

```js
photo: 'https://res.cloudinary.com/tu-cuenta/image/upload/v1712345678/jardin.jpg'
```

`src/lib/images.js` le agrega las transformaciones por su cuenta: `f_auto` para servir WebP o AVIF
según el navegador, `q_auto` para la calidad y `c_limit,w_…` para no mandar una imagen más grande
de lo que ocupa el diseño, además de una versión al doble de ancho para pantallas retina. Si la
URL ya trae transformaciones propias, se respeta tal cual.

Con esto no hace falta comprimir nada a mano ni guardar las fotos en el repositorio. La
contrapartida es que el sitio depende de que esa cuenta de Cloudinary siga activa.

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

### Con Vercel

1. En [vercel.com](https://vercel.com): **Add New → Project**, importar este repositorio.
2. No hay que configurar nada: `vercel.json` ya define el framework, el comando de build, la carpeta
   `dist` y la redirección de rutas que necesita una SPA. Dar en **Deploy**.
3. Vercel publica en producción la rama por defecto del repositorio (`main`). Los cambios que estén
   en otra rama salen como *preview deployment*, con su propia dirección, hasta que se fusionen.

Para conectar el dominio: **Project → Settings → Domains**, agregar el dominio y copiar de ahí los
registros DNS al panel del registrador donde se compró.

### Alternativa (Netlify)

Funciona igual con `netlify.toml`: **Add new site → Import an existing project**, elegir el
repositorio y la rama, y **Deploy**.

### Detalles técnicos

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

## Para publicidad

`index.html` ya trae lo que usan las redes y Google al mostrar el sitio:

- Título y descripción propios, más `og:title`, `og:description` y `og:image` (la foto del salón
  recortada a 1200 × 630), que es lo que aparece al pegar el enlace en WhatsApp, Facebook o
  Instagram.
- Datos estructurados de tipo `EventVenue` con nombre, dirección, coordenadas, teléfono, capacidad,
  horario de atención y redes sociales. Si esos datos cambian en `src/data/venue.js`, hay que
  actualizarlos también en el bloque `application/ld+json` de `index.html`.

Aparte del sitio, conviene revisar en el perfil de Google Business que la categoría principal del
negocio sea "centro de eventos" o "salón de fiestas": la ficha actual está clasificada como club
nocturno, lo que reduce las apariciones en búsquedas como "salón de eventos en Delicias".
