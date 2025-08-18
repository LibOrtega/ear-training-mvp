import React, { useState } from 'react';

function MusicTheory({ onClose }) {
  const [activeTab, setActiveTab] = useState('intervals');

  const theoryData = {
    intervals: {
      title: "🎵 Intervalos Musicales",
      description: "Los intervalos son la distancia entre dos notas. Son la base de toda la música.",
      concepts: [
        {
          name: "Unísono (0 semitonos)",
          description: "La misma nota tocada dos veces. Es como cantar la misma nota.",
          example: "Do - Do",
          visual: "🎵 → 🎵",
          tips: ["Es el intervalo más fácil de reconocer", "Suena como una sola nota"]
        },
        {
          name: "Segunda Menor (1 semitono)",
          description: "La distancia más pequeña entre dos notas diferentes.",
          example: "Do - Do#",
          visual: "🎵 → 🎵♯",
          tips: ["Suena tenso y angustioso", "Como el inicio de 'Jaws'"]
        },
        {
          name: "Segunda Mayor (2 semitonos)",
          description: "Dos semitonos de distancia. Muy común en melodías.",
          example: "Do - Re",
          visual: "🎵 → 🎵♮",
          tips: ["Suena alegre y ascendente", "Como 'Happy Birthday'"]
        },
        {
          name: "Tercera Menor (3 semitonos)",
          description: "Tres semitonos. Suena triste y melancólico.",
          example: "Do - Mi♭",
          visual: "🎵 → 🎵♭",
          tips: ["Suena triste y oscuro", "Muy usado en blues y jazz"]
        },
        {
          name: "Tercera Mayor (4 semitonos)",
          description: "Cuatro semitonos. Suena alegre y brillante.",
          example: "Do - Mi",
          visual: "🎵 → 🎵♮",
          tips: ["Suena alegre y brillante", "Como el inicio de 'Oh When the Saints'"]
        },
        {
          name: "Cuarta Justa (5 semitonos)",
          description: "Cinco semitonos. Suena estable y resolutivo.",
          example: "Do - Fa",
          visual: "🎵 → 🎵♮",
          tips: ["Suena estable y seguro", "Como el final de 'Amazing Grace'"]
        },
        {
          name: "Quinta Justa (7 semitonos)",
          description: "Siete semitonos. El intervalo más estable y consonante.",
          example: "Do - Sol",
          visual: "🎵 → 🎵♮",
          tips: ["Suena muy estable y fuerte", "Como el inicio de 'Twinkle Twinkle'"]
        },
        {
          name: "Sexta Menor (8 semitonos)",
          description: "Ocho semitonos. Suena suave y melancólico.",
          example: "Do - La♭",
          visual: "🎵 → 🎵♭",
          tips: ["Suena suave y melancólico", "Muy usado en baladas"]
        },
        {
          name: "Sexta Mayor (9 semitonos)",
          description: "Nueve semitonos. Suena alegre y expansivo.",
          example: "Do - La",
          visual: "🎵 → 🎵♮",
          tips: ["Suena alegre y expansivo", "Como el inicio de 'My Bonnie'"]
        },
        {
          name: "Séptima Menor (10 semitonos)",
          description: "Diez semitonos. Suena tenso y necesita resolución.",
          example: "Do - Si♭",
          visual: "🎵 → 🎵♭",
          tips: ["Suena tenso e inestable", "Quiere resolver hacia arriba"]
        },
        {
          name: "Séptima Mayor (11 semitonos)",
          description: "Once semitonos. Suena muy tenso y disonante.",
          example: "Do - Si",
          visual: "🎵 → 🎵♮",
          tips: ["Suena muy tenso y disonante", "Necesita resolución urgente"]
        },
        {
          name: "Octava (12 semitonos)",
          description: "Doce semitonos. La misma nota en diferente altura.",
          example: "Do - Do (una octava arriba)",
          visual: "🎵 → 🎵",
          tips: ["Suena como la misma nota pero más alta", "Muy fácil de reconocer"]
        }
      ]
    },
    notes: {
      title: "🎹 Las Notas Musicales",
      description: "Las notas son los sonidos básicos de la música. Aprende a reconocerlas por su sonido.",
      concepts: [
        {
          name: "Do (C)",
          description: "La nota fundamental. Suena estable y centrada.",
          example: "Primera nota de la escala mayor",
          visual: "🎵 Do",
          tips: ["Suena como el centro de todo", "Es la nota más estable"]
        },
        {
          name: "Re (D)",
          description: "La segunda nota. Suena ascendente y alegre.",
          example: "Segunda nota de la escala mayor",
          visual: "🎵 Re",
          tips: ["Suena como subir un escalón", "Muy común en melodías"]
        },
        {
          name: "Mi (E)",
          description: "La tercera nota. Suena brillante y mayor.",
          example: "Tercera nota de la escala mayor",
          visual: "🎵 Mi",
          tips: ["Suena alegre y brillante", "Como el sol brillando"]
        },
        {
          name: "Fa (F)",
          description: "La cuarta nota. Suena estable y resolutivo.",
          example: "Cuarta nota de la escala mayor",
          visual: "🎵 Fa",
          tips: ["Suena como llegar a casa", "Muy estable y seguro"]
        },
        {
          name: "Sol (G)",
          description: "La quinta nota. Suena fuerte y dominante.",
          example: "Quinta nota de la escala mayor",
          visual: "🎵 Sol",
          tips: ["Suena fuerte y dominante", "Como el centro de poder"]
        },
        {
          name: "La (A)",
          description: "La sexta nota. Suena suave y melódico.",
          example: "Sexta nota de la escala mayor",
          visual: "🎵 La",
          tips: ["Suena suave y melódico", "Muy cantable"]
        },
        {
          name: "Si (B)",
          description: "La séptima nota. Suena tenso y necesita resolución.",
          example: "Séptima nota de la escala mayor",
          visual: "🎵 Si",
          tips: ["Suena tenso e inestable", "Quiere resolver a Do"]
        }
      ]
    },
    chords: {
      title: "🎼 Acordes Básicos",
      description: "Los acordes son tres o más notas tocadas juntas. Crean la armonía de la música.",
      concepts: [
        {
          name: "Acorde Mayor",
          description: "Suena alegre, brillante y estable. Como el sol en un día despejado.",
          example: "Do - Mi - Sol (C-E-G)",
          visual: "🎵🎵🎵",
          tips: ["Suena alegre y brillante", "Muy común en música feliz", "Como el inicio de 'Happy Birthday'"]
        },
        {
          name: "Acorde Menor",
          description: "Suena triste, melancólico y oscuro. Como la lluvia en un día gris.",
          example: "Do - Mi♭ - Sol (C-E♭-G)",
          visual: "🎵♭🎵",
          tips: ["Suena triste y melancólico", "Muy usado en baladas tristes", "Como música de películas dramáticas"]
        },
        {
          name: "Acorde de Séptima",
          description: "Suena tenso, inestable y necesita resolución. Como una pregunta sin responder.",
          example: "Do - Mi - Sol - Si♭ (C-E-G-B♭)",
          visual: "🎵🎵🎵♭",
          tips: ["Suena tenso e inestable", "Quiere resolver a un acorde estable", "Muy usado en jazz y blues"]
        },
        {
          name: "Acorde Suspendido",
          description: "Suena flotante, sin resolver. Como estar suspendido en el aire.",
          example: "Do - Fa - Sol (C-F-G)",
          visual: "🎵🎵🎵",
          tips: ["Suena flotante y sin resolver", "Necesita resolver a un acorde estable", "Muy usado en música moderna"]
        }
      ]
    }
  };

  const currentTheory = theoryData[activeTab];

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        maxWidth: '900px',
        width: '100%',
        maxHeight: '90vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header */}
        <div style={{
          padding: '20px',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h1 style={{
            fontSize: '1.5rem',
            color: '#1a202c',
            margin: 0
          }}>
            📚 Teoría Musical para Principiantes
          </h1>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#718096'
            }}
          >
            ✕
          </button>
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex',
          borderBottom: '1px solid #e2e8f0',
          backgroundColor: '#f7fafc'
        }}>
          {Object.keys(theoryData).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '16px 24px',
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: activeTab === tab ? '600' : '400',
                color: activeTab === tab ? '#0056d6' : '#4a5568',
                borderBottom: activeTab === tab ? '3px solid #0056d6' : 'none',
                backgroundColor: activeTab === tab ? 'white' : 'transparent'
              }}
            >
              {theoryData[tab].title}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{
          flex: 1,
          overflow: 'auto',
          padding: '24px'
        }}>
          {/* Description */}
          <div style={{
            marginBottom: '24px',
            padding: '20px',
            backgroundColor: '#f0f9ff',
            borderRadius: '12px',
            border: '1px solid #bae6fd'
          }}>
            <h2 style={{
              fontSize: '1.3rem',
              color: '#0369a1',
              marginBottom: '12px'
            }}>
              {currentTheory.title}
            </h2>
            <p style={{
              fontSize: '16px',
              color: '#0c4a6e',
              lineHeight: '1.6',
              margin: 0
            }}>
              {currentTheory.description}
            </p>
          </div>

          {/* Concepts Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px'
          }}>
            {currentTheory.concepts.map((concept, index) => (
              <div
                key={index}
                style={{
                  padding: '20px',
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              >
                <h3 style={{
                  fontSize: '1.1rem',
                  color: '#1a202c',
                  marginBottom: '12px',
                  fontWeight: '600'
                }}>
                  {concept.name}
                </h3>
                
                <p style={{
                  fontSize: '14px',
                  color: '#4a5568',
                  marginBottom: '12px',
                  lineHeight: '1.5'
                }}>
                  {concept.description}
                </p>

                <div style={{
                  marginBottom: '12px',
                  padding: '8px 12px',
                  backgroundColor: '#f7fafc',
                  borderRadius: '6px',
                  border: '1px solid #e2e8f0'
                }}>
                  <strong style={{ color: '#2d3748' }}>Ejemplo:</strong> {concept.example}
                </div>

                <div style={{
                  marginBottom: '12px',
                  fontSize: '18px',
                  textAlign: 'center',
                  color: '#0056d6',
                  fontWeight: 'bold'
                }}>
                  {concept.visual}
                </div>

                <div style={{
                  backgroundColor: '#f0f9ff',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #bae6fd'
                }}>
                  <strong style={{ color: '#0369a1' }}>💡 Consejos:</strong>
                  <ul style={{
                    margin: '8px 0 0 0',
                    paddingLeft: '20px',
                    color: '#0c4a6e',
                    fontSize: '14px'
                  }}>
                    {concept.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} style={{ marginBottom: '4px' }}>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Practice Tips */}
          <div style={{
            marginTop: '32px',
            padding: '24px',
            backgroundColor: '#fef3c7',
            borderRadius: '12px',
            border: '1px solid #f59e0b'
          }}>
            <h3 style={{
              fontSize: '1.2rem',
              color: '#92400e',
              marginBottom: '16px'
            }}>
              🎯 Consejos para Practicar
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '16px'
            }}>
              <div>
                <h4 style={{ color: '#92400e', marginBottom: '8px' }}>Para Intervalos:</h4>
                <ul style={{ color: '#92400e', fontSize: '14px', margin: 0, paddingLeft: '20px' }}>
                  <li>Empieza con intervalos grandes (octava, quinta)</li>
                  <li>Canta las notas mientras las escuchas</li>
                  <li>Asocia cada intervalo con una canción conocida</li>
                </ul>
              </div>
              <div>
                <h4 style={{ color: '#92400e', marginBottom: '8px' }}>Para Notas:</h4>
                <ul style={{ color: '#92400e', fontSize: '14px', margin: 0, paddingLeft: '20px' }}>
                  <li>Practica con una nota a la vez</li>
                  <li>Usa un piano o teclado para visualizar</li>
                  <li>Repite la misma nota varias veces</li>
                </ul>
              </div>
              <div>
                <h4 style={{ color: '#92400e', marginBottom: '8px' }}>Para Acordes:</h4>
                <ul style={{ color: '#92400e', fontSize: '14px', margin: 0, paddingLeft: '20px' }}>
                  <li>Escucha la sensación general del acorde</li>
                  <li>Compara mayor vs menor</li>
                  <li>Presta atención a la tensión o estabilidad</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MusicTheory;
