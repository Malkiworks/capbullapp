import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import ClientCardEffect from '@/components/ClientCardEffect';

export const metadata: Metadata = {
  title: "Privacy Policy | CapitalBulls",
  description: "CapitalBulls privacy policy - how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicy() {
  return (
    <main>
      <ClientCardEffect />
      <section className="policy-section">
        <div className="container policy-container">
          <div className="policy-header">
            <h1>Privacy Policy</h1>
            <p>How we collect, use, and protect your personal information</p>
          </div>
          
          <div className="policy-content">
            <h2>Introduction</h2>
            <p>At CapitalBulls ("we," "our," or "us"), we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our services, or join our Discord community.</p>
            <p>Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site or use our services.</p>
            
            <h2>Information We Collect</h2>
            <p>We may collect information about you in a variety of ways. The information we may collect includes:</p>
            <ul>
              <li><strong>Personal Data:</strong> Personally identifiable information, such as your name, email address, telephone number, and payment information that you voluntarily give to us when you register with us or make a purchase.</li>
              <li><strong>Account Information:</strong> Your Discord username, ID, and other information required to manage your access to our trading community.</li>
              <li><strong>Communication Data:</strong> Information you provide when you communicate with us via email, Discord, WhatsApp, or other platforms.</li>
              <li><strong>Technical Data:</strong> IP address, browser type and version, time zone setting, operating system, and platform.</li>
              <li><strong>Usage Data:</strong> Information about how you use our website, products, and services.</li>
            </ul>
            
            <h2>How We Use Your Information</h2>
            <p>We may use the information we collect about you for various purposes, including to:</p>
            <ul>
              <li>Process your payment for our services</li>
              <li>Provide and maintain our trading community</li>
              <li>Notify you about changes to our services</li>
              <li>Respond to your inquiries and provide customer support</li>
              <li>Monitor usage of our community and services</li>
              <li>Prevent fraudulent activities</li>
              <li>Send you marketing communications (with your consent)</li>
              <li>Improve our products and services</li>
            </ul>
            
            <h2>Disclosure of Your Information</h2>
            <p>We may share information we have collected about you in certain situations. Your information may be disclosed as follows:</p>
            <ul>
              <li><strong>Payment Processors:</strong> We share necessary information with payment processors to complete transactions.</li>
              <li><strong>Third-Party Service Providers:</strong> We may share your information with third-party vendors who provide services on our behalf.</li>
              <li><strong>Legal Requirements:</strong> We may disclose your information where required to comply with applicable law, governmental requests, or legal process.</li>
              <li><strong>Business Transfers:</strong> If we are involved in a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred as part of that transaction.</li>
            </ul>
            
            <h2>Security of Your Information</h2>
            <p>We use administrative, technical, and physical security measures to protect your personal information. While we have taken reasonable steps to secure the information you provide to us, please be aware that no security measures are perfect, and we cannot guarantee the security of your information.</p>
            
            <div className="highlight-box card-3d">
              <div className="card-shine"></div>
              <div className="card-3d-content">
                <p><strong>Important:</strong> We take the security of your data very seriously. However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.</p>
              </div>
            </div>
            
            <h2>Third-Party Websites</h2>
            <p>Our website and Discord community may contain links to third-party websites and applications. We are not responsible for the privacy practices or the content of these third-party sites, and any information you provide to them is not covered by this Privacy Policy.</p>
            
            <h2>Your Privacy Rights</h2>
            <p>Depending on your location, you may have certain rights regarding your personal information, such as:</p>
            <ul>
              <li>The right to access and receive a copy of your personal information</li>
              <li>The right to rectify or update your personal information</li>
              <li>The right to erase your personal information</li>
              <li>The right to restrict processing of your personal information</li>
              <li>The right to object to processing of your personal information</li>
              <li>The right to data portability</li>
            </ul>
            <p>To exercise any of these rights, please contact us at the information provided below.</p>
            
            <h2>Children's Privacy</h2>
            <p>Our services are not intended for individuals under the age of 18. We do not knowingly collect or solicit personal information from anyone under the age of 18. If we learn that we have collected personal information from a child under age 18, we will delete that information as quickly as possible.</p>
            
            <h2>Changes to This Privacy Policy</h2>
            <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.</p>
            
            <h2>Contact Us</h2>
            <p>If you have questions or concerns about this Privacy Policy, please contact us through our WhatsApp support.</p>
            
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