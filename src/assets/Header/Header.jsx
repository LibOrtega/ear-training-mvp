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
            <span className="logo-icon">🎼</span>
            <span className="logo-text">Afinapp</span>
          </div>
        </div>
        
        <div className="header-actions">
          {showBackButton && (
            <button 
              className="action-button back-button"
              onClick={() => navigate('/')}
            >
              <span className="button-icon">🏠</span>
              <span className="button-text">Inicio</span>
            </button>
          )}
          
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
