import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import Progress from '@/models/Progress';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'লগইন করুন' }, { status: 401 });
    }

    await dbConnect();
    const user = await User.findById(session.user.id)
      .populate('enrolledCourses', 'title totalLessons duration level')
      .lean();

    if (!user) {
      return NextResponse.json({ error: 'ইউজার পাওয়া যায়নি' }, { status: 404 });
    }

    const progressList = await Progress.find({ userId: session.user.id }).lean();

    return NextResponse.json({
      user: {
        id: (user as any)._id.toString(),
        name: (user as any).name,
        email: (user as any).email,
        createdAt: (user as any).createdAt,
        enrolledCourses: (user as any).enrolledCourses || [],
      },
      progress: progressList,
    });
  } catch (error) {
    return NextResponse.json({ error: 'সমস্যা হয়েছে' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'লগইন করুন' }, { status: 401 });
    }

    const { name } = await req.json();
    if (!name?.trim()) {
      return NextResponse.json({ error: 'নাম দিন' }, { status: 400 });
    }

    await dbConnect();
    const user = await User.findByIdAndUpdate(
      session.user.id,
      { name: name.trim() },
      { new: true }
    );

    return NextResponse.json({
      message: 'প্রোফাইল আপডেট হয়েছে',
      user: { name: user?.name, email: user?.email },
    });
  } catch (error) {
    return NextResponse.json({ error: 'সমস্যা হয়েছে' }, { status: 500 });
  }
}
