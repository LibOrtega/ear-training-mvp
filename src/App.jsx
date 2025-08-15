import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import Header from './assets/Header/Header.jsx'
import Home from './pages/Home.jsx'
import EarTraining from './pages/EarTraining.jsx'
import Contact from './pages/Contact.jsx'

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ear-training" element={<EarTraining />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
