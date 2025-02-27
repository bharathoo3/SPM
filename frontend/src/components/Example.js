import React, { useState } from 'react';
import './Example.css';

export default function Example() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Toggle the mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Toggle the dropdown menu
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="#" className="navbar-logo">Navbar</a>
        <button className="navbar-toggler" onClick={toggleMobileMenu}>
          <i className="fas fa-bars"></i>
        </button>
        <ul className={`navbar-links ${isMobileMenuOpen ? 'active' : ''}`}>
          <li className="navbar-item">
            <a href="#">Home</a>
          </li>
          <li className="navbar-item">
            <a href="#">About</a>
          </li>
          <li className="navbar-item">
            <a href="#">Services</a>
          </li>
          <li className="navbar-item dropdown">
            <a href="#" onClick={toggleDropdown}>More</a>
            {isDropdownOpen && (
              <ul className="dropdown-menu">
                <li><a href="#">Option 1</a></li>
                <li><a href="#">Option 2</a></li>
                <li><a href="#">Option 3</a></li>
              </ul>
            )}
          </li>
          <li className="navbar-item">
            <a href="#">Contact</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
