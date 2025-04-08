'use client';

import React from 'react';
import Link from 'next/link';
import { use3DCardEffect } from '@/hooks/use3DCardEffect';

export default function Pricing() {
  // Apply the 3D card effect
  use3DCardEffect();
  
  return (
    <section id="pricing" className="pricing-section">
      <div className="container">
        <h2>Investment Plans</h2>
        <p className="section-subtitle">Your trading education is the best investment you'll ever make</p>
        
        <div className="pricing-grid">
          <div className="pricing-card featured card-3d">
            <div className="card-shine"></div>
            <div className="card-3d-content">
              <div className="pricing-badge">Most Popular</div>
              <h3>7-Day Access</h3>
              <div className="pricing-amount">
                <span className="price">R1250</span>
                <span className="period">/ week</span>
              </div>
              <ul className="pricing-features">
                <li><i className="fas fa-check"></i> Full Discord Access</li>
                <li><i className="fas fa-check"></i> Daily LIVE Trading Sessions</li>
                <li><i className="fas fa-check"></i> Fully Experience The QUALITY Of Content We Offer</li>
                <li><i className="fas fa-check"></i> Complete Educational Resources</li>
                <li><i className="fas fa-check"></i> 24/7 WhatsApp Support</li>
              </ul>
              <Link href="https://paystack.com/pay/jfwp9fumaw" className="cta-button primary full-width">
                <span className="btn-text">Get Started Now</span>
              </Link>
            </div>
          </div>
          <div className="pricing-card card-3d">
            <div className="card-shine"></div>
            <div className="card-3d-content">
              <h3>24-Hour Trial</h3>
              <div className="pricing-amount">
                <span className="price">R250</span>
                <span className="period">/ day</span>
              </div>
              <ul className="pricing-features">
                <li><i className="fas fa-check"></i> Limited Discord Access</li>
                <li><i className="fas fa-check"></i> 1 Weekly LIVE Trading Session</li>
                <li><i className="fas fa-check"></i> Fully Experience The QUALITY Of Content We Offer</li>
                <li><i className="fas fa-check"></i> Educational Resources</li>
                <li><i className="fas fa-check"></i> WhatsApp Support</li>
              </ul>
              <Link href="https://paystack.com/pay/ecs9v5bbkr" className="cta-button secondary full-width">
                <span className="btn-text">Try for 24 Hours</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 