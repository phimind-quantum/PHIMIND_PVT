import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Database, ArrowRight } from 'lucide-react';
import { databases } from '../data/tools';
import './GridPage.css';

const HelixDatabases = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDBs = databases.filter(db => 
    db.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-container container">
      <motion.div 
        className="page-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="header-icon"><Database size={40} /></div>
        <h1>Genomics <span className="text-accent-gradient">Databases</span></h1>
        <p>Explore our curated list of {databases.length} premier genomics databases — completely free to access.</p>
        
        <div className="search-bar glass-panel">
          <Search size={20} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search databases..." 
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
        {filteredDBs.map((db, idx) => (
          <motion.div 
            key={db.id}
            className="grid-card glass-panel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            whileHover={{ y: -5, borderColor: 'rgba(220,38,38,0.3)' }}
          >
            <h3>{db.name}</h3>
            <p className="card-desc">{db.description}</p>
            <Link to={`/helixone/tool/${db.id}`} className="card-action">
              View Details <ArrowRight size={16} />
            </Link>
          </motion.div>
        ))}
        {filteredDBs.length === 0 && (
          <div className="no-results">No databases found matching your search.</div>
        )}
      </motion.div>
    </div>
  );
};

export default HelixDatabases;
