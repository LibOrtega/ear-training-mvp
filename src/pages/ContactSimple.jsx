import React from 'react';

function ContactSimple() {
  return (
    <div style={{
      maxWidth: '100%',
      width: '100%',
      margin: '0',
      fontFamily: 'system-ui, sans-serif',
      padding: '2rem',
      boxSizing: 'border-box',
      minHeight: 'calc(100vh - 80px)',
      backgroundColor: 'var(--background-primary)',
      backgroundImage: `
        radial-gradient(circle at 25% 25%, rgba(255, 140, 66, 0.03) 1px, transparent 1px),
        radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.03) 1px, transparent 1px)
      `,
      backgroundSize: '100px 100px',
      backgroundPosition: '0 0, 50px 50px'
    }}>
      
      {/* Header de la página */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '3rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <h1 style={{
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          margin: '0',
          color: 'var(--text-primary)',
          background: 'var(--primary-gradient)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          textAlign: 'center'
        }}>Contacto</h1>
      </div>

      {/* Información de contacto */}
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '3rem',
        backgroundColor: 'var(--background-card)',
        borderRadius: 'var(--border-radius-lg)',
        boxShadow: 'var(--shadow-lg)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 140, 66, 0.3)',
        backgroundImage: `
          radial-gradient(circle at 25% 25%, rgba(255, 140, 66, 0.05) 1px, transparent 1px),
          radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.05) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        backgroundPosition: '0 0, 25px 25px'
      }}>
        
        {/* Logo y título */}
        <div style={{
          textAlign: 'center',
          marginBottom: '3rem'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            marginBottom: '1.5rem'
          }}>
            <div style={{
              position: 'relative',
              width: '60px',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {/* Pentagrama musical (5 líneas horizontales) */}
              <div style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                {[0, 1, 2, 3, 4].map((line) => (
                  <div key={line} style={{
                    width: '100%',
                    height: '3px',
                    backgroundColor: 'rgba(139, 92, 246, 0.6)',
                    borderRadius: '2px'
                  }} />
                ))}
              </div>
              
              {/* Clave de sol (treble clef) */}
              <div style={{
                position: 'absolute',
                fontSize: '36px',
                color: 'rgba(139, 92, 246, 0.9)',
                fontWeight: 'bold',
                transform: 'translateY(-3px)'
              }}>𝄞</div>
            </div>
            <span style={{
              fontSize: '2.5rem',
              fontWeight: '700',
              color: 'var(--text-primary)'
            }}>Afinapp</span>
          </div>
          
          <h2 style={{
            fontSize: '1.8rem',
            color: 'var(--text-primary)',
            marginBottom: '1rem',
            fontWeight: '600'
          }}>¿Tienes preguntas? Contáctame:</h2>
          
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '1.1rem',
            lineHeight: '1.6',
            maxWidth: '500px',
            margin: '0 auto'
          }}>
            Soy Libertad, la creadora de Afinapp. Me encantaría ayudarte y recibir tu feedback.
          </p>
        </div>
        
        {/* Tarjetas de contacto */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          <div style={{
            padding: '2rem',
            backgroundColor: 'var(--background-tertiary)',
            borderRadius: 'var(--border-radius-md)',
            border: '1px solid rgba(255, 140, 66, 0.2)',
            textAlign: 'center',
            backdropFilter: 'blur(10px)',
            transition: 'var(--transition-normal)',
            transform: 'translateY(0)'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-4px)';
            e.target.style.boxShadow = 'var(--shadow-md)';
            e.target.style.backgroundColor = 'rgba(255, 140, 66, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = 'none';
            e.target.style.backgroundColor = 'var(--background-tertiary)';
          }}>
            <div style={{
              fontSize: '3rem',
              marginBottom: '1rem'
            }}>📧</div>
            <h3 style={{
              color: 'var(--text-primary)',
              marginBottom: '1rem',
              fontSize: '1.3rem',
              fontWeight: '600'
            }}>Email</h3>
            <a 
              href="mailto:libertadfarinneo@gmail.com"
              style={{
                color: 'var(--primary-color)',
                textDecoration: 'none',
                fontSize: '1.1rem',
                transition: 'var(--transition-normal)',
                fontWeight: '500'
              }}
              onMouseEnter={(e) => {
                e.target.style.color = 'var(--primary-color)';
                e.target.style.textDecoration = 'underline';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = 'var(--primary-color)';
                e.target.style.textDecoration = 'none';
              }}
            >
              libertadfarinneo@gmail.com
            </a>
          </div>
          
          <div style={{
            padding: '2rem',
            backgroundColor: 'var(--background-tertiary)',
            borderRadius: 'var(--border-radius-md)',
            border: '1px solid rgba(139, 92, 246, 0.2)',
            textAlign: 'center',
            backdropFilter: 'blur(10px)',
            transition: 'var(--transition-normal)',
            transform: 'translateY(0)'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-4px)';
            e.target.style.boxShadow = 'var(--shadow-md)';
            e.target.style.backgroundColor = 'rgba(139, 92, 246, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = 'none';
            e.target.style.backgroundColor = 'var(--background-tertiary)';
          }}>
            <div style={{
              fontSize: '3rem',
              marginBottom: '1rem'
            }}>📱</div>
            <h3 style={{
              color: 'var(--text-primary)',
              marginBottom: '1rem',
              fontSize: '1.3rem',
              fontWeight: '600'
            }}>WhatsApp</h3>
            <a 
              href="https://wa.me/526391652842"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: 'var(--primary-color)',
                textDecoration: 'none',
                fontSize: '1.1rem',
                transition: 'var(--transition-normal)',
                fontWeight: '500'
              }}
              onMouseEnter={(e) => {
                e.target.style.color = 'var(--primary-color)';
                e.target.style.textDecoration = 'underline';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = 'var(--primary-color)';
                e.target.style.textDecoration = 'none';
              }}
            >
              +52 639 165 2842
            </a>
          </div>
        </div>
        
        {/* Mensaje personal */}
        <div style={{
          textAlign: 'center',
          borderTop: '1px solid rgba(255, 140, 66, 0.1)',
          paddingTop: '2rem'
        }}>
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '1rem',
            marginBottom: '1.5rem',
            fontStyle: 'italic'
          }}>
            ¡Estoy aquí para ayudarte! Respondo en menos de 24 horas. 😊
          </p>
        </div>
      </div>
    </div>
  );
}

export default ContactSimple;
