import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../lib/db';
import User, { MembershipTier, UserRole } from '../../../../models/User';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../lib/auth';

// Grant premium access to a user
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    // Check if user is authenticated and is an admin
    if (!session?.user || session.user.role !== UserRole.ADMIN) {
      return NextResponse.json(
        { error: 'Unauthorized: Admin access required' },
        { status: 403 }
      );
    }

    const { userId, accessType, startTime } = await req.json();

    if (!userId || !accessType) {
      return NextResponse.json(
        { error: 'User ID and access type are required' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const now = startTime ? new Date(startTime) : new Date();
    let expiryDate: Date;

    // Set membership tier and calculate expiry based on access type
    switch (accessType) {
      case 'premium_24h':
        user.membershipTier = MembershipTier.PREMIUM_24H;
        expiryDate = new Date(now);
        expiryDate.setHours(expiryDate.getHours() + 24);
        break;
      case 'premium_7d':
        user.membershipTier = MembershipTier.PREMIUM_7D;
        expiryDate = new Date(now);
        expiryDate.setDate(expiryDate.getDate() + 7);
        break;
      default:
        return NextResponse.json(
          { error: 'Invalid access type' },
          { status: 400 }
        );
    }

    user.premiumAccessStart = now;
    user.premiumAccessExpiry = expiryDate;

    await user.save();

    return NextResponse.json({
      message: 'Premium access granted successfully',
      user: {
        id: user._id,
        username: user.username,
        membershipTier: user.membershipTier,
        premiumAccessStart: user.premiumAccessStart,
        premiumAccessExpiry: user.premiumAccessExpiry,
      }
    });
  } catch (error: any) {
    console.error('Error granting premium access:', error);
    return NextResponse.json(
      { error: error.message || 'Error granting premium access' },
      { status: 500 }
    );
  }
}

// Revoke premium access (set back to standard)
export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    // Check if user is authenticated and is an admin
    if (!session?.user || session.user.role !== UserRole.ADMIN) {
      return NextResponse.json(
        { error: 'Unauthorized: Admin access required' },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Revoke premium access
    user.membershipTier = MembershipTier.STANDARD;
    user.premiumAccessStart = null;
    user.premiumAccessExpiry = null;

    await user.save();

    return NextResponse.json({
      message: 'Premium access revoked successfully',
      user: {
        id: user._id,
        username: user.username,
        membershipTier: user.membershipTier,
      }
    });
  } catch (error: any) {
    console.error('Error revoking premium access:', error);
    return NextResponse.json(
      { error: error.message || 'Error revoking premium access' },
      { status: 500 }
    );
  }
} 