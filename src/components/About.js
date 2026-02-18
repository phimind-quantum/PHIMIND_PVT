import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import TypewriterText from './TypewriterText';
import './About.css';
import aboutImg from '../images/About.png';

const About = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  return (
    <section className="about" id="about" ref={ref}>
      <div className="container">
        <motion.div
          className="about-header"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* <h2 className="section-subtitle">
            <span className="subtitle-line">
              Into the <span className="logo-text">
                <TypewriterText 
                  texts={['Φ', 'phi']}
                  typingSpeed={100}
                  pauseDuration={800}
                  startDelay={500}
                  className="phi-part animated"
                />
                <span className="mind-part">Mind's</span>
              </span>
            </span>
          </h2> */}
          <h1 className="section-title">Where AI Meets Quantum Reality</h1>
        </motion.div>

        <div className="about-content">
          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="text-content">
              <h3>Revolutionizing Healthcare Through Quantum Innovation</h3>
              <p>
                At phiMind, we stand at the intersection of quantum computing and artificial intelligence, 
                pioneering breakthrough solutions that transform healthcare delivery and patient outcomes. 
                Our mission is to harness the power of quantum mechanics to solve complex medical challenges 
                that were previously impossible with classical computing.
              </p>
              
              <p>
                We specialize in developing quantum algorithms for drug discovery, medical imaging enhancement, 
                and personalized medicine. Our team of quantum physicists, AI researchers, and healthcare experts 
                work together to create innovative solutions that bridge the gap between theoretical quantum 
                mechanics and practical healthcare applications.
              </p>
              
              <div className="about-features">
                <div className="feature">
                  <h4>Quantum Computing</h4>
                  <p>Advanced quantum algorithms for complex medical simulations</p>
                </div>
                <div className="feature">
                  <h4>AI Innovation</h4>
                  <p>Machine learning models optimized for healthcare applications</p>
                </div>
                <div className="feature">
                  <h4>Healthcare Focus</h4>
                  <p>Direct impact on patient care and medical research</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="about-image"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="image-container">
              <div className="image-placeholder">
                <div className="quantum-particles">
                  <div className="particle particle-1"></div>
                  <div className="particle particle-2"></div>
                  <div className="particle particle-3"></div>
                  <div className="particle particle-4"></div>
                  <div className="particle particle-5"></div>
                </div>
                <div className="image-text">
                  <span>Quantum</span>
                  <span>Healthcare</span>
                  <span>Innovation</span>
                </div>
              </div>
              <div className="image-fade"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
