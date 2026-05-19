import mongoose, { Document, Model } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  enrolledCourses: mongoose.Types.ObjectId[];
  completedLessons: string[];
  createdAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: [true, 'নাম দিন'],
    trim: true,
    maxlength: [50, 'নাম ৫০ অক্ষরের বেশি হতে পারবে না'],
  },
  email: {
    type: String,
    required: [true, 'ইমেইল দিন'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'সঠিক ইমেইল দিন'],
  },
  password: {
    type: String,
    required: [true, 'পাসওয়ার্ড দিন'],
    minlength: [6, 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষর হতে হবে'],
    select: false,
  },
  enrolledCourses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
  }],
  completedLessons: [{
    type: String,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;
