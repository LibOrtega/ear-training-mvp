import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { usePremium } from '../hooks/usePremium';
import * as Tone from 'tone';
import MusicTheory from '../components/MusicTheory';
import PaymentModalStripe from '../components/PaymentModalStripe';


// 🎵 Lista completa de intervalos (0 a 12 semitonos, incluye compuestos si quieres expandir)
const INTERVALS = [
  { name: 'Unísono', semitones: 0 },
  { name: 'Segunda menor', semitones: 1 },
  { name: 'Segunda mayor', semitones: 2 },
  { name: 'Tercera menor', semitones: 3 },
  { name: 'Tercera mayor', semitones: 4 },
  { name: 'Cuarta perfecta', semitones: 5 },
  { name: 'Tritono', semitones: 6 },
  { name: 'Quinta perfecta', semitones: 7 },
  { name: 'Sexta menor', semitones: 8 },
  { name: 'Sexta mayor', semitones: 9 },
  { name: 'Séptima menor', semitones: 10 },
  { name: 'Séptima mayor', semitones: 11 },
  { name: 'Octava', semitones: 12 }
]

// 🎹 Nombres de notas
const NOTE_NAMES = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B']

// 🎼 Tipos de acordes (intervalos desde la fundamental)
const CHORD_TYPES = [
  { name: 'Major', intervals: [0,4,7] },
  { name: 'Minor', intervals: [0,3,7] },
  { name: 'Diminished', intervals: [0,3,6] },
  { name: 'Augmented', intervals: [0,4,8] },
  { name: 'Sus2', intervals: [0,2,7] },
  { name: 'Sus4', intervals: [0,5,7] },
  { name: 'Major 7', intervals: [0,4,7,11] },
  { name: 'Minor 7', intervals: [0,3,7,10] },
  { name: 'Dominant 7', intervals: [0,4,7,10] },
  { name: 'Diminished 7', intervals: [0,3,6,9] },
  { name: 'Half-diminished (m7b5)', intervals: [0,3,6,10] },
  { name: '6', intervals: [0,4,7,9] },
  { name: 'Minor 6', intervals: [0,3,7,9] },
  { name: 'Add9', intervals: [0,4,7,14] },
  { name: 'Minor Add9', intervals: [0,3,7,14] },
  { name: '9', intervals: [0,4,7,10,14] },
  { name: 'Minor 9', intervals: [0,3,7,10,14] }
]

// 🎵 Función utilitaria
function midiToNote(m) {
  const octave = Math.floor(m / 12) - 1
  return NOTE_NAMES[m % 12] + octave
}

function shuffle(a){ return a.slice().sort(()=>Math.random()-0.5) }

