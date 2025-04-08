'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Broker() {
  return (
    <section className="broker-section">
      <div className="container">
        <div className="broker-content">
          <div className="broker-text">
            <h2>Ooops...<br />Your Broker Blocked Us?</h2>
            <p>Many brokers don't want their clients learning how to trade properly. We've partnered with trusted brokers that support your growth.</p>
            <Link href="https://www.brokerconnectsa.com/" className="cta-button primary">
              <span className="btn-text">Use Our Broker</span>
            </Link>
          </div>
          <div className="broker-image">
            <Image 
              src="/images/broker-phones.jpg" 
              alt="Trading phones showing broker blocked message"
              width={500}
              height={300}
            />
          </div>
        </div>
      </div>
    </section>
  );
} 