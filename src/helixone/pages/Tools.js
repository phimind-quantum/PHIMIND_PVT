import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Activity, ArrowRight } from 'lucide-react';
import { predictionTools } from '../data/tools';
import './GridPage.css';

const HelixTools = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTools = predictionTools.filter(tool => 
    tool.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-container container">
      <motion.div 
        className="page-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="header-icon"><Activity size={40} /></div>
        <h1>Prediction <span className="text-accent-gradient">Tools</span></h1>
        <p>Access our powerful suite of {predictionTools.length} genomics prediction tools — free and open to all.</p>
        
        <div className="search-bar glass-panel">
          <Search size={20} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search tools..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </motion.div>

      <motion.div 
        className="grid-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {filteredTools.map((tool, idx) => (
          <motion.div 
            key={tool.id}
            className="grid-card glass-panel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            whileHover={{ y: -5, borderColor: 'rgba(220,38,38,0.3)' }}
          >
            <h3>{tool.name}</h3>
            <p className="card-desc">{tool.description}</p>
            <Link to={`/helixone/tool/${tool.id}`} className="card-action">
              View Details <ArrowRight size={16} />
            </Link>
          </motion.div>
        ))}
        {filteredTools.length === 0 && (
          <div className="no-results">No tools found matching your search.</div>
        )}
      </motion.div>
    </div>
  );
};

export default HelixTools;
