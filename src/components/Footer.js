// src/components/Footer.js
import React from 'react';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} DwellaData. All rights reserved.</p>
    </footer>
  );
}

export default Footer;