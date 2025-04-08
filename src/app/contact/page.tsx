import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import ClientCardEffect from '@/components/ClientCardEffect';

export const metadata: Metadata = {
  title: "Contact Us | CapitalBulls",
  description: "Get in touch with CapitalBulls - join our Discord and WhatsApp groups for support and community interaction.",
};

export default function Contact() {
  return (
    <main>
      <ClientCardEffect />
      <section className="contact-section">
        <div className="container contact-container">
          <div className="contact-header">
            <h1>Connect With Us</h1>
            <p>Join our trading community and get support through these channels</p>
          </div>
          
          <div className="contact-methods">
            <div className="contact-card card-3d">
              <div className="card-shine"></div>
              <div className="card-3d-content">
                <i className="fab fa-discord contact-icon"></i>
                <h3>Discord Community</h3>
                <p>Join over 4700+ traders in our active Discord community. Get access to LIVE trading sessions, educational content, and connect with like-minded traders.</p>
                <a href="https://discord.com/invite/KqyjCFGMwV" className="contact-btn">
                  <i className="fab fa-discord"></i>
                  Join Discord
                </a>
              </div>
            </div>
            
            <div className="contact-card card-3d">
              <div className="card-shine"></div>
              <div className="card-3d-content">
                <i className="fab fa-whatsapp contact-icon"></i>
                <h3>WhatsApp Support</h3>
                <p>Need quick support or have questions about our services? Reach out to us on WhatsApp for fast and personalized assistance.</p>
                <a href="https://api.whatsapp.com/message/CHY4WFEJJQMXC1?autoload=1&app_absent=0" className="contact-btn">
                  <i className="fab fa-whatsapp"></i>
                  Message Us
                </a>
              </div>
            </div>
          </div>
          
          <div className="hours-box card-3d">
            <div className="card-shine"></div>
            <div className="card-3d-content">
              <h3>Trading Session Hours</h3>
              <p>We host LIVE trading sessions during the late afternoon US session, typically around:<br />
              19:15 / 19:45 / 20:45 South African time</p>
              <p>Join us to see professional traders in action and learn as you watch.</p>
            </div>
          </div>
          
          <div>
            <Link href="/" className="back-link"><i className="fas fa-arrow-left"></i> Back to Home</Link>
          </div>
        </div>
      </section>
    </main>
  );
} 