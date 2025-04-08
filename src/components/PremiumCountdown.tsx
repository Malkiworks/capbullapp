'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

export default function PremiumCountdown() {
  const { data: session } = useSession();
  const [timeRemaining, setTimeRemaining] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is premium
    const isPremium = 
      session?.user?.membershipTier === 'Premium 24h Member' || 
      session?.user?.membershipTier === 'Premium 7d Member';
    
    if (!isPremium || !session?.user?.premiumAccessExpiry) {
      setLoading(false);
      return;
    }

    const fetchAccessInfo = async () => {
      try {
        const res = await fetch('/api/users/me/access');
        if (res.ok) {
          const data = await res.json();
          setTimeRemaining(data.timeRemaining);
        }
      } catch (error) {
        console.error('Error fetching access info:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAccessInfo();

    // Update countdown every minute
    const intervalId = setInterval(() => {
      if (!session.user.premiumAccessExpiry) return;
      
      const expiryDate = new Date(session.user.premiumAccessExpiry.toString());
      const now = new Date();
      
      if (now >= expiryDate) {
        setTimeRemaining('Expired');
        clearInterval(intervalId);
        return;
      }
      
      const remainingMs = expiryDate.getTime() - now.getTime();
      const remainingHours = Math.floor(remainingMs / (1000 * 60 * 60));
      const remainingMinutes = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60));
      
      if (remainingHours >= 24) {
        const days = Math.floor(remainingHours / 24);
        const hours = remainingHours % 24;
        setTimeRemaining(`${days} days, ${hours} hours`);
      } else {
        setTimeRemaining(`${remainingHours} hours, ${remainingMinutes} minutes`);
      }
    }, 60000); // Update every minute
    
    // Initial calculation
    if (session.user.premiumAccessExpiry) {
      const expiryDate = new Date(session.user.premiumAccessExpiry.toString());
      const now = new Date();
      
      if (now >= expiryDate) {
        setTimeRemaining('Expired');
      } else {
        const remainingMs = expiryDate.getTime() - now.getTime();
        const remainingHours = Math.floor(remainingMs / (1000 * 60 * 60));
        const remainingMinutes = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60));
        
        if (remainingHours >= 24) {
          const days = Math.floor(remainingHours / 24);
          const hours = remainingHours % 24;
          setTimeRemaining(`${days} days, ${hours} hours`);
        } else {
          setTimeRemaining(`${remainingHours} hours, ${remainingMinutes} minutes`);
        }
      }
    }
    
    return () => clearInterval(intervalId);
  }, [session]);

  if (loading || !timeRemaining) {
    return null;
  }

  return (
    <div className="premium-countdown">
      <i className="fas fa-hourglass-half"></i>
      <span>Premium expires in: {timeRemaining}</span>
    </div>
  );
} 