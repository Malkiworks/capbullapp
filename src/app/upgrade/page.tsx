'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import DashboardNavigation from '../../components/DashboardNavigation';

export default function UpgradePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="dashboard-layout">
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
        </div>
      </div>
    );
  }

  if (!session) {
    return null; // Will redirect through useEffect
  }

  return (
    <div className="dashboard-layout">
      <DashboardNavigation />
      
      <main className="dashboard-content">
        <div className="container">
          <div className="page-header">
            <h1>Upgrade Your Membership</h1>
            <p>Get access to exclusive content and livestreams with our premium membership options</p>
          </div>
          
          <div className="premium-options">
            <div className="premium-option">
              <div className="premium-header">
                <h3>24 Hour Access</h3>
                <div className="premium-badge">
                  <i className="fas fa-clock"></i>
                  <span>Premium 24h</span>
                </div>
              </div>
              
              <div className="premium-features">
                <ul>
                  <li>
                    <i className="fas fa-check"></i>
                    <span>Access all livestreams for 24 hours</span>
                  </li>
                  <li>
                    <i className="fas fa-check"></i>
                    <span>View premium content for 24 hours</span>
                  </li>
                  <li>
                    <i className="fas fa-check"></i>
                    <span>Download trading resources</span>
                  </li>
                </ul>
              </div>
              
              <div className="premium-action">
                <p className="premium-contact">
                  Contact an admin in the Discord to get access:
                </p>
                <a 
                  href={process.env.NEXT_PUBLIC_DISCORD_URL || 'https://discord.gg/KqyjCFGMwV'} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="premium-discord-btn"
                >
                  <i className="fab fa-discord"></i> Join Discord
                </a>
              </div>
            </div>
            
            <div className="premium-option featured">
              <div className="premium-header">
                <h3>7 Day Access</h3>
                <div className="premium-badge">
                  <i className="fas fa-calendar-week"></i>
                  <span>Premium 7d</span>
                </div>
              </div>
              
              <div className="premium-features">
                <ul>
                  <li>
                    <i className="fas fa-check"></i>
                    <span>Access all livestreams for 7 days</span>
                  </li>
                  <li>
                    <i className="fas fa-check"></i>
                    <span>View premium content for 7 days</span>
                  </li>
                  <li>
                    <i className="fas fa-check"></i>
                    <span>Download trading resources</span>
                  </li>
                  <li>
                    <i className="fas fa-check"></i>
                    <span>Priority chat access during livestreams</span>
                  </li>
                </ul>
              </div>
              
              <div className="premium-action">
                <p className="premium-contact">
                  Contact an admin in the Discord to get access:
                </p>
                <a 
                  href={process.env.NEXT_PUBLIC_DISCORD_URL || 'https://discord.gg/KqyjCFGMwV'} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="premium-discord-btn"
                >
                  <i className="fab fa-discord"></i> Join Discord
                </a>
              </div>
            </div>
          </div>
          
          <div className="upgrade-note">
            <p>
              <i className="fas fa-info-circle"></i>
              Premium access is currently managed by our admins. Join our Discord server and 
              contact an admin to get access to premium features.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
} 