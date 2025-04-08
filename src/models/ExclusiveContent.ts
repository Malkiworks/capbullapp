import mongoose, { Schema, Document } from 'mongoose';
import { MembershipTier } from './User';

export enum ContentType {
  ARTICLE = 'article',
  VIDEO = 'video',
  FILE = 'file',
  LINK = 'link',
}

export interface IExclusiveContent extends Document {
  title: string;
  description: string;
  contentType: ContentType;
  contentUrl: string;
  thumbnailUrl?: string;
  requiredMembershipTier: MembershipTier;
  isPublished: boolean;
  createdBy: mongoose.Types.ObjectId;
  publishDate: Date;
  viewCount: number;
}

const ExclusiveContentSchema = new Schema<IExclusiveContent>(
  {
    title: {
      type: String,
      required: [true, 'Content title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Content description is required'],
      trim: true,
    },
    contentType: {
      type: String,
      enum: Object.values(ContentType),
      required: [true, 'Content type is required'],
    },
    contentUrl: {
      type: String,
      required: [true, 'Content URL is required'],
      trim: true,
    },
    thumbnailUrl: {
      type: String,
      trim: true,
    },
    requiredMembershipTier: {
      type: String,
      enum: Object.values(MembershipTier),
      default: MembershipTier.STANDARD,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    publishDate: {
      type: Date,
      default: Date.now,
    },
    viewCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const ExclusiveContent = mongoose.models.ExclusiveContent || 
  mongoose.model<IExclusiveContent>('ExclusiveContent', ExclusiveContentSchema);

export default ExclusiveContent; 