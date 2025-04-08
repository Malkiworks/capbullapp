'use client';

import React from 'react';
import { use3DCardEffect } from '@/hooks/use3DCardEffect';

export default function Features() {
  // Apply the 3D card effect
  use3DCardEffect();
  
  return (
    <section id="features" className="features-section">
      <div className="container">
        <h2>Stop Treating The Market Like Your Ex.<br />It's Not Personal.</h2>
        <div className="features-grid">
          <div className="feature-card card-3d">
            <div className="card-shine"></div>
            <div className="card-3d-content">
              <div className="feature-icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <h3>LIVE Trading</h3>
              <p>Watch our experts execute trades in real-time while explaining their strategy and analysis.</p>
            </div>
          </div>
          <div className="feature-card card-3d">
            <div className="card-shine"></div>
            <div className="card-3d-content">
              <div className="feature-icon">
                <i className="fas fa-users"></i>
              </div>
              <h3>Elite Community</h3>
              <p>Join 4700+ serious traders focused on consistent profits and professional development.</p>
            </div>
          </div>
          <div className="feature-card card-3d">
            <div className="card-shine"></div>
            <div className="card-3d-content">
              <div className="feature-icon">
                <i className="fas fa-graduation-cap"></i>
              </div>
              <h3>Daily Education</h3>
              <p>Our Discord server has a 24/7 free education hub of which users can find technical, fundamental and psychological knowledge.</p>
            </div>
          </div>
          <div className="feature-card card-3d">
            <div className="card-shine"></div>
            <div className="card-3d-content">
              <div className="feature-icon">
                <i className="fas fa-headset"></i>
              </div>
              <h3>24/7 Support</h3>
              <p>Get answers to your questions anytime through our active Discord and WhatsApp groups.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 