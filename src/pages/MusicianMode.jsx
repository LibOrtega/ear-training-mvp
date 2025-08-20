import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useMusician } from '../hooks/useMusician';
import MusicianPaymentModal from '../components/MusicianPaymentModal';
import MusicianLevel from '../components/MusicianLevel';

function MusicianMode() {
  const navigate = useNavigate();
  const { currentUser, isAuthenticated } = useAuth();
  const { isMusician } = useMusician();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [stats, setStats] = useState({
    basic: { score: 0, total: 0, grade: 'N/A', timeSpent: 0 },
    intermediate: { score: 0, total: 0, grade: 'N/A', timeSpent: 0 },
    professional: { score: 0, total: 0, grade: 'N/A', timeSpent: 0 }
  });

  // Redirigir si no está autenticado
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login-musico');
      return;
    }
  }, [isAuthenticated, navigate]);

  // Cargar estadísticas del usuario
  useEffect(() => {
    if (isAuthenticated && currentUser) {
      const userStats = localStorage.getItem(`afinapp_musician_stats_${currentUser.id}`);
      if (userStats) {
        setStats(JSON.parse(userStats));
      }
    }
  }, [isAuthenticated, currentUser]);

  const handlePaymentSuccess = () => {
    setShowPaymentModal(false);
    // Recargar la página para mostrar el contenido
    window.location.reload();
  };

  const calculateGrade = (percentage) => {
    if (percentage >= 95) return 'A+';
    if (percentage >= 90) return 'A';
    if (percentage >= 85) return 'A-';
    if (percentage >= 80) return 'B+';
    if (percentage >= 75) return 'B';
    if (percentage >= 70) return 'B-';
    if (percentage >= 65) return 'C+';
    if (percentage >= 60) return 'C';
    if (percentage >= 55) return 'C-';
    if (percentage >= 50) return 'D+';
    if (percentage >= 45) return 'D';
    if (percentage < 45) return 'F';
    return 'N/A';
  };

  const getGradeColor = (grade) => {
    if (grade.startsWith('A')) return '#10b981';
    if (grade.startsWith('B')) return '#3b82f6';
    if (grade.startsWith('C')) return '#f59e0b';
    if (grade.startsWith('D')) return '#ef4444';
    if (grade === 'F') return '#dc2626';
    return '#6b7280';
  };

  const formatTime = (minutes) => {
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}min`;
  };

  // Si no está autenticado, mostrar loading
  if (!isAuthenticated) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: 'var(--background-primary)'
      }}>
        <div style={{ 
          fontSize: '18px', 
          color: 'var(--text-secondary)',
          textAlign: 'center'
        }}>
          Redirigiendo al login...
        </div>
      </div>
    );
  }

  // Si no es músico, mostrar modal de pago
  if (!isMusician) {
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
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '60vh',
          textAlign: 'center'
        }}>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            color: 'var(--text-primary)',
            marginBottom: '1rem',
            background: 'var(--primary-gradient)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            🎵 Modo Músico
          </h1>
          <p style={{
            fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
            color: 'var(--text-secondary)',
            marginBottom: '2rem',
            maxWidth: '600px',
            lineHeight: '1.6'
          }}>
            Accede a teoría musical avanzada, tres niveles de dificultad y un sistema completo de progreso y estadísticas.
          </p>
          <button
            onClick={() => setShowPaymentModal(true)}
            style={{
              padding: '16px 32px',
              fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)',
              fontWeight: '600',
              borderRadius: 'var(--border-radius-md)',
              border: 'none',
              background: 'var(--primary-gradient)',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              transition: 'var(--transition-normal)',
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
            🔓 Desbloquear Modo Músico
          </button>
        </div>

        {showPaymentModal && (
          <MusicianPaymentModal
            onClose={() => setShowPaymentModal(false)}
            onSuccess={handlePaymentSuccess}
          />
        )}
      </div>
    );
  }

  // Si hay un nivel seleccionado, mostrar ese nivel
  if (selectedLevel) {
    return (
      <MusicianLevel
        level={selectedLevel}
        onBack={() => setSelectedLevel(null)}
        onStatsUpdate={(newStats) => setStats(newStats)}
        currentStats={stats[selectedLevel]}
        userId={currentUser?.id}
      />
    );
  }

  // Mostrar selector de niveles
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
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '2rem',
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
        }}>🎵 Modo Músico</h1>
      </div>

      {/* Descripción */}
      <div style={{
        textAlign: 'center',
        marginBottom: '3rem',
        maxWidth: '800px',
        margin: '0 auto 3rem auto'
      }}>
        <p style={{
          fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)',
          color: 'var(--text-secondary)',
          lineHeight: '1.6',
          margin: '0'
        }}>
          Explora tres niveles de teoría musical avanzada. Cada nivel incluye conceptos progresivamente más complejos, 
          ejercicios interactivos y seguimiento detallado de tu progreso.
        </p>
      </div>

      {/* Selector de niveles */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '2rem',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Nivel Básico */}
        <div style={{
          backgroundColor: 'var(--background-card)',
          borderRadius: 'var(--border-radius-lg)',
          padding: '2rem',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid rgba(255, 140, 66, 0.3)',
          backdropFilter: 'blur(10px)',
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(255, 140, 66, 0.05) 1px, transparent 1px),
            radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          backgroundPosition: '0 0, 25px 25px',
          transition: 'var(--transition-normal)',
          transform: 'translateY(0)',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'translateY(-4px)';
          e.target.style.boxShadow = '0 8px 25px rgba(255, 140, 66, 0.2)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = 'var(--shadow-lg)';
        }}
        onClick={() => setSelectedLevel('basic')}>
          <div style={{
            textAlign: 'center',
            marginBottom: '1.5rem'
          }}>
            <div style={{
              fontSize: '3rem',
              marginBottom: '1rem'
            }}>🌱</div>
            <h2 style={{
              fontSize: '1.8rem',
              color: 'var(--text-primary)',
              margin: '0 0 0.5rem 0',
              fontWeight: '600'
            }}>Nivel Básico</h2>
            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '1rem',
              margin: '0',
              lineHeight: '1.5'
            }}>
              Fundamentos de teoría musical, escalas básicas y acordes simples
            </p>
          </div>
          
          {/* Estadísticas */}
          <div style={{
            backgroundColor: 'var(--background-tertiary)',
            borderRadius: 'var(--border-radius-md)',
            padding: '1rem',
            marginBottom: '1rem'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '0.5rem'
            }}>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Progreso:</span>
              <span style={{ 
                color: 'var(--text-primary)', 
                fontWeight: '600',
                fontSize: '0.9rem'
              }}>
                {stats.basic.total > 0 ? Math.round((stats.basic.score / stats.basic.total) * 100) : 0}%
              </span>
            </div>
            <div style={{
              width: '100%',
              height: '8px',
              backgroundColor: 'rgba(255, 140, 66, 0.2)',
              borderRadius: '4px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${stats.basic.total > 0 ? (stats.basic.score / stats.basic.total) * 100 : 0}%`,
                height: '100%',
                background: 'var(--primary-gradient)',
                borderRadius: '4px',
                transition: 'width 0.3s ease'
              }} />
            </div>
          </div>
          
          {/* Calificación */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem'
          }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Calificación:</span>
            <span style={{ 
              color: getGradeColor(stats.basic.grade), 
              fontWeight: '700',
              fontSize: '1.1rem'
            }}>
              {stats.basic.grade}
            </span>
          </div>
          
          {/* Tiempo */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem'
          }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Tiempo:</span>
            <span style={{ 
              color: 'var(--text-primary)', 
              fontWeight: '600',
              fontSize: '0.9rem'
            }}>
              {formatTime(stats.basic.timeSpent)}
            </span>
          </div>
          
          <button style={{
            width: '100%',
            padding: '12px',
            backgroundColor: 'var(--primary-gradient)',
            color: 'var(--text-primary)',
            border: 'none',
            borderRadius: 'var(--border-radius-md)',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'var(--transition-normal)',
            boxShadow: 'var(--shadow-orange)',
            transform: 'translateY(0)'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 6px 20px rgba(255, 140, 66, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = 'var(--shadow-orange)';
          }}>
            Comenzar Nivel Básico
          </button>
        </div>

        {/* Nivel Intermedio */}
        <div style={{
          backgroundColor: 'var(--background-card)',
          borderRadius: 'var(--border-radius-lg)',
          padding: '2rem',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid rgba(139, 92, 246, 0.3)',
          backdropFilter: 'blur(10px)',
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(139, 92, 246, 0.05) 1px, transparent 1px),
            radial-gradient(circle at 75% 75%, rgba(255, 140, 66, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          backgroundPosition: '0 0, 25px 25px',
          transition: 'var(--transition-normal)',
          transform: 'translateY(0)',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'translateY(-4px)';
          e.target.style.boxShadow = '0 8px 25px rgba(139, 92, 246, 0.2)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = 'var(--shadow-lg)';
        }}
        onClick={() => setSelectedLevel('intermediate')}>
          <div style={{
            textAlign: 'center',
            marginBottom: '1.5rem'
          }}>
            <div style={{
              fontSize: '3rem',
              marginBottom: '1rem'
            }}>🌿</div>
            <h2 style={{
              fontSize: '1.8rem',
              color: 'var(--text-primary)',
              margin: '0 0 0.5rem 0',
              fontWeight: '600'
            }}>Nivel Intermedio</h2>
            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '1rem',
              margin: '0',
              lineHeight: '1.5'
            }}>
              Armonía avanzada, modos musicales y progresiones complejas
            </p>
          </div>
          
          {/* Estadísticas */}
          <div style={{
            backgroundColor: 'var(--background-tertiary)',
            borderRadius: 'var(--border-radius-md)',
            padding: '1rem',
            marginBottom: '1rem'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '0.5rem'
            }}>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Progreso:</span>
              <span style={{ 
                color: 'var(--text-primary)', 
                fontWeight: '600',
                fontSize: '0.9rem'
              }}>
                {stats.intermediate.total > 0 ? Math.round((stats.intermediate.score / stats.intermediate.total) * 100) : 0}%
              </span>
            </div>
            <div style={{
              width: '100%',
              height: '8px',
              backgroundColor: 'rgba(139, 92, 246, 0.2)',
              borderRadius: '4px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${stats.intermediate.total > 0 ? (stats.intermediate.score / stats.intermediate.total) * 100 : 0}%`,
                height: '100%',
                background: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)',
                borderRadius: '4px',
                transition: 'width 0.3s ease'
              }} />
            </div>
          </div>
          
          {/* Calificación */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem'
          }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Calificación:</span>
            <span style={{ 
              color: getGradeColor(stats.intermediate.grade), 
              fontWeight: '700',
              fontSize: '1.1rem'
            }}>
              {stats.intermediate.grade}
            </span>
          </div>
          
          {/* Tiempo */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem'
          }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Tiempo:</span>
            <span style={{ 
              color: 'var(--text-primary)', 
              fontWeight: '600',
              fontSize: '0.9rem'
            }}>
              {formatTime(stats.intermediate.timeSpent)}
            </span>
          </div>
          
          <button style={{
            width: '100%',
            padding: '12px',
            background: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)',
            color: 'var(--text-primary)',
            border: 'none',
            borderRadius: 'var(--border-radius-md)',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'var(--transition-normal)',
            boxShadow: '0 4px 15px rgba(139, 92, 246, 0.3)',
            transform: 'translateY(0)'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 6px 20px rgba(139, 92, 246, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 15px rgba(139, 92, 246, 0.3)';
          }}>
            Comenzar Nivel Intermedio
          </button>
        </div>

        {/* Nivel Profesional */}
        <div style={{
          backgroundColor: 'var(--background-card)',
          borderRadius: 'var(--border-radius-lg)',
          padding: '2rem',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          backdropFilter: 'blur(10px)',
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(16, 185, 129, 0.05) 1px, transparent 1px),
            radial-gradient(circle at 75% 75%, rgba(255, 140, 66, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          backgroundPosition: '0 0, 25px 25px',
          transition: 'var(--transition-normal)',
          transform: 'translateY(0)',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'translateY(-4px)';
          e.target.style.boxShadow = '0 8px 25px rgba(16, 185, 129, 0.2)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = 'var(--shadow-lg)';
        }}
        onClick={() => setSelectedLevel('professional')}>
          <div style={{
            textAlign: 'center',
            marginBottom: '1.5rem'
          }}>
            <div style={{
              fontSize: '3rem',
              marginBottom: '1rem'
            }}>🌳</div>
            <h2 style={{
              fontSize: '1.8rem',
              color: 'var(--text-primary)',
              margin: '0 0 0.5rem 0',
              fontWeight: '600'
            }}>Nivel Profesional</h2>
            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '1rem',
              margin: '0',
              lineHeight: '1.5'
            }}>
              Composición avanzada, análisis musical y técnicas de improvisación
            </p>
          </div>
          
          {/* Estadísticas */}
          <div style={{
            backgroundColor: 'var(--background-tertiary)',
            borderRadius: 'var(--border-radius-md)',
            padding: '1rem',
            marginBottom: '1rem'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '0.5rem'
            }}>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Progreso:</span>
              <span style={{ 
                color: 'var(--text-primary)', 
                fontWeight: '600',
                fontSize: '0.9rem'
              }}>
                {stats.professional.total > 0 ? Math.round((stats.professional.score / stats.professional.total) * 100) : 0}%
              </span>
            </div>
            <div style={{
              width: '100%',
              height: '8px',
              backgroundColor: 'rgba(16, 185, 129, 0.2)',
              borderRadius: '4px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${stats.professional.total > 0 ? (stats.professional.score / stats.professional.total) * 100 : 0}%`,
                height: '100%',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                borderRadius: '4px',
                transition: 'width 0.3s ease'
              }} />
            </div>
          </div>
          
          {/* Calificación */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem'
          }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Calificación:</span>
            <span style={{ 
              color: getGradeColor(stats.professional.grade), 
              fontWeight: '700',
              fontSize: '1.1rem'
            }}>
              {stats.professional.grade}
            </span>
          </div>
          
          {/* Tiempo */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem'
          }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Tiempo:</span>
            <span style={{ 
              color: 'var(--text-primary)', 
              fontWeight: '600',
              fontSize: '0.9rem'
            }}>
              {formatTime(stats.professional.timeSpent)}
            </span>
          </div>
          
          <button style={{
            width: '100%',
            padding: '12px',
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            color: 'var(--text-primary)',
            border: 'none',
            borderRadius: 'var(--border-radius-md)',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'var(--transition-normal)',
            boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)',
            transform: 'translateY(0)'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 6px 20px rgba(16, 185, 129, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 15px rgba(16, 185, 129, 0.3)';
          }}>
            Comenzar Nivel Profesional
          </button>
        </div>
      </div>

      {/* Información adicional */}
      <div style={{
        marginTop: '3rem',
        padding: '2rem',
        backgroundColor: 'var(--background-card)',
        borderRadius: 'var(--border-radius-lg)',
        border: '1px solid rgba(255, 140, 66, 0.2)',
        boxShadow: 'var(--shadow-md)',
        backdropFilter: 'blur(10px)',
        maxWidth: '800px',
        margin: '3rem auto 0 auto',
        textAlign: 'center'
      }}>
        <h3 style={{
          color: 'var(--text-primary)',
          marginBottom: '1rem',
          fontSize: '1.4rem',
          fontWeight: '600'
        }}>🎯 Sistema de Progreso</h3>
        <p style={{
          color: 'var(--text-secondary)',
          lineHeight: '1.6',
          margin: '0',
          fontSize: '1rem'
        }}>
          Cada nivel incluye ejercicios interactivos, teoría detallada y seguimiento de tu rendimiento. 
          Completa los ejercicios para desbloquear contenido avanzado y mejorar tu calificación.
        </p>
      </div>
    </div>
  );
}

export default MusicianMode;
