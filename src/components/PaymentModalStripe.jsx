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
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
      backdropFilter: 'blur(10px)'
    }}>
      <div style={{
        backgroundColor: 'var(--background-card)',
        padding: '2rem',
        borderRadius: 'var(--border-radius-lg)',
        boxShadow: 'var(--shadow-lg)',
        border: '1px solid rgba(255, 140, 66, 0.3)',
        maxWidth: '450px',
        width: '90%',
        textAlign: 'center',
        position: 'relative',
        maxHeight: '90vh',
        overflowY: 'auto',
        backgroundImage: `
          radial-gradient(circle at 25% 25%, rgba(255, 140, 66, 0.05) 1px, transparent 1px),
          radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.05) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        backgroundPosition: '0 0, 25px 25px'
      }}>

        
        <h2 style={{
          color: 'var(--text-primary)',
          marginBottom: '1.5rem',
          fontSize: '1.8rem',
          fontWeight: '700',
          background: 'var(--primary-gradient)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          🎵 Acceso Premium - Entrenamiento Auditivo
        </h2>
        
        <div style={{
          background: 'var(--background-tertiary)',
          padding: '1rem',
          borderRadius: 'var(--border-radius-md)',
          border: '1px solid rgba(255, 140, 66, 0.2)',
          marginBottom: '1rem',
          backdropFilter: 'blur(10px)'
        }}>
          <h3 style={{
            color: 'var(--text-primary)',
            marginBottom: '1.5rem',
            fontSize: '1.4rem',
            fontWeight: '600',
            textAlign: 'center'
          }}>✨ Beneficios Incluidos:</h3>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            textAlign: 'left'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px',
              padding: '8px 12px',
              background: 'rgba(255, 140, 66, 0.1)',
              borderRadius: 'var(--border-radius-sm)',
              border: '1px solid rgba(255, 140, 66, 0.2)'
            }}>
              <span style={{ color: '#10b981', fontSize: '16px' }}>✓</span>
              <span style={{ fontSize: '12px', color: 'var(--text-primary)', fontWeight: '500' }}>Acceso completo a todos los ejercicios</span>
            </div>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px',
              padding: '8px 12px',
              background: 'rgba(139, 92, 246, 0.1)',
              borderRadius: 'var(--border-radius-sm)',
              border: '1px solid rgba(139, 92, 246, 0.2)'
            }}>
              <span style={{ color: '#10b981', fontSize: '16px' }}>✓</span>
              <span style={{ fontSize: '12px', color: 'var(--text-primary)', fontWeight: '500' }}>Progreso personalizado</span>
            </div>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px',
              padding: '8px 12px',
              background: 'rgba(255, 140, 66, 0.1)',
              borderRadius: 'var(--border-radius-sm)',
              border: '1px solid rgba(255, 140, 66, 0.2)'
            }}>
              <span style={{ color: '#10b981', fontSize: '16px' }}>✓</span>
              <span style={{ fontSize: '12px', color: 'var(--text-primary)', fontWeight: '500' }}>Ejemplos prácticos</span>
            </div>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px',
              padding: '8px 12px',
              background: 'rgba(139, 92, 246, 0.1)',
              borderRadius: 'var(--border-radius-sm)',
              border: '1px solid rgba(139, 92, 246, 0.2)'
            }}>
              <span style={{ color: '#10b981', fontSize: '16px' }}>✓</span>
              <span style={{ fontSize: '12px', color: 'var(--text-primary)', fontWeight: '500' }}>Aprende a tu paso</span>
            </div>
          </div>
        </div>
        
        <button
          onClick={handlePayment}
          disabled={!stripe || isProcessing}
          style={{
            background: (!stripe || isProcessing) ? 'rgba(160, 174, 192, 0.5)' : 'var(--primary-gradient)',
            color: 'var(--text-primary)',
            border: 'none',
            padding: '16px 32px',
            borderRadius: 'var(--border-radius-md)',
            fontSize: '16px',
            fontWeight: '600',
            cursor: (!stripe || isProcessing) ? 'not-allowed' : 'pointer',
            transition: 'var(--transition-normal)',
            width: '100%',
            boxShadow: (!stripe || isProcessing) ? 'none' : 'var(--shadow-orange)',
            transform: 'translateY(0)',
            backdropFilter: 'blur(10px)'
          }}
          onMouseEnter={(e) => {
            if (stripe && !isProcessing) {
              e.target.style.transform = 'translateY(-3px)';
              e.target.style.boxShadow = 'var(--shadow-lg)';
            }
          }}
          onMouseLeave={(e) => {
            if (stripe && !isProcessing) {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'var(--shadow-orange)';
            }
          }}
        >
          {isProcessing ? 'Procesando Pago...' : 
           !stripe ? 'Cargando Stripe...' : 'Pago no disponible por el momento'}
        </button>
        
        {/* Botón Volver atrás */}
        <button
          onClick={onClose}
          style={{
            background: 'rgba(139, 92, 246, 0.1)',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            color: 'var(--text-primary)',
            padding: '10px 20px',
            borderRadius: 'var(--border-radius-md)',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'var(--transition-normal)',
            width: '100%',
            marginTop: '0.75rem',
            backdropFilter: 'blur(10px)'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = 'rgba(139, 92, 246, 0.2)';
            e.target.style.borderColor = 'rgba(139, 92, 246, 0.5)';
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 4px 15px rgba(139, 92, 246, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'rgba(139, 92, 246, 0.1)';
            e.target.style.borderColor = 'rgba(139, 92, 246, 0.3)';
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = 'none';
          }}
                 >
           Volver atrás
         </button>
      </div>
    </div>
  );
}

export default PaymentModalStripe;
