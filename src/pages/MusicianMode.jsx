import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useMusician } from '../hooks/useMusician';
import MusicianPaymentModal from '../components/MusicianPaymentModal';
import MusicianLevel from '../components/MusicianLevel';
import SimpleFooter from '../components/SimpleFooter';

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
        backgroundColor: '#f8fafc'
      }}>
        <div style={{ fontSize: '18px', color: '#4a5568' }}>
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
        backgroundColor: '#f8fafc'
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
            color: '#1a202c',
            marginBottom: '1rem'
          }}>
            🎵 Modo Músico
          </h1>
          <p style={{
            fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
            color: '#4a5568',
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
              borderRadius: '12px',
              border: 'none',
              backgroundColor: '#ff8c42',
              color: 'white',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 12px rgba(255, 140, 66, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#ff6b35';
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 20px rgba(255, 140, 66, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#ff8c42';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 12px rgba(255, 140, 66, 0.3)';
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
      backgroundColor: '#f8fafc'
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
          color: '#1a202c'
        }}>🎵 Modo Músico</h1>
      </div>

      {/* Información del usuario */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '2rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div style={{
          padding: '12px 20px',
          backgroundColor: 'white',
          borderRadius: '8px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '14px', color: '#718096', marginBottom: '4px' }}>
            Estatus
          </div>
          <div style={{ fontSize: '16px', fontWeight: '600', color: '#10b981' }}>
            Músico Premium
          </div>
        </div>
      </div>

      {/* Selector de niveles */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Nivel Básico */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '2rem',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          transition: 'all 0.2s ease',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
        }}
        onClick={() => setSelectedLevel('basic')}
        >
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <div style={{
              fontSize: '3rem',
              marginBottom: '1rem'
            }}>🎼</div>
            <h2 style={{
              fontSize: '1.8rem',
              color: '#1a202c',
              margin: '0 0 0.5rem 0'
            }}>Nivel Básico</h2>
            <p style={{
              color: '#4a5568',
              margin: '0',
              fontSize: '1rem',
              lineHeight: '1.5'
            }}>
              Ideal para músicos bebés que apenas van iniciando su camino musical
            </p>
          </div>

          {/* Estadísticas del nivel */}
          <div style={{
            backgroundColor: '#f7fafc',
            borderRadius: '12px',
            padding: '1rem',
            marginBottom: '1.5rem'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '0.5rem'
            }}>
              <span style={{ fontSize: '14px', color: '#718096' }}>Progreso:</span>
              <span style={{ fontSize: '16px', fontWeight: '600', color: '#2d3748' }}>
                {stats.basic.total > 0 ? `${Math.round((stats.basic.score / stats.basic.total) * 100)}%` : '0%'}
              </span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '0.5rem'
            }}>
              <span style={{ fontSize: '14px', color: '#718096' }}>Calificación:</span>
              <span style={{ 
                fontSize: '16px', 
                fontWeight: '600', 
                color: getGradeColor(stats.basic.grade)
              }}>
                {stats.basic.grade}
              </span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span style={{ fontSize: '14px', color: '#718096' }}>Tiempo:</span>
              <span style={{ fontSize: '16px', fontWeight: '600', color: '#2d3748' }}>
                {formatTime(stats.basic.timeSpent)}
              </span>
            </div>
          </div>

          <button style={{
            width: '100%',
            padding: '12px',
            fontSize: '1rem',
            fontWeight: '600',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: '#38b2ac',
            color: 'white',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#319795';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#38b2ac';
          }}
          >
            Comenzar Nivel Básico
          </button>
        </div>

        {/* Nivel Intermedio */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '2rem',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          transition: 'all 0.2s ease',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
        }}
        onClick={() => setSelectedLevel('intermediate')}
        >
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <div style={{
              fontSize: '3rem',
              marginBottom: '1rem'
            }}>🎹</div>
            <h2 style={{
              fontSize: '1.8rem',
              color: '#1a202c',
              margin: '0 0 0.5rem 0'
            }}>Nivel Intermedio</h2>
            <p style={{
              color: '#4a5568',
              margin: '0',
              fontSize: '1rem',
              lineHeight: '1.5'
            }}>
              Ideal para músicos más avanzados que buscan profundizar en la teoría
            </p>
          </div>

          {/* Estadísticas del nivel */}
          <div style={{
            backgroundColor: '#f7fafc',
            borderRadius: '12px',
            padding: '1rem',
            marginBottom: '1.5rem'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '0.5rem'
            }}>
              <span style={{ fontSize: '14px', color: '#718096' }}>Progreso:</span>
              <span style={{ fontSize: '16px', fontWeight: '600', color: '#2d3748' }}>
                {stats.intermediate.total > 0 ? `${Math.round((stats.intermediate.score / stats.intermediate.total) * 100)}%` : '0%'}
              </span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '0.5rem'
            }}>
              <span style={{ fontSize: '14px', color: '#718096' }}>Calificación:</span>
              <span style={{ 
                fontSize: '16px', 
                fontWeight: '600', 
                color: getGradeColor(stats.intermediate.grade)
              }}>
                {stats.intermediate.grade}
              </span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span style={{ fontSize: '14px', color: '#718096' }}>Tiempo:</span>
              <span style={{ fontSize: '16px', fontWeight: '600', color: '#2d3748' }}>
                {formatTime(stats.intermediate.timeSpent)}
              </span>
            </div>
          </div>

          <button style={{
            width: '100%',
            padding: '12px',
            fontSize: '1rem',
            fontWeight: '600',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: '#9f7aea',
            color: 'white',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#805ad5';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#9f7aea';
          }}
          >
            Comenzar Nivel Intermedio
          </button>
        </div>

        {/* Nivel Profesional */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '2rem',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          transition: 'all 0.2s ease',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
        }}
        onClick={() => setSelectedLevel('professional')}
        >
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <div style={{
              fontSize: '3rem',
              marginBottom: '1rem'
            }}>🎭</div>
            <h2 style={{
              fontSize: '1.8rem',
              color: '#1a202c',
              margin: '0 0 0.5rem 0'
            }}>Nivel Profesional</h2>
            <p style={{
              color: '#4a5568',
              margin: '0',
              fontSize: '1rem',
              lineHeight: '1.5'
            }}>
              Para licenciados en música y profesionales que buscan maestría total
            </p>
          </div>

          {/* Estadísticas del nivel */}
          <div style={{
            backgroundColor: '#f7fafc',
            borderRadius: '12px',
            padding: '1rem',
            marginBottom: '1.5rem'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '0.5rem'
            }}>
              <span style={{ fontSize: '14px', color: '#718096' }}>Progreso:</span>
              <span style={{ fontSize: '16px', fontWeight: '600', color: '#2d3748' }}>
                {stats.professional.total > 0 ? `${Math.round((stats.professional.score / stats.professional.total) * 100)}%` : '0%'}
              </span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '0.5rem'
            }}>
              <span style={{ fontSize: '14px', color: '#718096' }}>Calificación:</span>
              <span style={{ 
                fontSize: '16px', 
                fontWeight: '600', 
                color: getGradeColor(stats.professional.grade)
              }}>
                {stats.professional.grade}
              </span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span style={{ fontSize: '14px', color: '#718096' }}>Tiempo:</span>
              <span style={{ fontSize: '16px', fontWeight: '600', color: '#2d3748' }}>
                {formatTime(stats.professional.timeSpent)}
              </span>
            </div>
          </div>

          <button style={{
            width: '100%',
            padding: '12px',
            fontSize: '1rem',
            fontWeight: '600',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: '#ed8936',
            color: 'white',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#dd6b20';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#ed8936';
          }}
          >
            Comenzar Nivel Profesional
          </button>
        </div>
      </div>

      {/* Resumen de estadísticas generales */}
      <div style={{
        marginTop: '3rem',
        padding: '2rem',
        backgroundColor: 'white',
        borderRadius: '16px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{
          color: '#0056d6',
          marginBottom: '1.5rem',
          textAlign: 'center',
          fontSize: '1.5rem'
        }}>
          📊 Resumen de Progreso General
        </h3>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981' }}>
              {Object.values(stats).reduce((acc, level) => acc + level.score, 0)}
            </div>
            <div style={{ fontSize: '14px', color: '#718096' }}>Puntos Totales</div>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3b82f6' }}>
              {Object.values(stats).reduce((acc, level) => acc + level.total, 0)}
            </div>
            <div style={{ fontSize: '14px', color: '#718096' }}>Ejercicios Completados</div>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f59e0b' }}>
              {formatTime(Object.values(stats).reduce((acc, level) => acc + level.timeSpent, 0))}
            </div>
            <div style={{ fontSize: '14px', color: '#718096' }}>Tiempo Total</div>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#8b5cf6' }}>
              {(() => {
                const totalScore = Object.values(stats).reduce((acc, level) => acc + level.score, 0);
                const totalExercises = Object.values(stats).reduce((acc, level) => acc + level.total, 0);
                if (totalExercises === 0) return 'N/A';
                const percentage = Math.round((totalScore / totalExercises) * 100);
                return calculateGrade(percentage);
              })()}
            </div>
            <div style={{ fontSize: '14px', color: '#718096' }}>Calificación General</div>
          </div>
        </div>
      </div>
      
      <SimpleFooter />
    </div>
  );
}

export default MusicianMode;