function EarTraining() {
  const navigate = useNavigate();
  const { currentUser, isAuthenticated, updateProgress, getUserStats } = useAuth();
  const { isPremium } = usePremium();
  const synthRef = useRef(null)
  const [mode, setMode] = useState('intervals') // 'intervals', 'notes', 'chords'
  const [question, setQuestion] = useState(null)
  const [message, setMessage] = useState('')
  const [score, setScore] = useState({correct:0, total:0})
  const [showMusicTheory, setShowMusicTheory] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const [isLoading, setIsLoading] = useState(true)


  // Redirigir si no está autenticado
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login-ear-training');
      return;
    }
  }, [isAuthenticated, navigate]);

  // Inicializar sintetizador y crear primera pregunta
  useEffect(() => {
    if (isAuthenticated) {
      setIsLoading(true);
      const initializeAudio = async () => {
        try {
          if (!synthRef.current) {
            // Usar un sintetizador de piano más confiable
                         synthRef.current = new Tone.PolySynth(Tone.Synth, {
               oscillator: {
                 type: "triangle"
               },
               envelope: {
                 attack: 0.05,
                 decay: 0.2,
                 sustain: 0.2,
                 release: 1.0
               },
               volume: -15
             }).toDestination();
          }
          setIsInitialized(true);
                  // Crear primera pregunta después de inicializar
        setTimeout(() => {
          newQuestion(false);
          setIsLoading(false);
        }, 100);
        } catch (error) {
          console.error('Error al inicializar audio:', error);
          setIsInitialized(true);
          // Crear pregunta incluso si hay error de audio
          setTimeout(() => {
            newQuestion(false);
            setIsLoading(false);
          }, 100);
        }
      };
      
      initializeAudio();
    }
  }, [isAuthenticated]);

  // Cargar progreso del usuario
  useEffect(() => {
    if (isAuthenticated && currentUser && currentUser.progress) {
      setScore({
        correct: currentUser.progress.correct,
        total: currentUser.progress.total
      });
    }
  }, [isAuthenticated, currentUser]);

  // Crear nueva pregunta cuando cambie el modo (solo si ya está inicializado)
  useEffect(() => {
    if (isAuthenticated && isInitialized && question) {
      newQuestion(false);
    }
  }, [mode, isAuthenticated, isInitialized]);

  const handleTutorialClick = useCallback(() => {
    if (isPremium) {
      setShowMusicTheory(true);
    } else {
      setShowPaymentModal(true);
    }
  }, [isPremium]);

  const handlePaymentSuccess = useCallback(() => {
    setShowPaymentModal(false);
    setShowMusicTheory(true);
  }, []);

  const newQuestion = useCallback((isReset = false) => {
    if (mode === 'intervals') {
      const correct = INTERVALS[Math.floor(Math.random()*INTERVALS.length)]
      const root = Math.floor(Math.random()*60) + 21 // 21..80 (evitamos notas extremas)
      const others = shuffle(INTERVALS.filter(i=>i.semitones !== correct.semitones)).slice(0,3)
      const options = shuffle([correct, ...others])
      setQuestion({root, correct, options, played:false})

    } else if (mode === 'notes') {
      const root = Math.floor(Math.random()*(108-21+1)) + 21 // todo el rango de piano
      const correctNote = midiToNote(root)
      const allNotes = []
      for (let m = 21; m <= 108; m++) allNotes.push(midiToNote(m))
      const others = shuffle(allNotes.filter(n=>n !== correctNote)).slice(0,3)
      const options = shuffle([correctNote, ...others])
      setQuestion({root, correct: correctNote, options, played:false})

    } else if (mode === 'chords') {
      const chordType = CHORD_TYPES[Math.floor(Math.random()*CHORD_TYPES.length)]
      const root = Math.floor(Math.random()*60) + 21 // rango seguro
      const correct = chordType
      const others = shuffle(CHORD_TYPES.filter(c=>c.name !== chordType.name)).slice(0,3)
      const options = shuffle([correct, ...others])
      setQuestion({root, correct, options, played:false})
    }
    setMessage('')
  }, [mode]);

  async function play(){
    if(!question) return
    await Tone.start()
    const now = Tone.now()
    const synth = synthRef.current

    if (mode === 'intervals') {
      const rootNote = midiToNote(question.root)
      const secondNote = midiToNote(question.root + question.correct.semitones)
      synth.triggerAttackRelease(rootNote, '8n', now)
      synth.triggerAttackRelease(secondNote, '8n', now + 0.6)

    } else if (mode === 'notes') {
      synth.triggerAttackRelease(midiToNote(question.root), '8n', now)

    } else if (mode === 'chords') {
      const notes = question.correct.intervals.map(i => midiToNote(question.root + i))
      
      // Primero tocar el arpegio (notas individuales)
      notes.forEach((note, index) => {
        synth.triggerAttackRelease(note, '8n', now + (index * 0.3))
      })
      
      // Luego tocar el acorde completo
      synth.triggerAttackRelease(notes, '4n', now + (notes.length * 0.3) + 0.2)
    }
    setQuestion(q => ({...q, played:true}))
  }

  function answer(opt){
    const correct = (mode === 'intervals')
      ? opt.semitones === question.correct.semitones
      : (mode === 'notes')
        ? opt === question.correct
        : opt.name === question.correct.name

    // Actualizar puntaje local
    setScore(s => ({correct: s.correct + (correct?1:0), total: s.total + 1}))
    
    // Actualizar progreso en el contexto
    if (isAuthenticated && currentUser) {
      updateProgress({
        correct,
        mode,
        question: question.correct.name || question.correct,
        timestamp: new Date().toISOString()
      });
    }
    
    setMessage(correct ? '¡Correcto!' : `Incorrecto — era ${mode === 'intervals' ? question.correct.name : question.correct.name || question.correct}`)
    setTimeout(()=> newQuestion(false), 1000)
  }

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
           color: 'var(--text-secondary)'
         }}>
           Redirigiendo al login...
         </div>
       </div>
     );
   }

     // Si está cargando, mostrar loading
   if (isLoading) {
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
           color: 'var(--text-secondary)'
         }}>
           Cargando ejercicios...
         </div>
       </div>
     );
   }

     // Si no está inicializado, mostrar loading
   if (!isInitialized) {
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
           color: 'var(--text-secondary)'
         }}>
           Inicializando...
         </div>
       </div>
     );
   }

     // Si no hay pregunta, crear una nueva
   if (!question) {
     newQuestion(false);
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
           color: 'var(--text-secondary)'
         }}>
           Preparando ejercicios...
         </div>
       </div>
     );
   }

  const userStats = getUserStats();

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
        }}>🎵 Entrenamiento de Oído</h1>
      </div>

      {/* Información del usuario */}
      {userStats && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{
            padding: '16px 24px',
            backgroundColor: 'var(--background-card)',
            borderRadius: 'var(--border-radius-md)',
            border: '1px solid rgba(255, 140, 66, 0.3)',
            boxShadow: 'var(--shadow-md)',
            textAlign: 'center',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '6px' }}>
              Miembro desde
            </div>
            <div style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)' }}>
              {userStats.memberSince}
            </div>
          </div>
          
          <div style={{
            padding: '16px 24px',
            backgroundColor: 'var(--background-card)',
            borderRadius: 'var(--border-radius-md)',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            boxShadow: 'var(--shadow-md)',
            textAlign: 'center',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '6px' }}>
              Precisión
            </div>
            <div style={{ fontSize: '16px', fontWeight: '600', color: 'var(--primary-color)' }}>
              {userStats.accuracy}
            </div>
          </div>
        </div>
      )}

      {/* Selector de tipo de ejercicio */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '16px',
        marginBottom: '24px',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        <button 
          onClick={()=>setMode('intervals')} 
          disabled={mode==='intervals'}
          style={{
            padding: '14px 28px',
            fontSize: 'clamp(14px, 2.5vw, 18px)',
            minHeight: '50px',
            borderRadius: 'var(--border-radius-md)',
            border: 'none',
            background: mode==='intervals' ? 'var(--primary-gradient)' : 'linear-gradient(135deg, rgba(255, 140, 66, 0.3) 0%, rgba(255, 140, 66, 0.2) 100%)',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            transition: 'var(--transition-normal)',
            boxShadow: mode==='intervals' ? 'var(--shadow-orange)' : '0 2px 8px rgba(255, 140, 66, 0.2)',
            transform: 'translateY(0)',
            backdropFilter: 'blur(10px)',
            border: mode==='intervals' ? 'none' : '1px solid rgba(255, 140, 66, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
          onMouseEnter={(e) => {
            if (mode !== 'intervals') {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 4px 15px rgba(255, 140, 66, 0.3)';
              e.target.style.background = 'linear-gradient(135deg, rgba(255, 140, 66, 0.4) 0%, rgba(255, 140, 66, 0.3) 100%)';
            }
          }}
          onMouseLeave={(e) => {
            if (mode !== 'intervals') {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 2px 8px rgba(255, 140, 66, 0.2)';
              e.target.style.background = 'linear-gradient(135deg, rgba(255, 140, 66, 0.3) 0%, rgba(255, 140, 66, 0.2) 100%)';
            }
          }}
        >
          Intervalos
        </button>
        <button 
          onClick={()=>setMode('notes')} 
          disabled={mode==='notes'}
          style={{
            padding: '14px 28px',
            fontSize: 'clamp(14px, 2.5vw, 18px)',
            minHeight: '50px',
            borderRadius: 'var(--border-radius-md)',
            border: 'none',
            background: mode==='notes' ? 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)' : 'linear-gradient(135deg, rgba(14, 165, 233, 0.3) 0%, rgba(2, 132, 199, 0.2) 100%)',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            transition: 'var(--transition-normal)',
            boxShadow: mode==='notes' ? '0 4px 15px rgba(14, 165, 233, 0.3)' : '0 2px 8px rgba(14, 165, 233, 0.2)',
            transform: 'translateY(0)',
            backdropFilter: 'blur(10px)',
            border: mode==='notes' ? 'none' : '1px solid rgba(14, 165, 233, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
          onMouseEnter={(e) => {
            if (mode !== 'notes') {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 4px 15px rgba(14, 165, 233, 0.3)';
              e.target.style.background = 'linear-gradient(135deg, rgba(14, 165, 233, 0.4) 0%, rgba(2, 132, 199, 0.3) 100%)';
            }
          }}
          onMouseLeave={(e) => {
            if (mode !== 'notes') {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 2px 8px rgba(14, 165, 233, 0.2)';
              e.target.style.background = 'linear-gradient(135deg, rgba(14, 165, 233, 0.3) 0%, rgba(2, 132, 199, 0.2) 100%)';
            }
          }}
        >
          Notas
        </button>
        <button 
          onClick={()=>setMode('chords')} 
          disabled={mode==='chords'}
          style={{
            padding: '14px 28px',
            fontSize: 'clamp(14px, 2.5vw, 18px)',
            minHeight: '50px',
            borderRadius: 'var(--border-radius-md)',
            border: 'none',
            background: mode==='chords' ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 'linear-gradient(135deg, rgba(16, 185, 129, 0.3) 0%, rgba(5, 150, 105, 0.2) 100%)',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            transition: 'var(--transition-normal)',
            boxShadow: mode==='chords' ? '0 4px 15px rgba(16, 185, 129, 0.3)' : '0 2px 8px rgba(16, 185, 129, 0.2)',
            transform: 'translateY(0)',
            backdropFilter: 'blur(10px)',
            border: mode==='chords' ? 'none' : '1px solid rgba(16, 185, 129, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
          onMouseEnter={(e) => {
            if (mode !== 'chords') {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 4px 15px rgba(16, 185, 129, 0.3)';
              e.target.style.background = 'linear-gradient(135deg, rgba(16, 185, 129, 0.4) 0%, rgba(5, 150, 105, 0.3) 100%)';
            }
          }}
          onMouseLeave={(e) => {
            if (mode !== 'chords') {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 2px 8px rgba(16, 185, 129, 0.2)';
              e.target.style.background = 'linear-gradient(135deg, rgba(16, 185, 129, 0.3) 0%, rgba(5, 150, 105, 0.2) 100%)';
            }
          }}
        >
          Acordes
        </button>
        <button 
          onClick={handleTutorialClick}
          style={{
            padding: '14px 28px',
            fontSize: 'clamp(14px, 2.5vw, 18px)',
            minHeight: '50px',
            borderRadius: 'var(--border-radius-md)',
            border: 'none',
            background: isPremium ? 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)' : 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transition: 'var(--transition-normal)',
            boxShadow: isPremium ? '0 4px 15px rgba(139, 92, 246, 0.3)' : '0 4px 15px rgba(251, 191, 36, 0.4)',
            transform: 'translateY(0)',
            backdropFilter: 'blur(10px)',
            border: isPremium ? 'none' : '1px solid rgba(251, 191, 36, 0.4)'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            if (isPremium) {
              e.target.style.boxShadow = '0 6px 20px rgba(139, 92, 246, 0.4)';
            } else {
              e.target.style.boxShadow = '0 6px 20px rgba(251, 191, 36, 0.5)';
              e.target.style.background = 'linear-gradient(135deg, #fcd34d 0%, #f59e0b 100%)';
            }
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            if (isPremium) {
              e.target.style.boxShadow = '0 4px 15px rgba(139, 92, 246, 0.3)';
            } else {
              e.target.style.boxShadow = '0 4px 15px rgba(251, 191, 36, 0.4)';
              e.target.style.background = 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)';
            }
          }}
        >
          {isPremium ? '📚 Tutoriales' : '🔒 Desbloquear Experiencia Completa'}
        </button>
      </div>

      {/* Controles de ejercicio */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '16px',
        marginBottom: '24px',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        <button 
          onClick={play}
          style={{
            padding: '14px 28px',
            fontSize: 'clamp(14px, 2.5vw, 18px)',
            minHeight: '50px',
            borderRadius: 'var(--border-radius-md)',
            border: 'none',
            background: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            transition: 'var(--transition-normal)',
            boxShadow: '0 4px 15px rgba(220, 38, 38, 0.3)',
            transform: 'translateY(0)',
            backdropFilter: 'blur(10px)'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 6px 20px rgba(220, 38, 38, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 15px rgba(220, 38, 38, 0.3)';
          }}
        >
          ▶ Reproducir
        </button>
                                   <button 
            onClick={()=>newQuestion(false)}
            style={{
              padding: '14px 28px',
              fontSize: 'clamp(14px, 2.5vw, 18px)',
              minHeight: '50px',
              borderRadius: 'var(--border-radius-md)',
              border: 'none',
              background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              transition: 'var(--transition-normal)',
              boxShadow: '0 4px 15px rgba(251, 191, 36, 0.3)',
              transform: 'translateY(0)',
              backdropFilter: 'blur(10px)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 20px rgba(251, 191, 36, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(251, 191, 36, 0.3)';
            }}
          >
            🔁 Nueva
          </button>
                    
         <div style={{
           fontSize: 'clamp(16px, 3vw, 20px)',
           textAlign: 'center',
           padding: '16px 24px',
           backgroundColor: 'var(--background-card)',
           borderRadius: 'var(--border-radius-md)',
           color: 'var(--text-primary)',
           fontWeight: 'bold',
           border: '1px solid rgba(255, 140, 66, 0.3)',
           boxShadow: 'var(--shadow-md)',
           backdropFilter: 'blur(10px)'
         }}>
           Puntaje: {score.correct}/{score.total}
         </div>
      </div>

             {/* Área de ejercicio */}
       {question && (
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
                     <p style={{
             fontSize: 'clamp(16px, 3.5vw, 22px)',
             textAlign: 'center',
             marginBottom: '20px',
             color: 'var(--text-primary)',
             fontWeight: '600'
           }}>
             Selecciona {mode === 'intervals' ? 'el intervalo' : mode === 'notes' ? 'la nota' : 'el acorde'} que escuchas:
           </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            marginTop: '20px'
          }}>
            {question.options.map(opt=>(
              <button
                key={opt.name || opt}
                onClick={()=>answer(opt)}
                disabled={!question.played}
                                 style={{
                   padding: '16px',
                   fontSize: 'clamp(14px, 2.5vw, 18px)',
                   minHeight: '60px',
                   wordBreak: 'break-word',
                   borderRadius: 'var(--border-radius-md)',
                   backgroundColor: 'var(--background-tertiary)',
                   color: 'var(--text-primary)',
                   cursor: question.played ? 'pointer' : 'not-allowed',
                   transition: 'var(--transition-normal)',
                   border: '1px solid rgba(255, 140, 66, 0.2)',
                   backdropFilter: 'blur(10px)'
                 }}
                                 onMouseEnter={(e) => {
                   if (question.played) {
                     e.target.style.backgroundColor = 'rgba(255, 140, 66, 0.15)';
                     e.target.style.transform = 'translateY(-2px)';
                     e.target.style.boxShadow = 'var(--shadow-md)';
                   }
                 }}
                 onMouseLeave={(e) => {
                   if (question.played) {
                     e.target.style.backgroundColor = 'var(--background-tertiary)';
                     e.target.style.transform = 'translateY(0)';
                     e.target.style.boxShadow = 'none';
                   }
                 }}
              >
                {opt.name || opt}
              </button>
            ))}
          </div>
                     <p style={{
             marginTop: '20px',
             textAlign: 'center',
             fontSize: 'clamp(16px, 3.5vw, 22px)',
             color: 'var(--primary-color)',
             fontWeight: 'bold',
             minHeight: '30px'
           }}>
             {message}
           </p>
        </div>
      )}

             {/* Información del modo actual */}
       <div style={{
         marginTop: '2rem',
         padding: '2rem',
         backgroundColor: 'var(--background-card)',
         borderRadius: 'var(--border-radius-lg)',
         border: '1px solid rgba(139, 92, 246, 0.3)',
         boxShadow: 'var(--shadow-lg)',
         backdropFilter: 'blur(10px)',
         backgroundImage: `
           radial-gradient(circle at 25% 25%, rgba(139, 92, 246, 0.05) 1px, transparent 1px),
           radial-gradient(circle at 75% 75%, rgba(255, 140, 66, 0.05) 1px, transparent 1px)
         `,
         backgroundSize: '50px 50px',
         backgroundPosition: '0 0, 25px 25px'
       }}>
                 <h3 style={{
           color: 'var(--text-primary)',
           marginBottom: '16px',
           textAlign: 'center',
           background: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)',
           WebkitBackgroundClip: 'text',
           WebkitTextFillColor: 'transparent',
           backgroundClip: 'text',
           fontSize: '1.4rem',
           fontWeight: '600'
         }}>
           {mode === 'intervals' ? '🎵 Entrenamiento de Intervalos' : 
            mode === 'notes' ? '🎹 Identificación de Notas' : 
            '🎼 Reconocimiento de Acordes'}
         </h3>
                 <p style={{
           color: 'var(--text-secondary)',
           lineHeight: '1.6',
           textAlign: 'center',
           fontSize: '1rem'
         }}>
           {mode === 'intervals' ? 
             'Escucha dos notas y identifica el intervalo entre ellas. Este ejercicio mejora tu capacidad de reconocer distancias musicales.' :
            mode === 'notes' ? 
             'Escucha una nota y identifícala por su nombre. Perfecto para desarrollar el oído absoluto y relativo.' :
             'Escucha un acorde y identifica su tipo. Desarrolla tu capacidad de reconocer armonías y progresiones.'
           }
         </p>
      </div>

      {/* Modales */}
      {showMusicTheory && (
        <MusicTheory onClose={() => setShowMusicTheory(false)} />
      )}
      
      {showPaymentModal && (
        <PaymentModalStripe 
          onClose={() => setShowPaymentModal(false)}
          onSuccess={handlePaymentSuccess}
        />
      )}

              
    </div>
  );
}

export default EarTraining;
