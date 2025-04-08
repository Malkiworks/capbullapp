'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';

export default function DashboardNavigation() {
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  
  const isActivePath = (path: string) => {
    return pathname?.startsWith(path);
  };

  return (
    <nav className="dashboard-nav">
      <div className="container">
        <div className="dashboard-nav-content">
          <div className="nav-logo">
            <Link href="/">
              <Image 
                src="/images/logo.png" 
                alt="CapitalBulls Logo" 
                width={120} 
                height={40} 
                style={{ objectFit: 'contain' }}
                priority
              />
            </Link>
          </div>
          
          <ul className="nav-links">
            <li>
              <Link 
                href="/dashboard"
                className={isActivePath('/dashboard') && !pathname?.includes('/dashboard/') ? 'active' : ''}
              >
                Dashboard
              </Link>
            </li>
            {session?.user.role === 'admin' && (
              <li>
                <Link 
                  href="/admin"
                  className={isActivePath('/admin') ? 'active' : ''}
                >
                  Admin
                </Link>
              </li>
            )}
            <li>
              <Link 
                href="/livestreams"
                className={isActivePath('/livestreams') ? 'active' : ''}
              >
                Live Streams
              </Link>
            </li>
            <li>
              <Link 
                href="/content"
                className={isActivePath('/content') ? 'active' : ''}
              >
                Exclusive Content
              </Link>
            </li>
            <li>
              <a 
                href={process.env.NEXT_PUBLIC_DISCORD_URL || 'https://discord.gg/KqyjCFGMwV'} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Discord
              </a>
            </li>
          </ul>
          
          <div className="user-nav">
            {session && (
              <>
                <Link href="/profile" className="user-profile">
                  <div className="user-avatar">
                    <i className="fas fa-user"></i>
                  </div>
                  <span className="user-name">{session.user.name}</span>
                </Link>
                
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="logout-button"
                >
                  Sign Out
                </button>
              </>
            )}
          </div>
          
          <button 
            className="mobile-menu-toggle" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <i className={`fas fa-${mobileMenuOpen ? 'times' : 'bars'}`}></i>
          </button>
        </div>
        
        {/* Mobile Menu */}
        <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
          <ul className="nav-links">
            <li>
              <Link 
                href="/dashboard"
                className={isActivePath('/dashboard') && !pathname?.includes('/dashboard/') ? 'active' : ''}
              >
                Dashboard
              </Link>
            </li>
            {session?.user.role === 'admin' && (
              <li>
                <Link 
                  href="/admin"
                  className={isActivePath('/admin') ? 'active' : ''}
                >
                  Admin
                </Link>
              </li>
            )}
            <li>
              <Link 
                href="/livestreams"
                className={isActivePath('/livestreams') ? 'active' : ''}
              >
                Live Streams
              </Link>
            </li>
            <li>
              <Link 
                href="/content"
                className={isActivePath('/content') ? 'active' : ''}
              >
                Exclusive Content
              </Link>
            </li>
            <li>
              <a 
                href={process.env.NEXT_PUBLIC_DISCORD_URL || 'https://discord.gg/KqyjCFGMwV'} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Discord
              </a>
            </li>
            <li>
              <Link 
                href="/profile"
                className={isActivePath('/profile') ? 'active' : ''}
              >
                Profile
              </Link>
            </li>
            {session && (
              <li>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="logout-button"
                >
                  Sign Out
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
} 