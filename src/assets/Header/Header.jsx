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
        
        {isAuthenticated && (
          <>
            <div className="user-info">
              <span className="user-username">@{currentUser.username}</span>
              <span className="user-type">({currentUser.userType === 'ear-training' ? '🎵 Estudiante' : '🎹 Músico'})</span>
            </div>
            <button 
              className="menu-button logout-button"
              onClick={handleLogout}
            >
              Cerrar Sesión
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
