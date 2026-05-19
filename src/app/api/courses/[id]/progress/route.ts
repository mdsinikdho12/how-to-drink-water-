import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Progress from '@/models/Progress';
import Course from '@/models/Course';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'লগইন করুন' }, { status: 401 });
    }

    await dbConnect();
    const progress = await Progress.findOne({
      userId: session.user.id,
      courseId: params.id,
    });

    return NextResponse.json({ progress });
  } catch (error) {
    return NextResponse.json({ error: 'সমস্যা হয়েছে' }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'লগইন করুন' }, { status: 401 });
    }

    const { lessonId, currentLesson } = await req.json();

    await dbConnect();

    const course = await Course.findById(params.id);
    if (!course) return NextResponse.json({ error: 'কোর্স পাওয়া যায়নি' }, { status: 404 });

    const progress = await Progress.findOne({
      userId: session.user.id,
      courseId: params.id,
    });

    if (!progress) {
      return NextResponse.json({ error: 'প্রোগ্রেস পাওয়া যায়নি' }, { status: 404 });
    }

    if (lessonId && !progress.completedLessons.includes(lessonId)) {
      progress.completedLessons.push(lessonId);
    }

    if (currentLesson) {
      progress.currentLesson = currentLesson;
    }

    const totalLessons = course.totalLessons;
    progress.progressPercent = Math.round(
      (progress.completedLessons.length / totalLessons) * 100
    );
    progress.lastAccessedAt = new Date();

    if (progress.progressPercent === 100) {
      progress.completedAt = new Date();
    }

    await progress.save();

    return NextResponse.json({ progress });
  } catch (error) {
    return NextResponse.json({ error: 'সমস্যা হয়েছে' }, { status: 500 });
  }
}
