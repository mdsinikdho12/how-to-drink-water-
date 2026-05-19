import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  BookOpen, Clock, Users, Star, Award, CheckCircle2,
  ChevronRight, Play, Lock, Droplets
} from 'lucide-react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import dbConnect from '@/lib/mongodb';
import Course from '@/models/Course';
import User from '@/models/User';
import EnrollButton from '@/components/course/EnrollButton';

async function getCourse(id: string) {
  try {
    await dbConnect();
    const course = await Course.findById(id).lean();
    return course;
  } catch {
    return null;
  }
}

export default async function CoursePage({ params }: { params: { id: string } }) {
  const course = await getCourse(params.id) as any;
  if (!course) notFound();

  const session = await getServerSession(authOptions);
  let isEnrolled = false;

  if (session) {
    try {
      await dbConnect();
      const user = await User.findById(session.user.id);
      isEnrolled = user?.enrolledCourses?.some(
        (id: any) => id.toString() === params.id
      ) ?? false;
    } catch {}
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="wave-bg pt-28 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/20 text-white/90 px-4 py-2 rounded-full text-sm font-medium mb-5 backdrop-blur-sm border border-white/30">
                <Droplets size={16} />
                পানি পান কোর্স
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-5 leading-snug">
                {course.title}
              </h1>
              <p className="text-blue-100 text-lg mb-8 leading-relaxed">
                {course.description}
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-1.5 text-blue-100">
                  <Star size={16} className="text-yellow-300 fill-yellow-300" />
                  <span className="font-bold text-white">{course.rating}</span>
                  <span>রেটিং</span>
                </div>
                <div className="flex items-center gap-1.5 text-blue-100">
                  <Users size={16} />
                  <span>{course.enrolledCount}+ শিক্ষার্থী</span>
                </div>
                <div className="flex items-center gap-1.5 text-blue-100">
                  <Clock size={16} />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-1.5 text-blue-100">
                  <BookOpen size={16} />
                  <span>{course.totalLessons}টি লেসন</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-bold">
                  {course.instructor[0]}
                </div>
                <div>
                  <p className="text-white font-semibold">{course.instructor}</p>
                  <p className="text-blue-200 text-sm">কোর্স ইন্সট্রাক্টর</p>
                </div>
              </div>
            </div>

            {/* Enrollment Card */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-blue-50">
              <div className="text-center text-6xl mb-6">💧</div>
              <div className="space-y-4 mb-6">
                {[
                  `${course.totalLessons}টি ভিডিও লেসন`,
                  'লাইফটাইম অ্যাক্সেস',
                  'সার্টিফিকেট',
                  'বাংলা ভাষায়',
                  'যেকোনো ডিভাইসে',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 size={18} className="text-green-500 shrink-0" />
                    <span className="text-blue-700">{item}</span>
                  </div>
                ))}
              </div>

              {isEnrolled ? (
                <Link
                  href={`/dashboard/course/${params.id}`}
                  className="btn-primary w-full py-4 flex items-center justify-center gap-2 text-base"
                >
                  <Play size={20} fill="white" />
                  কোর্স চালিয়ে যান
                </Link>
              ) : session ? (
                <EnrollButton courseId={params.id} />
              ) : (
                <Link href="/login" className="btn-primary w-full py-4 flex items-center justify-center gap-2 text-base">
                  লগইন করে এনরোল করুন
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">কোর্সের বিষয়বস্তু</h2>
          <div className="space-y-4">
            {course.modules?.map((mod: any, i: number) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden border border-blue-100 shadow-sm">
                <div className="flex items-center gap-4 p-5 border-b border-blue-50">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold text-sm shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div>
                    <h3 className="font-bold text-blue-900">{mod.title}</h3>
                    <p className="text-blue-400 text-sm">{mod.lessons?.length}টি লেসন</p>
                  </div>
                </div>
                <div className="divide-y divide-blue-50">
                  {mod.lessons?.map((lesson: any, j: number) => (
                    <div key={j} className="flex items-center gap-3 px-5 py-3.5">
                      <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                        {isEnrolled ? (
                          <Play size={12} className="text-blue-500 ml-0.5" />
                        ) : (
                          <Lock size={12} className="text-blue-300" />
                        )}
                      </div>
                      <span className="text-blue-700 text-sm flex-1">{lesson.title}</span>
                      <span className="text-blue-400 text-xs shrink-0">{lesson.duration}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
