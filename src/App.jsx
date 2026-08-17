import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import ScrollManager from './components/ScrollManager'
import WhatsAppButton from './components/WhatsAppButton'
import Contact from './pages/Contact'
import GalleryPage from './pages/GalleryPage'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Packages from './pages/Packages'
import Spaces from './pages/Spaces'

function App() {
  return (
    <BrowserRouter>
      <ScrollManager />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/salones" element={<Spaces />} />
          <Route path="/paquetes" element={<Packages />} />
          <Route path="/galeria" element={<GalleryPage />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
    </BrowserRouter>
  )
}

export default App
