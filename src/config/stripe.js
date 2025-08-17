// Configuración de Stripe
export const STRIPE_CONFIG = {
  // Reemplaza con tu clave pública de Stripe
  publishableKey: 'pk_test_...', // Tu clave pública de prueba
  
  // Configuración del producto
  product: {
    name: 'Tutoriales Premium Afinapp',
    price: 20000, // 200 MXN en centavos
    currency: 'mxn',
    description: 'Acceso completo a tutoriales de teoría musical'
  }
};

// Función para inicializar Stripe
export const initializeStripe = async () => {
  try {
    const { loadStripe } = await import('@stripe/stripe-js');
    return await loadStripe(STRIPE_CONFIG.publishableKey);
  } catch (error) {
    console.error('Error al cargar Stripe:', error);
    return null;
  }
};
