import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import TypewriterText from './TypewriterText';
import './Services.css';

const Services = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const services = [
    {
      id: 'internship',
      title: 'Internships',
      subtitle: 'Hands-on Experience in Quantum Computing',
      description: 'Join our cutting-edge internship program designed for students passionate about quantum computing and AI. Work alongside industry experts on real healthcare projects that make a difference.',
      features: [
        'Real-world quantum computing projects',
        'Mentorship from industry experts',
        'Healthcare AI development experience',
        'Networking opportunities',
        'Certificate upon completion'
      ],
      duration: '3-6 months',
      formUrl: 'https://forms.gle/exQ4y7G2BLV2QrZZ7'
    },
    {
      id: 'workshop',
      title: 'Workshops',
      subtitle: 'Learn Quantum Computing Fundamentals',
      description: 'Participate in our intensive workshops to understand the fundamentals of quantum computing and its applications in healthcare. Perfect for beginners and intermediate learners.',
      features: [
        'Quantum computing basics',
        'Healthcare AI applications',
        'Hands-on coding sessions',
        'Industry case studies',
        'Interactive learning environment'
      ],
      duration: '2-4 weeks',
      formUrl: 'https://forms.gle/Q4cdvL2d9dGXqxDu9'
    }
  ];

  return (
    <section className="services" id="services" ref={ref}>
      <div className="container">
        <motion.div
          className="services-header"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">
            Empowering the next generation of phiMind quantum computing innovators
          </p>
        </motion.div>

        <div className="services-grid">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className="service-card"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
            >
              <div className="service-header">
                {/* <div className="service-icon">
                  {service.id === 'internship' ? (
                    <div className="icon-internship">💼</div>
                  ) : (
                    <div className="icon-workshop">🎓</div>
                  )}
                </div> */}
                <div className="service-title">
                  <h3>{service.title}</h3>
                  <p className="service-subtitle">{service.subtitle}</p>
                </div>
              </div>

              <div className="service-content">
                <p className="service-description">{service.description}</p>
                
                <div className="service-features">
                  <h4>What you'll gain:</h4>
                  <ul>
                    {service.features.map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5, delay: (index * 0.2) + (featureIndex * 0.1) }}
                      >
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="service-duration">
                  <span className="duration-label">Duration:</span>
                  <span className="duration-value">{service.duration}</span>
                </div>
              </div>

              <div className="service-cta">
                <motion.button
                  className="btn"
                  onClick={() => window.open(service.formUrl, '_blank')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Apply Now
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
