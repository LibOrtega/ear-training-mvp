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

        {/* Payment Form */}
        <div style={{ padding: '24px' }}>
          <form onSubmit={handleSubmit}>
            {/* Payment Method Selection */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{
                display: 'block',
                marginBottom: '12px',
                fontSize: '16px',
                fontWeight: '600',
                color: '#2d3748'
              }}>
                Método de Pago
              </label>
              <div style={{
                display: 'flex',
                gap: '12px',
                marginBottom: '16px'
              }}>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer'
                }}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span style={{ color: '#4a5568' }}>💳 Tarjeta de Crédito/Débito</span>
                </label>
              </div>
            </div>

            {/* Card Form */}
            {paymentMethod === 'card' && (
              <div style={{ marginBottom: '24px' }}>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#2d3748'
                  }}>
                    Número de Tarjeta *
                  </label>
                  <input
                    type="text"
                    name="number"
                    value={cardData.number}
                    onChange={(e) => setCardData(prev => ({
                      ...prev,
                      number: formatCardNumber(e.target.value)
                    }))}
                    placeholder="1234 5678 9012 3456"
                    maxLength="19"
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      fontSize: '16px',
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0',
                      backgroundColor: '#f7fafc'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#2d3748'
                  }}>
                    Nombre del Titular *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={cardData.name}
                    onChange={handleCardInputChange}
                    placeholder="NOMBRE APELLIDO"
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      fontSize: '16px',
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0',
                      backgroundColor: '#f7fafc'
                    }}
                  />
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '16px'
                }}>
                  <div>
                    <label style={{
                      display: 'block',
                      marginBottom: '8px',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#2d3748'
                    }}>
                      Fecha de Expiración *
                    </label>
                    <input
                      type="text"
                      name="expiry"
                      value={cardData.expiry}
                      onChange={(e) => setCardData(prev => ({
                        ...prev,
                        expiry: formatExpiry(e.target.value)
                      }))}
                      placeholder="MM/AA"
                      maxLength="5"
                      required
                      style={{
                        width: '100%',
                        padding: '12px',
                        fontSize: '16px',
                        borderRadius: '8px',
                        border: '1px solid #e2e8f0',
                        backgroundColor: '#f7fafc'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      marginBottom: '8px',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#2d3748'
                    }}>
                      CVV *
                    </label>
                    <input
                      type="text"
                      name="cvv"
                      value={cardData.cvv}
                      onChange={handleCardInputChange}
                      placeholder="123"
                      maxLength="4"
                      required
                      style={{
                        width: '100%',
                        padding: '12px',
                        fontSize: '16px',
                        borderRadius: '8px',
                        border: '1px solid #e2e8f0',
                        backgroundColor: '#f7fafc'
                      }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Error Message */}
            {/* {error && ( // This line was removed
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
            )} */}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isProcessing}
              style={{
                width: '100%',
                padding: '16px',
                fontSize: '18px',
                fontWeight: '600',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: isProcessing ? '#a0aec0' : '#0056d6',
                color: 'white',
                cursor: isProcessing ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                if (!isProcessing) {
                  e.target.style.backgroundColor = '#004494';
                }
              }}
              onMouseLeave={(e) => {
                if (!isProcessing) {
                  e.target.style.backgroundColor = '#0056d6';
                }
              }}
            >
              {isProcessing ? 'Procesando Pago...' : 'Pagar $200 MXN'}
            </button>
          </form>

          {/* Security Info */}
          <div style={{
            marginTop: '24px',
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
                Pago Seguro
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

export default PaymentModal;
