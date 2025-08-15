import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const [modo, setModo] = useState("");

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
      <h1 style={{
        fontSize: 'clamp(2rem, 5vw, 3.5rem)',
        textAlign: 'center',
        marginBottom: '2rem'
      }}>🎶 Bienvenido a Afinapp 🎶</h1>

      <p style={{
        fontSize: 'clamp(16px, 3.5vw, 20px)',
        textAlign: 'center',
        marginBottom: '3rem',
        color: '#ccc',
        lineHeight: '1.6'
      }}>
        Tu plataforma completa para desarrollar el oído musical. 
        Desde principiantes hasta músicos avanzados, tenemos algo para ti.
      </p>

      {/* Selector de modo */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '16px',
        marginBottom: '24px',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        <button 
          onClick={() => navigate('/ear-training')}
          style={{
            padding: '16px 32px',
            fontSize: 'clamp(16px, 3vw, 20px)',
            minHeight: '60px',
            borderRadius: '12px',
            border: 'none',
            backgroundColor: '#4CAF50',
            color: 'white',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 6px 12px rgba(0,0,0,0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)';
          }}
        >
          🎵 Aprender de oído
        </button>
        <button 
          onClick={() => setModo("musico")}
          style={{
            padding: '16px 32px',
            fontSize: 'clamp(16px, 3vw, 20px)',
            minHeight: '60px',
            borderRadius: '12px',
            border: 'none',
            backgroundColor: '#2196F3',
            color: 'white',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 6px 12px rgba(0,0,0,0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)';
          }}
        >
          🎹 Músico
        </button>
        <button 
          onClick={() => setModo("profesor")}
          style={{
            padding: '16px 32px',
            fontSize: 'clamp(16px, 3vw, 20px)',
            minHeight: '60px',
            borderRadius: '12px',
            border: 'none',
            backgroundColor: '#FF9800',
            color: 'white',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 6px 12px rgba(0,0,0,0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)';
          }}
        >
          👨‍🏫 Profesor
        </button>
      </div>

      {/* Contenido según el modo */}
      {modo === "musico" && (
        <div style={{
          border: '2px solid #444',
          padding: '24px',
          borderRadius: '12px',
          maxWidth: '100%',
          backgroundColor: '#2a2a2a',
          boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            marginBottom: '20px',
            color: 'white'
          }}>Modo Músico</h2>
          <p style={{
            fontSize: 'clamp(16px, 3.5vw, 20px)',
            color: 'white',
            lineHeight: '1.6'
          }}>
            Herramientas avanzadas para tu carrera musical. Próximamente: análisis de progresiones, 
            entrenamiento de ritmo, y mucho más.
          </p>
        </div>
      )}

      {modo === "profesor" && (
        <div style={{
          border: '2px solid #444',
          padding: '24px',
          borderRadius: '12px',
          maxWidth: '100%',
          backgroundColor: '#2a2a2a',
          boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            marginBottom: '20px',
            color: 'white'
          }}>Formulario para Profesores</h2>
          <p style={{
            fontSize: 'clamp(16px, 3.5vw, 20px)',
            color: 'white',
            lineHeight: '1.6',
            marginBottom: '20px'
          }}>
            ¿Eres profesor de música? Queremos conocerte y ofrecerte herramientas especiales para tus clases.
          </p>
          <button 
            onClick={() => navigate('/contact')}
            style={{
              padding: '12px 24px',
              fontSize: '16px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#4CAF50',
              color: 'white',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Contactar
          </button>
        </div>
      )}

      {/* Características destacadas */}
      <div style={{
        marginTop: '4rem',
        textAlign: 'center'
      }}>
        <h2 style={{
          fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
          marginBottom: '2rem',
          color: 'white'
        }}>¿Por qué elegir Afinapp?</h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          marginTop: '2rem'
        }}>
          <div style={{
            padding: '24px',
            backgroundColor: '#2a2a2a',
            borderRadius: '12px',
            border: '1px solid #444'
          }}>
            <h3 style={{ color: '#4CAF50', marginBottom: '16px' }}>🎵 Entrenamiento Personalizado</h3>
            <p style={{ color: '#ccc', lineHeight: '1.6' }}>
              Ejercicios adaptados a tu nivel, desde principiantes hasta músicos avanzados.
            </p>
          </div>
          
          <div style={{
            padding: '24px',
            backgroundColor: '#2a2a2a',
            borderRadius: '12px',
            border: '1px solid #444'
          }}>
            <h3 style={{ color: '#2196F3', marginBottom: '16px' }}>🎹 Múltiples Instrumentos</h3>
            <p style={{ color: '#ccc', lineHeight: '1.6' }}>
              Soporte para piano, guitarra, violín y más instrumentos musicales.
            </p>
          </div>
          
          <div style={{
            padding: '24px',
            backgroundColor: '#2a2a2a',
            borderRadius: '12px',
            border: '1px solid #444'
          }}>
            <h3 style={{ color: '#FF9800', marginBottom: '16px' }}>📊 Seguimiento de Progreso</h3>
            <p style={{ color: '#ccc', lineHeight: '1.6' }}>
              Monitorea tu mejora con estadísticas detalladas y reportes de rendimiento.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
