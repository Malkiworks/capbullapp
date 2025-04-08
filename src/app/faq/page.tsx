import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import ClientCardEffect from '@/components/ClientCardEffect';

export const metadata: Metadata = {
  title: "Frequently Asked Questions | CapitalBulls",
  description: "Find answers to frequently asked questions about CapitalBulls trading community and services.",
};

export default function FAQ() {
  return (
    <main>
      <ClientCardEffect />
      <section className="faq-section">
        <div className="container faq-container">
          <div className="faq-header">
            <h1>FREQUENTLY ASKED QUESTIONS</h1>
            <p>ELITE TRADERS COMMUNITY | DISCORD TRADING CHANNEL</p>
          </div>
          
          <div className="faq-item card-3d">
            <div className="card-shine"></div>
            <div className="card-3d-content">
              <h3>Can I subscribe any day of the week?</h3>
              <p>Yes, if you decide to join the stream on a Tuesday, your subscription will be valid until next Tuesday. (7 full days)</p>
            </div>
          </div>
          
          <div className="faq-item card-3d">
            <div className="card-shine"></div>
            <div className="card-3d-content">
              <h3>Can I cancel the subscription at anytime?</h3>
              <p>Yes, if you decide to cancel your subscription early, your access will remain valid until 7 days has lapsed. You won't be charged again.</p>
            </div>
          </div>
          
          <div className="faq-item card-3d">
            <div className="card-shine"></div>
            <div className="card-3d-content">
              <h3>Can a beginner join the streams?</h3>
              <p>Yes, this is the perfect way to learn first hand. You are witnessing in real time what trading is actually like. Take notes while you're in the stream.</p>
            </div>
          </div>
          
          <div className="faq-item card-3d">
            <div className="card-shine"></div>
            <div className="card-3d-content">
              <h3>What time does the stream start?</h3>
              <p>Recently we've been trading the late afternoon US session, So around 19:15 / 19:45 / 20:45 our South African time.</p>
            </div>
          </div>
          
          <div className="faq-item card-3d">
            <div className="card-shine"></div>
            <div className="card-3d-content">
              <h3>How much should I fund my account with to trade in the streams?</h3>
              <p>That is entirely up to how much you're able to afford or spend on your trading account. Think about the RISK vs REWARD... if it's 3:1 then anything you deposit into the account. First expect to make the minimum of x3 back. Trading with less than $100 is possible, but not really the best. Room for error and blowing becomes greater.</p>
            </div>
          </div>
          
          <div className="disclaimer card-3d">
            <div className="card-shine"></div>
            <div className="card-3d-content">
              <p>CapitalBulls</p>
              <p>Trading CFDs is high risk, and requires skill. When trading in our live streams you do so at your own risk.</p>
            </div>
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link href="/" className="back-link"><i className="fas fa-arrow-left"></i> Back to Home</Link>
          </div>
        </div>
      </section>
    </main>
  );
} 