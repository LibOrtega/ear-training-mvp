import React, { useState, useEffect } from 'react';
import { initializeStripe, STRIPE_CONFIG } from '../config/stripe';

function PaymentModalStripe({ onClose, onSuccess }) {
  const [stripe, setStripe] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Inicializar Stripe al cargar el componente
    const initStripe = async () => {
      const stripeInstance = await initializeStripe();
      setStripe(stripeInstance);
    };
    initStripe();
  }, []);

  const handlePayment = async () => {
    if (!stripe) {
      setError('Stripe no está disponible. Intenta recargar la página.');
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      // Aquí normalmente harías una llamada a tu backend para crear el intent de pago
      // Por ahora simulamos el proceso
      
      // Simular creación de sesión de pago
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simular pago exitoso
      const { error: stripeError } = await stripe.redirectToCheckout({
        lineItems: [{
          price: 'price_tutorials_premium', // ID del precio en Stripe
          quantity: 1,
        }],
        mode: 'payment',
        successUrl: `${window.location.origin}/payment-success`,
        cancelUrl: `${window.location.origin}/payment-cancel`,
      });

      if (stripeError) {
        throw new Error(stripeError.message);
      }

      // Si llegamos aquí, el pago fue exitoso
      localStorage.setItem('afinapp_premium', 'true');
      localStorage.setItem('afinapp_premium_date', new Date().toISOString());
      
      onSuccess();
    } catch (error) {
      console.error('Error en el pago:', error);
      setError(error.message || 'Error al procesar el pago. Intenta de nuevo.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '16px',
        boxShadow: '0 10px 30px rgba(255, 140, 66, 0.3)',
        border: '2px solid #ffb74d',
        maxWidth: '500px',
        width: '90%',
        textAlign: 'center',
        position: 'relative'
      }}>
        {/* Botón de cerrar */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            background: 'none',
            border: 'none',
            fontSize: '20px',
            cursor: 'pointer',
            color: '#718096',
            padding: '8px',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
            zIndex: 10
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#fff3e0';
            e.target.style.color = '#f57c00';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.color = '#718096';
          }}
        >
          ✕
        </button>
        
        <h2 style={{
          color: '#f57c00',
          marginBottom: '1.5rem',
          fontSize: '1.8rem',
          fontWeight: '700'
        }}>
          🎵 Acceso Premium - Entrenamiento Auditivo
        </h2>
        
        <div style={{
          background: 'linear-gradient(135deg, #fff8f0 0%, #fff3e0 100%)',
          padding: '1.5rem',
          borderRadius: '12px',
          border: '1px solid #ffcc80',
          marginBottom: '1.5rem'
        }}>
          <h3 style={{
            color: '#f57c00',
            marginBottom: '1rem',
            fontSize: '1.3rem',
            fontWeight: '600'
          }}>Beneficios Incluidos:</h3>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            textAlign: 'left'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#10b981', fontSize: '18px' }}>✓</span>
              <span style={{ fontSize: '14px', color: '#4a5568' }}>Acceso completo a todos los ejercicios</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#10b981', fontSize: '18px' }}>✓</span>
              <span style={{ fontSize: '14px', color: '#4a5568' }}>Progreso personalizado</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#10b981', fontSize: '18px' }}>✓</span>
              <span style={{ fontSize: '14px', color: '#4a5568' }}>Ejemplos prácticos</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#10b981', fontSize: '18px' }}>✓</span>
              <span style={{ fontSize: '14px', color: '#4a5568' }}>Aprende a tu paso</span>
            </div>
          </div>
        </div>
        
        <button
          onClick={handlePayment}
          disabled={!stripe || isProcessing}
          style={{
            backgroundColor: '#ff8c42',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '12px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: (!stripe || isProcessing) ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s ease',
            width: '100%',
            boxShadow: '0 4px 15px rgba(255, 140, 66, 0.3)'
          }}
          onMouseEnter={(e) => {
            if (stripe && !isProcessing) {
              e.target.style.backgroundColor = '#ff6b35';
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 20px rgba(255, 140, 66, 0.4)';
            }
          }}
          onMouseLeave={(e) => {
            if (stripe && !isProcessing) {
              e.target.style.backgroundColor = '#ff8c42';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(255, 140, 66, 0.3)';
            }
          }}
        >
          {isProcessing ? 'Procesando Pago...' : 
           !stripe ? 'Cargando Stripe...' : 'Pago no disponible por el momento'}
        </button>
        
        <p style={{
          color: '#718096',
          fontSize: '14px',
          marginTop: '1rem',
          fontStyle: 'italic'
        }}>
          Acceso inmediato después del pago
        </p>
      </div>
    </div>
  );
}

export default PaymentModalStripe;
