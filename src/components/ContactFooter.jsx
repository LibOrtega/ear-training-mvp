import React from 'react';

const ContactFooter = () => {
  return (
    <footer className="contact-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-title">🎼 ¿Tienes preguntas?</h3>
          <p className="footer-description">
            Soy Libertad, la creadora de Afinapp. Me encantaría ayudarte y recibir tu feedback.
          </p>
        </div>
        
        <div className="contact-grid">
          <div className="contact-item">
            <div className="contact-icon">📧</div>
            <h4 className="contact-label">Email</h4>
            <a 
              href="mailto:libertadfarinneo@gmail.com"
              className="contact-link"
            >
              libertadfarinneo@gmail.com
            </a>
          </div>
          
          <div className="contact-item">
            <div className="contact-icon">📱</div>
            <h4 className="contact-label">WhatsApp</h4>
            <a 
              href="https://wa.me/526391652842"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              +52 639 165 2842
            </a>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="footer-text">
            ¡Estoy aquí para ayudarte! Respondo en menos de 24 horas. 😊
          </p>
          <div className="footer-brand">
            <span className="brand-icon">🎼</span>
            <span className="brand-text">Afinapp</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ContactFooter;
