import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SimpleFooter from '../components/SimpleFooter';

function Home() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleEarTrainingClick = () => {
    if (isAuthenticated) {
      navigate('/ear-training');
    } else {
      navigate('/login-ear-training');
    }
  };

  return (
    <div className="container">
      <div className="section">
        <h1 className="title-primary">Bienvenidx a Afinapp</h1>

        <p className="text-primary text-center">
          Tu plataforma completa para desarrollar el oído musical. 
          Desde principiantes hasta músicos avanzados, tenemos algo para ti.
        </p>

        {/* Disclaimer */}
        <div className="card disclaimer-card">
          <div className="disclaimer-header">
            <span className="disclaimer-icon">🚧</span>
            <h3 className="title-accent">¡Sitio en Construcción!</h3>
          </div>
          <p className="text-secondary text-center">
            Estoy trabajando constantemente para mejorar Afinapp. 
            <strong>Tu feedback es súper valioso para mí</strong> y me ayudaría mucho 
            saber qué te gusta y qué podría mejorar. ¡Gracias por tu paciencia! 💙
          </p>
        </div>

        {/* Selector de modo */}
        <div className="mode-selector">
          <button 
            onClick={handleEarTrainingClick}
            className="btn-primary mode-button"
          >
            <span className="button-text">Aficionado</span>
          </button>
          
          <button 
            onClick={() => navigate('/musician-mode')}
            className="btn-secondary mode-button"
          >
            <span className="button-text">Músico</span>
          </button>
          
          <button 
            onClick={() => navigate('/contact')}
            className="btn-accent mode-button"
          >
            <span className="button-text">Profesor</span>
          </button>
        </div>

        {/* Características destacadas */}
        <div className="features-section">
          <h2 className="title-secondary">¿Por qué elegir Afinapp?</h2>
          
          <div className="grid grid-3">
            <div className="card feature-card">
              <h3 className="title-accent">🎯 Entrenamiento Personalizado</h3>
              <p className="text-secondary">
                Ejercicios adaptados a tu nivel, desde principiantes hasta músicos avanzados.
              </p>
            </div>
            
            <div className="card feature-card">
              <h3 className="title-accent">✨ Ideal para Todos</h3>
              <p className="text-secondary">
                Perfecto tanto para músicos experimentados como para principiantes que quieren desarrollar su oído musical.
              </p>
            </div>
            
            <div className="card feature-card">
              <h3 className="title-accent">📊 Seguimiento de Progreso</h3>
              <p className="text-secondary">
                Monitorea tu mejora con estadísticas detalladas y reportes de rendimiento.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <SimpleFooter />
    </div>
  );
}

export default Home;
