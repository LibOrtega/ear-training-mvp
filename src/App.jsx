import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import { AuthProvider } from './context/AuthContext'
import Header from './assets/Header/Header.jsx'
import Home from './pages/Home.jsx'
import EarTraining from './pages/EarTraining.jsx'
import Contact from './pages/Contact.jsx'
import ContactSimple from './pages/ContactSimple.jsx'
import LoginEarTraining from './pages/LoginEarTraining.jsx'
import LoginMusico from './pages/LoginMusico.jsx'
import MusicianMode from './pages/MusicianMode.jsx'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ear-training" element={<EarTraining />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/contact-simple" element={<ContactSimple />} />
            <Route path="/login-ear-training" element={<LoginEarTraining />} />
            <Route path="/login-musico" element={<LoginMusico />} />
            <Route path="/musician-mode" element={<MusicianMode />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
