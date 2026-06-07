import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';
import './Roadmap.css';

const phases = [
  {
    id: 1,
    title: 'Quantum Circuit Simulation',
    subtitle: 'for Healthcare Data',
    desc: 'Develop and test quantum circuit models using classical simulators for diagnostics and genomics.',
    areas: [
      'Quantum algorithms for diagnostics & genomics',
      'Simulation of quantum machine learning models',
    ],
    outcome: 'Proof-of-concept models using real healthcare datasets.',
    color: '#00cc4c',
  },
  {
    id: 2,
    title: 'AI-Integrated Quantum',
    subtitle: 'Circuit Design',
    desc: 'Use AI to optimize and automate quantum circuit design for practical applications.',
    areas: [
      'AI/ML for reducing circuit depth and gate count',
      'Generative AI for problem-specific circuits',
    ],
    outcome: 'Smarter, more efficient quantum circuits for practical use.',
    color: '#00b841',
  },
  {
    id: 3,
    title: 'Quantum Hardware &',
    subtitle: 'Manufacturing Unit',
    desc: 'Build in-house capability for custom quantum processors and components.',
    areas: [
      'Fabrication of superconducting or photonic quantum chips',
      'Development of control systems and cooling units',
    ],
    outcome: 'Hardware readiness to run proprietary quantum-AI models.',
    color: '#00a336',
  },
  {
    id: 4,
    title: 'Platform Deployment &',
    subtitle: 'Industry Integration',
    desc: 'Deliver full-stack quantum-AI solutions to enterprise and industrial environments.',
    areas: [
      'Cloud-based quantum-AI platforms for manufacturing',
      'Real-time analytics, optimization, predictive modeling',
    ],
    outcome: 'Commercial-grade solutions integrated into industry workflows.',
    color: '#008f2c',
  },
  {
    id: 5,
    title: 'Cross-Industry Expansion &',
    subtitle: 'Ecosystem Development',
    desc: 'Extend quantum-AI solutions into high-impact sectors globally.',
    areas: [
      'Developer tools, APIs, education programs',
      'Quantum-AI incubators and partnerships',
    ],
    outcome: 'A thriving ecosystem positioning phiMind as an industry leader.',
    color: '#007b22',
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const phaseVar = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Roadmap = () => {
  const [expanded, setExpanded] = useState(null);

  const toggle = (id) => setExpanded(expanded === id ? null : id);

  return (
    <section className="roadmap section" id="roadmap">
      <div className="roadmap-bg" />
      <div className="container">
        <motion.div
          className="roadmap-header"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <span className="section-tag">Roadmap</span>
          <h2 className="section-title">
            Development <span className="gradient-text">Journey</span>
          </h2>
          <div className="section-divider" />
          <p className="section-subtitle">
            Five-phase strategic roadmap for Quantum-AI innovation — click a phase to expand
          </p>
        </motion.div>

        <div className="roadmap-pallets">
          <motion.div
            className="pallets-row"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {phases.slice(0, 3).map((phase) => (
              <motion.div
                key={phase.id}
                className={`roadmap-pallet ${expanded === phase.id ? 'pallet-expanded' : ''}`}
                variants={phaseVar}
                onClick={() => toggle(phase.id)}
                style={{ borderLeftColor: phase.color }}
              >
                <div className="pallet-header">
                  <span className="pallet-phase" style={{ color: phase.color }}>Phase {phase.id}</span>
                  <h3 className="pallet-title">{phase.title}</h3>
                  <h4 className="pallet-subtitle">{phase.subtitle}</h4>
                  <motion.div
                    className="pallet-chevron"
                    animate={{ rotate: expanded === phase.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FiChevronDown size={20} />
                  </motion.div>
                </div>
                <p className="pallet-desc">{phase.desc}</p>
                <AnimatePresence>
                  {expanded === phase.id && (
                    <motion.div
                      className="pallet-details"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35 }}
                    >
                      <div className="pallet-areas">
                        <span className="areas-label">Focus Areas</span>
                        <ul>
                          {phase.areas.map((a, ai) => (
                            <li key={ai}>{a}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="pallet-outcome">
                        <span className="outcome-label">Expected Outcome</span>
                        <p>{phase.outcome}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            className="pallets-row-center"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {phases.slice(3).map((phase) => (
              <motion.div
                key={phase.id}
                className={`roadmap-pallet ${expanded === phase.id ? 'pallet-expanded' : ''}`}
                variants={phaseVar}
                onClick={() => toggle(phase.id)}
                style={{ borderLeftColor: phase.color }}
              >
                <div className="pallet-header">
                  <span className="pallet-phase" style={{ color: phase.color }}>Phase {phase.id}</span>
                  <h3 className="pallet-title">{phase.title}</h3>
                  <h4 className="pallet-subtitle">{phase.subtitle}</h4>
                  <motion.div
                    className="pallet-chevron"
                    animate={{ rotate: expanded === phase.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FiChevronDown size={20} />
                  </motion.div>
                </div>
                <p className="pallet-desc">{phase.desc}</p>
                <AnimatePresence>
                  {expanded === phase.id && (
                    <motion.div
                      className="pallet-details"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35 }}
                    >
                      <div className="pallet-areas">
                        <span className="areas-label">Focus Areas</span>
                        <ul>
                          {phase.areas.map((a, ai) => (
                            <li key={ai}>{a}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="pallet-outcome">
                        <span className="outcome-label">Expected Outcome</span>
                        <p>{phase.outcome}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;