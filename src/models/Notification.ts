import mongoose, { Schema, Document } from 'mongoose';

export enum NotificationType {
  LIVE_STREAM = 'liveStream',
  NEW_CONTENT = 'newContent',
  ANNOUNCEMENT = 'announcement',
  MEMBERSHIP = 'membership',
}

export interface INotification extends Document {
  title: string;
  message: string;
  type: NotificationType;
  targetId?: mongoose.Types.ObjectId;
  targetUrl?: string;
  isSent: boolean;
  isRead: boolean;
  scheduledFor: Date;
  sentAt?: Date;
  userId?: mongoose.Types.ObjectId;
  broadcastToAll: boolean;
}

const NotificationSchema = new Schema<INotification>(
  {
    title: {
      type: String,
      required: [true, 'Notification title is required'],
      trim: true,
    },
    message: {
      type: String,
      required: [true, 'Notification message is required'],
      trim: true,
    },
    type: {
      type: String,
      enum: Object.values(NotificationType),
      required: [true, 'Notification type is required'],
    },
    targetId: {
      type: Schema.Types.ObjectId,
      refPath: 'type',
    },
    targetUrl: {
      type: String,
      trim: true,
    },
    isSent: {
      type: Boolean,
      default: false,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    scheduledFor: {
      type: Date,
      default: Date.now,
    },
    sentAt: {
      type: Date,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    broadcastToAll: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Notification = mongoose.models.Notification || 
  mongoose.model<INotification>('Notification', NotificationSchema);

export default Notification; 