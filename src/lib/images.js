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

// Versión al doble de ancho para pantallas de alta densidad, cuando aplica.
export function retina(src, width) {
  const single = optimize(src, width)
  const double = optimize(src, width * 2)
  return single === double ? undefined : `${single} 1x, ${double} 2x`
}
