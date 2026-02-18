import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import TypewriterText from './TypewriterText';
import './Roadmap.css';

const Roadmap = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const phases = [
    {
      id: 1,
      title: "Quantum Circuit Simulation for Healthcare Data",
      description: "Develop and test quantum circuit models using classical simulators.",
      focusAreas: [
        "Quantum algorithms for diagnostics & genomics",
        "Simulation of quantum machine learning models"
      ],
      outcome: "Proof-of-concept models using real healthcare datasets."
    },
    {
      id: 2,
      title: "AI-Integrated Quantum Circuit Design",
      description: "Use AI to optimize and automate quantum circuit design.",
      focusAreas: [
        "AI/ML for reducing circuit depth and gate count",
        "Generative AI for problem-specific circuits"
      ],
      outcome: "Smarter, more efficient quantum circuits for practical use."
    },
    {
      id: 3,
      title: "Quantum Hardware & Manufacturing Unit",
      description: "Build in-house capability for custom quantum processors and components.",
      focusAreas: [
        "Fabrication of superconducting or photonic quantum chips",
        "Development of control systems and cooling units"
      ],
      outcome: "Hardware readiness to run proprietary quantum-AI models."
    },
    {
      id: 4,
      title: "Platform Deployment & Industry Integration",
      description: "Deliver full-stack quantum-AI solutions to enterprise, research, and industrial environments.",
      focusAreas: [
        "Cloud-based quantum-AI platforms for manufacturing",
        "Real-time analytics, optimization, predictive modeling",
        "Intelligent automation"
      ],
      outcome: "Commercial-grade solutions seamlessly integrated into diverse industry workflows, enabling faster decision-making and innovation."
    },
    {
      id: 5,
      title: "Cross-Industry Expansion & Ecosystem Development",
      description: "Extend quantum-AI solutions into high-impact sectors including Automobile, Space Technology, Cybersecurity, and energy, while fostering a global innovation network.",
      focusAreas: [
        "Developer tools, APIs, education programs",
        "Quantum-AI incubators"
      ],
      outcome: "A thriving ecosystem positioning Phi Mind as an industry leader."
    }
  ];

  const boardMembers = [
    "Mr. Sonet D Thomas",
    "Mr. Naveen Joy"
  ];

  return (
    <section className="roadmap" id="roadmap" ref={ref}>
      <div className="roadmap-container">
        <motion.div
          className="roadmap-header"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="roadmap-title">
            <TypewriterText 
              texts={['Φ', 'phi']}
              typingSpeed={100}
              pauseDuration={800}
              startDelay={300}
              className="phi-highlight"
            />Mind Development Journey
          </h2>
          <p className="roadmap-subtitle">
            Five-Phase Strategic Roadmap for Quantum-AI Innovation
          </p>
        </motion.div>

        {/* <motion.div
          className="company-intro"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3>Phi Mind Pvt. Ltd. – Vision</h3>
          <p className="focus-text">
            <strong>Focus:</strong> Quantum Artificial Intelligence for Industrial Development and Drug Discovery
          </p>
          <p className="intro-text">
            We, the undersigned board members, {boardMembers.join(' and ')}, are establishing 
            Phi Mind Pvt. Ltd., a technology startup dedicated to harnessing the power of 
            Quantum Computing and Artificial Intelligence (AI). Our long-term mission is to 
            develop quantum-AI technologies that can transform industries, starting with healthcare, 
            and later expanding into multiple sectors.
          </p>
        </motion.div> */}

        <div className="phases-container">
          {phases.map((phase, index) => (
            <motion.div
              key={phase.id}
              className="phase-card"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="phase-number">
                Phase {phase.id}
              </div>
              <div className="phase-content">
                <h3 className="phase-title">{phase.title}</h3>
                <p className="phase-description">{phase.description}</p>
                
                <div className="phase-focus">
                  <h4>Focus Areas:</h4>
                  <ul>
                    {phase.focusAreas.map((area, areaIndex) => (
                      <li key={areaIndex}>{area}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="phase-outcome">
                  <h4>Outcome:</h4>
                  <p>{phase.outcome}</p>
                </div>
              </div>
              <div className="phase-connector"></div>
            </motion.div>
          ))}
        </div>


        <motion.div
          className="conclusion"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          viewport={{ once: true }}
        >
          <h3>Our Vision</h3>
          <p>
            Phi Mind Pvt. Ltd. will operate at the cutting edge of technology, uniting quantum 
            computation with artificial intelligence to create real-world impact. We are seeking 
            incubation support to accelerate our R&D, form industry partnerships, and bring our 
            phased vision to market.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Roadmap;
