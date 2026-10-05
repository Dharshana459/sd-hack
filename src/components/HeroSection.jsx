import React from 'react';
import { ArrowRight, PlayCircle } from '@phosphor-icons/react';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-bg-glow"></div>
      
      <div className="container hero-container">
        <div className="hero-content animate-in">
          <div className="badge">
            <span className="badge-dot"></span>
            NEW ARRIVAL
          </div>
          <h1 className="hero-title">
            DEFINE YOUR <br />
            <span className="text-gradient">VELOCITY</span>
          </h1>
          <p className="hero-subtitle">
            Experience unparalleled comfort and futuristic design. 
            Step into the next generation of urban footwear.
          </p>
          
          <div className="hero-cta">
            <button className="btn-primary">
              Shop Now <ArrowRight weight="bold" />
            </button>
            <button className="btn-secondary">
              <PlayCircle size={24} /> Watch Film
            </button>
          </div>

          <div className="hero-stats">
            <div className="stat">
              <h3>200g</h3>
              <p>Ultra Light</p>
            </div>
            <div className="stat">
              <h3>React+</h3>
              <p>Cushioning</p>
            </div>
          </div>
        </div>

        <div className="hero-visual animate-in" style={{ animationDelay: '0.2s' }}>
          <div className="glow-circle"></div>
          <img 
            src="/images/urban_runner_1791192005660.png" 
            alt="Velocity Urban Runner" 
            className="hero-shoe floating" 
          />
          <div className="shoe-shadow"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
