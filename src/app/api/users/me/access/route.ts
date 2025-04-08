import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../../lib/db';
import User, { MembershipTier } from '../../../../../models/User';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../../lib/auth';

// Get current user's access info
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    await connectToDatabase();

    const user = await User.findById(session.user.id);
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Check if premium access has expired
    const now = new Date();
    let accessValid = true;
    let timeRemaining = null;

    // Calculate remaining time for premium tiers
    if (
      (user.membershipTier === MembershipTier.PREMIUM_24H || 
      user.membershipTier === MembershipTier.PREMIUM_7D) && 
      user.premiumAccessExpiry
    ) {
      const expiryDate = new Date(user.premiumAccessExpiry);
      
      if (now > expiryDate) {
        // Access has expired, update user to standard
        user.membershipTier = MembershipTier.STANDARD;
        user.premiumAccessStart = null;
        user.premiumAccessExpiry = null;
        await user.save();
        accessValid = false;
      } else {
        // Calculate time remaining in milliseconds
        const remainingMs = expiryDate.getTime() - now.getTime();
        
        // Convert to hours and minutes
        const remainingHours = Math.floor(remainingMs / (1000 * 60 * 60));
        const remainingMinutes = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60));
        
        // Format remaining time
        if (remainingHours >= 24) {
          const days = Math.floor(remainingHours / 24);
          const hours = remainingHours % 24;
          timeRemaining = `${days} days, ${hours} hours`;
        } else {
          timeRemaining = `${remainingHours} hours, ${remainingMinutes} minutes`;
        }
      }
    }

    return NextResponse.json({
      membershipTier: user.membershipTier,
      accessValid,
      premiumAccessStart: user.premiumAccessStart,
      premiumAccessExpiry: user.premiumAccessExpiry,
      timeRemaining,
    });
  } catch (error: any) {
    console.error('Error fetching user access:', error);
    return NextResponse.json(
      { error: error.message || 'Error fetching user access' },
      { status: 500 }
    );
  }
} 