import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/db';
import User, { UserRole } from '../../../models/User';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';

// Get all users (admin only)
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    // Check if user is authenticated and is an admin
    if (!session?.user || session.user.role !== UserRole.ADMIN) {
      return NextResponse.json(
        { error: 'Unauthorized: Admin access required' },
        { status: 403 }
      );
    }

    await connectToDatabase();

    // Get pagination parameters
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const search = searchParams.get('search') || '';

    // Calculate skip value for pagination
    const skip = (page - 1) * limit;

    // Build query for search
    const query: any = {};
    if (search) {
      query.$or = [
        { username: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    // Get total count for pagination
    const totalUsers = await User.countDocuments(query);

    // Fetch users with pagination
    const users = await User.find(query)
      .select('_id username email membershipTier role premiumAccessStart premiumAccessExpiry joinedDate lastLogin isActive')
      .sort({ joinedDate: -1 })
      .skip(skip)
      .limit(limit);

    return NextResponse.json({
      users,
      pagination: {
        total: totalUsers,
        page,
        limit,
        pages: Math.ceil(totalUsers / limit),
      },
    });
  } catch (error: any) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: error.message || 'Error fetching users' },
      { status: 500 }
    );
  }
} 