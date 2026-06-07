import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Database, Activity, ArrowRight } from 'lucide-react';
import './Home.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const HelixHome = () => {
  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-bg-glow"></div>
        <div className="container hero-content">
          <motion.div 
            className="hero-text-content"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="badge">
              <span className="glow-text">Free</span> Genomics Platform — No Sign-Up Required
            </motion.div>
            <motion.h1 variants={itemVariants} className="hero-title">
              The Unified Platform for <br />
              <span className="text-accent-gradient">Genomics Research</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="hero-subtitle">
              Access 50+ premier genomics databases and prediction tools. Analyze data and run complex genomic analysis — completely free.
            </motion.p>
            <motion.div variants={itemVariants} className="hero-actions">
              <Link to="/helixone/databases" className="btn-primary">
                Explore Databases <ArrowRight size={18} style={{ marginLeft: '8px', display: 'inline' }} />
              </Link>
              <Link to="/helixone/tools" className="btn-secondary">
                View Tools
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <motion.div 
            className="features-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="feature-card glass-panel">
              <div className="feature-icon"><Database size={32} /></div>
              <h3>26+ Databases</h3>
              <p>Directly access Ensembl, GenBank, UCSC Genome Browser, and more through our integrated internal viewer.</p>
              <Link to="/helixone/databases" className="feature-link">Browse Databases <ArrowRight size={16} /></Link>
            </motion.div>

            <motion.div variants={itemVariants} className="feature-card glass-panel">
              <div className="feature-icon"><Activity size={32} /></div>
              <h3>29 Prediction Tools</h3>
              <p>Utilize powerful tools like AlphaFold, VEP, and DeepSEA for structural modeling and sequence analysis.</p>
              <Link to="/helixone/tools" className="feature-link">View Tools <ArrowRight size={16} /></Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HelixHome;
