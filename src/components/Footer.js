// ==================== components/Footer.js ====================
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = ({onReleaseClick}) => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <div className="footer-brand">
            <span className="paw-icon">🐾</span>
            <h3>Pet Heaven</h3>
          </div>
          <p className="footer-tagline">Giving abandoned pets a second chance at happiness</p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/pets">Adopt a Pet</Link></li>
          </ul>
          <p className='footer-release' onClick={onReleaseClick}>Release a Pet</p>
        </div>

        <div className="footer-section">
          <h4>Contact Us</h4>
          <ul className="footer-contact">
            <li>📧 admin@petheaven.org</li>
            <li>📞 +65 1234 5678</li>
            <li>📍 123 Pet Street, Singapore</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 Pet Heaven. All rights reserved.</p>
        <p>Made with ❤️ for our furry friends</p>
      </div>
    </footer>
  );
};

export default Footer;