import { redirect, notFound } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Course from '@/models/Course';
import User from '@/models/User';
import Progress from '@/models/Progress';
import CourseLearningClient from '@/components/course/CourseLearningClient';

async function getData(courseId: string, userId: string) {
  await dbConnect();
  const course = await Course.findById(courseId).lean() as any;
  if (!course) return null;

  const user = await User.findById(userId);
  const isEnrolled = user?.enrolledCourses?.some((id: any) => id.toString() === courseId);
  if (!isEnrolled) return null;

  let progress = await Progress.findOne({ userId, courseId }).lean() as any;
  if (!progress) {
    progress = await Progress.create({ userId, courseId, completedLessons: [] });
    progress = progress.toObject();
  }

  return { course, progress };
}

export default async function CourseLearnPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/login');

  const data = await getData(params.id, session.user.id);
  if (!data) notFound();

  const { course, progress } = data;

  // Serialize for client
  const serialized = {
    course: JSON.parse(JSON.stringify(course)),
    progress: JSON.parse(JSON.stringify(progress)),
  };

  return <CourseLearningClient {...serialized} />;
}
