import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import TypewriterText from './TypewriterText';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  

  return (
    <motion.nav
  className={`navbar ${isScrolled ? 'scrolled' : ''}`}
  style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 9999 }}
  initial={{ opacity: 0, y: -40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
    
      <div className="nav-container">
        <motion.div 
          className="nav-logo"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <a href="/" aria-current="page" className="active">
            <div className="rive-hover-container" style={{ width: '90px', height: '36px', cursor: 'pointer' }}>
              <div style={{ width: '100%', height: '100%' }}>
                <canvas style={{ verticalAlign: 'top', width: '90px', height: '36px' }} width="90" height="36"></canvas>
              </div>
            </div>
            <span className="logo-text">
              <TypewriterText 
                texts={['phi', 'Φ']}
                typingSpeed={150}
                pauseDuration={1000}
                startDelay={500}
                className="phi-part animated"
              />
              <span className="mind-part">Mind</span>
            </span>
          </a>
        </motion.div>

        <div className="nav-links">
          <motion.button
            className="nav-link"
            onClick={() => scrollToSection('about')}
            whileHover={{ scale: 1.1, color: 'var(--text-color)' }}
            transition={{ duration: 0.2 }}
          >
            About
          </motion.button>
          <motion.button
            className="nav-link"
            onClick={() => scrollToSection('teams')}
            whileHover={{ scale: 1.1, color: 'var(--text-color)' }}
            transition={{ duration: 0.2 }}
          >
            Teams
          </motion.button>
          <motion.button
            className="nav-link"
            onClick={() => scrollToSection('roadmap')}
            whileHover={{ scale: 1.1, color: 'var(--text-color)' }}
            transition={{ duration: 0.2 }}
          >
            Roadmap
          </motion.button>
          <motion.button
            className="nav-link"
            onClick={() => scrollToSection('services')}
            whileHover={{ scale: 1.1, color: 'var(--text-color)' }}
            transition={{ duration: 0.2 }}
          >
            Services
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
