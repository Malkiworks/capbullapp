import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/db';
import Notification from '../../../models/Notification';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';

// Get user notifications
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
    const isRead = url.searchParams.get('read') === 'true';
    const limit = parseInt(url.searchParams.get('limit') || '10');
    const page = parseInt(url.searchParams.get('page') || '1');
    
    await connectToDatabase();

    const query: any = {
      $or: [
        { userId: session.user.id },
        { broadcastToAll: true }
      ]
    };
    
    // Filter by read status if specified
    if (isRead !== undefined) {
      query.isRead = isRead;
    }
    
    const skip = (page - 1) * limit;
    
    const notifications = await Notification.find(query)
      .sort({ scheduledFor: -1 })
      .skip(skip)
      .limit(limit);
    
    // Get total count for pagination
    const total = await Notification.countDocuments(query);
    
    return NextResponse.json({
      notifications,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error: any) {
    console.error('Error fetching notifications:', error);
    return NextResponse.json(
      { error: error.message || 'Error fetching notifications' },
      { status: 500 }
    );
  }
}

// Create a new notification
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // For now, we'll assume only certain tiers can create notifications
    // In a real app, you'd have a proper admin/role check
    if (session.user.membershipTier !== 'Platinum Member') {
      return NextResponse.json(
        { error: 'Unauthorized: Insufficient permissions' },
        { status: 403 }
      );
    }

    const {
      title,
      message,
      type,
      targetId,
      targetUrl,
      scheduledFor,
      userId,
      broadcastToAll,
    } = await req.json();

    // Validate required fields
    if (!title || !message || !type) {
      return NextResponse.json(
        { error: 'Required fields are missing' },
        { status: 400 }
      );
    }

    // Either userId or broadcastToAll must be provided
    if (!userId && !broadcastToAll) {
      return NextResponse.json(
        { error: 'Either userId or broadcastToAll must be specified' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const newNotification = new Notification({
      title,
      message,
      type,
      targetId,
      targetUrl,
      scheduledFor: scheduledFor ? new Date(scheduledFor) : new Date(),
      userId,
      broadcastToAll: broadcastToAll || false,
    });

    await newNotification.save();

    return NextResponse.json(
      {
        message: 'Notification created successfully',
        notification: newNotification,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating notification:', error);
    return NextResponse.json(
      { error: error.message || 'Error creating notification' },
      { status: 500 }
    );
  }
} 