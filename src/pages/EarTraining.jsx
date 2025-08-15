import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Tone from 'tone';

// 🎵 Lista completa de intervalos (0 a 12 semitonos, incluye compuestos si quieres expandir)
const INTERVALS = [
  { name: 'Unison', semitones: 0 },
  { name: 'Minor 2nd', semitones: 1 },
  { name: 'Major 2nd', semitones: 2 },
  { name: 'Minor 3rd', semitones: 3 },
  { name: 'Major 3rd', semitones: 4 },
  { name: 'Perfect 4th', semitones: 5 },
  { name: 'Tritone', semitones: 6 },
  { name: 'Perfect 5th', semitones: 7 },
  { name: 'Minor 6th', semitones: 8 },
  { name: 'Major 6th', semitones: 9 },
  { name: 'Minor 7th', semitones: 10 },
  { name: 'Major 7th', semitones: 11 },
  { name: 'Octave', semitones: 12 }
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
  const synthRef = useRef(null)
  const [mode, setMode] = useState('intervals') // 'intervals', 'notes', 'chords'
  const [question, setQuestion] = useState(null)
  const [message, setMessage] = useState('')
  const [score, setScore] = useState({correct:0, total:0})

  useEffect(()=>{
    synthRef.current = new Tone.PolySynth(Tone.Synth).toDestination()
    newQuestion()
  }, [mode])

  function newQuestion(){
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
  }

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
      synth.triggerAttackRelease(midiToNote(question.root), '1n', now)

    } else if (mode === 'chords') {
      const notes = question.correct.intervals.map(i => midiToNote(question.root + i))
      synth.triggerAttackRelease(notes, '1n', now)
    }
    setQuestion(q => ({...q, played:true}))
  }

  function answer(opt){
    const correct = (mode === 'intervals')
      ? opt.semitones === question.correct.semitones
      : (mode === 'notes')
        ? opt === question.correct
        : opt.name === question.correct.name

    setScore(s => ({correct: s.correct + (correct?1:0), total: s.total + 1}))
    setMessage(correct ? '¡Correcto!' : `Incorrecto — era ${mode === 'intervals' ? question.correct.name : question.correct.name || question.correct}`)
    setTimeout(()=> newQuestion(), 1000)
  }

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
        }}>🎵 Entrenamiento de Oído</h1>
        
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
            padding: '12px 24px',
            fontSize: 'clamp(14px, 2.5vw, 18px)',
            minHeight: '50px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: mode==='intervals' ? '#4CAF50' : '#2196F3',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          🎵 Intervalos
        </button>
        <button 
          onClick={()=>setMode('notes')} 
          disabled={mode==='notes'}
          style={{
            padding: '12px 24px',
            fontSize: 'clamp(14px, 2.5vw, 18px)',
            minHeight: '50px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: mode==='notes' ? '#4CAF50' : '#2196F3',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          🎹 Notas
        </button>
        <button 
          onClick={()=>setMode('chords')} 
          disabled={mode==='chords'}
          style={{
            padding: '12px 24px',
            fontSize: 'clamp(14px, 2.5vw, 18px)',
            minHeight: '50px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: mode==='chords' ? '#4CAF50' : '#2196F3',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          🎼 Acordes
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
            padding: '12px 24px',
            fontSize: 'clamp(14px, 2.5vw, 18px)',
            minHeight: '50px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: '#FF9800',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          ▶ Reproducir
        </button>
        <button 
          onClick={()=>newQuestion()}
          style={{
            padding: '12px 24px',
            fontSize: 'clamp(14px, 2.5vw, 18px)',
            minHeight: '50px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: '#9C27B0',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          🔁 Nueva
        </button>
        <div style={{
          fontSize: 'clamp(16px, 3vw, 20px)',
          textAlign: 'center',
          padding: '12px 24px',
          backgroundColor: '#333',
          borderRadius: '8px',
          color: 'white',
          fontWeight: 'bold'
        }}>
          Puntaje: {score.correct}/{score.total}
        </div>
      </div>

      {/* Área de ejercicio */}
      {question && (
        <div style={{
          border: '2px solid #444',
          padding: '24px',
          borderRadius: '12px',
          maxWidth: '100%',
          backgroundColor: '#2a2a2a',
          boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
        }}>
          <p style={{
            fontSize: 'clamp(16px, 3.5vw, 22px)',
            textAlign: 'center',
            marginBottom: '20px',
            color: 'white'
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
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: '#555',
                  color: 'white',
                  cursor: question.played ? 'pointer' : 'not-allowed',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  if (question.played) {
                    e.target.style.backgroundColor = '#666';
                    e.target.style.transform = 'scale(1.02)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (question.played) {
                    e.target.style.backgroundColor = '#555';
                    e.target.style.transform = 'scale(1)';
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
            color: '#4CAF50',
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
        padding: '20px',
        backgroundColor: '#2a2a2a',
        borderRadius: '12px',
        border: '1px solid #444'
      }}>
        <h3 style={{
          color: '#4CAF50',
          marginBottom: '16px',
          textAlign: 'center'
        }}>
          {mode === 'intervals' ? '🎵 Entrenamiento de Intervalos' : 
           mode === 'notes' ? '🎹 Identificación de Notas' : 
           '🎼 Reconocimiento de Acordes'}
        </h3>
        <p style={{
          color: '#ccc',
          lineHeight: '1.6',
          textAlign: 'center'
        }}>
          {mode === 'intervals' ? 
            'Escucha dos notas y identifica el intervalo entre ellas. Este ejercicio mejora tu capacidad de reconocer distancias musicales.' :
           mode === 'notes' ? 
            'Escucha una nota y identifícala por su nombre. Perfecto para desarrollar el oído absoluto y relativo.' :
            'Escucha un acorde y identifica su tipo. Desarrolla tu capacidad de reconocer armonías y progresiones.'
          }
        </p>
      </div>
    </div>
  );
}

export default EarTraining;
