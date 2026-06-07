import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiArrowUp, FiInstagram, FiTwitter, FiSend, FiCheck } from 'react-icons/fi';
import { MdEmail } from 'react-icons/md';
import TypewriterText from './TypewriterText';
import './Footer.css';

const socialLinks = [
  { name: 'Instagram', icon: FiInstagram, url: 'https://www.instagram.com/_phimind_?igsh=N25tazVnZzlnazZz&utm_source=qr' },
  { name: 'Email', icon: MdEmail, url: 'mailto:info@phimind.in' },
  { name: 'Twitter', icon: FiTwitter, url: 'https://x.com/Phimind_' },
];

const quickLinks = [
  { label: 'About', id: 'about' },
  { label: 'Team', id: 'teams' },
  { label: 'Roadmap', id: 'roadmap' },
  { label: 'Services', id: 'services' },
  { label: 'Tools', id: 'tools' },
  { label: 'FAQ', id: 'faq' },
];

const Footer = () => {
  const [showTop, setShowTop] = useState(false);
  const [email, setEmail] = useState('');
  const [interest, setInterest] = useState('');
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setSending(true);
    try {
      await fetch('https://formspree.io/f/mdkow_none', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          interest,
          _replyto: email,
          _subject: `phiMind Waitlist Signup from ${email}`,
        }),
      });
      setSent(true);
      setEmail('');
      setInterest('');
    } catch {
      window.open(`mailto:phimindpvtltd@gmail.com?subject=phiMind Waitlist Signup&body=Email: ${email}%0AInterest: ${interest}`, '_blank');
      setSent(true);
    }
    setSending(false);
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <motion.div
            className="footer-brand"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <a href="/" className="footer-logo">
              <TypewriterText texts={['phi', 'Φ']} typingSpeed={150} pauseDuration={1200} startDelay={300} className="footer-phi" />
              <span className="footer-mind">Mind</span>
            </a>
            <p className="footer-tagline">
              Pioneering the future of healthcare through quantum computing and AI innovation.
            </p>
            <div className="footer-social">
              {socialLinks.map((s) => (
                <motion.a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={s.name}
                >
                  <s.icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="footer-links"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            viewport={{ once: true }}
          >
            <h4>Quick Links</h4>
            <ul>
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button onClick={() => scrollTo(link.id)}>{link.label}</button>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="footer-waitlist"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4>Early Access</h4>
            <p className="waitlist-desc">
              Be the first to know when HelixOne, PhiProt, and new programs launch.
            </p>
            {sent ? (
              <div className="waitlist-success">
                <FiCheck size={18} />
                <span>You're on the list! We'll be in touch.</span>
              </div>
            ) : (
              <form className="waitlist-form" onSubmit={handleSubmit}>
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="waitlist-input"
                />
                <input
                  type="text"
                  placeholder="Interest (e.g. HelixOne)"
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  className="waitlist-input"
                />
                <button type="submit" className="waitlist-btn" disabled={sending}>
                  {sending ? 'Sending...' : <><FiSend size={14} /> Sign Up</>}
                </button>
              </form>
            )}
          </motion.div>
        </div>

        <motion.div
          className="footer-bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p>&copy; {new Date().getFullYear()} phiMind. All rights reserved.</p>
          <p className="footer-credit">Built with precision at the quantum frontier</p>
        </motion.div>
      </div>

      <motion.button
        className={`back-top ${showTop ? 'visible' : ''}`}
        onClick={scrollToTop}
        initial={{ opacity: 0, scale: 0 }}
        animate={showTop ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
        transition={{ duration: 0.25 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Back to top"
      >
        <FiArrowUp size={18} />
      </motion.button>
    </footer>
  );
};

export default Footer;