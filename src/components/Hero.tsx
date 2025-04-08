'use client';

import Link from 'next/link';

export default function Hero() {
  return (
    <section id="hero" className="hero-section">
      <div className="hero-content">
        <h1>Profits Wait for No One.<br />Neither Do We.</h1>
        <p className="hero-subtitle">
          We are the <span className="highlight">ONLY</span> trading community in South Africa to trade{' '}
          <span className="highlight">LIVE</span> everyday
        </p>
        <div className="cta-buttons">
          <Link href="https://paystack.com/pay/jfwp9fumaw" className="cta-button primary">
            <span className="btn-text">Join LIVE stream</span>
            <span className="btn-subtext">7 days access</span>
          </Link>
          <Link href="https://paystack.com/pay/ecs9v5bbkr" className="cta-button secondary">
            <span className="btn-text">Day Pass (trial)</span>
            <span className="btn-subtext">24 hours access</span>
          </Link>
        </div>
        <div className="hero-stats">
          <div className="stat">
            <span className="stat-value">4700+</span>
            <span className="stat-label">Community Members</span>
          </div>
          <div className="stat">
            <span className="stat-value">24/7</span>
            <span className="stat-label">Trading Support</span>
          </div>
          <div className="stat">
            <span className="stat-value">LIVE</span>
            <span className="stat-label">Daily Sessions</span>
          </div>
        </div>
      </div>
    </section>
  );
} 