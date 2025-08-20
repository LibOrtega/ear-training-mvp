import React from 'react';

const SimpleFooter = () => {
  return (
    <footer style={{
      backgroundColor: 'var(--background-card)',
      borderTop: '1px solid rgba(255, 140, 66, 0.2)',
      padding: '2rem 0',
      marginTop: '3rem',
      backdropFilter: 'blur(10px)',
      backgroundImage: `
        radial-gradient(circle at 25% 25%, rgba(255, 140, 66, 0.05) 1px, transparent 1px),
        radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.05) 1px, transparent 1px)
      `,
      backgroundSize: '50px 50px',
      backgroundPosition: '0 0, 25px 25px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.5rem'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '1rem'
        }}>
          <span style={{ 
            fontSize: '2rem',
            background: 'var(--primary-gradient)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>🎼</span>
          <span style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: 'var(--text-primary)',
            background: 'var(--primary-gradient)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>Afinapp</span>
        </div>
        
        <div style={{
          textAlign: 'center'
        }}>
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '1.1rem',
            marginBottom: '1rem',
            fontWeight: '500'
          }}>¿Tienes preguntas? Contáctame:</p>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            alignItems: 'center'
          }}>
            <a 
              href="mailto:libertadfarinneo@gmail.com"
              style={{
                color: 'var(--primary-color)',
                textDecoration: 'none',
                padding: '8px 16px',
                borderRadius: 'var(--border-radius-sm)',
                backgroundColor: 'rgba(255, 140, 66, 0.1)',
                border: '1px solid rgba(255, 140, 66, 0.2)',
                transition: 'var(--transition-normal)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'rgba(255, 140, 66, 0.2)';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = 'var(--shadow-sm)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'rgba(255, 140, 66, 0.1)';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              📧 libertadfarinneo@gmail.com
            </a>
            <a 
              href="https://wa.me/526391652842"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: 'var(--primary-color)',
                textDecoration: 'none',
                padding: '8px 16px',
                borderRadius: 'var(--border-radius-sm)',
                backgroundColor: 'rgba(139, 92, 246, 0.1)',
                border: '1px solid rgba(139, 92, 246, 0.2)',
                transition: 'var(--transition-normal)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'rgba(139, 92, 246, 0.2)';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = 'var(--shadow-sm)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'rgba(139, 92, 246, 0.1)';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              📱 +52 639 165 2842
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SimpleFooter;
