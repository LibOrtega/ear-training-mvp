import React, { useState } from "react";

function TeacherForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    instrumento: "",
    alumnos: ""
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos del profesor:", formData);
    alert("Formulario enviado. Nos pondremos en contacto contigo.");
    setFormData({
      nombre: "",
      email: "",
      instrumento: "",
      alumnos: ""
    });
  };

  return (
    <div style={{
      border: '2px solid #444',
      padding: '24px',
      borderRadius: '12px',
      maxWidth: '100%',
      backgroundColor: '#2a2a2a',
      boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
      marginTop: '20px'
    }}>
      <h2 style={{
        fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
        textAlign: 'center',
        marginBottom: '24px',
        color: 'white'
      }}>Formulario para Profesores</h2>
      
      <form onSubmit={handleSubmit} style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}>
        <label style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          color: 'white'
        }}>
          Nombre:
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            required
            style={{
              padding: '12px',
              fontSize: '16px',
              borderRadius: '8px',
              border: '1px solid #555',
              backgroundColor: '#333',
              color: 'white',
              outline: 'none'
            }}
          />
        </label>

        <label style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          color: 'white'
        }}>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            style={{
              padding: '12px',
              fontSize: '16px',
              borderRadius: '8px',
              border: '1px solid #555',
              backgroundColor: '#333',
              color: 'white',
              outline: 'none'
            }}
          />
        </label>

        <label style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          color: 'white'
        }}>
          Instrumento que enseñas:
          <input
            type="text"
            name="instrumento"
            value={formData.instrumento}
            onChange={handleInputChange}
            required
            style={{
              padding: '12px',
              fontSize: '16px',
              borderRadius: '8px',
              border: '1px solid #555',
              backgroundColor: '#333',
              color: 'white',
              outline: 'none'
            }}
          />
        </label>

        <label style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          color: 'white'
        }}>
          Número de alumnos:
          <input
            type="number"
            name="alumnos"
            value={formData.alumnos}
            onChange={handleInputChange}
            required
            style={{
              padding: '12px',
              fontSize: '16px',
              borderRadius: '8px',
              border: '1px solid #555',
              backgroundColor: '#333',
              color: 'white',
              outline: 'none'
            }}
          />
        </label>

        <button 
          type="submit"
          style={{
            padding: '16px 32px',
            fontSize: '18px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: '#4CAF50',
            color: 'white',
            cursor: 'pointer',
            fontWeight: 'bold',
            marginTop: '20px',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#45a049';
            e.target.style.transform = 'scale(1.02)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#4CAF50';
            e.target.style.transform = 'scale(1)';
          }}
        >
          Enviar solicitud
        </button>
      </form>
    </div>
  );
}

export default TeacherForm;
