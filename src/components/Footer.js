import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaInstagram, FaFacebook, FaTwitter, FaArrowUp, FaEnvelope  } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const [isLogoAnimated, setIsLogoAnimated] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [phiText, setPhiText] = useState('phi');
  const [currentIndex, setCurrentIndex] = useState(0);

  const targetText = 'Φ';
  const typingSpeed = 150;

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLogoAnimated(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLogoAnimated && currentIndex < targetText.length) {
      const timer = setTimeout(() => {
        setPhiText(targetText.substring(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, typingSpeed);
      return () => clearTimeout(timer);
    }
  }, [isLogoAnimated, currentIndex]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const socialLinks = [
    {
      name: 'Instagram',
      icon: FaInstagram,
      url: 'https://www.instagram.com/_phimind_?igsh=N25tazVnZzlnazZz&utm_source=qr',
      color: '#E4405F'
    },
    {
      name: 'E-mail',
      icon: FaEnvelope ,
      url: 'mailto:info@phimind.in',
      color: '#460f0f'
    },
    {
      name: 'Twitter',
      icon: FaTwitter,
      url: 'https://x.com/Phimind_',
      color: '#1DA1F2'
    }
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <motion.div
            className="footer-logo"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="logo-text">
              <span className={`phi-part ${isLogoAnimated ? 'animated' : ''}`}>
                {phiText}
              </span>
              <span className="mind-part">Mind</span>
            </span>
          </motion.div>

          <motion.div
            className="footer-copyright"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p>©2026 ΦMind. All rights reserved.</p>
          </motion.div>

          <motion.div
            className="footer-social"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                whileHover={{ 
                  scale: 1.2, 
                  y: -5,
                  color: social.color 
                }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
                style={{ '--social-color': social.color }}
              >
                <social.icon />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.button
        className={`back-to-top ${showBackToTop ? 'visible' : ''}`}
        onClick={scrollToTop}
        initial={{ opacity: 0, scale: 0 }}
        animate={showBackToTop ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaArrowUp />
      </motion.button>
    </footer>
  );
};

export default Footer;
