import React, { useState } from 'react';
import ContactFooter from '../components/ContactFooter';

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
      backgroundColor: '#f8fafc'
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
          color: '#1a202c'
        }}>👨‍🏫 Contacto para Profesores</h1>
      </div>

      {/* Información introductoria */}
      <div style={{
        border: '1px solid #f4d03f',
        padding: '24px',
        borderRadius: '12px',
        maxWidth: '100%',
        background: 'linear-gradient(135deg, #fef9e7 0%, #fdf2e9 100%)',
        boxShadow: '0 4px 8px rgba(244, 208, 63, 0.15)',
        marginBottom: '2rem',
        textAlign: 'center'
      }}>
        <h2 style={{
          fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
          marginBottom: '16px',
          color: '#d68910'
        }}>¿Eres profesor de música?</h2>
        <p style={{
          fontSize: 'clamp(14px, 3vw, 18px)',
          color: '#4a5568',
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
            padding: '16px',
            background: 'linear-gradient(135deg, #fef9e7 0%, #fdf2e9 100%)',
            borderRadius: '8px',
            border: '1px solid #f4d03f'
          }}>
            <h4 style={{ color: '#d68910', marginBottom: '8px' }}>🎯 Para tus clases</h4>
            <p style={{ color: '#4a5568', fontSize: '14px' }}>
              Ejercicios estructurados que puedes asignar como tarea
            </p>
          </div>
          <div style={{
            padding: '16px',
            background: 'linear-gradient(135deg, #fef9e7 0%, #fdf2e9 100%)',
            borderRadius: '8px',
            border: '1px solid #f4d03f'
          }}>
            <h4 style={{ color: '#d68910', marginBottom: '8px' }}>📊 Seguimiento</h4>
            <p style={{ color: '#4a5568', fontSize: '14px' }}>
              Reportes del progreso de cada estudiante
            </p>
          </div>
          <div style={{
            padding: '16px',
            background: 'linear-gradient(135deg, #fef9e7 0%, #fdf2e9 100%)',
            borderRadius: '8px',
            border: '1px solid #f4d03f'
          }}>
            <h4 style={{ color: '#d68910', marginBottom: '8px' }}>🎵 Personalización</h4>
            <p style={{ color: '#4a5568', fontSize: '14px' }}>
              Contenido adaptado al nivel de tus estudiantes
            </p>
          </div>
        </div>
      </div>

      {/* Formulario */}
      <div style={{
        border: '1px solid #f4d03f',
        padding: '24px',
        borderRadius: '12px',
        maxWidth: '100%',
        background: 'linear-gradient(135deg, #fef9e7 0%, #fdf2e9 100%)',
        boxShadow: '0 4px 8px rgba(244, 208, 63, 0.15)'
      }}>
        <h2 style={{
          fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
          textAlign: 'center',
          marginBottom: '24px',
          color: '#d68910'
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
              color: '#2d3748'
            }}>
              Nombre completo:
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                required
                style={{
                  padding: '12px',
                  fontSize: '16px',
                  borderRadius: '8px',
                  border: '1px solid #f4d03f',
                  backgroundColor: '#fef9e7',
                  color: '#2d3748',
                  outline: 'none'
                }}
              />
            </label>

            <label style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              color: '#2d3748'
            }}>
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                style={{
                  padding: '12px',
                  fontSize: '16px',
                  borderRadius: '8px',
                  border: '1px solid #f4d03f',
                  backgroundColor: '#fef9e7',
                  color: '#2d3748',
                  outline: 'none'
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
              color: '#2d3748'
            }}>
              Instrumento principal que enseñas:
              <input
                type="text"
                name="instrumento"
                value={formData.instrumento}
                onChange={handleInputChange}
                required
                style={{
                  padding: '12px',
                  fontSize: '16px',
                  borderRadius: '8px',
                  border: '1px solid #f4d03f',
                  backgroundColor: '#fef9e7',
                  color: '#2d3748',
                  outline: 'none'
                }}
              />
            </label>

            <label style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              color: '#2d3748'
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
                  padding: '12px',
                  fontSize: '16px',
                  borderRadius: '8px',
                  border: '1px solid #f4d03f',
                  backgroundColor: '#fef9e7',
                  color: '#2d3748',
                  outline: 'none'
                }}
              />
            </label>
          </div>

          <label style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            color: '#2d3748'
          }}>
            Mensaje adicional (opcional):
            <textarea
              name="mensaje"
              value={formData.mensaje}
              onChange={handleInputChange}
              rows="4"
              placeholder="Cuéntanos más sobre tus necesidades, el nivel de tus estudiantes, o cualquier pregunta que tengas..."
              style={{
                padding: '12px',
                fontSize: '16px',
                borderRadius: '8px',
                border: '1px solid #f4d03f',
                backgroundColor: '#fef9e7',
                color: '#2d3748',
                outline: 'none',
                resize: 'vertical'
              }}
            />
          </label>

          <button 
            type="submit"
            style={{
              padding: '16px 32px',
              fontSize: '18px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#e67e22',
              color: 'white',
              cursor: 'pointer',
              fontWeight: 'bold',
              marginTop: '20px',
              transition: 'all 0.2s ease',
              alignSelf: 'center',
              boxShadow: '0 4px 15px rgba(230, 126, 34, 0.2)'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#d35400';
              e.target.style.transform = 'scale(1.02)';
              e.target.style.boxShadow = '0 6px 20px rgba(230, 126, 34, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#e67e22';
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = '0 4px 15px rgba(230, 126, 34, 0.2)';
            }}
          >
            Enviar solicitud
          </button>
        </form>
      </div>
      
      {/* Sección de contacto personal */}
      <div style={{
        marginTop: '3rem',
        padding: '2rem',
        background: 'linear-gradient(135deg, #ff8c42 0%, #ff6b35 100%)',
        borderRadius: '16px',
        textAlign: 'center',
        boxShadow: '0 8px 25px rgba(255, 140, 66, 0.3)'
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
