'use client';

import React from 'react';
import Link from 'next/link';
import { use3DCardEffect } from '@/hooks/use3DCardEffect';

export default function UsefulLinks() {
  // Apply the 3D card effect
  use3DCardEffect();

  return (
    <section id="links" className="links-section">
      <div className="container">
        <h2>Ready To Start Trading Properly?</h2>
        <div className="links-grid">
          <Link href="https://discord.com/invite/KqyjCFGMwV" className="link-card card-3d mouse-interactive">
            <div className="card-shine"></div>
            <div className="card-3d-content">
              <i className="fab fa-discord"></i>
              <span>Enter Discord</span>
            </div>
          </Link>
          <Link href="https://www.brokerconnectsa.com/" className="link-card card-3d mouse-interactive">
            <div className="card-shine"></div>
            <div className="card-3d-content">
              <i className="fas fa-handshake"></i>
              <span>BrokerConnect</span>
            </div>
          </Link>
          <Link href="https://www.xmza.com/register/profile-account?lang=en&utm_source=linktr.ee&utm_content=1233232&utm_medium=affiliate&clickid=3aacecde-1ec8-41e2-b5c9-db4943b2353a" className="link-card card-3d mouse-interactive">
            <div className="card-shine"></div>
            <div className="card-3d-content">
              <i className="fas fa-chart-line"></i>
              <span>Use Our Broker</span>
            </div>
          </Link>
          <Link href="https://youtube.com/@capitalbulls_za" className="link-card card-3d mouse-interactive">
            <div className="card-shine"></div>
            <div className="card-3d-content">
              <i className="fab fa-youtube"></i>
              <span>Our YouTube Channel</span>
            </div>
          </Link>
          <Link href="https://api.whatsapp.com/message/CHY4WFEJJQMXC1?autoload=1&app_absent=0" className="link-card card-3d mouse-interactive">
            <div className="card-shine"></div>
            <div className="card-3d-content">
              <i className="fab fa-whatsapp"></i>
              <span>WhatsApp Support</span>
            </div>
          </Link>
          <Link href="https://linktr.ee/capitalbulls" className="link-card card-3d mouse-interactive">
            <div className="card-shine"></div>
            <div className="card-3d-content">
              <i className="fas fa-link"></i>
              <span>More Links</span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
} 