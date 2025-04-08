import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/db';
import LiveStream from '../../../models/LiveStream';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';

// Get all livestreams (with membership tier filtering)
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const url = new URL(req.url);
    const isActive = url.searchParams.get('active') === 'true';
    const isLive = url.searchParams.get('live') === 'true';
    
    await connectToDatabase();

    const query: any = {};
    
    // Filter by active status if specified
    if (isActive !== undefined) {
      query.isActive = isActive;
    }
    
    // Filter by live status if specified
    if (isLive !== undefined) {
      query.isLive = isLive;
    }
    
    // Filter by membership tier access
    const userMembershipTier = session.user.membershipTier;
    
    // This assumes membership tiers have a hierarchy like:
    // STANDARD < ELITE < PLATINUM
    // Adjust this logic based on your actual tier structure
    let accessibleTiers;
    
    switch (userMembershipTier) {
      case 'Platinum Member':
        accessibleTiers = ['Standard Member', 'Elite Member', 'Platinum Member'];
        break;
      case 'Elite Member':
        accessibleTiers = ['Standard Member', 'Elite Member'];
        break;
      default:
        accessibleTiers = ['Standard Member'];
    }
    
    query.requiredMembershipTier = { $in: accessibleTiers };
    
    const livestreams = await LiveStream.find(query)
      .sort({ scheduledStartTime: -1 })
      .limit(20);
    
    return NextResponse.json(livestreams);
  } catch (error: any) {
    console.error('Error fetching livestreams:', error);
    return NextResponse.json(
      { error: error.message || 'Error fetching livestreams' },
      { status: 500 }
    );
  }
}

// Create a new livestream (admin only)
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // For now, we'll assume only certain tiers can create livestreams
    // In a real app, you'd have a proper admin/role check
    if (session.user.membershipTier !== 'Platinum Member') {
      return NextResponse.json(
        { error: 'Unauthorized: Insufficient permissions' },
        { status: 403 }
      );
    }

    const {
      title,
      description,
      streamUrl,
      thumbnailUrl,
      scheduledStartTime,
      scheduledEndTime,
      requiredMembershipTier,
    } = await req.json();

    // Validate required fields
    if (!title || !description || !streamUrl || !scheduledStartTime) {
      return NextResponse.json(
        { error: 'Required fields are missing' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const newLiveStream = new LiveStream({
      title,
      description,
      streamUrl,
      thumbnailUrl,
      scheduledStartTime: new Date(scheduledStartTime),
      scheduledEndTime: scheduledEndTime ? new Date(scheduledEndTime) : undefined,
      requiredMembershipTier,
      createdBy: session.user.id,
    });

    await newLiveStream.save();

    return NextResponse.json(
      {
        message: 'Livestream created successfully',
        livestream: newLiveStream,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating livestream:', error);
    return NextResponse.json(
      { error: error.message || 'Error creating livestream' },
      { status: 500 }
    );
  }
} 