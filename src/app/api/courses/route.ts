import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Course from '@/models/Course';
import { courseData } from '@/lib/courseData';

export async function GET() {
  try {
    await dbConnect();

    let courses = await Course.find({ isPublished: true }).select('-modules');

    // Seed if no courses exist
    if (courses.length === 0) {
      const totalLessons = courseData.modules.reduce(
        (acc, m) => acc + m.lessons.length, 0
      );
      await Course.create({ ...courseData, totalLessons });
      courses = await Course.find({ isPublished: true }).select('-modules');
    }

    return NextResponse.json({ courses });
  } catch (error) {
    console.error('Courses fetch error:', error);
    return NextResponse.json({ error: 'কোর্স লোড করতে সমস্যা হয়েছে' }, { status: 500 });
  }
}
