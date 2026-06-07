import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import './Services.css';

const services = [
  {
    id: 'internship',
    title: 'Internships',
    tagline: 'Hands-on Quantum Computing Experience',
    description: 'Join our cutting-edge internship program designed for students passionate about quantum computing and AI. Work alongside industry experts on real healthcare projects.',
    features: [
      'Real-world quantum computing projects',
      'Mentorship from industry experts',
      'Healthcare AI development experience',
      'Networking opportunities',
      'Certificate upon completion',
    ],
    duration: '3-6 months',
    formUrl: 'https://forms.gle/exQ4y7G2BLV2QrZZ7',
  },
  {
    id: 'workshop',
    title: 'Workshops',
    tagline: 'Learn Quantum Computing Fundamentals',
    description: 'Participate in intensive workshops to understand quantum computing fundamentals and healthcare AI applications. Perfect for beginners and intermediate learners.',
    features: [
      'Quantum computing basics',
      'Healthcare AI applications',
      'Hands-on coding sessions',
      'Industry case studies',
      'Interactive learning environment',
    ],
    duration: '2-4 weeks',
    formUrl: 'https://forms.gle/Q4cdvL2d9dGXqxDu9',
  },
];

const TiltBlock = ({ children, className }) => {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${x * 4}deg) rotateX(${y * -4}deg)`;
  };

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg)';
  };

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transition: 'transform 0.15s ease-out' }}
    >
      {children}
    </div>
  );
};

const Services = () => {
  return (
    <section className="services" id="services">
      <div className="services-bg-accent" />
      <div className="container">
        <motion.div
          className="services-header"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <span className="section-tag">Programs</span>
          <h2 className="section-title">
            Our <span className="gradient-text">Services</span>
          </h2>
          <div className="section-divider" />
        </motion.div>

        <div className="services-stack">
          {services.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              viewport={{ once: true }}
            >
              <TiltBlock className={`service-block ${i % 2 === 1 ? 'block-reverse' : ''}`}>
                <div className="block-visual">
                  <div className="block-icon-wrap">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      {i === 0 ? (
                        <>
                          <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />
                        </>
                      ) : (
                        <>
                          <circle cx="12" cy="12" r="10" />
                          <path d="M2 12h20" />
                          <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                        </>
                      )}
                    </svg>
                  </div>
                  <div className="block-num">0{i + 1}</div>
                </div>

                <div className="block-content">
                  <span className="block-tag">{s.duration}</span>
                  <h3 className="block-title">{s.title}</h3>
                  <p className="block-tagline">{s.tagline}</p>
                  <p className="block-desc">{s.description}</p>
                  <ul className="block-features">
                    {s.features.map((f, fi) => (
                      <li key={fi}>{f}</li>
                    ))}
                  </ul>
                  <button
                    className="btn"
                    onClick={() => window.open(s.formUrl, '_blank')}
                  >
                    Apply Now
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </button>
                </div>
              </TiltBlock>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;