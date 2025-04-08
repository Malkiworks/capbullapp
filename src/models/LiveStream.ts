import mongoose, { Schema, Document } from 'mongoose';
import { MembershipTier } from './User';

export interface ILiveStream extends Document {
  title: string;
  description: string;
  streamUrl: string;
  thumbnailUrl?: string;
  scheduledStartTime: Date;
  scheduledEndTime?: Date;
  actualStartTime?: Date;
  actualEndTime?: Date;
  isActive: boolean;
  isLive: boolean;
  requiredMembershipTier: MembershipTier;
  createdBy: mongoose.Types.ObjectId;
}

const LiveStreamSchema = new Schema<ILiveStream>(
  {
    title: {
      type: String,
      required: [true, 'Stream title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Stream description is required'],
      trim: true,
    },
    streamUrl: {
      type: String,
      required: [true, 'Stream URL is required'],
      trim: true,
    },
    thumbnailUrl: {
      type: String,
      trim: true,
    },
    scheduledStartTime: {
      type: Date,
      required: [true, 'Scheduled start time is required'],
    },
    scheduledEndTime: {
      type: Date,
    },
    actualStartTime: {
      type: Date,
    },
    actualEndTime: {
      type: Date,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isLive: {
      type: Boolean,
      default: false,
    },
    requiredMembershipTier: {
      type: String,
      enum: Object.values(MembershipTier),
      default: MembershipTier.STANDARD,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

const LiveStream = mongoose.models.LiveStream || mongoose.model<ILiveStream>('LiveStream', LiveStreamSchema);

export default LiveStream; 