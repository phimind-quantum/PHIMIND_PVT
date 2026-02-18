import React from 'react';
import { motion } from 'framer-motion';
import TypewriterText from './TypewriterText';
import './Hero.css';
import logoImg from '../images/logo.png';

const Hero = () => {

  return (
    <section className="hero" id="hero">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-left">
            <div className="glitch-container">
              <motion.div
                className="glitch-element"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <div className="glitch glitch-1"></div>
                <div className="glitch glitch-2"></div>
                <div className="glitch glitch-3"></div>

                <div className="logo-center">
                  <img
                    src={logoImg}
                    alt="Company Logo"
                    className="company-logo-image"
                    loading="eager"
                  />
                </div>
              </motion.div>
            </div>
          </div>

          
          <div className="hero-right">
            <motion.div
              className="hero-text"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <motion.h1 
                className="company-name"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                <span className="logo-text">
                  <TypewriterText 
                    texts={['phi', 'Φ']}
                    typingSpeed={150}
                    pauseDuration={1000}
                    startDelay={1000}
                    className="phi-part animated"
                  />
                  <span className="mind-part">Mind</span>
                </span>
              </motion.h1>
              
              <motion.p 
                className="tagline"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.5 }}
              >
                Minds Beyond the Future
              </motion.p>
              
              <motion.div
                className="hero-description"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 2 }}
              >
                <p>
                  Pioneering the future of healthcare through quantum computing and AI innovation. 
                  We bridge the gap between theoretical quantum mechanics and practical healthcare solutions.
                </p>
                <p>
                  Join us in revolutionizing medical technology and discover opportunities that transcend 
                  traditional boundaries in science and technology.
                </p>
              </motion.div>
              
              <motion.div
                className="hero-cta"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 2.5 }}
              >
                <button 
                  className="btn"
                  onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}
                >
                  Explore Opportunities
                </button>
                <button 
                  className="btn btn-secondary"
                  onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}
                >
                  Learn More
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
      
      <div className="hero-background">
        <div className="bg-pattern"></div>
        <div className="bg-gradient"></div>
      </div>
    </section>
  );
};

export default Hero;
