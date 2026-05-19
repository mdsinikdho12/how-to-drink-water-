import mongoose, { Document, Model } from 'mongoose';

export interface IProgress extends Document {
  userId: mongoose.Types.ObjectId;
  courseId: mongoose.Types.ObjectId;
  completedLessons: string[];
  currentLesson: string;
  progressPercent: number;
  lastAccessedAt: Date;
  completedAt?: Date;
}

const progressSchema = new mongoose.Schema<IProgress>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  completedLessons: [{ type: String }],
  currentLesson: { type: String, default: '' },
  progressPercent: { type: Number, default: 0 },
  lastAccessedAt: { type: Date, default: Date.now },
  completedAt: { type: Date },
});

progressSchema.index({ userId: 1, courseId: 1 }, { unique: true });

const Progress: Model<IProgress> = mongoose.models.Progress || mongoose.model<IProgress>('Progress', progressSchema);

export default Progress;
