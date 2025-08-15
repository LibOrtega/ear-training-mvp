import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginEarTraining() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [isSignUp, setIsSignUp] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos del usuario:", formData);
    
    if (isSignUp) {
      alert("Cuenta creada exitosamente. ¡Bienvenido a Afinapp!");
    } else {
      alert("Inicio de sesión exitoso. ¡Bienvenido de vuelta!");
    }
    
    // Redirigir al entrenamiento de oído
    navigate('/ear-training');
  };

  return (
    <div style={{
      maxWidth: '100%',
      width: '100%',
      margin: '0',
      fontFamily: 'system-ui, sans-serif',
      padding: '2rem',
      boxSizing: 'border-box',
      minHeight: 'calc(100vh - 80px)',
      backgroundColor: '#f8fafc',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{
        maxWidth: '400px',
        width: '100%',
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '2rem',
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
        border: '1px solid #e2e8f0'
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '2rem'
        }}>
          <h1 style={{
            fontSize: '2rem',
            color: '#1a202c',
            marginBottom: '0.5rem'
          }}>🎵 Entrenamiento de Oído</h1>
          <p style={{
            color: '#4a5568',
            fontSize: '1rem'
          }}>
            {isSignUp ? 'Crea tu cuenta para comenzar' : 'Inicia sesión para continuar'}
          </p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem'
        }}>
          <div>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: '#2d3748',
              fontWeight: '500'
            }}>
              Email:
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '16px',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                backgroundColor: '#f7fafc',
                color: '#2d3748',
                outline: 'none',
                boxSizing: 'border-box'
              }}
              placeholder="tu@email.com"
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: '#2d3748',
              fontWeight: '500'
            }}>
              Contraseña:
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '16px',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                backgroundColor: '#f7fafc',
                color: '#2d3748',
                outline: 'none',
                boxSizing: 'border-box'
              }}
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit"
            style={{
              padding: '14px',
              fontSize: '16px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#0056d6',
              color: 'white',
              cursor: 'pointer',
              fontWeight: '600',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#004494';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#0056d6';
            }}
          >
            {isSignUp ? 'Crear Cuenta' : 'Iniciar Sesión'}
          </button>
        </form>

        {/* Cambiar entre login y signup */}
        <div style={{
          textAlign: 'center',
          marginTop: '1.5rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid #e2e8f0'
        }}>
          <p style={{
            color: '#4a5568',
            marginBottom: '0.5rem'
          }}>
            {isSignUp ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}
          </p>
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            style={{
              background: 'none',
              border: 'none',
              color: '#0056d6',
              cursor: 'pointer',
              fontSize: '14px',
              textDecoration: 'underline'
            }}
          >
            {isSignUp ? 'Iniciar sesión' : 'Crear cuenta'}
          </button>
        </div>

        {/* Información adicional */}
        <div style={{
          marginTop: '2rem',
          padding: '1rem',
          backgroundColor: '#f7fafc',
          borderRadius: '8px',
          border: '1px solid #e2e8f0'
        }}>
          <h3 style={{
            color: '#0056d6',
            fontSize: '14px',
            marginBottom: '0.5rem'
          }}>✨ Beneficios de tu cuenta:</h3>
          <ul style={{
            color: '#4a5568',
            fontSize: '14px',
            margin: '0',
            paddingLeft: '1.5rem'
          }}>
            <li>Progreso guardado</li>
            <li>Estadísticas detalladas</li>
            <li>Ejercicios personalizados</li>
            <li>Historial de práctica</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default LoginEarTraining;
