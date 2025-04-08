import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import ClientCardEffect from '@/components/ClientCardEffect';

export const metadata: Metadata = {
  title: "Refund Policy | CapitalBulls",
  description: "CapitalBulls refund policy - learn about our refund conditions and process.",
};

export default function RefundPolicy() {
  return (
    <main>
      <ClientCardEffect />
      <section className="policy-section">
        <div className="container policy-container">
          <div className="policy-header">
            <h1>Refund Policy</h1>
            <p>Our terms and conditions regarding refunds</p>
          </div>
          
          <div className="policy-content">
            <h2>Overview</h2>
            <p>At CapitalBulls, we strive to provide high-quality live trading sessions and educational content to our community members. We understand that sometimes circumstances change, and we have developed this refund policy to be fair and transparent.</p>
            
            <h2>Digital Content and Services</h2>
            <p>Due to the digital nature of our services and the immediate access provided to our Discord community and live trading sessions, all purchases are considered final once access has been granted.</p>
            
            <div className="highlight-box card-3d">
              <div className="card-shine"></div>
              <div className="card-3d-content">
                <p><strong>Please Note:</strong> When you purchase access to our services, you are buying access to digital content (live streams, community access, educational materials) that is delivered immediately. As such, you acknowledge that your right to a cooling-off period is lost once you begin to access our digital content.</p>
              </div>
            </div>
            
            <h2>Subscription Services</h2>
            <p>For our 7-day access subscription:</p>
            <ul>
              <li>Your subscription begins on the day of purchase and continues for a full 7 days.</li>
              <li>You may cancel your subscription at any time, but your access will remain valid until the end of the 7-day period.</li>
              <li>After cancellation, you will not be charged for future subscription periods.</li>
            </ul>
            
            <h2>Day Pass (Trial)</h2>
            <p>For our 24-hour trial access:</p>
            <ul>
              <li>The 24-hour trial is a one-time purchase and does not automatically renew.</li>
              <li>Due to the immediate access granted to our digital content and services, the day pass is non-refundable once purchased.</li>
            </ul>
            
            <h2>Exceptions</h2>
            <p>We may consider refunds in the following exceptional circumstances:</p>
            <ul>
              <li>Technical Issues: If you experience persistent technical problems that prevent you from accessing our services, and our support team is unable to resolve them within a reasonable timeframe.</li>
              <li>Service Unavailability: If we are unable to provide the services as advertised for an extended period due to factors within our control.</li>
            </ul>
            <p>All refund requests under these exceptions will be evaluated on a case-by-case basis and must be submitted within 48 hours of purchase.</p>
            
            <h2>How to Request a Refund</h2>
            <p>If you believe you qualify for a refund under the exceptions listed above, please contact our support team through WhatsApp with the following information:</p>
            <ul>
              <li>Your full name</li>
              <li>Date of purchase</li>
              <li>Amount paid</li>
              <li>Reason for requesting a refund</li>
              <li>Description of the issue (including any error messages or screenshots if applicable)</li>
            </ul>
            
            <h2>Refund Processing</h2>
            <p>If your refund request is approved:</p>
            <ul>
              <li>Refunds will be processed using the same payment method used for the original purchase.</li>
              <li>Processing times may vary depending on your payment provider, but typically take 5-10 business days to appear in your account.</li>
              <li>Upon refund, your access to our services will be terminated.</li>
            </ul>
            
            <h2>Important Notice Regarding Trading Results</h2>
            <p>Please note that we do not offer refunds based on dissatisfaction with trading results. Trading involves risk, and results can vary. Our services provide educational content and live trading sessions, but we do not guarantee specific financial outcomes.</p>
            
            <div className="highlight-box card-3d">
              <div className="card-shine"></div>
              <div className="card-3d-content">
                <p><strong>Risk Disclaimer:</strong> Trading CFDs is high risk and requires skill. Past performance is not indicative of future results. All live streams are for educational purposes only and do not constitute financial advice. You trade at your own risk.</p>
              </div>
            </div>
            
            <h2>Changes to This Policy</h2>
            <p>We reserve the right to modify this refund policy at any time. Changes will be effective immediately upon posting to our website. Your continued use of our services following the posting of changes constitutes your acceptance of such changes.</p>
            
            <h2>Contact Us</h2>
            <p>If you have any questions about our refund policy, please contact us through our WhatsApp support.</p>
            
            <div className="highlight-box card-3d">
              <div className="card-shine"></div>
              <div className="card-3d-content">
                <p><strong>Note:</strong> All refund requests must be submitted within the specified timeframes. We cannot process refund requests that fall outside these periods.</p>
              </div>
            </div>
            <div className="highlight-box card-3d">
              <div className="card-shine"></div>
              <div className="card-3d-content">
                <p><strong>Important:</strong> By purchasing our services, you acknowledge that you have read, understood, and agree to this Refund Policy. If you have any questions, please contact our support team before making a purchase.</p>
              </div>
            </div>
            
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