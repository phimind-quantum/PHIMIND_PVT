import React from 'react';
import { motion } from 'framer-motion';
import TypewriterText from './TypewriterText';
import './Teams.css';
import NaveenImg from '../images/NAVEENJ.png';
import SonetImg from '../images/SONETD.png';

const Teams = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Sonet D Thomas",
      designation: "Co-founder, Quantum Computing Lead",
      image: SonetImg
    },
    {
      id: 2,
      name: "Naveen Joy",
      designation: "Co-founder, AI Research Director",
      image: NaveenImg
    }
  ];

  return (
    <section className="teams" id="teams">
      <div className="teams-container">
        <motion.div
          className="teams-header"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="teams-title">
            Into the <TypewriterText 
              texts={['Φ', 'phi']}
              typingSpeed={200}
              pauseDuration={1500}
              startDelay={500}
              className="phi-highlight"
            />Mind's
          </h2>
          <p className="teams-subtitle">
            Meet the brilliant minds pioneering the future of Quantum-AI healthcare
          </p>
        </motion.div>

        <div className="teams-grid">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              className="team-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(8, 203, 0, 0.2)"
              }}
            >
              <div className="team-image-container">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="team-image"
                />
                <div className="image-overlay"></div>
              </div>
              <div className="team-info">
                <h3 className="team-name">{member.name}</h3>
                <p className="team-designation">{member.designation}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Teams;
