import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Navbar from '@/components/layout/Navbar';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import Course from '@/models/Course';
import Progress from '@/models/Progress';
import {
  BookOpen, Clock, Award, TrendingUp, ChevronRight,
  Play, CheckCircle2, Droplets, Star, Target, ScrollText
} from 'lucide-react';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/login');

  let enrolledCourses: any[] = [];
  let progressData: any[] = [];
  let user: any = null;

  try {
    await dbConnect();
    user = await User.findById(session.user.id).populate('enrolledCourses').lean();

    if (user?.enrolledCourses) {
      enrolledCourses = user.enrolledCourses;
      progressData = await Progress.find({ userId: session.user.id }).lean();
    }
  } catch {}

  const getProgress = (courseId: string) => {
    return progressData.find(p => p.courseId.toString() === courseId) || null;
  };

  const totalCompleted = progressData.filter(p => p.progressPercent === 100).length;
  const totalProgress = progressData.length > 0
    ? Math.round(progressData.reduce((acc, p) => acc + p.progressPercent, 0) / progressData.length)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-16">
        {/* Welcome */}
        <div className="mb-10">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-full opacity-10">
              <Droplets size={200} className="absolute -right-10 -top-10 text-white" />
            </div>
            <div className="relative z-10">
              <h1 className="text-3xl font-bold mb-2">
                আস্সালামুআলাইকুম, {session.user?.name?.split(' ')[0]}! 👋
              </h1>
              <p className="text-blue-100 text-lg">
                আপনার শেখার যাত্রা চালিয়ে যান
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { icon: <BookOpen size={22} className="text-blue-500" />, value: enrolledCourses.length, label: 'এনরোল করা কোর্স', bg: 'bg-blue-50' },
            { icon: <CheckCircle2 size={22} className="text-green-500" />, value: totalCompleted, label: 'সম্পন্ন কোর্স', bg: 'bg-green-50' },
            { icon: <TrendingUp size={22} className="text-purple-500" />, value: `${totalProgress}%`, label: 'গড় অগ্রগতি', bg: 'bg-purple-50' },
            { icon: <Award size={22} className="text-yellow-500" />, value: totalCompleted, label: 'সার্টিফিকেট', bg: 'bg-yellow-50' },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-blue-50">
              <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center mb-3`}>
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-blue-900 mb-0.5">{stat.value}</div>
              <div className="text-blue-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* My Courses */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-blue-900">আমার কোর্সসমূহ</h2>
            <Link href="/courses" className="text-blue-500 hover:text-blue-700 flex items-center gap-1 text-sm font-medium">
              সব কোর্স দেখুন <ChevronRight size={16} />
            </Link>
          </div>

          {enrolledCourses.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-blue-50 shadow-sm">
              <Droplets size={60} className="text-blue-200 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-blue-900 mb-2">এখনো কোনো কোর্সে এনরোল করেননি</h3>
              <p className="text-blue-400 mb-6">আজই শুরু করুন আপনার শেখার যাত্রা</p>
              <Link href="/courses" className="btn-primary inline-flex items-center gap-2 py-3 px-6">
                <BookOpen size={18} />
                কোর্স দেখুন
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {enrolledCourses.map((course: any) => {
                const progress = getProgress(course._id.toString());
                const percent = progress?.progressPercent || 0;
                const completed = progress?.completedLessons?.length || 0;

                return (
                  <div key={course._id.toString()} className="bg-white rounded-2xl shadow-sm border border-blue-50 overflow-hidden hover-lift">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-400 p-5">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">
                          💧
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-white font-bold leading-snug line-clamp-2 text-sm">
                            {course.title}
                          </h3>
                        </div>
                      </div>
                    </div>

                    {/* Progress */}
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-blue-600 font-medium">অগ্রগতি</span>
                        <span className="text-sm font-bold text-blue-800">{percent}%</span>
                      </div>
                      <div className="w-full bg-blue-100 rounded-full h-2.5 mb-4">
                        <div
                          className="progress-bar h-2.5"
                          style={{ width: `${percent}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-1.5 text-blue-400 text-sm">
                          <BookOpen size={14} />
                          <span>{completed}/{course.totalLessons} লেসন</span>
                        </div>
                        {percent === 100 && (
                          <div className="flex items-center gap-1 text-green-500 text-sm font-medium">
                            <Award size={14} />
                            সম্পন্ন
                          </div>
                        )}
                      </div>

                      {percent === 100 ? (
                        <div className="flex flex-col gap-2">
                          {/* Certificate Banner */}
                          <Link
                            href={`/dashboard/certificate/${course._id}`}
                            className="w-full py-3 flex items-center justify-center gap-2 text-sm font-bold rounded-xl bg-gradient-to-r from-yellow-400 to-orange-400 text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
                          >
                            <ScrollText size={16} />
                            সার্টিফিকেট দেখুন 🏆
                          </Link>
                          <Link
                            href={`/dashboard/course/${course._id}`}
                            className="w-full py-2.5 flex items-center justify-center gap-2 text-sm font-semibold rounded-xl border-2 border-blue-200 text-blue-600 hover:bg-blue-50 transition-all"
                          >
                            <CheckCircle2 size={15} />
                            পর্যালোচনা করুন
                          </Link>
                        </div>
                      ) : (
                        <Link
                          href={`/dashboard/course/${course._id}`}
                          className="btn-primary w-full py-3 flex items-center justify-center gap-2 text-sm"
                        >
                          {percent === 0 ? (
                            <>
                              <Play size={16} fill="white" />
                              শুরু করুন
                            </>
                          ) : (
                            <>
                              <Play size={16} fill="white" />
                              চালিয়ে যান
                            </>
                          )}
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Quick Tips */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-8 border border-emerald-100">
          <div className="flex items-center gap-3 mb-5">
            <Target size={24} className="text-emerald-500" />
            <h2 className="text-xl font-bold text-emerald-900">আজকের পানি পানের লক্ষ্য</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { time: 'সকাল', tip: 'ঘুম থেকে উঠে ২ গ্লাস পানি পান করুন', icon: '🌅' },
              { time: 'দুপুর', tip: 'খাবারের ৩০ মিনিট আগে ১ গ্লাস পান করুন', icon: '☀️' },
              { time: 'রাত', tip: 'ঘুমানোর আগে ১ গ্লাস পানি পান করুন', icon: '🌙' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-4 border border-emerald-100">
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="text-xs font-bold text-emerald-600 mb-1">{item.time}</div>
                <p className="text-emerald-800 text-sm leading-relaxed">{item.tip}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
