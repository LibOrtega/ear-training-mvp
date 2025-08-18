import React, { useState } from 'react';

function MusicianLevel({ level, onBack, onStatsUpdate, currentStats, userId }) {
  const [currentTopic, setCurrentTopic] = useState('intervals');
  const [startTime] = useState(Date.now());
  const [stats, setStats] = useState(currentStats || { score: 0, total: 0, grade: 'N/A', timeSpent: 0 });

  // Contenido específico para cada nivel
  const levelContent = {
    basic: {
      intervals: {
        title: "🎵 Intervalos Básicos",
        description: "Los fundamentos de la distancia musical",
        concepts: [
          {
            name: "Unísono (0 semitonos)",
            explanation: "La misma nota repetida. No hay distancia musical.",
            example: "C a C, D a D"
          },
          {
            name: "Segunda (1-2 semitonos)",
            explanation: "La distancia entre dos notas consecutivas en la escala.",
            example: "C a D (mayor), C a Db (menor)"
          },
          {
            name: "Tercera (3-4 semitonos)",
            explanation: "La base de los acordes mayores y menores.",
            example: "C a E (mayor), C a Eb (menor)"
          },
          {
            name: "Cuarta Perfecta (5 semitonos)",
            explanation: "Una de las consonancias más estables.",
            example: "C a F"
          },
          {
            name: "Quinta Perfecta (7 semitonos)",
            explanation: "La base de la armonía occidental.",
            example: "C a G"
          },
          {
            name: "Octava (12 semitonos)",
            explanation: "La misma nota en diferente registro.",
            example: "C4 a C5"
          }
        ]
      },
      notes: {
        title: "🎹 Notas Musicales Básicas",
        description: "El alfabeto de la música",
        concepts: [
          {
            name: "Notas Naturales",
            explanation: "Las siete notas básicas sin alteraciones.",
            example: "C, D, E, F, G, A, B"
          },
          {
            name: "Escala de Do Mayor",
            explanation: "La escala más fundamental en música occidental.",
            example: "Do-Re-Mi-Fa-Sol-La-Si-Do"
          },
          {
            name: "Posición en el Piano",
            explanation: "Las teclas blancas del piano corresponden a las notas naturales.",
            example: "C está a la izquierda de las dos teclas negras"
          }
        ]
      },
      chords: {
        title: "🎼 Acordes Básicos",
        description: "Construyendo armonía con tres notas",
        concepts: [
          {
            name: "Acorde Mayor",
            explanation: "Formado por fundamental, tercera mayor y quinta perfecta.",
            example: "C-E-G (Do-Mi-Sol)"
          },
          {
            name: "Acorde Menor",
            explanation: "Formado por fundamental, tercera menor y quinta perfecta.",
            example: "C-Eb-G (Do-Mib-Sol)"
          },
          {
            name: "Progresión I-IV-V",
            explanation: "La progresión más común en música popular.",
            example: "C-F-G en la tonalidad de Do"
          }
        ]
      }
    },
    intermediate: {
      intervals: {
        title: "🎵 Intervalos Intermedios",
        description: "Profundizando en la teoría de intervalos",
        concepts: [
          {
            name: "Intervalos Aumentados y Disminuidos",
            explanation: "Variaciones de los intervalos perfectos y mayores/menores.",
            example: "Cuarta aumentada (tritono), quinta disminuida"
          },
          {
            name: "Intervalos Compuestos",
            explanation: "Intervalos mayores a una octava.",
            example: "Novenas, décimas, undécimas"
          },
          {
            name: "Inversiones de Intervalos",
            explanation: "Cambiar el orden de las notas en un intervalo.",
            example: "Tercera mayor (C-E) invertida = sexta menor (E-C)"
          },
          {
            name: "Consonancia y Disonancia",
            explanation: "Clasificación de intervalos por su estabilidad armónica.",
            example: "Consonantes: unísono, octava, quinta; Disonantes: segunda, séptima"
          }
        ]
      },
      notes: {
        title: "🎹 Teoría de Notas Avanzada",
        description: "Escalas y tonalidades",
        concepts: [
          {
            name: "Escalas Mayores",
            explanation: "Patrón de tonos y semitonos que define cada tonalidad.",
            example: "Do: T-T-S-T-T-T-S, Sol: T-T-S-T-T-T-S"
          },
          {
            name: "Escalas Menores Naturales",
            explanation: "Variación menor de las escalas mayores.",
            example: "La menor: A-B-C-D-E-F-G-A"
          },
          {
            name: "Alteraciones",
            explanation: "Sostenidos (#) y bemoles (b) que modifican las notas.",
            example: "C# (Do sostenido), Db (Re bemol)"
          }
        ]
      },
      chords: {
        title: "🎼 Acordes Intermedios",
        description: "Expandiendo el vocabulario armónico",
        concepts: [
          {
            name: "Acordes de Séptima",
            explanation: "Acordes de cuatro notas que añaden tensión.",
            example: "Cmaj7, Cm7, C7, Cdim7"
          },
          {
            name: "Acordes Suspendidos",
            explanation: "Acordes donde la tercera es reemplazada por otra nota.",
            example: "Csus2 (C-D-G), Csus4 (C-F-G)"
          },
          {
            name: "Inversiones de Acordes",
            explanation: "Diferentes disposiciones de las notas del acorde.",
            example: "C-E-G (posición fundamental), E-G-C (primera inversión)"
          }
        ]
      }
    },
    professional: {
      intervals: {
        title: "🎵 Intervalos Profesionales",
        description: "Teoría avanzada y análisis armónico",
        concepts: [
          {
            name: "Microtonos y Temperamentos",
            explanation: "Divisiones más pequeñas que el semitono y diferentes sistemas de afinación.",
            example: "Cuartos de tono, temperamento justo vs. temperamento igual"
          },
          {
            name: "Intervalos en Escalas Modales",
            explanation: "Análisis de intervalos en diferentes modos y escalas exóticas.",
            example: "Escala pentatónica, escala de blues, modos griegos"
          },
          {
            name: "Análisis Armónico Avanzado",
            explanation: "Estudio de intervalos en contextos musicales complejos.",
            example: "Progresiones de jazz, música contemporánea, atonalidad"
          }
        ]
      },
      notes: {
        title: "🎹 Teoría de Notas Profesional",
        description: "Música avanzada y contemporánea",
        concepts: [
          {
            name: "Escalas Modales y Exóticas",
            explanation: "Escalas que van más allá de la tonalidad tradicional.",
            example: "Escala frigia, escala lidia, escala de tonos enteros"
          },
          {
            name: "Microtonalidad",
            explanation: "Uso de intervalos más pequeños que el semitono.",
            example: "Música árabe, música india, composición contemporánea"
          },
          {
            name: "Teoría Atonal y Serial",
            explanation: "Sistemas musicales que abandonan la tonalidad tradicional.",
            example: "Dodecafonía, música aleatoria, composición algorítmica"
          }
        ]
      },
      chords: {
        title: "🎼 Acordes Profesionales",
        description: "Armonía avanzada y reharmonización",
        concepts: [
          {
            name: "Acordes de Extensión",
            explanation: "Acordes con notas adicionales más allá de la séptima.",
            example: "C9, Cmaj9, C13, Cmaj13"
          },
          {
            name: "Acordes Alterados y Sustitutos",
            explanation: "Acordes que modifican o reemplazan la armonía original.",
            example: "Acordes de tritono, acordes de paso, acordes de aproximación"
          },
          {
            name: "Reharmonización Avanzada",
            explanation: "Técnicas para reescribir la armonía de una melodía.",
            example: "Sustitución de acordes, rearmonización modal, jazz reharmonization"
          }
        ]
      }
    }
  };

  const getLevelColor = () => {
    switch (level) {
      case 'basic': return '#38b2ac';
      case 'intermediate': return '#9f7aea';
      case 'professional': return '#ed8936';
      default: return '#0056d6';
    }
  };

  const getLevelName = () => {
    switch (level) {
      case 'basic': return 'Básico';
      case 'intermediate': return 'Intermedio';
      case 'professional': return 'Profesional';
      default: return 'Nivel';
    }
  };

  const getLevelEmoji = () => {
    switch (level) {
      case 'basic': return '🎼';
      case 'intermediate': return '🎹';
      case 'professional': return '🎭';
      default: return '🎵';
    }
  };

  const updateStats = (newScore, newTotal) => {
    const newStats = {
      ...stats,
      score: stats.score + newScore,
      total: stats.total + newTotal,
      timeSpent: Math.floor((Date.now() - startTime) / 60000) // en minutos
    };

    // Calcular calificación
    if (newStats.total > 0) {
      const percentage = (newStats.score / newStats.total) * 100;
      if (percentage >= 95) newStats.grade = 'A+';
      else if (percentage >= 90) newStats.grade = 'A';
      else if (percentage >= 85) newStats.grade = 'A-';
      else if (percentage >= 80) newStats.grade = 'B+';
      else if (percentage >= 75) newStats.grade = 'B';
      else if (percentage >= 70) newStats.grade = 'B-';
      else if (percentage >= 65) newStats.grade = 'C+';
      else if (percentage >= 60) newStats.grade = 'C';
      else if (percentage >= 55) newStats.grade = 'C-';
      else if (percentage >= 50) newStats.grade = 'D+';
      else if (percentage >= 45) newStats.grade = 'D';
      else newStats.grade = 'F';
    }

    setStats(newStats);
    onStatsUpdate(newStats);

    // Guardar en localStorage
    if (userId) {
      const allStats = JSON.parse(localStorage.getItem(`afinapp_musician_stats_${userId}`) || '{}');
      allStats[level] = newStats;
      localStorage.setItem(`afinapp_musician_stats_${userId}`, JSON.stringify(allStats));
    }
  };

  const handleExerciseComplete = (correct) => {
    updateStats(correct ? 1 : 0, 1);
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
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={onBack}
            style={{
              padding: '8px 16px',
              fontSize: '1rem',
              fontWeight: '600',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#e2e8f0',
              color: '#4a5568',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#cbd5e0';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#e2e8f0';
            }}
          >
            ← Volver
          </button>
          <h1 style={{
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            margin: '0',
            color: '#1a202c'
          }}>
            {getLevelEmoji()} Nivel {getLevelName()}
          </h1>
        </div>

        {/* Estadísticas del nivel */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap'
        }}>
          <div style={{
            padding: '8px 16px',
            backgroundColor: 'white',
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '12px', color: '#718096' }}>Puntuación</div>
            <div style={{ fontSize: '16px', fontWeight: '600', color: getLevelColor() }}>
              {stats.score}/{stats.total}
            </div>
          </div>
          <div style={{
            padding: '8px 16px',
            backgroundColor: 'white',
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '12px', color: '#718096' }}>Calificación</div>
            <div style={{ fontSize: '16px', fontWeight: '600', color: getLevelColor() }}>
              {stats.grade}
            </div>
          </div>
        </div>
      </div>

      {/* Selector de temas */}
      <div style={{
        display: 'flex',
        gap: '1rem',
        marginBottom: '2rem',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        {['intervals', 'notes', 'chords'].map((topic) => (
          <button
            key={topic}
            onClick={() => setCurrentTopic(topic)}
            style={{
              padding: '12px 24px',
              fontSize: '1rem',
              fontWeight: '600',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: currentTopic === topic ? getLevelColor() : '#e2e8f0',
              color: currentTopic === topic ? 'white' : '#4a5568',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {topic === 'intervals' ? '🎵 Intervalos' : 
             topic === 'notes' ? '🎹 Notas' : '🎼 Acordes'}
          </button>
        ))}
      </div>

      {/* Contenido del tema seleccionado */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '2rem',
        border: '1px solid #e2e8f0',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        marginBottom: '2rem'
      }}>
        <h2 style={{
          color: getLevelColor(),
          marginBottom: '1rem',
          fontSize: '1.8rem',
          textAlign: 'center'
        }}>
          {levelContent[level][currentTopic].title}
        </h2>
        
        <p style={{
          color: '#4a5568',
          fontSize: '1.1rem',
          lineHeight: '1.6',
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          {levelContent[level][currentTopic].description}
        </p>

        <div style={{
          display: 'grid',
          gap: '1.5rem'
        }}>
          {levelContent[level][currentTopic].concepts.map((concept, index) => (
            <div
              key={index}
              style={{
                padding: '1.5rem',
                backgroundColor: '#f7fafc',
                borderRadius: '12px',
                border: '1px solid #e2e8f0'
              }}
            >
              <h3 style={{
                color: getLevelColor(),
                marginBottom: '0.5rem',
                fontSize: '1.3rem'
              }}>
                {concept.name}
              </h3>
              <p style={{
                color: '#4a5568',
                lineHeight: '1.6',
                marginBottom: '0.5rem'
              }}>
                {concept.explanation}
              </p>
              <div style={{
                backgroundColor: 'white',
                padding: '0.75rem',
                borderRadius: '8px',
                border: '1px solid #e2e8f0'
              }}>
                <strong style={{ color: '#2d3748' }}>Ejemplo:</strong> {concept.example}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ejercicios prácticos */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '2rem',
        border: '1px solid #e2e8f0',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{
          color: getLevelColor(),
          marginBottom: '1.5rem',
          fontSize: '1.5rem',
          textAlign: 'center'
        }}>
          🎯 Ejercicios Prácticos
        </h3>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1rem'
        }}>
          <button
            onClick={() => handleExerciseComplete(true)}
            style={{
              padding: '1rem',
              fontSize: '1rem',
              fontWeight: '600',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#10b981',
              color: 'white',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#059669';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#10b981';
            }}
          >
            ✅ Ejercicio Correcto
          </button>
          
          <button
            onClick={() => handleExerciseComplete(false)}
            style={{
              padding: '1rem',
              fontSize: '1rem',
              fontWeight: '600',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#ef4444',
              color: 'white',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#dc2626';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#ef4444';
            }}
          >
            ❌ Ejercicio Incorrecto
          </button>
        </div>

        <p style={{
          color: '#718096',
          fontSize: '0.9rem',
          textAlign: 'center',
          marginTop: '1rem',
          fontStyle: 'italic'
        }}>
          Haz clic en los botones para simular ejercicios y ver tu progreso en tiempo real
        </p>
      </div>
    </div>
  );
}

export default MusicianLevel;
