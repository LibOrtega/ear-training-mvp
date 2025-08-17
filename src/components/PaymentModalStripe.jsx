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
        borderRadius: '16px',
        maxWidth: '500px',
        width: '100%',
        maxHeight: '90vh',
        overflow: 'auto'
      }}>
        {/* Header */}
        <div style={{
          padding: '24px',
          borderBottom: '1px solid #e2e8f0',
          position: 'relative'
        }}>
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#718096',
              padding: '8px',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#f7fafc';
              e.target.style.color = '#4a5568';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = '#718096';
            }}
          >
            ✕
          </button>
          <div style={{ textAlign: 'center' }}>
            <h1 style={{
              fontSize: '1.8rem',
              color: '#1a202c',
              marginBottom: '8px'
            }}>
              🚀 Desbloquea Tutoriales Premium
            </h1>
            <p style={{
              fontSize: '16px',
              color: '#4a5568',
              margin: 0
            }}>
              Accede a toda la teoría musical y tutoriales avanzados
            </p>
          </div>
        </div>

        {/* Pricing */}
        <div style={{
          padding: '24px',
          backgroundColor: '#f0f9ff',
          borderBottom: '1px solid #e2e8f0'
        }}>
          <div style={{
            textAlign: 'center',
            padding: '20px',
            backgroundColor: 'white',
            borderRadius: '12px',
            border: '2px solid #0056d6'
          }}>
            <div style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              color: '#0056d6',
              marginBottom: '8px'
            }}>
              $200 MXN
            </div>
            <div style={{
              fontSize: '16px',
              color: '#4a5568',
              marginBottom: '16px'
            }}>
              Pago único • Acceso de por vida
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '12px',
              textAlign: 'left'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#10b981', fontSize: '18px' }}>✓</span>
                <span style={{ fontSize: '14px', color: '#4a5568' }}>Teoría completa</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#10b981', fontSize: '18px' }}>✓</span>
                <span style={{ fontSize: '14px', color: '#4a5568' }}>Tutoriales paso a paso</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#10b981', fontSize: '18px' }}>✓</span>
                <span style={{ fontSize: '14px', color: '#4a5568' }}>Ejemplos prácticos</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Section */}
        <div style={{ padding: '24px' }}>
          {/* Error Message */}
          {error && (
            <div style={{
              padding: '12px',
              backgroundColor: '#fed7d7',
              border: '1px solid #feb2b2',
              borderRadius: '8px',
              color: '#c53030',
              marginBottom: '16px',
              fontSize: '14px',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}

          {/* Stripe Payment Button */}
          <button
            onClick={handlePayment}
            disabled={isProcessing || !stripe}
            style={{
              width: '100%',
              padding: '16px',
              fontSize: '18px',
              fontWeight: '600',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: isProcessing || !stripe ? '#a0aec0' : '#0056d6',
              color: 'white',
              cursor: isProcessing || !stripe ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease',
              marginBottom: '16px'
            }}
            onMouseEnter={(e) => {
              if (!isProcessing && stripe) {
                e.target.style.backgroundColor = '#004494';
              }
            }}
            onMouseLeave={(e) => {
              if (!isProcessing && stripe) {
                e.target.style.backgroundColor = '#0056d6';
              }
            }}
          >
            {isProcessing ? 'Procesando...' : 
             !stripe ? 'Cargando Stripe...' : 'Pagar $200 MXN'}
          </button>

          {/* Security Info */}
          <div style={{
            padding: '16px',
            backgroundColor: '#f7fafc',
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
            textAlign: 'center'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              marginBottom: '8px'
            }}>
              <span style={{ color: '#10b981', fontSize: '18px' }}>🔒</span>
              <span style={{ fontSize: '14px', color: '#4a5568', fontWeight: '500' }}>
                Pago Seguro con Stripe
              </span>
            </div>
            <p style={{
              fontSize: '12px',
              color: '#718096',
              margin: 0
            }}>
              Tu información está protegida con encriptación SSL de 256 bits
            </p>
          </div>

          {/* Close Button */}
          <div style={{
            marginTop: '24px',
            textAlign: 'center'
          }}>
            <button
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                color: '#718096',
                cursor: 'pointer',
                fontSize: '14px',
                textDecoration: 'underline'
              }}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentModalStripe;
