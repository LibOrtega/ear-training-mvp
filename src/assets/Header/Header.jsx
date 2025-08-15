import React from "react";
import './header.css'; // Aquí pondremos estilos simples

export default function Header() {
  return (
    <header className="header">
      <div className="logo">🎹 Entrenador de Oído</div>
      <nav className="menu">
        <button className="menu-button">Iniciar sesión</button>
        <button className="menu-button premium">Comprar Premium</button>
      </nav>
    </header>
  );
}
