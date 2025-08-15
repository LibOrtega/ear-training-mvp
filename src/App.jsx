import React, { useEffect, useRef, useState } from 'react'
import * as Tone from 'tone'
import './index.css'
import Header from './assets/Header/Header.jsx'

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

export default function App(){
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

  if(!question) return <div>Cargando...</div>

  return (
    <div>
      <Header />
      <div style={{maxWidth:600, margin:'2rem auto', fontFamily:'system-ui, sans-serif', padding:'1rem'}}>
        <h1>Entrenador de oído</h1>
        <div style={{display:'flex', gap:12, marginBottom:12}}>
          <button onClick={()=>setMode('intervals')} disabled={mode==='intervals'}>🎵 Intervalos</button>
          <button onClick={()=>setMode('notes')} disabled={mode==='notes'}>🎹 Notas</button>
          <button onClick={()=>setMode('chords')} disabled={mode==='chords'}>🎼 Acordes</button>
        </div>

        <div style={{display:'flex', gap:12, marginBottom:12, alignItems:'center'}}>
          <button onClick={play}>▶ Reproducir</button>
          <button onClick={()=>newQuestion()}>🔁 Nueva</button>
          <div style={{marginLeft:'auto'}}>Puntaje: {score.correct}/{score.total}</div>
        </div>

        <div style={{border:'1px solid #ddd', padding:12, borderRadius:6}}>
          <p>Selecciona {mode === 'intervals' ? 'el intervalo' : mode === 'notes' ? 'la nota' : 'el acorde'} que escuchas:</p>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:8}}>
            {question.options.map(opt=>(
              <button
                key={opt.name || opt}
                onClick={()=>answer(opt)}
                disabled={!question.played}
                style={{padding:12}}
              >
                {opt.name || opt}
              </button>
            ))}
          </div>
          <p style={{marginTop:10}}>{message}</p>
        </div>
      </div>
    </div>
  )
}
