import React, { useState, useEffect } from 'react';
import { ShoppingCart, List, MagnifyingGlass, X } from '@phosphor-icons/react';
import './Navbar.css';

const Navbar = ({ cartCount, onOpenCart }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? 'scrolled glass' : ''}`}>
      <div className="container nav-container">
        
        {/* Mobile Menu Toggle */}
        <button className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={28} /> : <List size={28} />}
        </button>

        {/* Logo */}
        <div className="logo">
          <span className="text-gradient">VELOCITY</span>
          <span className="logo-dot">.</span>
        </div>

        {/* Nav Links */}
        <nav className={`nav-links ${mobileMenuOpen ? 'open glass' : ''}`}>
          <a href="#new" className="active">New Drops</a>
          <a href="#men" className="hover-underline">Men</a>
          <a href="#women" className="hover-underline">Women</a>
          <a href="#collections" className="hover-underline">Collections</a>
        </nav>

        {/* Actions */}
        <div className="nav-actions">
          <button className="btn-icon">
            <MagnifyingGlass size={22} />
          </button>
          
          <button className="btn-icon cart-btn" onClick={onOpenCart}>
            <ShoppingCart size={22} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
