import React, { useState } from 'react';
import '../../theme.css';

interface HeaderProps {
  className?: string;
}

const  Header: React.FC<HeaderProps> = ({ className = '' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={`header ${className}`}>
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <div className="logo">
            <span className="logo-text">Murunga</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="nav-desktop">
            <ul className="nav-list">
              <li className="nav-item">
                <a href="#home" className="nav-link active">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a href="#about" className="nav-link">
                  About Us
                </a>
              </li>
              <li className="nav-item">
                <a href="#services" className="nav-link">
                  Services
                </a>
              </li>
            </ul>
          </nav>

          {/* CTA Button */}
          <div className="header-cta">
            <button className="btn btn-primary">
              Contact Us
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-menu-toggle"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <span className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>

        {/* Mobile Navigation */}
        <nav className={`nav-mobile ${isMobileMenuOpen ? 'open' : ''}`}>
          <ul className="nav-list-mobile">
            <li className="nav-item-mobile">
              <a href="#home" className="nav-link-mobile active">
                Home
              </a>
            </li>
            <li className="nav-item-mobile">
              <a href="#about" className="nav-link-mobile">
                About Us
              </a>
            </li>
            <li className="nav-item-mobile">
              <a href="#services" className="nav-link-mobile">
                Services
              </a>
            </li>
            <li className="nav-item-mobile">
              <button className="btn btn-primary mobile-cta">
                Contact Us
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;