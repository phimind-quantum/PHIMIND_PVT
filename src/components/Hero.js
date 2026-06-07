import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import TypewriterText from './TypewriterText';
import { FiArrowDown } from 'react-icons/fi';
import './Hero.css';
import logoImg from '../images/logo.png';

const PARTICLE_COUNT = 30;
const BURST_COUNT = 12;

const ParticleNetwork = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const particlesRef = useRef([]);
  const burstParticlesRef = useRef([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let w, h;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.r = Math.random() * 1.5 + 0.5;
        this.baseVx = this.vx;
        this.baseVy = this.vy;
      }
      update(mx, my) {
        const dx = mx - this.x;
        const dy = my - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 300) {
          const force = (1 - dist / 300) * 0.015;
          this.vx += dx * force;
          this.vy += dy * force;
          const maxSpeed = 2;
          const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
          if (speed > maxSpeed) {
            this.vx = (this.vx / speed) * maxSpeed;
            this.vy = (this.vy / speed) * maxSpeed;
          }
        } else {
          this.vx += (this.baseVx - this.vx) * 0.01;
          this.vy += (this.baseVy - this.vy) * 0.01;
        }
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > w) { this.vx *= -1; this.baseVx *= -1; }
        if (this.y < 0 || this.y > h) { this.vy *= -1; this.baseVy *= -1; }
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 204, 76, 0.15)';
        ctx.fill();
      }
    }

    class BurstParticle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 3 + 1;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.r = Math.random() * 1.5 + 0.5;
        this.life = 1;
        this.decay = Math.random() * 0.03 + 0.02;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.97;
        this.vy *= 0.97;
        this.life -= this.decay;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(239, 68, 68, ${this.life * 0.8})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) particlesRef.current.push(new Particle());

    const burstAt = (x, y) => {
      for (let i = 0; i < BURST_COUNT; i++) {
        burstParticlesRef.current.push(new BurstParticle(x, y));
      }
    };

    const onClick = (e) => {
      burstAt(e.clientX, e.clientY);
    };
    canvas.addEventListener('click', onClick);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (const p of particlesRef.current) {
        p.update(mx, my);
        p.draw();
      }

      const p = particlesRef.current;
      for (let i = p.length - 1; i >= 0; i--) {
        for (let j = i + 1; j < p.length; j++) {
          const dx = p[i].x - p[j].x;
          const dy = p[i].y - p[j].y;
          const distSq = dx * dx + dy * dy;
          if (distSq < 14400) {
            const dist = Math.sqrt(distSq);
            const alpha = (1 - dist / 120) * 0.08;
            const mx2 = (p[i].x + p[j].x) / 2 - mx;
            const my2 = (p[i].y + p[j].y) / 2 - my;
            const glow = (mx2 * mx2 + my2 * my2) < 62500 ? 1.5 : 1;
            ctx.beginPath();
            ctx.moveTo(p[i].x, p[i].y);
            ctx.lineTo(p[j].x, p[j].y);
            ctx.strokeStyle = `rgba(0, 204, 76, ${alpha * glow})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      for (let i = burstParticlesRef.current.length - 1; i >= 0; i--) {
        const bp = burstParticlesRef.current[i];
        bp.update();
        bp.draw();
        if (bp.life <= 0) burstParticlesRef.current.splice(i, 1);
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    const onMouse = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    window.addEventListener('mousemove', onMouse);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouse);
      canvas.removeEventListener('click', onClick);
    };
  }, [loaded]);

  return <canvas ref={canvasRef} className="hero-canvas" />;
};

const FloatingLogo = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const imgRef = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / 60;
      const dy = (e.clientY - cy) / 60;
      setPos({ x: dx, y: dy });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div className="floating-logo">
      <div className="floating-ring outer" />
      <div className="floating-ring inner" />
      <div className="floating-ring core" />
      <motion.div
        className="floating-img-wrap"
        animate={{ x: pos.x, y: pos.y }}
        transition={{ type: 'spring', stiffness: 20, damping: 12, mass: 2 }}
      >
        <img ref={imgRef} src={logoImg} alt="phiMind" />
      </motion.div>
    </div>
  );
};

const Hero = () => {
  const scrollToAbout = useCallback(() => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <section className="hero" id="hero">
      <ParticleNetwork />
      <div className="hero-overlay" />

      <div className="hero-bg-letter">Φ</div>

      <div className="hero-inner">
        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <span className="hero-line">
            <span className="hero-phi">
              <TypewriterText texts={['phi', 'Φ']} typingSpeed={140} pauseDuration={1500} startDelay={800} />
            </span>
            <span className="hero-mind">Mind</span>
          </span>
          <span className="hero-line hero-line-sub gradient-text">Never in Between</span>
        </motion.h1>

        <motion.p
          className="hero-desc"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          Where quantum computing meets artificial intelligence to revolutionize healthcare.
        </motion.p>

        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
        >
          <button className="btn" onClick={scrollToAbout}>
            Explore Opportunities
          </button>
          <button className="btn btn-outline" onClick={scrollToAbout}>
            Learn More
          </button>
        </motion.div>
      </div>

      <FloatingLogo />

      <motion.button
        className="hero-scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        onClick={scrollToAbout}
        aria-label="Scroll"
      >
        <FiArrowDown className="scroll-icon" />
      </motion.button>
    </section>
  );
};

export default Hero;