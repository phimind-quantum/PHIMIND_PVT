import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Teams from './components/Teams';
import Services from './components/Services';
import Roadmap from './components/Roadmap';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Teams />
        <Roadmap />
        <Services />
      </main>
      <Footer />
    </div>
  );
}

export default App;
