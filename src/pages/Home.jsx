import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

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
      <h1 style={{
        fontSize: 'clamp(2rem, 5vw, 3.5rem)',
        textAlign: 'center',
        marginBottom: '2rem',
        color: '#1a202c'
      }}>🎶 Bienvenido a Afinapp 🎶</h1>

      <p style={{
        fontSize: 'clamp(16px, 3.5vw, 20px)',
        textAlign: 'center',
        marginBottom: '3rem',
        color: '#4a5568',
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
          onClick={() => navigate('/login-ear-training')}
          style={{
            padding: '16px 32px',
            fontSize: 'clamp(16px, 3vw, 20px)',
            minHeight: '60px',
            borderRadius: '12px',
            border: 'none',
            backgroundColor: '#0056d6',
            color: 'white',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 8px rgba(0,86,214,0.3)'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 6px 12px rgba(0,86,214,0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 8px rgba(0,86,214,0.3)';
          }}
        >
          🎵 Aprender de oído
        </button>
        <button 
          onClick={() => navigate('/musician-mode')}
          style={{
            padding: '16px 32px',
            fontSize: 'clamp(16px, 3vw, 20px)',
            minHeight: '60px',
            borderRadius: '12px',
            border: 'none',
            backgroundColor: '#38b2ac',
            color: 'white',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 8px rgba(56,178,172,0.3)'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 6px 12px rgba(56,178,172,0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 8px rgba(56,178,172,0.3)';
          }}
        >
          🎹 Músico
        </button>
        <button 
          onClick={() => navigate('/contact')}
          style={{
            padding: '16px 32px',
            fontSize: 'clamp(16px, 3vw, 20px)',
            minHeight: '60px',
            borderRadius: '12px',
            border: 'none',
            backgroundColor: '#ed8936',
            color: 'white',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 8px rgba(237,137,54,0.3)'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 6px 12px rgba(237,137,54,0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 8px rgba(237,137,54,0.3)';
          }}
        >
          👨‍🏫 Profesor
        </button>
      </div>

      {/* Características destacadas */}
      <div style={{
        marginTop: '4rem',
        textAlign: 'center'
      }}>
        <h2 style={{
          fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
          marginBottom: '2rem',
          color: '#1a202c'
        }}>¿Por qué elegir Afinapp?</h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          marginTop: '2rem'
        }}>
          <div style={{
            padding: '24px',
            backgroundColor: 'white',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: '#0056d6', marginBottom: '16px' }}>🎵 Entrenamiento Personalizado</h3>
            <p style={{ color: '#4a5568', lineHeight: '1.6' }}>
              Ejercicios adaptados a tu nivel, desde principiantes hasta músicos avanzados.
            </p>
          </div>
          
          <div style={{
            padding: '24px',
            backgroundColor: 'white',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: '#38b2ac', marginBottom: '16px' }}>🎹 Múltiples Instrumentos</h3>
            <p style={{ color: '#4a5568', lineHeight: '1.6' }}>
              Soporte para piano, guitarra, violín y más instrumentos musicales próximamente.)
            </p>
          </div>
          
          <div style={{
            padding: '24px',
            backgroundColor: 'white',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: '#ed8936', marginBottom: '16px' }}>📊 Seguimiento de Progreso</h3>
            <p style={{ color: '#4a5568', lineHeight: '1.6' }}>
              Monitorea tu mejora con estadísticas detalladas y reportes de rendimiento.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
