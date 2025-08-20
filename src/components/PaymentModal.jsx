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
        {/* Botón de cerrar */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(220, 38, 38, 0.1)',
            border: '1px solid rgba(220, 38, 38, 0.3)',
            fontSize: '20px',
            cursor: 'pointer',
            color: 'var(--text-primary)',
            padding: '8px',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'var(--transition-normal)',
            zIndex: 10,
            backdropFilter: 'blur(10px)'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = 'rgba(220, 38, 38, 0.2)';
            e.target.style.borderColor = 'rgba(220, 38, 38, 0.5)';
            e.target.style.transform = 'scale(1.1)';
            e.target.style.boxShadow = '0 4px 15px rgba(220, 38, 38, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'rgba(220, 38, 38, 0.1)';
            e.target.style.borderColor = 'rgba(220, 38, 38, 0.3)';
            e.target.style.transform = 'scale(1)';
            e.target.style.boxShadow = 'none';
          }}
        >
          ×
        </button>
        
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
          onClick={handleSubmit}
          disabled={isProcessing}
          style={{
            background: isProcessing ? 'rgba(160, 174, 192, 0.5)' : 'var(--primary-gradient)',
            color: 'var(--text-primary)',
            border: 'none',
            padding: '16px 32px',
            borderRadius: 'var(--border-radius-md)',
            fontSize: '16px',
            fontWeight: '600',
            cursor: isProcessing ? 'not-allowed' : 'pointer',
            transition: 'var(--transition-normal)',
            width: '100%',
            boxShadow: isProcessing ? 'none' : 'var(--shadow-orange)',
            transform: 'translateY(0)',
            backdropFilter: 'blur(10px)'
          }}
          onMouseEnter={(e) => {
            if (!isProcessing) {
              e.target.style.transform = 'translateY(-3px)';
              e.target.style.boxShadow = 'var(--shadow-lg)';
            }
          }}
          onMouseLeave={(e) => {
            if (!isProcessing) {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'var(--shadow-orange)';
            }
          }}
        >
          {isProcessing ? 'Procesando Pago...' : 'Continuar con el pago'}
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

export default PaymentModal;
