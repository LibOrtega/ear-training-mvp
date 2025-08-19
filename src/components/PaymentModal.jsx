import React, { useState } from 'react';
import { STRIPE_CONFIG } from '../config/stripe';

function PaymentModal({ onClose, onSuccess }) {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    setCardData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Simular procesamiento de pago
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Aquí normalmente se procesaría el pago real
      // Por ahora simulamos éxito
      
      // Guardar en localStorage que el usuario tiene acceso premium
      localStorage.setItem('afinapp_premium', 'true');
      localStorage.setItem('afinapp_premium_date', new Date().toISOString());
      
      onSuccess();
    } catch {
      // Error handling removed - payment simulation always succeeds
    } finally {
      setIsProcessing(false);
    }
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiry = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
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
          backgroundColor: 'linear-gradient(135deg, #fff8f0 0%, #fff3e0 100%)',
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
          disabled={isProcessing}
          style={{
            backgroundColor: '#ff8c42',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '12px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: isProcessing ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s ease',
            width: '100%',
            boxShadow: '0 4px 15px rgba(255, 140, 66, 0.3)'
          }}
          onMouseEnter={(e) => {
            if (!isProcessing) {
              e.target.style.backgroundColor = '#ff6b35';
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 20px rgba(255, 140, 66, 0.4)';
            }
          }}
          onMouseLeave={(e) => {
            if (!isProcessing) {
              e.target.style.backgroundColor = '#ff8c42';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(255, 140, 66, 0.3)';
            }
          }}
        >
          {isProcessing ? 'Procesando Pago...' : 'Pago no disponible por el momento'}
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

export default PaymentModal;
