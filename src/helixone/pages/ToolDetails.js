import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, ShieldCheck, Database, Activity } from 'lucide-react';
import { getToolById } from '../data/tools';
import './ToolDetails.css';

const HelixToolDetails = () => {
  const { id } = useParams();
  const tool = getToolById(id || '');

  if (!tool) {
    return (
      <div className="container" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
        <h2>Tool not found</h2>
        <Link to="/helixone" className="btn-primary" style={{ marginTop: '2rem', display: 'inline-block' }}>Go Home</Link>
      </div>
    );
  }

  return (
    <div className="tool-details-container container">
      <Link to={tool.category === 'database' ? '/helixone/databases' : '/helixone/tools'} className="back-link">
        <ArrowLeft size={16} /> Back to {tool.category === 'database' ? 'Databases' : 'Tools'}
      </Link>

      <motion.div 
        className="details-header glass-panel"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="header-top">
          <div className="tool-icon-large">
            {tool.category === 'database' ? <Database size={40} /> : <Activity size={40} />}
          </div>
          <div className="tool-title-area">
            <h1>{tool.name}</h1>
            <span className="badge-outline">
              {tool.category === 'database' ? 'Genomics Database' : 'Prediction Tool'}
            </span>
          </div>
        </div>
        
        <p className="tool-full-desc">{tool.description}</p>
        
        <div className="action-buttons">
          <a href={tool.websiteUrl} target="_blank" rel="noopener noreferrer" className="btn-primary flex-btn">
            Visit Official Site <ExternalLink size={18} />
          </a>
        </div>
      </motion.div>

      <motion.div 
        className="tool-content-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="glass-panel iframe-container preview-container">
          <div className="iframe-header">
            <h3><ShieldCheck size={18} className="inline-icon" /> Secure External Access</h3>
            <span className="iframe-badge">Verified Suite</span>
          </div>
          
          <div className="preview-content">
            <div className="preview-icon-bg">
              {tool.category === 'database' ? <Database size={80} /> : <Activity size={80} />}
            </div>
            <h2>{tool.name}</h2>
            <p>For security and optimal performance, this {tool.category} is accessed via its official suite.</p>
            
            <a 
              href={tool.websiteUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-primary launch-large-btn"
            >
              Launch {tool.name} <ExternalLink size={20} style={{ marginLeft: '8px' }} />
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HelixToolDetails;
