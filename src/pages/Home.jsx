import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SimpleFooter from '../components/SimpleFooter';

function Home() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleEarTrainingClick = () => {
    if (isAuthenticated) {
      navigate('/ear-training');
    } else {
      navigate('/login-ear-training');
    }
  };

  return (
    <div className="container-with-pattern">
      {/* Patrón de fondo moderno */}
      <div className="background-pattern"></div>

      {/* Hero Section */}
      <section style={{
        position: 'relative',
        zIndex: 10,
        padding: '6rem 0',
        textAlign: 'center',
        maxWidth: '1200px',
        margin: '0 auto',
        paddingLeft: '2rem',
        paddingRight: '2rem'
      }}>
                 <h1 style={{
           fontSize: 'clamp(2.5rem, 5vw, 4rem)',
           fontWeight: '700',
           color: 'var(--text-primary)',
           marginBottom: '1.5rem',
           lineHeight: '1.2'
         }}>
           El nuevo estándar en{' '}
           <span style={{
             background: 'var(--primary-gradient)',
             WebkitBackgroundClip: 'text',
             WebkitTextFillColor: 'transparent',
             backgroundClip: 'text'
           }}>
             entrenamiento auditivo
           </span>
         </h1>
         
                                                                               
        
        <p style={{
          fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)',
          color: 'var(--text-secondary)',
          marginBottom: '3rem',
          maxWidth: '600px',
          marginLeft: 'auto',
          marginRight: 'auto',
          lineHeight: '1.6'
        }}>
          Usa la música para una visión de 360 grados de tu desarrollo musical. 
          Desde principiantes hasta músicos avanzados, tenemos algo para ti.
        </p>

        <button style={{
          background: 'var(--primary-gradient)',
          color: 'var(--text-primary)',
          border: 'none',
          padding: '16px 32px',
          borderRadius: 'var(--border-radius-md)',
          fontSize: '1.1rem',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'var(--transition-normal)',
          boxShadow: 'var(--shadow-orange)',
          ':hover': {
            transform: 'translateY(-2px)',
            boxShadow: 'var(--shadow-lg)'
          }
        }}>
          Más información
        </button>
      </section>

      {/* Sección de modos */}
      <section id="modes" style={{
        position: 'relative',
        zIndex: 10,
        padding: '4rem 0',
        maxWidth: '1200px',
        margin: '0 auto',
        paddingLeft: '2rem',
        paddingRight: '2rem'
      }}>
        <h2 style={{
          fontSize: 'clamp(2rem, 4vw, 2.5rem)',
          fontWeight: '600',
          color: 'var(--text-primary)',
          textAlign: 'center',
          marginBottom: '3rem'
        }}>
          Haz que tu música te lleve a un nivel superior
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          marginBottom: '4rem'
        }}>
          {/* Card Aficionado */}
          <div style={{
            background: 'var(--background-card)',
            padding: '2rem',
            borderRadius: 'var(--border-radius-lg)',
            border: '1px solid rgba(255, 140, 66, 0.2)',
            transition: 'var(--transition-normal)',
            cursor: 'pointer',
            ':hover': {
              transform: 'translateY(-4px)',
              borderColor: 'var(--primary-color)'
            }
          }} onClick={handleEarTrainingClick}>
                         <div style={{
               width: '60px',
               height: '60px',
               backgroundColor: 'var(--primary-color)',
               borderRadius: 'var(--border-radius-md)',
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
               marginBottom: '1.5rem'
             }}>
               <span style={{ fontSize: '24px', color: 'white', fontWeight: 'bold' }}>A</span>
             </div>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: 'var(--text-primary)',
              marginBottom: '1rem'
            }}>
              Modo Aficionado
            </h3>
            <p style={{
              color: 'var(--text-tertiary)',
              lineHeight: '1.6'
            }}>
              Entrenamiento auditivo personalizado para desarrollar tu oído musical desde cero.
            </p>
          </div>

          {/* Card Músico */}
          <div style={{
            background: 'var(--background-card)',
            padding: '2rem',
            borderRadius: 'var(--border-radius-lg)',
            border: '1px solid rgba(139, 92, 246, 0.2)',
            transition: 'var(--transition-normal)',
            cursor: 'pointer',
            ':hover': {
              transform: 'translateY(-4px)',
              borderColor: 'var(--accent-purple)'
            }
          }} onClick={() => navigate('/musician-mode')}>
                         <div style={{
               width: '60px',
               height: '60px',
               backgroundColor: '#8b5cf6',
               borderRadius: 'var(--border-radius-md)',
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
               marginBottom: '1.5rem'
             }}>
               <span style={{ fontSize: '24px', color: 'white', fontWeight: 'bold' }}>M</span>
             </div>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: 'var(--text-primary)',
              marginBottom: '1rem'
            }}>
              Modo Músico
            </h3>
            <p style={{
              color: 'var(--text-tertiary)',
              lineHeight: '1.6'
            }}>
              Herramientas avanzadas para músicos experimentados que quieren perfeccionar su técnica.
            </p>
          </div>

          {/* Card Profesor */}
          <div style={{
            background: 'var(--background-card)',
            padding: '2rem',
            borderRadius: 'var(--border-radius-lg)',
            border: '1px solid rgba(16, 185, 129, 0.2)',
            transition: 'var(--transition-normal)',
            cursor: 'pointer',
            ':hover': {
              transform: 'translateY(-4px)',
              borderColor: 'var(--accent-green)'
            }
          }} onClick={() => navigate('/contact')}>
                         <div style={{
               width: '60px',
               height: '60px',
               backgroundColor: '#10b981',
               borderRadius: 'var(--border-radius-md)',
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
               marginBottom: '1.5rem'
             }}>
               <span style={{ fontSize: '24px', color: 'white', fontWeight: 'bold' }}>P</span>
             </div>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: 'var(--text-primary)',
              marginBottom: '1rem'
            }}>
              Modo Profesor
            </h3>
            <p style={{
              color: 'var(--text-tertiary)',
              lineHeight: '1.6'
            }}>
              Recursos especializados para educadores musicales y enseñanza avanzada.
            </p>
          </div>
        </div>
      </section>

      {/* Disclaimer de construcción */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        padding: '2rem 0',
        textAlign: 'center',
        maxWidth: '800px',
        margin: '0 auto',
        paddingLeft: '2rem',
        paddingRight: '2rem'
      }}>
        <div style={{
          backgroundColor: 'rgba(255, 140, 66, 0.1)',
          border: '1px solid rgba(255, 140, 66, 0.3)',
          borderRadius: 'var(--border-radius-md)',
          padding: '1rem 1.5rem',
          backdropFilter: 'blur(10px)'
        }}>
                     <p style={{
             color: 'var(--text-secondary)',
             fontSize: '0.9rem',
             margin: '0',
             fontStyle: 'italic'
           }}>
             🚧 <strong>Sitio en construcción:</strong> Algunas funcionalidades pueden no estar completamente disponibles por el momento.
           </p>
        </div>
      </div>

      {/* Footer simple */}
      <footer style={{
        position: 'relative',
        zIndex: 10,
        padding: '2rem 0',
        borderTop: '1px solid rgba(255, 140, 66, 0.2)',
        textAlign: 'center'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 2rem'
        }}>
          <p style={{
            color: 'var(--text-muted)',
            fontSize: '0.9rem'
          }}>
            © 2024 Afinapp. Desarrollado con ❤️ para músicos de todo el mundo.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
