import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/db';
import User, { MembershipTier } from '../../../models/User';

export async function POST(req: NextRequest) {
  try {
    const { username, email, password } = await req.json();

    // Validate input
    if (!username || !email || !password) {
      return NextResponse.json(
        { error: 'Username, email, and password are required' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Username or email already exists' },
        { status: 409 }
      );
    }

    // Create new user (default to STANDARD tier)
    const newUser = new User({
      username,
      email,
      password, // Will be hashed by the pre-save hook in the User model
      membershipTier: MembershipTier.STANDARD,
    });

    await newUser.save();

    return NextResponse.json(
      {
        message: 'User registered successfully',
        user: {
          id: newUser._id,
          username: newUser.username,
          email: newUser.email,
          membershipTier: newUser.membershipTier,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: error.message || 'Error registering user' },
      { status: 500 }
    );
  }
} 