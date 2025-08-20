import React, { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    instrumento: "",
    alumnos: "",
    mensaje: ""
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos del profesor:", formData);
    alert("Formulario enviado. Nos pondremos en contacto contigo pronto.");
    setFormData({
      nombre: "",
      email: "",
      instrumento: "",
      alumnos: "",
      mensaje: ""
    });
  };

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
        marginBottom: '2rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <h1 style={{
          fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
          margin: '0',
          color: 'var(--text-primary)',
          background: 'var(--primary-gradient)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          textAlign: 'center'
        }}>Contacto para Profesores</h1>
      </div>

      {/* Información introductoria */}
      <div style={{
        border: '1px solid rgba(255, 140, 66, 0.3)',
        padding: '2rem',
        borderRadius: 'var(--border-radius-lg)',
        maxWidth: '100%',
        backgroundColor: 'var(--background-card)',
        boxShadow: 'var(--shadow-lg)',
        marginBottom: '2rem',
        textAlign: 'center',
        backdropFilter: 'blur(10px)',
        backgroundImage: `
          radial-gradient(circle at 25% 25%, rgba(255, 140, 66, 0.05) 1px, transparent 1px),
          radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.05) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        backgroundPosition: '0 0, 25px 25px'
      }}>
        <h2 style={{
          fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
          marginBottom: '16px',
          color: 'var(--text-primary)',
          background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          fontWeight: '600'
        }}>¿Eres profesor de música?</h2>
        <p style={{
          fontSize: 'clamp(14px, 3vw, 18px)',
          color: 'var(--text-secondary)',
          lineHeight: '1.6',
          marginBottom: '16px'
        }}>
          Queremos conocerte y ofrecerte herramientas especiales para tus clases. 
          Afinapp puede ser una excelente herramienta complementaria para tus estudiantes.
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginTop: '20px'
        }}>
          <div style={{
            padding: '1.5rem',
            backgroundColor: 'var(--background-tertiary)',
            borderRadius: 'var(--border-radius-md)',
            border: '1px solid rgba(255, 140, 66, 0.2)',
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
            <h4 style={{ color: 'var(--primary-color)', marginBottom: '8px', fontSize: '1.1rem' }}>🎯 Para tus clases</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
              Ejercicios estructurados que puedes asignar como tarea
            </p>
          </div>
          <div style={{
            padding: '1.5rem',
            backgroundColor: 'var(--background-tertiary)',
            borderRadius: 'var(--border-radius-md)',
            border: '1px solid rgba(139, 92, 246, 0.2)',
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
            <h4 style={{ color: 'var(--primary-color)', marginBottom: '8px', fontSize: '1.1rem' }}>📊 Seguimiento</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
              Reportes del progreso de cada estudiante
            </p>
          </div>
          <div style={{
            padding: '1.5rem',
            backgroundColor: 'var(--background-tertiary)',
            borderRadius: 'var(--border-radius-md)',
            border: '1px solid rgba(255, 140, 66, 0.2)',
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
            <h4 style={{ color: 'var(--primary-color)', marginBottom: '8px', fontSize: '1.1rem' }}>🎵 Personalización</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
              Contenido adaptado al nivel de tus estudiantes
            </p>
          </div>
        </div>
      </div>

      {/* Formulario */}
      <div style={{
        border: '1px solid rgba(255, 140, 66, 0.3)',
        padding: '2rem',
        borderRadius: 'var(--border-radius-lg)',
        maxWidth: '100%',
        backgroundColor: 'var(--background-card)',
        boxShadow: 'var(--shadow-lg)',
        backdropFilter: 'blur(10px)',
        backgroundImage: `
          radial-gradient(circle at 25% 25%, rgba(255, 140, 66, 0.05) 1px, transparent 1px),
          radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.05) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        backgroundPosition: '0 0, 25px 25px'
      }}>
        <h2 style={{
          fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
          textAlign: 'center',
          marginBottom: '24px',
          color: 'var(--text-primary)',
          background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          fontWeight: '600'
        }}>Formulario de Contacto</h2>
        
        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px'
          }}>
            <label style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              color: 'var(--text-primary)',
              fontWeight: '500'
            }}>
              Nombre completo:
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                required
                style={{
                  padding: '14px 16px',
                  fontSize: '16px',
                  borderRadius: 'var(--border-radius-md)',
                  border: '1px solid rgba(255, 140, 66, 0.3)',
                  backgroundColor: 'var(--background-tertiary)',
                  color: 'var(--text-primary)',
                  outline: 'none',
                  transition: 'var(--transition-normal)',
                  backdropFilter: 'blur(10px)'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'rgba(255, 140, 66, 0.6)';
                  e.target.style.boxShadow = '0 0 0 3px rgba(255, 140, 66, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255, 140, 66, 0.3)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </label>

            <label style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              color: 'var(--text-primary)',
              fontWeight: '500'
            }}>
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                style={{
                  padding: '14px 16px',
                  fontSize: '16px',
                  borderRadius: 'var(--border-radius-md)',
                  border: '1px solid rgba(255, 140, 66, 0.3)',
                  backgroundColor: 'var(--background-tertiary)',
                  color: 'var(--text-primary)',
                  outline: 'none',
                  transition: 'var(--transition-normal)',
                  backdropFilter: 'blur(10px)'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'rgba(255, 140, 66, 0.6)';
                  e.target.style.boxShadow = '0 0 0 3px rgba(255, 140, 66, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255, 140, 66, 0.3)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </label>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px'
          }}>
            <label style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              color: 'var(--text-primary)',
              fontWeight: '500'
            }}>
              Instrumento principal que enseñas:
              <input
                type="text"
                name="instrumento"
                value={formData.instrumento}
                onChange={handleInputChange}
                required
                style={{
                  padding: '14px 16px',
                  fontSize: '16px',
                  borderRadius: 'var(--border-radius-md)',
                  border: '1px solid rgba(255, 140, 66, 0.3)',
                  backgroundColor: 'var(--background-tertiary)',
                  color: 'var(--text-primary)',
                  outline: 'none',
                  transition: 'var(--transition-normal)',
                  backdropFilter: 'blur(10px)'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'rgba(255, 140, 66, 0.6)';
                  e.target.style.boxShadow = '0 0 0 3px rgba(255, 140, 66, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255, 140, 66, 0.3)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </label>

            <label style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              color: 'var(--text-primary)',
              fontWeight: '500'
            }}>
              Número aproximado de alumnos:
              <input
                type="number"
                name="alumnos"
                value={formData.alumnos}
                onChange={handleInputChange}
                required
                min="1"
                style={{
                  padding: '14px 16px',
                  fontSize: '16px',
                  borderRadius: 'var(--border-radius-md)',
                  border: '1px solid rgba(255, 140, 66, 0.3)',
                  backgroundColor: 'var(--background-tertiary)',
                  color: 'var(--text-primary)',
                  outline: 'none',
                  transition: 'var(--transition-normal)',
                  backdropFilter: 'blur(10px)'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'rgba(255, 140, 66, 0.6)';
                  e.target.style.boxShadow = '0 0 0 3px rgba(255, 140, 66, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255, 140, 66, 0.3)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </label>
          </div>

          <label style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            color: 'var(--text-primary)',
            fontWeight: '500'
          }}>
            Mensaje adicional (opcional):
            <textarea
              name="mensaje"
              value={formData.mensaje}
              onChange={handleInputChange}
              rows="4"
              placeholder="Cuéntanos más sobre tus necesidades, el nivel de tus estudiantes, o cualquier pregunta que tengas..."
              style={{
                padding: '14px 16px',
                fontSize: '16px',
                borderRadius: 'var(--border-radius-md)',
                border: '1px solid rgba(255, 140, 66, 0.3)',
                backgroundColor: 'var(--background-tertiary)',
                color: 'var(--text-primary)',
                outline: 'none',
                resize: 'vertical',
                transition: 'var(--transition-normal)',
                backdropFilter: 'blur(10px)'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'rgba(255, 140, 66, 0.6)';
                e.target.style.boxShadow = '0 0 0 3px rgba(255, 140, 66, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(255, 140, 66, 0.3)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </label>

          <button 
            type="submit"
            style={{
              padding: '16px 32px',
              fontSize: '18px',
              borderRadius: 'var(--border-radius-md)',
              border: 'none',
              background: 'var(--primary-gradient)',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              fontWeight: 'bold',
              marginTop: '20px',
              transition: 'var(--transition-normal)',
              alignSelf: 'center',
              boxShadow: 'var(--shadow-orange)',
              transform: 'translateY(0)',
              backdropFilter: 'blur(10px)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 20px rgba(255, 140, 66, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'var(--shadow-orange)';
            }}
          >
            No disponible por el momento
          </button>
        </form>
      </div>
      
      {/* Sección de contacto personal */}
      <div style={{
        marginTop: '3rem',
        padding: '2rem',
        background: 'var(--primary-gradient)',
        borderRadius: 'var(--border-radius-lg)',
        textAlign: 'center',
        boxShadow: 'var(--shadow-orange)',
        border: '1px solid rgba(255, 140, 66, 0.3)',
        backdropFilter: 'blur(10px)',
        backgroundImage: `
          radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
          radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        backgroundPosition: '0 0, 25px 25px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          marginBottom: '1rem'
        }}>
          <span style={{ fontSize: '2rem', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}>🎼</span>
          <h2 style={{
            color: 'white',
            fontSize: '1.8rem',
            fontWeight: '700',
            margin: 0
          }}>Afinapp</h2>
        </div>
        
        <p style={{
          color: 'rgba(255, 255, 255, 0.9)',
          fontSize: '1.1rem',
          marginBottom: '2rem',
          fontWeight: '500'
        }}>
          ¿Tienes preguntas? Contáctame:
        </p>
        
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          alignItems: 'center'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            color: 'white',
            fontSize: '1.1rem',
            fontWeight: '500'
          }}>
            <span style={{ fontSize: '1.2rem' }}>🎯</span>
            <span>libertadfarinneo@gmail.com</span>
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            color: 'white',
            fontSize: '1.1rem',
            fontWeight: '500'
          }}>
            <span style={{ fontSize: '1.2rem' }}>📱</span>
            <span>+52 639 165 2842</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
