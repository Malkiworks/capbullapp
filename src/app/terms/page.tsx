import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import ClientCardEffect from '@/components/ClientCardEffect';

export const metadata: Metadata = {
  title: "Terms of Service | CapitalBulls",
  description: "CapitalBulls terms of service - the rules, guidelines, and agreements for using our services.",
};

export default function TermsOfService() {
  return (
    <main>
      <ClientCardEffect />
      <section className="policy-section">
        <div className="container policy-container">
          <div className="policy-header">
            <h1>Terms of Service</h1>
            <p>Please read these terms carefully before using our services</p>
          </div>
          
          <div className="policy-content">
            <h2>Agreement to Terms</h2>
            <p>By accessing or using the CapitalBulls website, Discord community, or any of our services, you agree to be bound by these Terms of Service. If you do not agree to these terms, you must not access or use our services.</p>
            
            <h2>Description of Services</h2>
            <p>CapitalBulls provides a trading community platform that includes:</p>
            <ul>
              <li>Live trading sessions via Discord</li>
              <li>Educational content related to trading</li>
              <li>Community interaction through Discord channels</li>
              <li>Trading analysis and insights</li>
            </ul>
            
            <div className="highlight-box card-3d">
              <div className="card-shine"></div>
              <div className="card-3d-content">
                <p><strong>Important:</strong> All content and services provided by CapitalBulls are for educational purposes only. We do not provide financial advice, and trading decisions made by users are at their own risk and discretion.</p>
              </div>
            </div>
            
            <h2>Membership and Access</h2>
            <p>To access our premium services, you must:</p>
            <ul>
              <li>Be at least 18 years of age</li>
              <li>Purchase a subscription or day pass</li>
              <li>Create a Discord account (if you don't already have one)</li>
              <li>Follow our community guidelines</li>
            </ul>
            <p>Access to our services is for personal use only and may not be shared with others or used for commercial purposes without our explicit permission.</p>
            
            <h2>Payment Terms</h2>
            <p>By purchasing a subscription or day pass, you agree to the following:</p>
            <ul>
              <li>All payments are processed securely through our payment processors</li>
              <li>Prices displayed are in South African Rand (ZAR) unless otherwise stated</li>
              <li>We reserve the right to change our pricing structure with appropriate notice</li>
              <li>Refunds are governed by our Refund Policy</li>
            </ul>
            
            <h2>User Conduct</h2>
            <p>When using our services, you agree not to:</p>
            <ul>
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe on the intellectual property rights of CapitalBulls or others</li>
              <li>Share your access credentials or content with unauthorized users</li>
              <li>Harass, abuse, or harm other community members</li>
              <li>Disrupt the services or Discord community</li>
              <li>Attempt to gain unauthorized access to any part of our services</li>
              <li>Use our services for illegal activities</li>
              <li>Post spam, harmful content, or advertisements</li>
            </ul>
            
            <h2>Intellectual Property</h2>
            <p>All content provided through our website and services, including but not limited to text, graphics, logos, images, audio, video, and software, is the property of CapitalBulls or its content suppliers and is protected by intellectual property laws.</p>
            <p>You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any content without our express written permission.</p>
            
            <h2>Risk Disclaimer</h2>
            <p>Trading financial instruments carries significant risk and may not be suitable for all investors. You acknowledge that:</p>
            <ul>
              <li>Trading CFDs and other financial instruments involves substantial risk of loss</li>
              <li>Past performance is not indicative of future results</li>
              <li>Our educational content and live trading sessions do not guarantee profits</li>
              <li>You trade at your own risk and are solely responsible for your trading decisions</li>
              <li>You should never invest money that you cannot afford to lose</li>
            </ul>
            
            <div className="highlight-box card-3d">
              <div className="card-shine"></div>
              <div className="card-3d-content">
                <p><strong>Financial Warning:</strong> Trading CFDs is high risk and requires skill. When trading in our live streams, you do so at your own risk. CapitalBulls does not provide financial advice. All information provided is for educational purposes only.</p>
              </div>
            </div>
            
            <h2>Limitation of Liability</h2>
            <p>To the maximum extent permitted by law, CapitalBulls and its officers, directors, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses resulting from:</p>
            <ul>
              <li>Your access to or use of or inability to access or use the services</li>
              <li>Any conduct or content of any third party on the services</li>
              <li>Any content obtained from the services</li>
              <li>Unauthorized access, use or alteration of your transmissions or content</li>
              <li>Trading decisions made based on content from our services</li>
            </ul>
            
            <h2>Termination</h2>
            <p>We reserve the right to terminate or suspend your access to our services immediately, without prior notice or liability, for any reason, including without limitation if you breach these Terms of Service.</p>
            
            <h2>Changes to Terms</h2>
            <p>We reserve the right to modify or replace these Terms of Service at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>
            
            <h2>Governing Law</h2>
            <p>These Terms shall be governed by and construed in accordance with the laws of South Africa, without regard to its conflict of law provisions.</p>
            
            <h2>Contact Us</h2>
            <p>If you have any questions about these Terms, please contact us through our WhatsApp support.</p>
            
            <p className="last-updated">Last Updated: April 2025</p>
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link href="/" className="back-link"><i className="fas fa-arrow-left"></i> Back to Home</Link>
          </div>
        </div>
      </section>
    </main>
  );
} 