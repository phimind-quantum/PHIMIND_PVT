import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiSun, FiMoon, FiArrowLeft } from 'react-icons/fi';
import TypewriterText from './TypewriterText';
import './Navbar.css';

const navItems = [
  { label: 'About',    id: 'about'   },
  { label: 'Team',     id: 'teams'   },
  { label: 'Roadmap',  id: 'roadmap' },
  { label: 'Services', id: 'services'},
  { label: 'Tools',    id: 'tools'   },
];

const helixLinks = [
  { path: '/helixone/databases', label: 'Databases' },
  { path: '/helixone/tools', label: 'Prediction Tools' },
];

const Navbar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(true);

  const isSubPage = location.pathname.startsWith('/helixone') || location.pathname.startsWith('/phiverse');
  const isHelixPage = location.pathname.startsWith('/helixone');
  const isPhiVersePage = location.pathname.startsWith('/phiverse');

  useEffect(() => {
    const stored = localStorage.getItem('phimind-theme');
    if (stored === 'light') {
      setDark(false);
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      const sbw = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${sbw}px`;
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
  }, [menuOpen]);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    if (next) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('phimind-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('phimind-theme', 'light');
    }
  };

  const scrollTo = (id) => {
    setMenuOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return (
    <>
      <motion.nav
        className={`navbar ${scrolled ? 'scrolled' : ''}`}
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="nav-inner">
          {isSubPage ? (
            <Link to="/" className="nav-logo">
              <FiArrowLeft size={18} style={{ marginRight: '8px' }} />
              <span className="logo-phi">
                <TypewriterText texts={['phi', 'Φ']} typingSpeed={150} pauseDuration={1200} startDelay={500} className="phi-char" />
              </span>
              <span className="logo-mind">Mind</span>
            </Link>
          ) : (
            <motion.a
              className="nav-logo"
              href="/"
              aria-current="page"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
            >
              <span className="logo-phi">
                <TypewriterText texts={['phi', 'Φ']} typingSpeed={150} pauseDuration={1200} startDelay={500} className="phi-char" />
              </span>
              <span className="logo-mind">Mind</span>
            </motion.a>
          )}

          <div className="nav-right">
            <div className="nav-links">
              {isHelixPage ? (
                helixLinks.map((link) => (
                  <Link key={link.path} to={link.path} className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}>
                    {link.label}
                  </Link>
                ))
              ) : isPhiVersePage ? null : (
                navItems.map((item) => (
                  <button key={item.id} className="nav-link" onClick={() => scrollTo(item.id)}>
                    {item.label}
                  </button>
                ))
              )}
            </div>

            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
              {dark ? <FiSun size={16} /> : <FiMoon size={16} />}
            </button>

            <button
              className={`hamburger ${menuOpen ? 'open' : ''}`}
              onClick={() => setMenuOpen((p) => !p)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="mobile-menu">
              {isHelixPage ? (
                <>
                  {helixLinks.map((link, i) => (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: i * 0.07 }}
                    >
                      <Link to={link.path} className="mobile-link" onClick={() => setMenuOpen(false)}>
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: helixLinks.length * 0.07 }}
                  >
                    <Link to="/" className="mobile-link" onClick={() => setMenuOpen(false)}>
                      Back to phiMind
                    </Link>
                  </motion.div>
                </>
              ) : isPhiVersePage ? (
                <>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <Link to="/" className="mobile-link" onClick={() => setMenuOpen(false)}>
                      Back to phiMind
                    </Link>
                  </motion.div>
                </>
              ) : (
                <>
                  {navItems.map((item, i) => (
                    <motion.button
                      key={item.id}
                      className="mobile-link"
                      onClick={() => scrollTo(item.id)}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: i * 0.07 }}
                    >
                      {item.label}
                    </motion.button>
                  ))}
                </>
              )}
              <motion.button
                className="mobile-link theme-mobile"
                onClick={toggleTheme}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: (isHelixPage ? helixLinks.length + 1 : isPhiVersePage ? 1 : navItems.length) * 0.07 }}
              >
                {dark ? 'Light Mode' : 'Dark Mode'}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
