import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Contact() {
  const navigate = useNavigate();
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
      minHeight: 'calc(100vh - 80px)'
    }}>
      {/* Header de la página */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <h1 style={{
          fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
          margin: '0',
          color: 'white'
        }}>👨‍🏫 Contacto para Profesores</h1>
        
        <button 
          onClick={() => navigate('/')}
          style={{
            padding: '8px 16px',
            fontSize: '14px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: '#666',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          ← Volver al inicio
        </button>
      </div>

      {/* Información introductoria */}
      <div style={{
        border: '2px solid #444',
        padding: '24px',
        borderRadius: '12px',
        maxWidth: '100%',
        backgroundColor: '#2a2a2a',
        boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
        marginBottom: '2rem',
        textAlign: 'center'
      }}>
        <h2 style={{
          fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
          marginBottom: '16px',
          color: '#4CAF50'
        }}>¿Eres profesor de música?</h2>
        <p style={{
          fontSize: 'clamp(14px, 3vw, 18px)',
          color: '#ccc',
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
            backgroundColor: '#333',
            borderRadius: '8px',
            border: '1px solid #555'
          }}>
            <h4 style={{ color: '#4CAF50', marginBottom: '8px' }}>🎯 Para tus clases</h4>
            <p style={{ color: '#ccc', fontSize: '14px' }}>
              Ejercicios estructurados que puedes asignar como tarea
            </p>
          </div>
          <div style={{
            padding: '16px',
            backgroundColor: '#333',
            borderRadius: '8px',
            border: '1px solid #555'
          }}>
            <h4 style={{ color: '#2196F3', marginBottom: '8px' }}>📊 Seguimiento</h4>
            <p style={{ color: '#ccc', fontSize: '14px' }}>
              Reportes del progreso de cada estudiante
            </p>
          </div>
          <div style={{
            padding: '16px',
            backgroundColor: '#333',
            borderRadius: '8px',
            border: '1px solid #555'
          }}>
            <h4 style={{ color: '#FF9800', marginBottom: '8px' }}>🎵 Personalización</h4>
            <p style={{ color: '#ccc', fontSize: '14px' }}>
              Contenido adaptado al nivel de tus estudiantes
            </p>
          </div>
        </div>
      </div>

      {/* Formulario */}
      <div style={{
        border: '2px solid #444',
        padding: '24px',
        borderRadius: '12px',
        maxWidth: '100%',
        backgroundColor: '#2a2a2a',
        boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
      }}>
        <h2 style={{
          fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
          textAlign: 'center',
          marginBottom: '24px',
          color: 'white'
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
              color: 'white'
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
                  border: '1px solid #555',
                  backgroundColor: '#333',
                  color: 'white',
                  outline: 'none'
                }}
              />
            </label>

            <label style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              color: 'white'
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
                  border: '1px solid #555',
                  backgroundColor: '#333',
                  color: 'white',
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
              color: 'white'
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
                  border: '1px solid #555',
                  backgroundColor: '#333',
                  color: 'white',
                  outline: 'none'
                }}
              />
            </label>

            <label style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              color: 'white'
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
                  border: '1px solid #555',
                  backgroundColor: '#333',
                  color: 'white',
                  outline: 'none'
                }}
              />
            </label>
          </div>

          <label style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            color: 'white'
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
                border: '1px solid #555',
                backgroundColor: '#333',
                color: 'white',
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
              backgroundColor: '#4CAF50',
              color: 'white',
              cursor: 'pointer',
              fontWeight: 'bold',
              marginTop: '20px',
              transition: 'all 0.2s ease',
              alignSelf: 'center'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#45a049';
              e.target.style.transform = 'scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#4CAF50';
              e.target.style.transform = 'scale(1)';
            }}
          >
            Enviar solicitud
          </button>
        </form>
      </div>

      {/* Información de contacto adicional */}
      <div style={{
        marginTop: '2rem',
        padding: '20px',
        backgroundColor: '#2a2a2a',
        borderRadius: '12px',
        border: '1px solid #444',
        textAlign: 'center'
      }}>
        <h3 style={{
          color: '#4CAF50',
          marginBottom: '16px'
        }}>¿Tienes preguntas?</h3>
        <p style={{
          color: '#ccc',
          lineHeight: '1.6'
        }}>
          También puedes contactarnos directamente en <strong>profesores@afinapp.com</strong> 
          o llamarnos al <strong>+1 (555) 123-4567</strong>
        </p>
      </div>
    </div>
  );
}

export default Contact;
