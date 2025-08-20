import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


function LoginMusico() {
  const navigate = useNavigate();
  const { signUp, login, isAuthenticated, clearCorruptedData } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: ""
  });
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/musician-mode');
    }
  }, [isAuthenticated, navigate]);

  // Si ya está autenticado, mostrar loading mientras redirige
  if (isAuthenticated) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f8fafc'
      }}>
        <div style={{
          fontSize: '18px',
          color: '#4a5568'
        }}>
          Redirigiendo al modo músico...
        </div>
      </div>
    );
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Limpiar error cuando el usuario escribe
  };

  const validateForm = () => {
    if (isSignUp) {
      // Validaciones para registro
      if (formData.username.trim().length < 3) {
        throw new Error('El nombre de usuario debe tener al menos 3 caracteres');
      }
      if (formData.email !== formData.confirmEmail) {
        throw new Error('Los correos electrónicos no coinciden');
      }
      if (formData.password.length < 6) {
        throw new Error('La contraseña debe tener al menos 6 caracteres');
      }
      if (formData.password !== formData.confirmPassword) {
        throw new Error('Las contraseñas no coinciden');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Validar formulario
      validateForm();

      if (isSignUp) {
        // Crear cuenta
        await signUp(formData.username, formData.email, formData.password, 'musico');
      } else {
        // Iniciar sesión
        await login(formData.email, formData.password);
      }
      
      // Redirigir al modo músico
      navigate('/musician-mode');
    } catch (error) {
      console.error('Error en formulario:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      username: "",
      email: "",
      confirmEmail: "",
      password: "",
      confirmPassword: ""
    });
    setError("");
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    resetForm();
  };

  const handleClearData = () => {
    if (window.confirm('¿Estás seguro de que quieres limpiar todos los datos? Esto eliminará todas las cuentas y sesiones.')) {
      clearCorruptedData();
      resetForm();
    }
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
        maxWidth: '450px',
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
          }}>🎹 Modo Músico</h1>
          <p style={{
            color: '#4a5568',
            fontSize: '1rem'
          }}>
            {isSignUp ? 'Crea tu cuenta profesional' : 'Accede a herramientas avanzadas'}
          </p>
        </div>

        {/* Mensaje de error */}
        {error && (
          <div style={{
            padding: '12px',
            backgroundColor: '#fed7d7',
            border: '1px solid #feb2b2',
            borderRadius: '8px',
            color: '#c53030',
            marginBottom: '1rem',
            fontSize: '14px',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem'
        }}>
          {/* Nombre de usuario - solo para registro */}
          {isSignUp && (
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: '#2d3748',
                fontWeight: '500'
              }}>
                Nombre de usuario: *
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required={isSignUp}
                disabled={isLoading}
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '16px',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  backgroundColor: isLoading ? '#f7fafc' : '#f7fafc',
                  color: '#2d3748',
                  outline: 'none',
                  boxSizing: 'border-box',
                  opacity: isLoading ? 0.7 : 1
              }}
                placeholder="Tu nombre de usuario"
                minLength="3"
              />
            </div>
          )}

          {/* Email */}
          <div>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: '#2d3748',
              fontWeight: '500'
            }}>
              Correo electrónico: *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '16px',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                backgroundColor: isLoading ? '#f7fafc' : '#f7fafc',
                color: '#2d3748',
                outline: 'none',
                boxSizing: 'border-box',
                opacity: isLoading ? 0.7 : 1
              }}
              placeholder="tu@email.com"
            />
          </div>

          {/* Confirmar email - solo para registro */}
          {isSignUp && (
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: '#2d3748',
                fontWeight: '500'
              }}>
                Confirmar correo electrónico: *
              </label>
              <input
                type="email"
                name="confirmEmail"
                value={formData.confirmEmail}
                onChange={handleInputChange}
                required={isSignUp}
                disabled={isLoading}
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '16px',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  backgroundColor: isLoading ? '#f7fafc' : '#f7fafc',
                  color: '#2d3748',
                  outline: 'none',
                  boxSizing: 'border-box',
                  opacity: isLoading ? 0.7 : 1
                }}
                placeholder="Confirma tu email"
              />
            </div>
          )}

          {/* Contraseña */}
          <div>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: '#2d3748',
              fontWeight: '500'
            }}>
              Contraseña: *
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '16px',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                backgroundColor: isLoading ? '#f7fafc' : '#f7fafc',
                color: '#2d3748',
                outline: 'none',
                boxSizing: 'border-box',
                opacity: isLoading ? 0.7 : 1
              }}
              placeholder="••••••••"
              minLength={isSignUp ? "6" : undefined}
            />
            {isSignUp && (
              <div style={{
                fontSize: '12px',
                color: '#718096',
                marginTop: '4px'
              }}>
                Mínimo 6 caracteres
              </div>
            )}
          </div>

          {/* Confirmar contraseña - solo para registro */}
          {isSignUp && (
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: '#2d3748',
                fontWeight: '500'
              }}>
                Confirmar contraseña: *
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required={isSignUp}
                disabled={isLoading}
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '16px',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  backgroundColor: isLoading ? '#f7fafc' : '#f7fafc',
                  color: '#2d3748',
                  outline: 'none',
                  boxSizing: 'border-box',
                  opacity: isLoading ? 0.7 : 1
                }}
                placeholder="Confirma tu contraseña"
                minLength="6"
              />
            </div>
          )}

          <button 
            type="submit"
            disabled={isLoading}
            style={{
              padding: '14px',
              fontSize: '16px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: isLoading ? '#a0aec0' : '#38b2ac',
              color: 'white',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              fontWeight: '600',
              transition: 'all 0.2s ease',
              opacity: isLoading ? 0.7 : 1
            }}
            onMouseEnter={(e) => {
              if (!isLoading) {
                e.target.style.backgroundColor = '#319795';
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoading) {
                e.target.style.backgroundColor = '#38b2ac';
              }
            }}
          >
            {isLoading ? 'Procesando...' : (isSignUp ? 'Crear Cuenta' : 'Iniciar Sesión')}
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
            onClick={toggleMode}
            disabled={isLoading}
            style={{
              background: 'none',
              border: 'none',
              color: isLoading ? '#a0aec0' : '#38b2ac',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              textDecoration: 'underline'
            }}
          >
            {isSignUp ? 'Iniciar sesión' : 'Crear cuenta'}
          </button>
        </div>

        {/* Botón de limpiar datos */}
        <div style={{
          textAlign: 'center',
          marginTop: '1rem',
          paddingTop: '1rem',
          borderTop: '1px solid #e2e8f0'
        }}>
          <button
            onClick={handleClearData}
            disabled={isLoading}
            style={{
              background: 'none',
              border: 'none',
              color: '#e53e3e',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              fontSize: '12px',
              textDecoration: 'underline'
            }}
            title="Limpiar todos los datos guardados (útil si hay problemas)"
                      >
             Limpiar datos
           </button>
        </div>


      </div>
      

    </div>
  );
}

export default LoginMusico;
