import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './header.css';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, isAuthenticated, logout } = useAuth();
  
  // Solo mostrar el botón de volver si no estamos en la página principal
  const showBackButton = location.pathname !== '/';

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-section">
          <div className="logo">
            {/* Logo con cara feliz */}
            <div className="logo-icon-container">
              <div className="logo-icon">
                <div className="happy-face">
                  <div className="eye left-eye"></div>
                  <div className="eye right-eye"></div>
                  <div className="smile"></div>
                </div>
              </div>
            </div>
            <span className="logo-text">Afinapp</span>
          </div>
        </div>
        
        <div className="header-actions">
          {/* Navegación para la página de inicio */}
          {!showBackButton && (
            <nav className="header-navigation">
              <a 
                href="/contact-simple" 
                className="nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/contact-simple');
                }}
              >
                Contacto
              </a>
              <a href="#modes" className="nav-link">
                Modos
              </a>
              <button className="nav-button">
                Entrar
              </button>
            </nav>
          )}
          
          {/* Botón de volver para otras páginas */}
          {showBackButton && (
            <button 
              className="action-button back-button"
              onClick={() => navigate('/')}
            >
              <span className="button-icon">🏠</span>
              <span className="button-text">Inicio</span>
            </button>
          )}
          
          {/* Sección de usuario cuando está autenticado */}
          {isAuthenticated && (
            <div className="user-section">
              <div className="user-profile">
                <div className="user-avatar">
                  {currentUser.username.charAt(0).toUpperCase()}
                </div>
                <div className="user-details">
                  <div className="user-name">@{currentUser.username}</div>
                  <div className="user-role">
                    {currentUser.userType === 'ear-training' ? '🎯 Estudiante' : '🎭 Músico'}
                  </div>
                </div>
              </div>
              
              <button 
                className="action-button logout-button"
                onClick={handleLogout}
              >
                <span className="button-icon">🚪</span>
                <span className="button-text">Salir</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
