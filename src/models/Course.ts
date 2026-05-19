import mongoose, { Document, Model } from 'mongoose';

export interface ILesson {
  _id: string;
  title: string;
  description: string;
  duration: string;
  content: string;
  order: number;
}

export interface IModule {
  _id: string;
  title: string;
  description: string;
  lessons: ILesson[];
  order: number;
}

export interface ICourse extends Document {
  title: string;
  description: string;
  thumbnail: string;
  instructor: string;
  duration: string;
  totalLessons: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  modules: IModule[];
  enrolledCount: number;
  rating: number;
  isPublished: boolean;
  createdAt: Date;
}

const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: String, required: true },
  content: { type: String, required: true },
  order: { type: Number, required: true },
});

const moduleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  lessons: [lessonSchema],
  order: { type: Number, required: true },
});

const courseSchema = new mongoose.Schema<ICourse>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  thumbnail: { type: String, default: '💧' },
  instructor: { type: String, required: true },
  duration: { type: String, required: true },
  totalLessons: { type: Number, required: true },
  level: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
  modules: [moduleSchema],
  enrolledCount: { type: Number, default: 0 },
  rating: { type: Number, default: 4.8 },
  isPublished: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

const Course: Model<ICourse> = mongoose.models.Course || mongoose.model<ICourse>('Course', courseSchema);

export default Course;
