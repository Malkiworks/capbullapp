'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <header>
      <div className="logo">
        <Image 
          src="/images/logo.png" 
          alt="CapitalBulls Logo" 
          width={150} 
          height={50} 
          style={{ objectFit: 'contain', width: 'auto', height: '50px' }}
          priority
        />
      </div>
      <nav>
        <ul className={isMenuOpen ? 'active' : ''}>
          <li><Link href="#hero">Home</Link></li>
          <li><Link href="#features">Why Us</Link></li>
          <li><Link href="#community">Community</Link></li>
          <li><Link href="#gallery">Insights</Link></li>
          <li><Link href="#pricing">Pricing</Link></li>
          
          {session ? (
            <li><Link href="/dashboard" className="nav-cta">Dashboard</Link></li>
          ) : (
            <>
              <li><Link href="/auth/login">Login</Link></li>
              <li><Link href="/auth/register" className="nav-cta">Join Now</Link></li>
            </>
          )}
        </ul>
        <div 
          className={`mobile-menu-btn ${isMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>
    </header>
  );
} 