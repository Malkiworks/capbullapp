import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/db';
import ExclusiveContent from '../../../models/ExclusiveContent';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';

// Get all exclusive content (with membership tier filtering)
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
    const contentType = url.searchParams.get('type');
    const limit = parseInt(url.searchParams.get('limit') || '10');
    const page = parseInt(url.searchParams.get('page') || '1');
    
    await connectToDatabase();

    const query: any = { isPublished: true };
    
    // Filter by content type if specified
    if (contentType) {
      query.contentType = contentType;
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
    
    const skip = (page - 1) * limit;
    
    const content = await ExclusiveContent.find(query)
      .sort({ publishDate: -1 })
      .skip(skip)
      .limit(limit);
    
    // Get total count for pagination
    const total = await ExclusiveContent.countDocuments(query);
    
    return NextResponse.json({
      content,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error: any) {
    console.error('Error fetching exclusive content:', error);
    return NextResponse.json(
      { error: error.message || 'Error fetching exclusive content' },
      { status: 500 }
    );
  }
}

// Create new exclusive content (admin only)
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // For now, we'll assume only certain tiers can create content
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
      contentType,
      contentUrl,
      thumbnailUrl,
      requiredMembershipTier,
      isPublished,
    } = await req.json();

    // Validate required fields
    if (!title || !description || !contentType || !contentUrl) {
      return NextResponse.json(
        { error: 'Required fields are missing' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const newContent = new ExclusiveContent({
      title,
      description,
      contentType,
      contentUrl,
      thumbnailUrl,
      requiredMembershipTier,
      isPublished: isPublished !== undefined ? isPublished : true,
      createdBy: session.user.id,
      publishDate: new Date(),
    });

    await newContent.save();

    return NextResponse.json(
      {
        message: 'Content created successfully',
        content: newContent,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating exclusive content:', error);
    return NextResponse.json(
      { error: error.message || 'Error creating exclusive content' },
      { status: 500 }
    );
  }
} 