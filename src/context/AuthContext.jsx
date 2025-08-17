import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Función para limpiar datos corruptos
  const clearCorruptedData = () => {
    console.log('Limpiando datos corruptos...');
    localStorage.removeItem('afinapp_users');
    localStorage.removeItem('afinapp_session');
    setUsers([]);
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  // Cargar usuarios desde localStorage al iniciar
  useEffect(() => {
    const savedUsers = localStorage.getItem('afinapp_users');
    if (savedUsers) {
      try {
        const parsedUsers = JSON.parse(savedUsers);
        if (Array.isArray(parsedUsers)) {
          setUsers(parsedUsers);
          console.log('Usuarios cargados:', parsedUsers.length);
        } else {
          console.error('Formato de usuarios inválido, limpiando...');
          clearCorruptedData();
        }
      } catch (error) {
        console.error('Error al cargar usuarios:', error);
        clearCorruptedData();
      }
    }
    
    // Verificar si hay una sesión activa
    const savedSession = localStorage.getItem('afinapp_session');
    if (savedSession) {
      try {
        const session = JSON.parse(savedSession);
        if (session && session.username && session.email) {
          setCurrentUser(session);
          setIsAuthenticated(true);
          console.log('Sesión restaurada para:', session.username);
        } else {
          console.error('Sesión inválida, limpiando...');
          localStorage.removeItem('afinapp_session');
        }
      } catch (error) {
        console.error('Error al restaurar sesión:', error);
        localStorage.removeItem('afinapp_session');
      }
    }
  }, []);

  // Guardar usuarios en localStorage cuando cambien
  useEffect(() => {
    if (users.length > 0) {
      try {
        localStorage.setItem('afinapp_users', JSON.stringify(users));
        console.log('Usuarios guardados en localStorage:', users.length);
      } catch (error) {
        console.error('Error al guardar usuarios:', error);
      }
    }
  }, [users]);

  // Función para crear cuenta
  const signUp = (username, email, password, userType) => {
    console.log('Intentando crear cuenta:', { username, email, userType });
    
    // Validaciones básicas
    if (!username || !email || !password) {
      throw new Error('Todos los campos son obligatorios');
    }

    if (username.trim().length < 3) {
      throw new Error('El nombre de usuario debe tener al menos 3 caracteres');
    }

    if (password.length < 6) {
      throw new Error('La contraseña debe tener al menos 6 caracteres');
    }

    // Verificar si el email ya existe
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      console.log('Email ya existe:', email);
      throw new Error('Este email ya está registrado');
    }

    // Verificar si el nombre de usuario ya existe
    const existingUsername = users.find(user => user.username === username);
    if (existingUsername) {
      console.log('Username ya existe:', username);
      throw new Error('Este nombre de usuario ya está en uso');
    }

    // Crear nuevo usuario
    const newUser = {
      id: Date.now().toString(),
      username: username.trim(),
      email: email.trim().toLowerCase(),
      password,
      userType,
      createdAt: new Date().toISOString(),
      progress: {
        correct: 0,
        total: 0,
        exercises: []
      }
    };

    console.log('Nuevo usuario creado:', newUser);

    // Agregar el usuario al estado
    setUsers(prevUsers => {
      const updatedUsers = [...prevUsers, newUser];
      console.log('Usuarios actualizados:', updatedUsers.length);
      return updatedUsers;
    });
    
    // Iniciar sesión automáticamente con el nuevo usuario
    setCurrentUser(newUser);
    setIsAuthenticated(true);
    
    // Guardar sesión en localStorage
    try {
      localStorage.setItem('afinapp_session', JSON.stringify(newUser));
      console.log('Sesión iniciada para nuevo usuario:', newUser.username);
    } catch (error) {
      console.error('Error al guardar sesión:', error);
    }
    
    return newUser;
  };

  // Función para iniciar sesión
  const login = (email, password) => {
    console.log('Intentando login con:', email);
    console.log('Usuarios disponibles:', users.length);
    
    if (!email || !password) {
      throw new Error('Email y contraseña son obligatorios');
    }

    const user = users.find(u => u.email === email.trim().toLowerCase() && u.password === password);
    if (!user) {
      console.log('Login fallido - usuario no encontrado o contraseña incorrecta');
      throw new Error('Email o contraseña incorrectos');
    }

    console.log('Login exitoso para:', user.username);
    setCurrentUser(user);
    setIsAuthenticated(true);
    
    // Guardar sesión en localStorage
    try {
      localStorage.setItem('afinapp_session', JSON.stringify(user));
    } catch (error) {
      console.error('Error al guardar sesión:', error);
    }
    
    return user;
  };

  // Función para cerrar sesión
  const logout = () => {
    console.log('Cerrando sesión para:', currentUser?.username);
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('afinapp_session');
  };

  // Función para actualizar progreso del usuario
  const updateProgress = (exerciseResult) => {
    if (!currentUser) return;

    const updatedUser = {
      ...currentUser,
      progress: {
        ...currentUser.progress,
        correct: currentUser.progress.correct + (exerciseResult.correct ? 1 : 0),
        total: currentUser.progress.total + 1,
        exercises: [...currentUser.progress.exercises, exerciseResult]
      }
    };

    setCurrentUser(updatedUser);
    setUsers(prevUsers => 
      prevUsers.map(u => u.id === currentUser.id ? updatedUser : u)
    );
    
    // Actualizar sesión en localStorage
    try {
      localStorage.setItem('afinapp_session', JSON.stringify(updatedUser));
    } catch (error) {
      console.error('Error al actualizar progreso:', error);
    }
  };

  // Función para obtener estadísticas del usuario
  const getUserStats = () => {
    if (!currentUser) return null;
    
    const { progress } = currentUser;
    const accuracy = progress.total > 0 ? (progress.correct / progress.total * 100).toFixed(1) : 0;
    
    return {
      username: currentUser.username,
      totalExercises: progress.total,
      correctAnswers: progress.correct,
      accuracy: `${accuracy}%`,
      userType: currentUser.userType,
      memberSince: new Date(currentUser.createdAt).toLocaleDateString('es-ES')
    };
  };

  const value = {
    users,
    currentUser,
    isAuthenticated,
    signUp,
    login,
    logout,
    updateProgress,
    getUserStats,
    clearCorruptedData
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
