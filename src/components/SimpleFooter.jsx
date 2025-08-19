import React from 'react';

const SimpleFooter = () => {
  return (
    <footer className="simple-footer">
      <div className="footer-content">
        <div className="footer-brand">
          <span className="brand-icon">🎼</span>
          <span className="brand-text">Afinapp</span>
        </div>
        
        <div className="footer-contact">
          <p className="contact-text">¿Tienes preguntas? Contáctame:</p>
          <div className="contact-links">
            <a 
              href="mailto:libertadfarinneo@gmail.com"
              className="contact-link-simple"
            >
              📧 libertadfarinneo@gmail.com
            </a>
            <a 
              href="https://wa.me/526391652842"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link-simple"
            >
              📱 +52 639 165 2842
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SimpleFooter;
