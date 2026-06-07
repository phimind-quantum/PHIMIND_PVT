import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import './Stats.css';

const stats = [
  { value: 12, suffix: '+', label: 'Research Partnerships' },
  { value: 5, suffix: '', label: 'Clinical Trials Initiated' },
  { value: 50, suffix: '+', label: 'Quantum Algorithms Developed' },
  { value: 4, suffix: 'yr', label: 'R&D Experience' },
  { value: 1, suffix: '', label: 'International Grant Recognition' },
];

const AnimatedStat = ({ stat, inView }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = Math.ceil(stat.value / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= stat.value) {
        setCount(stat.value);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, stat.value]);

  return (
    <div className="stat-item">
      <span className="stat-value">
        {count}{stat.suffix}
      </span>
      <span className="stat-label">{stat.label}</span>
    </div>
  );
};

const Stats = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.3, once: true });

  return (
    <section className="stats" id="stats" ref={ref}>
      <div className="container">
        <motion.div
          className="stats-grid"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          {stats.map((stat, i) => (
            <AnimatedStat key={i} stat={stat} inView={inView} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Stats;