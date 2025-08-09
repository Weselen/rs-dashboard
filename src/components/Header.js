// src/components/Header.js
import React from 'react';
import '../styles/Header.css';
import logo from '../assets/logo.jpg';

function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <img src={logo} alt="DwellaData logo" className="logo" />
        <h1 className="site-title">DwellaData</h1>
      </div>
      <div className="header-right">
        {/* Filters, nav, or user info can go here later */}
      </div>
    </header>
  );
}

export default Header;