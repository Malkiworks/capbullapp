import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

// Define membership tier enum
export enum MembershipTier {
  PLATINUM = 'Platinum Member',
  ELITE = 'Elite Member',
  STANDARD = 'Standard Member',
  PREMIUM_24H = 'Premium 24h Member',
  PREMIUM_7D = 'Premium 7d Member',
}

// User role enum
export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

// User interface
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  membershipTier: MembershipTier;
  role: UserRole;
  joinedDate: Date;
  lastLogin: Date;
  isActive: boolean;
  premiumAccessStart: Date | null;
  premiumAccessExpiry: Date | null;
  comparePassword: (candidatePassword: string) => Promise<boolean>;
}

// User schema
const UserSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      trim: true,
      minlength: [3, 'Username must be at least 3 characters long'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters long'],
    },
    membershipTier: {
      type: String,
      enum: Object.values(MembershipTier),
      default: MembershipTier.STANDARD,
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.USER,
    },
    joinedDate: {
      type: Date,
      default: Date.now,
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    premiumAccessStart: {
      type: Date,
      default: null,
    },
    premiumAccessExpiry: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Compare password method
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Create model
const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User; 