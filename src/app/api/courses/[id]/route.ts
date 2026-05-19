import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Course from '@/models/Course';
import User from '@/models/User';
import Progress from '@/models/Progress';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const course = await Course.findById(params.id);
    if (!course) {
      return NextResponse.json({ error: 'কোর্স পাওয়া যায়নি' }, { status: 404 });
    }
    return NextResponse.json({ course });
  } catch (error) {
    return NextResponse.json({ error: 'সমস্যা হয়েছে' }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'লগইন করুন' }, { status: 401 });
    }

    await dbConnect();

    const user = await User.findById(session.user.id);
    if (!user) {
      return NextResponse.json({ error: 'ইউজার পাওয়া যায়নি' }, { status: 404 });
    }

    const courseId = params.id;
    const alreadyEnrolled = user.enrolledCourses.some(
      (id) => id.toString() === courseId
    );

    if (!alreadyEnrolled) {
      user.enrolledCourses.push(courseId as any);
      await user.save();
      await Course.findByIdAndUpdate(courseId, { $inc: { enrolledCount: 1 } });
      await Progress.create({ userId: user._id, courseId, completedLessons: [] });
    }

    return NextResponse.json({ message: 'কোর্সে ভর্তি হয়েছেন' });
  } catch (error) {
    return NextResponse.json({ error: 'সমস্যা হয়েছে' }, { status: 500 });
  }
}
