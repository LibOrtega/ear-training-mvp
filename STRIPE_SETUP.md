# 🚀 Configuración de Stripe para Afinapp

## 📋 Pasos para Configurar Stripe

### 1. Crear Cuenta en Stripe
- Ve a [stripe.com](https://stripe.com)
- Crea una cuenta gratuita
- Completa la verificación de identidad

### 2. Obtener Claves de API
- En el dashboard de Stripe, ve a **Developers > API keys**
- Copia tu **Publishable key** (empieza con `pk_test_` para pruebas)
- **IMPORTANTE**: Nunca compartas tu **Secret key**

### 3. Configurar el Producto
- Ve a **Products** en el dashboard
- Crea un nuevo producto:
  - **Name**: Tutoriales Premium Afinapp
  - **Price**: $200 MXN
  - **Billing**: One-time
  - **Currency**: MXN

### 4. Actualizar Configuración
- Abre `src/config/stripe.js`
- Reemplaza `pk_test_...` con tu clave pública real
- Actualiza el `price` ID si es necesario

### 5. Configurar Webhooks (Opcional)
- Ve a **Developers > Webhooks**
- Agrega endpoint: `https://tu-dominio.com/api/stripe-webhook`
- Eventos: `checkout.session.completed`

## 🔧 Configuración del Archivo

```javascript
// src/config/stripe.js
export const STRIPE_CONFIG = {
  publishableKey: 'pk_test_TU_CLAVE_AQUI', // ← Reemplaza esto
  product: {
    name: 'Tutoriales Premium Afinapp',
    price: 20000, // 200 MXN en centavos
    currency: 'mxn',
    description: 'Acceso completo a tutoriales de teoría musical'
  }
};
```

## 🧪 Modo de Prueba

- Usa tarjetas de prueba de Stripe:
  - **Visa**: 4242 4242 4242 4242
  - **Mastercard**: 5555 5555 5555 4444
  - **Fecha**: Cualquier fecha futura
  - **CVV**: Cualquier 3 dígitos

## 🚨 Notas Importantes

1. **Nunca** subas claves secretas al repositorio
2. **Siempre** usa variables de entorno en producción
3. **Prueba** primero en modo test antes de ir a live
4. **Verifica** que los webhooks funcionen correctamente

## 📱 Próximos Pasos

1. ✅ Integración básica de Stripe
2. 🔄 Backend para procesar pagos
3. 🔐 Webhooks para confirmar pagos
4. 📊 Dashboard de transacciones
5. 🎯 Analytics de conversión

## 🆘 Soporte

- [Documentación de Stripe](https://stripe.com/docs)
- [Stripe Checkout](https://stripe.com/docs/payments/checkout)
- [Webhooks](https://stripe.com/docs/webhooks)
