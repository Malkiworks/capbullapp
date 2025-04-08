'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import DashboardNavigation from '../../components/DashboardNavigation';
import { useServiceWorker } from '../../hooks/useServiceWorker';
import PremiumCountdown from '../../components/PremiumCountdown';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { pushSupported, isSubscribed, subscribeToPush, unsubscribeFromPush } = useServiceWorker();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');
  
  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formMessage, setFormMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);
  
  // Notifications settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router]);
  
  useEffect(() => {
    if (session) {
      // Initialize form with user data
      setName(session.user.name || '');
      setEmail(session.user.email || '');
      setPushNotifications(isSubscribed);
      setLoading(false);
    }
  }, [session, isSubscribed]);
  
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // This would be an API call in a real app
    setFormMessage({
      type: 'success',
      text: 'Profile updated successfully!'
    });
    
    // Clear message after 3 seconds
    setTimeout(() => {
      setFormMessage(null);
    }, 3000);
  };
  
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setFormMessage({
        type: 'error',
        text: 'New passwords do not match'
      });
      return;
    }
    
    // This would be an API call in a real app
    setFormMessage({
      type: 'success',
      text: 'Password updated successfully!'
    });
    
    // Clear form
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    
    // Clear message after 3 seconds
    setTimeout(() => {
      setFormMessage(null);
    }, 3000);
  };
  
  const handleNotificationSettingsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // This would be an API call in a real app
    setFormMessage({
      type: 'success',
      text: 'Notification preferences updated!'
    });
    
    // Clear message after 3 seconds
    setTimeout(() => {
      setFormMessage(null);
    }, 3000);
  };
  
  const togglePushNotifications = async () => {
    try {
      if (isSubscribed) {
        await unsubscribeFromPush();
        setPushNotifications(false);
      } else {
        await subscribeToPush();
        setPushNotifications(true);
      }
    } catch (error) {
      console.error('Error toggling push notifications:', error);
      setFormMessage({
        type: 'error',
        text: 'Failed to update push notification settings'
      });
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
  
  return (
    <div className="dashboard-layout">
      <DashboardNavigation />
      
      <main className="dashboard-content">
        <div className="container">
          <div className="page-header">
            <h1>Profile Settings</h1>
            <p>Manage your account, notification preferences, and membership details</p>
          </div>
          
          <div className="profile-container">
            {/* Sidebar */}
            <div className="profile-sidebar">
              <div className="profile-card">
                <div className="profile-avatar">
                  <i className="fas fa-user"></i>
                </div>
                <div className="profile-info">
                  <h3>{session.user.name}</h3>
                  <p>{session.user.email}</p>
                  <div className={`membership-badge ${session.user.membershipTier === 'Platinum Member' ? 'platinum-badge' : session.user.membershipTier === 'Elite Member' ? 'elite-badge' : ''}`}>
                    <i className={session.user.membershipTier === 'Platinum Member' ? 'fas fa-gem' : 'fas fa-award'}></i>
                    <span>{session.user.membershipTier}</span>
                  </div>
                  {(session.user.membershipTier === 'Premium 24h Member' || 
                    session.user.membershipTier === 'Premium 7d Member') && (
                    <PremiumCountdown />
                  )}
                </div>
              </div>
              
              <nav className="profile-nav">
                <button 
                  className={`profile-nav-item ${activeTab === 'profile' ? 'active' : ''}`}
                  onClick={() => setActiveTab('profile')}
                >
                  <i className="fas fa-user-edit"></i>
                  <span>Edit Profile</span>
                </button>
                <button 
                  className={`profile-nav-item ${activeTab === 'password' ? 'active' : ''}`}
                  onClick={() => setActiveTab('password')}
                >
                  <i className="fas fa-lock"></i>
                  <span>Change Password</span>
                </button>
                <button 
                  className={`profile-nav-item ${activeTab === 'notifications' ? 'active' : ''}`}
                  onClick={() => setActiveTab('notifications')}
                >
                  <i className="fas fa-bell"></i>
                  <span>Notifications</span>
                </button>
                <button 
                  className={`profile-nav-item ${activeTab === 'membership' ? 'active' : ''}`}
                  onClick={() => setActiveTab('membership')}
                >
                  <i className="fas fa-id-card"></i>
                  <span>Membership</span>
                </button>
              </nav>
            </div>
            
            {/* Content */}
            <div className="profile-content">
              {formMessage && (
                <div className={`form-message ${formMessage.type === 'success' ? 'success' : 'error'}`}>
                  <i className={`fas ${formMessage.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}`}></i>
                  <p>{formMessage.text}</p>
                </div>
              )}
              
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="settings-panel">
                  <h2>Edit Profile</h2>
                  <form onSubmit={handleProfileSubmit} className="settings-form">
                    <div className="form-group">
                      <label htmlFor="name">Full Name</label>
                      <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="email">Email Address</label>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your email address"
                        required
                      />
                    </div>
                    
                    <button type="submit" className="cta-button primary">
                      Save Changes
                    </button>
                  </form>
                </div>
              )}
              
              {/* Password Tab */}
              {activeTab === 'password' && (
                <div className="settings-panel">
                  <h2>Change Password</h2>
                  <form onSubmit={handlePasswordSubmit} className="settings-form">
                    <div className="form-group">
                      <label htmlFor="currentPassword">Current Password</label>
                      <input
                        id="currentPassword"
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Enter your current password"
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="newPassword">New Password</label>
                      <input
                        id="newPassword"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new password"
                        required
                        minLength={6}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="confirmPassword">Confirm New Password</label>
                      <input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm new password"
                        required
                        minLength={6}
                      />
                    </div>
                    
                    <button type="submit" className="cta-button primary">
                      Update Password
                    </button>
                  </form>
                </div>
              )}
              
              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div className="settings-panel">
                  <h2>Notification Preferences</h2>
                  <form onSubmit={handleNotificationSettingsSubmit} className="settings-form">
                    <div className="toggle-group">
                      <label>Email Notifications</label>
                      <div className="toggle-description">
                        <p>Receive email updates for new content, livestreams, and important announcements</p>
                        <div className="toggle-switch">
                          <input
                            type="checkbox"
                            id="emailToggle"
                            checked={emailNotifications}
                            onChange={() => setEmailNotifications(!emailNotifications)}
                          />
                          <label htmlFor="emailToggle"></label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="toggle-group">
                      <label>Push Notifications</label>
                      <div className="toggle-description">
                        <p>Receive browser notifications for live streams and important alerts</p>
                        <div className="toggle-switch">
                          <input
                            type="checkbox"
                            id="pushToggle"
                            checked={pushNotifications}
                            onChange={togglePushNotifications}
                            disabled={!pushSupported}
                          />
                          <label htmlFor="pushToggle"></label>
                        </div>
                      </div>
                      {!pushSupported && (
                        <p className="note">Push notifications are not supported by your browser.</p>
                      )}
                    </div>
                    
                    <button type="submit" className="cta-button primary">
                      Save Preferences
                    </button>
                  </form>
                </div>
              )}
              
              {/* Membership Tab */}
              {activeTab === 'membership' && (
                <div className="settings-panel">
                  <h2>Membership Details</h2>
                  
                  <div className="membership-details">
                    <div className="detail-item">
                      <div className="detail-label">Current Plan</div>
                      <div className="detail-value">{session.user.membershipTier}</div>
                    </div>
                    
                    <div className="detail-item">
                      <div className="detail-label">Member Since</div>
                      <div className="detail-value">January 15, 2023</div>
                    </div>
                    
                    <div className="detail-item">
                      <div className="detail-label">Status</div>
                      <div className="detail-value active-status">
                        <span className="status-dot"></span> Active
                      </div>
                    </div>
                    
                    <div className="upgrade-options">
                      <h3>Upgrade Your Membership</h3>
                      <p>Get more exclusive content, priority support, and advanced features</p>
                      
                      <div className="plan-options">
                        <div className={`plan-card ${session.user.membershipTier === 'Standard Member' ? 'current' : ''}`}>
                          <div className="plan-header">
                            <h4>Standard</h4>
                            <div className="plan-price">
                              <span className="amount">$29</span>
                              <span className="period">/month</span>
                            </div>
                          </div>
                          <ul className="plan-features">
                            <li><i className="fas fa-check"></i> Basic content access</li>
                            <li><i className="fas fa-check"></i> Standard support</li>
                            <li><i className="fas fa-check"></i> Community access</li>
                          </ul>
                          {session.user.membershipTier === 'Standard Member' ? (
                            <button className="cta-button secondary" disabled>Current Plan</button>
                          ) : (
                            <button className="cta-button secondary">Downgrade</button>
                          )}
                        </div>
                        
                        <div className={`plan-card ${session.user.membershipTier === 'Elite Member' ? 'current' : ''}`}>
                          <div className="plan-header">
                            <h4>Elite</h4>
                            <div className="plan-price">
                              <span className="amount">$49</span>
                              <span className="period">/month</span>
                            </div>
                          </div>
                          <ul className="plan-features">
                            <li><i className="fas fa-check"></i> Premium content access</li>
                            <li><i className="fas fa-check"></i> Priority support</li>
                            <li><i className="fas fa-check"></i> Live trading sessions</li>
                            <li><i className="fas fa-check"></i> Weekly analysis reports</li>
                          </ul>
                          {session.user.membershipTier === 'Elite Member' ? (
                            <button className="cta-button secondary" disabled>Current Plan</button>
                          ) : session.user.membershipTier === 'Platinum Member' ? (
                            <button className="cta-button secondary">Downgrade</button>
                          ) : (
                            <button className="cta-button primary">Upgrade</button>
                          )}
                        </div>
                        
                        <div className={`plan-card ${session.user.membershipTier === 'Platinum Member' ? 'current' : ''}`}>
                          <div className="plan-header platinum">
                            <h4>Platinum</h4>
                            <div className="plan-price">
                              <span className="amount">$99</span>
                              <span className="period">/month</span>
                            </div>
                          </div>
                          <ul className="plan-features">
                            <li><i className="fas fa-check"></i> All Elite features</li>
                            <li><i className="fas fa-check"></i> 1-on-1 mentoring</li>
                            <li><i className="fas fa-check"></i> Exclusive advanced strategies</li>
                            <li><i className="fas fa-check"></i> Direct trader support</li>
                            <li><i className="fas fa-check"></i> VIP trading group access</li>
                          </ul>
                          {session.user.membershipTier === 'Platinum Member' ? (
                            <button className="cta-button secondary" disabled>Current Plan</button>
                          ) : (
                            <button className="cta-button primary">Upgrade</button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 