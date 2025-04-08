'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import DashboardNavigation from '../../components/DashboardNavigation';
import Image from 'next/image';

interface LiveStream {
  id: string;
  title: string;
  status: 'live' | 'upcoming' | 'ended';
  instructor: string;
  thumbnail: string;
  viewers: number;
  scheduledTime?: string;
  description: string;
}

export default function LiveStreamsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [liveStreams, setLiveStreams] = useState<LiveStream[]>([]);
  const [upcomingStreams, setUpcomingStreams] = useState<LiveStream[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (session) {
      // In a real app, you'd fetch this data from your API
      setLiveStreams([
        {
          id: 'ls-001',
          title: 'Live Trading Session: EURUSD Analysis',
          status: 'live',
          instructor: 'Jonathan Smith',
          thumbnail: '/images/test1.jpg',
          viewers: 243,
          description: 'Live analysis and trading on EURUSD pair with real-time market commentary.'
        },
        {
          id: 'ls-002',
          title: 'Platinum Members: Market Open Strategy',
          status: 'live',
          instructor: 'Michael Johnson',
          thumbnail: '/images/test2.jpg',
          viewers: 186,
          description: 'Exclusive session for Platinum members focusing on market open strategies.'
        }
      ]);
      
      setUpcomingStreams([
        {
          id: 'ls-003',
          title: 'Weekly Market Analysis & Forecasting',
          status: 'upcoming',
          instructor: 'Sarah Williams',
          thumbnail: '/images/test3.jpg',
          viewers: 0,
          scheduledTime: '2023-04-15T18:00:00Z',
          description: 'Comprehensive analysis of market trends and forecasts for the upcoming week.'
        },
        {
          id: 'ls-004',
          title: 'Risk Management Masterclass',
          status: 'upcoming',
          instructor: 'David Thompson',
          thumbnail: '/images/test4.jpg',
          viewers: 0,
          scheduledTime: '2023-04-16T16:30:00Z',
          description: 'Learn advanced risk management strategies to protect your trading capital.'
        },
        {
          id: 'ls-005',
          title: 'Breakout Trading Strategies',
          status: 'upcoming',
          instructor: 'Alex Rodriguez',
          thumbnail: '/images/test5.jpg',
          viewers: 0,
          scheduledTime: '2023-04-17T15:00:00Z',
          description: 'Identifying and trading breakout patterns for consistent profits.'
        }
      ]);
      
      setLoading(false);
    }
  }, [session]);

  const formatScheduledTime = (isoDate: string) => {
    const date = new Date(isoDate);
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date);
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

  return (
    <div className="dashboard-layout">
      <DashboardNavigation />
      
      <main className="dashboard-content">
        <div className="container">
          <div className="page-header">
            <h1>Live Streams</h1>
            <p>Access exclusive live trading sessions and educational content</p>
          </div>
          
          {/* Live Now Section */}
          {liveStreams.length > 0 && (
            <div className="content-section">
              <div className="section-header">
                <h2>Live Now</h2>
                <div className="live-indicator">
                  <span className="pulse"></span>
                  <span>Streaming</span>
                </div>
              </div>
              
              <div className="streams-grid">
                {liveStreams.map((stream) => (
                  <div key={stream.id} className="stream-card live">
                    <div className="stream-thumbnail">
                      <Image 
                        src={stream.thumbnail} 
                        alt={stream.title} 
                        width={400} 
                        height={225} 
                        style={{
                          objectFit: 'cover',
                          width: '100%',
                          height: '100%'
                        }} 
                      />
                      <div className="live-badge">LIVE</div>
                      <div className="viewers-count">
                        <i className="fas fa-eye"></i> {stream.viewers}
                      </div>
                    </div>
                    
                    <div className="stream-info">
                      <h3>{stream.title}</h3>
                      <p>{stream.description}</p>
                      <div className="stream-meta">
                        <div className="instructor">
                          <i className="fas fa-user-tie"></i> {stream.instructor}
                        </div>
                      </div>
                      <button className="cta-button primary full-width">
                        Join Stream
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Upcoming Streams Section */}
          {upcomingStreams.length > 0 && (
            <div className="content-section">
              <div className="section-header">
                <h2>Upcoming Streams</h2>
              </div>
              
              <div className="streams-grid">
                {upcomingStreams.map((stream) => (
                  <div key={stream.id} className="stream-card upcoming">
                    <div className="stream-thumbnail">
                      <Image 
                        src={stream.thumbnail} 
                        alt={stream.title} 
                        width={400} 
                        height={225} 
                        style={{
                          objectFit: 'cover',
                          width: '100%',
                          height: '100%'
                        }} 
                      />
                      <div className="upcoming-badge">UPCOMING</div>
                    </div>
                    
                    <div className="stream-info">
                      <h3>{stream.title}</h3>
                      <p>{stream.description}</p>
                      <div className="stream-meta">
                        <div className="instructor">
                          <i className="fas fa-user-tie"></i> {stream.instructor}
                        </div>
                        {stream.scheduledTime && (
                          <div className="schedule-time">
                            <i className="far fa-clock"></i> {formatScheduledTime(stream.scheduledTime)}
                          </div>
                        )}
                      </div>
                      <button className="cta-button secondary full-width">
                        Set Reminder
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {liveStreams.length === 0 && upcomingStreams.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">
                <i className="fas fa-video-slash"></i>
              </div>
              <h3>No Streams Available</h3>
              <p>There are no live or upcoming streams at the moment. Check back later or subscribe to notifications.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 