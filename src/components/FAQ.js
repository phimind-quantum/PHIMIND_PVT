import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiMinus } from 'react-icons/fi';
import './FAQ.css';

const faqs = [
  {
    q: 'What is phiMind?',
    a: 'phiMind Pvt. Ltd. is a research-driven company at the intersection of quantum computing and artificial intelligence, focused on developing transformative solutions for healthcare and life sciences.',
  },
  {
    q: 'What makes phiMind different from other AI companies?',
    a: 'Unlike conventional AI companies, phiMind leverages quantum computing paradigms to solve problems that are intractable for classical computers — particularly in drug discovery, genomics, and molecular modeling.',
  },
  {
    q: 'When will HelixOne and PhiProt be available?',
    a: 'Both tools are currently in active development. HelixOne will launch as a curated genomics resource directory, while PhiProt will offer automated protein preparation for docking. Sign up for early access updates.',
  },
  {
    q: 'Does phiMind offer internships?',
    a: 'Yes! We run internship programs for students passionate about quantum computing, AI, and healthcare. Check our Services section for details and application links.',
  },
  {
    q: 'How can I partner with phiMind?',
    a: 'We welcome research collaborations, industry partnerships, and investment opportunities. Reach out to us at phimindpvtltd@gmail.com to start the conversation.',
  },
];

const FAQ = () => {
  const [openIdx, setOpenIdx] = useState(null);

  const toggle = (i) => setOpenIdx(openIdx === i ? null : i);

  return (
    <section className="faq" id="faq">
      <div className="container">
        <motion.div
          className="faq-header"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <span className="section-tag">FAQ</span>
          <h2 className="section-title">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <div className="section-divider" />
          <p className="section-subtitle">
            Everything you need to know about phiMind and our platforms
          </p>
        </motion.div>

        <motion.div
          className="faq-list"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`faq-item ${openIdx === i ? 'open' : ''}`}
              onClick={() => toggle(i)}
            >
              <div className="faq-question">
                <span>{faq.q}</span>
                <span className="faq-icon">
                  {openIdx === i ? <FiMinus size={16} /> : <FiPlus size={16} />}
                </span>
              </div>
              <AnimatePresence>
                {openIdx === i && (
                  <motion.div
                    className="faq-answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p>{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;