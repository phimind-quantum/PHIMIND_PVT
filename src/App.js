import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import About from './components/About';
import Teams from './components/Teams';
import Roadmap from './components/Roadmap';
import Services from './components/Services';
import Tools from './components/Tools';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import HelixHome from './helixone/pages/Home';
import HelixDatabases from './helixone/pages/Databases';
import HelixTools from './helixone/pages/Tools';
import HelixToolDetails from './helixone/pages/ToolDetails';
import Phiverse from './phiverse/Phiverse';
import './App.css';

const MainPage = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <div className="progress-bar" style={{ width: `${scrollProgress}%` }} />
      <Hero />
      <div className="section-divider-wave"><svg viewBox="0 0 1440 120" preserveAspectRatio="none"><path d="M0,60 C360,120 720,0 1440,60 L1440,0 L0,0 Z" fill="var(--surface)"/></svg></div>
      <Stats />
      <div className="section-divider-wave wave-alt"><svg viewBox="0 0 1440 120" preserveAspectRatio="none"><path d="M0,60 C360,0 720,120 1440,60 L1440,0 L0,0 Z" fill="var(--main-bg)"/></svg></div>
      <About />
      <div className="section-divider-wave"><svg viewBox="0 0 1440 120" preserveAspectRatio="none"><path d="M0,60 C360,120 720,0 1440,60 L1440,0 L0,0 Z" fill="var(--surface)"/></svg></div>
      <Teams />
      <div className="section-divider-wave wave-alt"><svg viewBox="0 0 1440 120" preserveAspectRatio="none"><path d="M0,60 C360,0 720,120 1440,60 L1440,0 L0,0 Z" fill="var(--main-bg)"/></svg></div>
      <Roadmap />
      <div className="section-divider-wave"><svg viewBox="0 0 1440 120" preserveAspectRatio="none"><path d="M0,60 C360,120 720,0 1440,60 L1440,0 L0,0 Z" fill="var(--surface)"/></svg></div>
      <Services />
      <div className="section-divider-wave wave-alt"><svg viewBox="0 0 1440 120" preserveAspectRatio="none"><path d="M0,60 C360,0 720,120 1440,60 L1440,0 L0,0 Z" fill="var(--main-bg)"/></svg></div>
      <Tools />
      <div className="section-divider-wave"><svg viewBox="0 0 1440 120" preserveAspectRatio="none"><path d="M0,60 C360,120 720,0 1440,60 L1440,0 L0,0 Z" fill="var(--surface)"/></svg></div>
      <FAQ />
    </>
  );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

function App() {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };
    document.addEventListener('mousemove', onMove);
    return () => document.removeEventListener('mousemove', onMove);
  }, []);

  const handleCursorHover = useCallback((hovered) => {
    if (cursorRef.current) {
      cursorRef.current.style.transform = hovered
        ? `scale(1.8)`
        : `scale(1)`;
      cursorRef.current.style.borderColor = hovered
        ? 'rgba(239, 68, 68, 0.8)'
        : 'var(--cursor-color)';
    }
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll('a, button, .btn, input, textarea, select, [data-cursor]');
    const onOver = () => handleCursorHover(true);
    const onOut = () => handleCursorHover(false);
    els.forEach((el) => { el.addEventListener('mouseenter', onOver); el.addEventListener('mouseleave', onOut); });
    return () => els.forEach((el) => { el.removeEventListener('mouseenter', onOver); el.removeEventListener('mouseleave', onOut); });
  }, [handleCursorHover]);

  return (
    <div className="App">
      <div className="custom-cursor" ref={cursorRef} />
      <div className="custom-cursor-dot" ref={cursorDotRef} />
      <div className="quantum-grid" />
      <div className="noise-overlay" />
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/helixone" element={<HelixHome />} />
          <Route path="/helixone/databases" element={<HelixDatabases />} />
          <Route path="/helixone/tools" element={<HelixTools />} />
          <Route path="/helixone/tool/:id" element={<HelixToolDetails />} />
          <Route path="/phiverse" element={<Phiverse />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
