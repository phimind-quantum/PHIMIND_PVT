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

          {/* LEFT — glitch orb with logo (smaller size) */}
          <div className="hero-left">
            <div className="glitch-container">
              <motion.div
                className="glitch-element"
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.4 }}
              >
                <div className="glitch glitch-1" />
                <div className="glitch glitch-2" />
                <div className="glitch glitch-3" />
                <div className="logo-center">
                  <img
                    src={logoImg}
                    alt="phiMind Logo"
                    className="company-logo-image"
                    loading="eager"
                  />
                </div>
              </motion.div>
            </div>
          </div>

          {/* RIGHT — text content */}
          <div className="hero-right">
            <motion.div
              className="hero-text"
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3 }}
            >

              {/*
                NAME: [phi-wrap][Mind]  — no inline logo image here
                phi-wrap has a fixed width = "phi" character width
                so when typewriter shows "Φ" or erases to "", the
                empty space stays trapped inside and "Mind" never moves.
                gap: 0 on the h1 → phi and Mind touch with zero space.
              */}
              <motion.div
                className="company-name-block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.8 }}
              >
                <h1 className="company-name-text">
                  <span className="phi-wrap">
                    <TypewriterText
                      texts={['phi', 'Φ']}
                      typingSpeed={140}
                      pauseDuration={1200}
                      startDelay={900}
                      className="phi-part"
                    />
                  </span>
                  <span className="mind-part">Mind</span>
                </h1>
              </motion.div>

              {/* Gap between name and content below */}
              <div className="name-spacer" />
              <div className="name-spacer" />
              <div className="name-spacer" />

              <motion.p
                className="tagline"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 1.3 }}
              >
                Never in Between
              </motion.p>

              <motion.div
                className="hero-description"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 1.7 }}
              >
                <p>
                  Pioneering the future of healthcare through quantum computing and AI innovation.
                  We bridge the gap between theoretical quantum mechanics and practical healthcare solutions.
                </p>
                <p className="desc-secondary">
                  Join us in revolutionizing medical technology and discover opportunities that transcend
                  traditional boundaries in science and technology.
                </p>
              </motion.div>

              <motion.div
                className="hero-cta"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 2.1 }}
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
        <div className="bg-pattern" />
        <div className="bg-gradient" />
      </div>
    </section>
  );
};

export default Hero;