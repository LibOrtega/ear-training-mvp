import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import Header from './assets/Header/Header.jsx'
import Home from './pages/Home.jsx'
import EarTraining from './pages/EarTraining.jsx'
import Contact from './pages/Contact.jsx'
import LoginEarTraining from './pages/LoginEarTraining.jsx'
import LoginMusico from './pages/LoginMusico.jsx'

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ear-training" element={<EarTraining />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login-ear-training" element={<LoginEarTraining />} />
          <Route path="/login-musico" element={<LoginMusico />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
