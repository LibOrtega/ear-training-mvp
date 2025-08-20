import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


function LoginEarTraining() {
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
      navigate('/ear-training');
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
          Redirigiendo al entrenamiento...
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
        await signUp(formData.username, formData.email, formData.password, 'ear-training');
      } else {
        // Iniciar sesión
        await login(formData.email, formData.password);
      }
      
      // Redirigir al entrenamiento de oído
      navigate('/ear-training');
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
      background: 'var(--background-primary)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative'
    }}>
      {/* Patrón de fondo sutil */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `
          radial-gradient(circle at 25% 25%, rgba(255, 140, 66, 0.03) 1px, transparent 1px),
          radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        backgroundPosition: '0 0, 25px 25px',
        opacity: 0.5,
        pointerEvents: 'none'
      }}></div>
      
             <div style={{
         maxWidth: '450px',
         width: '100%',
         backgroundColor: 'var(--background-card)',
         borderRadius: 'var(--border-radius-lg)',
         padding: '2.5rem',
         boxShadow: 'var(--shadow-lg)',
         border: '1px solid rgba(255, 140, 66, 0.2)',
         position: 'relative',
         zIndex: 10
       }}>
         
         {/* Botón de cerrar */}
         <button
           onClick={() => navigate('/')}
           style={{
             position: 'absolute',
             top: '16px',
             right: '16px',
             width: '32px',
             height: '32px',
             background: 'rgba(139, 92, 246, 0.1)',
             border: '1px solid rgba(139, 92, 246, 0.3)',
             borderRadius: '50%',
             color: 'var(--text-primary)',
             cursor: 'pointer',
             display: 'flex',
             alignItems: 'center',
             justifyContent: 'center',
             fontSize: '18px',
             fontWeight: '600',
             transition: 'var(--transition-normal)',
             backdropFilter: 'blur(10px)',
             zIndex: 20
           }}
           onMouseEnter={(e) => {
             e.target.style.backgroundColor = 'rgba(139, 92, 246, 0.2)';
             e.target.style.borderColor = 'rgba(139, 92, 246, 0.5)';
             e.target.style.transform = 'scale(1.1)';
             e.target.style.boxShadow = '0 4px 15px rgba(139, 92, 246, 0.3)';
           }}
           onMouseLeave={(e) => {
             e.target.style.backgroundColor = 'rgba(139, 92, 246, 0.1)';
             e.target.style.borderColor = 'rgba(139, 92, 246, 0.3)';
             e.target.style.transform = 'scale(1)';
             e.target.style.boxShadow = 'none';
           }}
           title="Cerrar modal"
         >
           ×
         </button>
        {/* Header con logo */}
        <div style={{
          textAlign: 'center',
          marginBottom: '2.5rem'
        }}>
          {/* Logo con cara feliz */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '1.5rem'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              background: 'var(--primary-gradient)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              boxShadow: 'var(--shadow-orange)'
            }}>
              {/* Cara feliz */}
              <div style={{
                width: '36px',
                height: '36px',
                background: 'var(--text-primary)',
                borderRadius: '50%',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '9px',
                  left: '9px',
                  width: '6px',
                  height: '6px',
                  background: 'var(--background-primary)',
                  borderRadius: '50%'
                }}></div>
                <div style={{
                  position: 'absolute',
                  top: '9px',
                  right: '9px',
                  width: '6px',
                  height: '6px',
                  background: 'var(--background-primary)',
                  borderRadius: '50%'
                }}></div>
                <div style={{
                  position: 'absolute',
                  bottom: '9px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '12px',
                  height: '6px',
                  borderBottom: '3px solid var(--background-primary)',
                  borderLeft: '3px solid var(--background-primary)',
                  borderRight: '3px solid var(--background-primary)',
                  borderRadius: '0 0 12px 12px'
                }}></div>
              </div>
            </div>
          </div>
          
          <h1 style={{
            fontSize: '2.2rem',
            color: 'var(--text-primary)',
            marginBottom: '0.5rem',
            fontWeight: '700'
          }}>Modo Aficionado</h1>
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '1.1rem'
          }}>
            {isSignUp ? 'Crea tu cuenta para comenzar' : 'Inicia sesión para continuar'}
          </p>
        </div>

        {/* Mensaje de error */}
        {error && (
          <div style={{
            padding: '16px',
            backgroundColor: 'rgba(220, 38, 38, 0.1)',
            border: '1px solid rgba(220, 38, 38, 0.3)',
            borderRadius: 'var(--border-radius-sm)',
            color: '#fca5a5',
            marginBottom: '1.5rem',
            fontSize: '14px',
            textAlign: 'center',
            backdropFilter: 'blur(10px)'
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
                color: 'var(--text-primary)',
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
                   padding: '14px',
                   fontSize: '16px',
                   borderRadius: 'var(--border-radius-sm)',
                   border: '1px solid rgba(255, 140, 66, 0.3)',
                   backgroundColor: 'var(--background-tertiary)',
                   color: 'var(--text-primary)',
                   outline: 'none',
                   boxSizing: 'border-box',
                   opacity: isLoading ? 0.7 : 1,
                   transition: 'var(--transition-normal)'
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
              color: 'var(--text-primary)',
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
                 padding: '14px',
                 fontSize: '16px',
                 borderRadius: 'var(--border-radius-sm)',
                 border: '1px solid rgba(255, 140, 66, 0.3)',
                 backgroundColor: 'var(--background-tertiary)',
                 color: 'var(--text-primary)',
                 outline: 'none',
                 boxSizing: 'border-box',
                 opacity: isLoading ? 0.7 : 1,
                 transition: 'var(--transition-normal)'
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
                color: 'var(--text-primary)',
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
                   padding: '14px',
                   fontSize: '16px',
                   borderRadius: 'var(--border-radius-sm)',
                   border: '1px solid rgba(255, 140, 66, 0.3)',
                   backgroundColor: 'var(--background-tertiary)',
                   color: 'var(--text-primary)',
                   outline: 'none',
                   boxSizing: 'border-box',
                   opacity: isLoading ? 0.7 : 1,
                   transition: 'var(--transition-normal)'
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
              color: 'var(--text-primary)',
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
                 padding: '14px',
                 fontSize: '16px',
                 borderRadius: 'var(--border-radius-sm)',
                 border: '1px solid rgba(255, 140, 66, 0.3)',
                 backgroundColor: 'var(--background-tertiary)',
                 color: 'var(--text-primary)',
                 outline: 'none',
                 boxSizing: 'border-box',
                 opacity: isLoading ? 0.7 : 1,
                 transition: 'var(--transition-normal)'
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
              color: 'var(--text-primary)',
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
                   padding: '14px',
                   fontSize: '16px',
                   borderRadius: 'var(--border-radius-sm)',
                   border: '1px solid rgba(255, 140, 66, 0.3)',
                   backgroundColor: 'var(--background-tertiary)',
                   color: 'var(--text-primary)',
                   outline: 'none',
                   boxSizing: 'border-box',
                   opacity: isLoading ? 0.7 : 1,
                   transition: 'var(--transition-normal)'
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
               padding: '16px',
               fontSize: '16px',
               borderRadius: 'var(--border-radius-sm)',
               border: 'none',
               background: isLoading ? 'rgba(160, 174, 192, 0.5)' : 'var(--primary-gradient)',
               color: 'var(--text-primary)',
               cursor: isLoading ? 'not-allowed' : 'pointer',
               fontWeight: '600',
               transition: 'var(--transition-normal)',
               opacity: isLoading ? 0.7 : 1,
               boxShadow: isLoading ? 'none' : 'var(--shadow-orange)',
               transform: isLoading ? 'none' : 'translateY(0)'
             }}
             onMouseEnter={(e) => {
               if (!isLoading) {
                 e.target.style.transform = 'translateY(-2px)';
                 e.target.style.boxShadow = 'var(--shadow-lg)';
               }
             }}
             onMouseLeave={(e) => {
               if (!isLoading) {
                 e.target.style.transform = 'translateY(0)';
                 e.target.style.boxShadow = 'var(--shadow-orange)';
               }
             }}
           >
             {isLoading ? 'Procesando...' : (isSignUp ? 'Crear Cuenta' : 'Iniciar Sesión')}
           </button>
        </form>

        {/* Cambiar entre login y signup */}
        <div style={{
          textAlign: 'center',
          marginTop: '2rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid rgba(255, 140, 66, 0.2)'
        }}>
          <p style={{
            color: 'var(--text-secondary)',
            marginBottom: '0.8rem',
            fontSize: '1rem'
          }}>
            {isSignUp ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}
          </p>
          <button
            onClick={toggleMode}
            disabled={isLoading}
            style={{
              background: 'none',
              border: 'none',
              color: isLoading ? 'var(--text-muted)' : 'var(--primary-color)',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              textDecoration: 'underline',
              transition: 'var(--transition-normal)',
              ':hover': {
                color: 'var(--primary-color)',
                textDecoration: 'none'
              }
            }}
          >
            {isSignUp ? 'Iniciar sesión' : 'Crear cuenta'}
          </button>
        </div>

        {/* Botón de limpiar datos */}
        <div style={{
          textAlign: 'center',
          marginTop: '1.5rem',
          paddingTop: '1rem',
          borderTop: '1px solid rgba(139, 92, 246, 0.2)'
        }}>
          <button
            onClick={handleClearData}
            disabled={isLoading}
            style={{
              background: 'rgba(139, 92, 246, 0.1)',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              color: 'var(--text-primary)',
              padding: '10px 20px',
              borderRadius: 'var(--border-radius-sm)',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              transition: 'var(--transition-normal)',
              backdropFilter: 'blur(10px)'
            }}
            title="Limpiar todos los datos guardados (útil si hay problemas)"
            onMouseEnter={(e) => {
              if (!isLoading) {
                e.target.style.backgroundColor = 'rgba(139, 92, 246, 0.2)';
                e.target.style.borderColor = 'rgba(139, 92, 246, 0.5)';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 4px 15px rgba(139, 92, 246, 0.3)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoading) {
                e.target.style.backgroundColor = 'rgba(139, 92, 246, 0.1)';
                e.target.style.borderColor = 'rgba(139, 92, 246, 0.3)';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }
            }}
          >
            Limpiar datos
          </button>
        </div>


      </div>
      

    </div>
  );
}

export default LoginEarTraining;
