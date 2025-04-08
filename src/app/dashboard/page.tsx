'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import DashboardNavigation from '../../components/DashboardNavigation';
import { useServiceWorker } from '../../hooks/useServiceWorker';
import PremiumCountdown from '../../components/PremiumCountdown';

interface DashboardStatItem {
  label: string;
  value: string | number;
  icon: React.ReactNode;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { pushSupported, isSubscribed, subscribeToPush } = useServiceWorker();
  const [stats, setStats] = useState<DashboardStatItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (session) {
      // In a real app, you'd fetch this data from your API
      setStats([
        {
          label: 'Live Streams',
          value: '2 Available',
          icon: <i className="fas fa-video"></i>,
        },
        {
          label: 'Exclusive Content',
          value: '15 Items',
          icon: <i className="fas fa-crown"></i>,
        },
        {
          label: 'Upcoming Events',
          value: '3 Events',
          icon: <i className="fas fa-calendar-alt"></i>,
        },
        {
          label: 'Notifications',
          value: '5 Unread',
          icon: <i className="fas fa-bell"></i>,
        },
      ]);
      setLoading(false);
    }
  }, [session]);

  const handleEnableNotifications = async () => {
    try {
      await subscribeToPush();
      alert('Notifications enabled successfully!');
    } catch (error) {
      console.error('Error enabling notifications:', error);
    }
  };

  if (status === 'loading' || loading) {
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

  const getMembershipBadgeClass = () => {
    switch (session.user.membershipTier) {
      case 'Platinum Member':
        return 'platinum-badge';
      case 'Elite Member':
        return 'elite-badge';
      default:
        return '';
    }
  };

  return (
    <div className="dashboard-layout">
      <DashboardNavigation />
      
      <main className="dashboard-content">
        <div className="container">
          {/* User Welcome Section */}
          <div className="welcome-section">
            <div className="welcome-text">
              <h1>Welcome back, {session.user.name}</h1>
              <p>Here's what's happening with your account today</p>
            </div>
            
            <div className={`membership-badge ${getMembershipBadgeClass()}`}>
              <span>
                <i className={session.user.membershipTier === 'Platinum Member' ? 'fas fa-gem' : 'fas fa-award'}></i>
                {session.user.membershipTier}
              </span>
              {(session.user.membershipTier === 'Premium 24h Member' || 
                session.user.membershipTier === 'Premium 7d Member') && (
                <PremiumCountdown />
              )}
            </div>
          </div>

          {/* Notification Banner */}
          {pushSupported && !isSubscribed && (
            <div className="notification-banner">
              <div className="notification-banner-icon">
                <i className="fas fa-info-circle"></i>
              </div>
              <div className="notification-banner-content">
                <p className="notification-banner-text">
                  Enable browser notifications to get alerts for live streams and new content
                </p>
                <button
                  onClick={handleEnableNotifications}
                  className="notification-banner-action"
                >
                  Enable <i className="fas fa-arrow-right"></i>
                </button>
              </div>
            </div>
          )}

          {/* Stats Section */}
          <div className="stats-grid">
            {stats.map((item, index) => (
              <div key={index} className="stat-card">
                <div className="stat-icon">
                  {item.icon}
                </div>
                <div className="stat-info">
                  <div className="stat-label">{item.label}</div>
                  <div className="stat-value">{item.value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Features Section */}
          <div className="features-grid">
            <Link href="/livestreams" className="feature-card livestreams">
              <div className="feature-icon">
                <i className="fas fa-video"></i>
              </div>
              <h3 className="feature-title">Live Streams</h3>
              <p className="feature-desc">
                Access exclusive live streams from our experts and analysts
              </p>
            </Link>
            
            <Link href="/content" className="feature-card content">
              <div className="feature-icon">
                <i className="fas fa-crown"></i>
              </div>
              <h3 className="feature-title">Exclusive Content</h3>
              <p className="feature-desc">
                Browse premium content including guides, videos, and analysis
              </p>
            </Link>
            
            <Link href="/profile" className="feature-card profile">
              <div className="feature-icon">
                <i className="fas fa-user"></i>
              </div>
              <h3 className="feature-title">Profile & Settings</h3>
              <p className="feature-desc">
                Manage your account, notification preferences, and more
              </p>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
} 