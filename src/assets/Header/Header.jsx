import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './header.css';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Solo mostrar el botón de volver si no estamos en la página principal
  const showBackButton = location.pathname !== '/';

  return (
    <header className="header">
      <div className="logo">🎵 Afinapp</div>
      <div className="menu">
        {showBackButton && (
          <button 
            className="menu-button back-button"
            onClick={() => navigate('/')}
          >
            ← Volver al inicio
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
