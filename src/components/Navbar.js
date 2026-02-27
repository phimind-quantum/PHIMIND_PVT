import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TypewriterText from './TypewriterText';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      /*
        When we hide the scrollbar (overflow:hidden), the page width
        jumps by the scrollbar width (~15px on Windows/Android),
        causing the hero content to shift right.

        Fix: measure the scrollbar width and add it as padding-right
        on <body> BEFORE hiding overflow, so the total width stays the same.
      */
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [menuOpen]);

  const scrollToSection = (sectionId) => {
    setMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  const navItems = [
    { label: 'About',    id: 'about'   },
    { label: 'Teams',    id: 'teams'   },
    { label: 'Roadmap',  id: 'roadmap' },
    { label: 'Services', id: 'services'},
  ];

  return (
    <>
      <motion.nav
        className={`navbar ${isScrolled ? 'scrolled' : ''}`}
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="nav-container">

          {/* Logo */}
          <motion.div className="nav-logo" whileHover={{ scale: 1.04 }} transition={{ duration: 0.2 }}>
            <a href="/" aria-current="page">
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

          {/* Desktop nav links */}
          <div className="nav-links">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                className="nav-link"
                onClick={() => scrollToSection(item.id)}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.15 }}
              >
                {item.label}
              </motion.button>
            ))}
          </div>

          {/* Hamburger — only visible on mobile via CSS */}
          <button
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(prev => !prev)}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>

        </div>
      </motion.nav>

      {/*
        Conditionally mounted with AnimatePresence.
        position:fixed — completely outside document flow,
        will NEVER push or shift any page content.
      */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            {navItems.map((item, i) => (
              <motion.button
                key={item.id}
                className="nav-link"
                onClick={() => scrollToSection(item.id)}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: i * 0.06 }}
              >
                {item.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;