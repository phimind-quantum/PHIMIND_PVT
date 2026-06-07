import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCpu, FiDroplet, FiExternalLink } from 'react-icons/fi';
import './Tools.css';

const tools = [
  {
    id: 'helixone',
    icon: FiDroplet,
    name: 'HelixOne',
    tagline: 'Genomics Research Hub',
    description: 'Your unified gateway to 50+ genomics databases, bioinformatics tools, and HelixChat AI — all in one platform. Curated access to Ensembl, UCSC Genome Browser, NCBI, ClinVar, AlphaFold, and hundreds of genomics resources worldwide.',
    features: [
      '26+ curated genomics databases',
      '29 bioinformatics prediction tools',
      'HelixChat AI genomic assistant',
      'Completely free — no sign-up needed',
    ],
    gradient: 'linear-gradient(135deg, rgba(0, 204, 76, 0.15), rgba(0, 204, 76, 0.05))',
    borderColor: 'rgba(0, 204, 76, 0.3)',
    launchUrl: '/helixone/',
  },
  {
    id: 'phiprot',
    icon: FiCpu,
    name: 'PhiProt',
    tagline: 'Protein Prep Pipeline',
    description: 'Seamless protein structure preparation for molecular docking. Submit a PDB ID and receive a cleaned, ligand-removed, hydrogen-added, ready-to-dock protein file — no manual preprocessing needed.',
    features: [
      'Automated ligand & water removal',
      'Hydrogen addition & protonation',
      'PDB file validation & repair',
      'One-click ready-to-dock output',
    ],
    gradient: 'linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(239, 68, 68, 0.05))',
    borderColor: 'rgba(239, 68, 68, 0.3)',
  },
];

const Tools = () => {
  return (
    <section className="tools" id="tools">
      <div className="container">
        <motion.div
          className="tools-header"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <span className="section-tag">Platform</span>
          <h2 className="section-title">
            Quantum-AI <span className="gradient-text">Tools</span>
          </h2>
          <div className="section-divider" />
          <p className="section-subtitle">
            Precision instruments for genomics and molecular research — currently in development
          </p>
        </motion.div>

        <div className="tools-grid">
          {tools.map((tool, i) => {
            const Icon = tool.icon;
            return (
              <motion.div
                key={tool.id}
                className="tool-card"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                viewport={{ once: true }}
              >
                <div className={`tool-badge ${tool.launchUrl ? 'badge-available' : ''}`}>
                  {tool.launchUrl ? 'Available Now' : 'In Development'}
                </div>
                <div className="tool-icon-wrap" style={{ background: tool.gradient, borderColor: tool.borderColor }}>
                  <Icon size={28} />
                </div>
                <h3 className="tool-name">{tool.name}</h3>
                <p className="tool-tagline">{tool.tagline}</p>
                <p className="tool-desc">{tool.description}</p>
                <ul className="tool-features">
                  {tool.features.map((f, fi) => (
                    <li key={fi}>{f}</li>
                  ))}
                </ul>
                {tool.launchUrl ? (
                  <Link to={tool.launchUrl} className="tool-launch-btn">
                    <FiExternalLink size={16} /> Launch HelixOne
                  </Link>
                ) : (
                  <div className="tool-coming">
                    <span className="coming-dot" />
                    Coming Soon
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Tools;