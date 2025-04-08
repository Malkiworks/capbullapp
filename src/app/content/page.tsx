'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import DashboardNavigation from '../../components/DashboardNavigation';

interface ContentItem {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'pdf' | 'article' | 'analysis';
  thumbnail: string;
  date: string;
  featured?: boolean;
  author: string;
}

export default function ContentPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [content, setContent] = useState<ContentItem[]>([]);
  const [featuredContent, setFeaturedContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router]);
  
  useEffect(() => {
    if (session) {
      // In a real app, you'd fetch this from your API
      const dummyContent: ContentItem[] = [
        {
          id: 'content-001',
          title: 'Advanced Price Action Strategies',
          description: 'Learn how to read and trade based on price action with these advanced strategies.',
          type: 'video',
          thumbnail: '/images/test1.jpg',
          date: '2023-03-28',
          featured: true,
          author: 'Jonathan Smith'
        },
        {
          id: 'content-002',
          title: 'Weekly Market Analysis Report',
          description: 'Comprehensive analysis of market trends for major currency pairs.',
          type: 'pdf',
          thumbnail: '/images/test2.jpg',
          date: '2023-04-01',
          featured: true,
          author: 'Michael Johnson'
        },
        {
          id: 'content-003',
          title: 'Mastering Risk Management',
          description: 'Essential risk management techniques to protect your trading capital.',
          type: 'article',
          thumbnail: '/images/test3.jpg',
          date: '2023-03-25',
          author: 'Sarah Williams'
        },
        {
          id: 'content-004',
          title: 'Trading Psychology: Overcoming Emotional Trading',
          description: 'Strategies to maintain discipline and overcome emotional decision making in trading.',
          type: 'video',
          thumbnail: '/images/test4.jpg',
          date: '2023-03-22',
          author: 'David Thompson'
        },
        {
          id: 'content-005',
          title: 'EURUSD Technical Analysis',
          description: 'Detailed technical analysis and trading opportunities for EURUSD.',
          type: 'analysis',
          thumbnail: '/images/test5.jpg',
          date: '2023-03-31',
          author: 'Alex Rodriguez'
        },
        {
          id: 'content-006',
          title: 'Introduction to Fibonacci Retracement',
          description: 'How to effectively use Fibonacci retracement levels in your trading.',
          type: 'article',
          thumbnail: '/images/other1.jpg',
          date: '2023-03-18',
          author: 'Jonathan Smith'
        },
        {
          id: 'content-007',
          title: 'Gold Trading Opportunities',
          description: 'Analysis of current gold market conditions and potential trading setups.',
          type: 'analysis',
          thumbnail: '/images/other2.jpg',
          date: '2023-03-29',
          author: 'Michael Johnson'
        },
        {
          id: 'content-008',
          title: 'Candlestick Patterns Masterclass',
          description: 'Learn to identify and trade high-probability candlestick patterns.',
          type: 'video',
          thumbnail: '/images/other3.jpg',
          date: '2023-03-15',
          author: 'Sarah Williams'
        }
      ];
      
      setContent(dummyContent);
      setFeaturedContent(dummyContent.filter(item => item.featured));
      setLoading(false);
    }
  }, [session]);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };
  
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <i className="fas fa-play-circle"></i>;
      case 'pdf':
        return <i className="fas fa-file-pdf"></i>;
      case 'article':
        return <i className="fas fa-newspaper"></i>;
      case 'analysis':
        return <i className="fas fa-chart-line"></i>;
      default:
        return <i className="fas fa-file"></i>;
    }
  };
  
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video':
        return 'type-video';
      case 'pdf':
        return 'type-pdf';
      case 'article':
        return 'type-article';
      case 'analysis':
        return 'type-analysis';
      default:
        return '';
    }
  };
  
  const filterContent = (content: ContentItem[]) => {
    if (activeFilter === 'all') return content;
    return content.filter(item => item.type === activeFilter);
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
            <h1>Exclusive Content</h1>
            <p>Access premium trading education, analysis, and resources</p>
          </div>
          
          {/* Featured Content */}
          {featuredContent.length > 0 && (
            <div className="content-section">
              <div className="section-header">
                <h2>Featured Content</h2>
              </div>
              
              <div className="featured-content">
                {featuredContent.map(item => (
                  <Link href={`/content/${item.id}`} key={item.id} className="featured-card">
                    <div className="featured-thumbnail">
                      <Image 
                        src={item.thumbnail} 
                        alt={item.title} 
                        width={600} 
                        height={350}
                        style={{
                          objectFit: 'cover',
                          width: '100%',
                          height: '100%'
                        }}
                      />
                      <div className={`content-type ${getTypeColor(item.type)}`}>
                        {getTypeIcon(item.type)}
                        <span>{item.type}</span>
                      </div>
                    </div>
                    <div className="featured-info">
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                      <div className="content-meta">
                        <div className="content-author">
                          <i className="fas fa-user"></i> {item.author}
                        </div>
                        <div className="content-date">
                          <i className="far fa-calendar-alt"></i> {formatDate(item.date)}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
          
          {/* Content Filters */}
          <div className="content-filters">
            <button 
              className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'video' ? 'active' : ''}`}
              onClick={() => setActiveFilter('video')}
            >
              <i className="fas fa-play-circle"></i> Videos
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'pdf' ? 'active' : ''}`}
              onClick={() => setActiveFilter('pdf')}
            >
              <i className="fas fa-file-pdf"></i> PDFs
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'article' ? 'active' : ''}`}
              onClick={() => setActiveFilter('article')}
            >
              <i className="fas fa-newspaper"></i> Articles
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'analysis' ? 'active' : ''}`}
              onClick={() => setActiveFilter('analysis')}
            >
              <i className="fas fa-chart-line"></i> Analysis
            </button>
          </div>
          
          {/* Content Library */}
          <div className="content-section">
            <div className="section-header">
              <h2>Content Library</h2>
            </div>
            
            <div className="content-grid">
              {filterContent(content).map(item => (
                <Link href={`/content/${item.id}`} key={item.id} className="content-card">
                  <div className="content-thumbnail">
                    <Image 
                      src={item.thumbnail} 
                      alt={item.title} 
                      width={400} 
                      height={225}
                      style={{
                        objectFit: 'cover',
                        width: '100%',
                        height: '100%'
                      }}
                    />
                    <div className={`content-type ${getTypeColor(item.type)}`}>
                      {getTypeIcon(item.type)}
                      <span>{item.type}</span>
                    </div>
                  </div>
                  <div className="content-info">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <div className="content-meta">
                      <div className="content-author">
                        <i className="fas fa-user"></i> {item.author}
                      </div>
                      <div className="content-date">
                        <i className="far fa-calendar-alt"></i> {formatDate(item.date)}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
            {filterContent(content).length === 0 && (
              <div className="empty-state">
                <div className="empty-icon">
                  <i className="fas fa-search"></i>
                </div>
                <h3>No Content Found</h3>
                <p>No content matches your selected filter. Try a different filter or check back later.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
} 