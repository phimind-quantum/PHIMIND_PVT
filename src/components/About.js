import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './About.css';

const highlights = [
  { number: '01', label: 'Quantum R&D' },
  { number: '02', label: 'AI Integration' },
  { number: '03', label: 'Healthcare Impact' },
  { number: '04', label: 'Global Scale' },
];

const About = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.2, once: true });
  const textRef = useRef(null);
  const textInView = useInView(textRef, { amount: 0.3, once: true });

  return (
    <section className="about" id="about" ref={ref}>
      <div className="about-bg-shape" />

      <div className="about-strip">
        {highlights.map((h) => (
          <span key={h.number} className="strip-item">
            <span className="strip-num">{h.number}</span>
            <span className="strip-label">{h.label}</span>
          </span>
        ))}
      </div>

      <div className="container">
        <div className="about-grid-alt">
          <motion.div
            className="about-text-block"
            ref={textRef}
            initial={{ opacity: 0, x: -40 }}
            animate={textInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="section-tag">About Us</span>
            <h2 className="about-heading">
              Where AI Meets{' '}
              <span className="gradient-text">Quantum Reality</span>
            </h2>
            <div className="section-divider" />
            <p className="about-paragraph">
              At phiMind, we operate at the frontier of quantum computing and artificial intelligence,
              developing breakthrough solutions for the most complex challenges in healthcare.
            </p>
            <p className="about-paragraph">
              Our mission is to bridge the gap between theoretical quantum mechanics and practical medical
              applications — from drug discovery to diagnostic imaging — making the impossible possible.
            </p>
          </motion.div>

          <motion.div
            className="about-cards-stack"
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="stack-card">
              <div className="stack-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <div>
                <h3>Mission</h3>
                <p>Harness quantum-AI to solve complex medical challenges previously impossible with classical computing.</p>
              </div>
            </div>
            <div className="stack-card">
              <div className="stack-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <div>
                <h3>Vision</h3>
                <p>Global leader in quantum-AI healthcare, transforming patient outcomes through breakthrough technologies.</p>
              </div>
            </div>
            <div className="stack-card">
              <div className="stack-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
              <div>
                <h3>Focus</h3>
                <p>Quantum algorithms for drug discovery, medical imaging, and personalized medicine at the intersection of theory and practice.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;