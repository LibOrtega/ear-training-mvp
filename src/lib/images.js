const UPLOAD = '/image/upload/'

// Cloudinary permite pedir la imagen ya transformada desde la propia URL. Así,
// aunque en `venue.js` se peguen los enlaces tal como los da Cloudinary, el
// sitio pide el formato que soporte el navegador (WebP o AVIF), con calidad
// automática y limitada al ancho que de verdad ocupa el diseño.
export function optimize(src, width) {
  if (!src || !src.includes('res.cloudinary.com') || !src.includes(UPLOAD)) {
    return src
  }

  const [base, rest] = src.split(UPLOAD)
  const firstSegment = rest.split('/')[0]
  const isVersion = /^v\d+$/.test(firstSegment)
  const hasTransforms = !isVersion && /(^|,)[a-z]{1,3}_[^,/]+/.test(firstSegment)

  if (hasTransforms) {
    return src
  }

  return `${base}${UPLOAD}f_auto,q_auto,c_limit,w_${width}/${rest}`
}

// Para los huecos de proporción fija (por ejemplo las tarjetas de los espacios),
// en lugar de recortar con CSS le pedimos el recorte a Cloudinary con `g_auto`,
// que elige la zona relevante de la foto. Así una foto vertical no pierde su
// motivo al entrar en un hueco horizontal.
export function fill(src, width, aspect) {
  if (!src || !src.includes('res.cloudinary.com') || !src.includes(UPLOAD)) {
    return src
  }

  const [base, rest] = src.split(UPLOAD)
  const firstSegment = rest.split('/')[0]
  const isVersion = /^v\d+$/.test(firstSegment)

  if (!isVersion && /(^|,)[a-z]{1,3}_[^,/]+/.test(firstSegment)) {
    return src
  }

  return `${base}${UPLOAD}f_auto,q_auto,c_fill,g_auto,ar_${aspect},w_${width}/${rest}`
}

// Versión al doble de ancho para pantallas de alta densidad, cuando aplica.
export function retina(src, width, aspect) {
  const transform = aspect ? fill : optimize
  const single = transform(src, width, aspect)
  const double = transform(src, width * 2, aspect)
  return single === double ? undefined : `${single} 1x, ${double} 2x`
}
