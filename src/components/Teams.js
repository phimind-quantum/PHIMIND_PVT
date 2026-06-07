import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { FiLinkedin } from 'react-icons/fi';
import { MdSchool } from 'react-icons/md';

import './Teams.css';
import NaveenImg from '../images/NAVEENJ.png';
import SonetImg from '../images/SONETD.png';

const team = [
  {
    id: 1,
    name: 'Sonet D Thomas',
    role: 'Co-founder & CEO',
    image: SonetImg,
    bio: 'Visionary leader driving quantum-AI innovation in healthcare. Spearheading strategic partnerships and pioneering research initiatives at the intersection of quantum mechanics and medicine.',
    links: [
      { icon: FiLinkedin, url: 'https://www.linkedin.com/in/sonet-d-thomas-43ab30381/', label: 'LinkedIn' },
      { icon: MdSchool, url: 'https://scholar.google.com/citations?user=-DaD-3kAAAAJ&hl=en', label: 'Google Scholar' },
    ],
  },
  {
    id: 2,
    name: 'Naveen Joy',
    role: 'Co-founder & CEO',
    image: NaveenImg,
    bio: 'Strategic architect of cutting-edge quantum computing solutions. Leading the technical vision and development of phiMind\'s core quantum-AI platform and infrastructure.',
    links: [
      { icon: FiLinkedin, url: 'https://www.linkedin.com/in/naveen-joy-/', label: 'LinkedIn' },
      { icon: MdSchool, url: 'https://scholar.google.com/citations?hl=en&user=eiExmoAAAAAJ', label: 'Google Scholar' },
    ],
  },
];

const TiltCard = ({ children, className }) => {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(600px) rotateY(${x * 6}deg) rotateX(${y * -6}deg)`;
  };

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = 'perspective(600px) rotateY(0deg) rotateX(0deg)';
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

const Teams = () => {
  return (
    <section className="teams" id="teams">
      <div className="container">
        <motion.div
          className="teams-header"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">
            The Minds Behind <span className="gradient-text">phiMind</span>
          </h2>
          <div className="section-divider" />
          <p className="section-subtitle">
            Meet the founders pioneering the future of Quantum-AI healthcare
          </p>
        </motion.div>

        <div className="teams-list">
          {team.map((member, i) => (
            <motion.div
              key={member.id}
              className="team-row"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              viewport={{ once: true }}
            >
              <TiltCard className={`team-row-inner ${i % 2 === 1 ? 'row-reverse' : ''}`}>
                <div className="team-row-img">
                  <div className="team-img-frame">
                    <img src={member.image} alt={member.name} />
                    <div className="team-img-glow" />
                  </div>
                </div>
                <div className="team-row-content">
                  <span className="team-row-role">{member.role}</span>
                  <h3 className="team-row-name">{member.name}</h3>
                  <div className="team-row-line" />
                  <p className="team-row-bio">{member.bio}</p>
                  {member.links && (
                    <div className="team-row-links">
                      {member.links.map((link, li) => {
                        const LinkIcon = link.icon;
                        return (
                          <a key={li} href={link.url} target="_blank" rel="noopener noreferrer" className="team-link-icon" title={link.label}>
                            <LinkIcon size={18} />
                          </a>
                        );
                      })}
                    </div>
                  )}
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Teams;