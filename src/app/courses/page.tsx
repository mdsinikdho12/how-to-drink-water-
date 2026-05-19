import Link from 'next/link';
import { BookOpen, Clock, Users, Star, Award, ChevronRight, Droplets } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import dbConnect from '@/lib/mongodb';
import Course from '@/models/Course';
import { courseData } from '@/lib/courseData';

async function getCourses() {
  try {
    await dbConnect();
    let courses = await Course.find({ isPublished: true }).select('-modules').lean();
    if (courses.length === 0) {
      const totalLessons = courseData.modules.reduce((acc, m) => acc + m.lessons.length, 0);
      const created = await Course.create({ ...courseData, totalLessons });
      courses = [created.toObject()];
    }
    return courses;
  } catch {
    return [];
  }
}

const levelMap: Record<string, string> = {
  beginner: 'বেসিক',
  intermediate: 'মধ্যবর্তী',
  advanced: 'উন্নত',
};

const levelColor: Record<string, string> = {
  beginner: 'bg-green-100 text-green-700',
  intermediate: 'bg-yellow-100 text-yellow-700',
  advanced: 'bg-red-100 text-red-700',
};

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Header */}
      <section className="wave-bg pt-28 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 text-white/90 px-4 py-2 rounded-full text-sm font-medium mb-5 backdrop-blur-sm border border-white/30">
            <BookOpen size={16} />
            সকল কোর্স
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            আমাদের কোর্সসমূহ
          </h1>
          <p className="text-blue-100 text-lg max-w-xl mx-auto">
            বিশেষজ্ঞ দ্বারা তৈরি, বাংলায় শিখুন
          </p>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {courses.length === 0 ? (
            <div className="text-center py-20">
              <Droplets size={60} className="text-blue-200 mx-auto mb-4" />
              <p className="text-blue-400 text-lg">কোনো কোর্স পাওয়া যায়নি</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course: any) => (
                <div key={course._id.toString()} className="bg-white rounded-3xl shadow-lg border border-blue-50 overflow-hidden hover-lift group">
                  {/* Thumbnail */}
                  <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-500 h-48 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20">
                      {[...Array(6)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute water-drop bg-white/30"
                          style={{
                            width: `${Math.random() * 40 + 20}px`,
                            height: `${Math.random() * 50 + 25}px`,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${i * 0.8}s`,
                          }}
                        />
                      ))}
                    </div>
                    <div className="text-center relative z-10">
                      <div className="text-6xl mb-2">💧</div>
                      <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${levelColor[course.level]} bg-white/90`}>
                        {levelMap[course.level]}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-blue-900 mb-2 leading-snug group-hover:text-blue-600 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-blue-400 text-sm mb-5 line-clamp-2 leading-relaxed">
                      {course.description}
                    </p>

                    {/* Meta */}
                    <div className="grid grid-cols-2 gap-3 mb-5">
                      <div className="flex items-center gap-2 bg-blue-50 rounded-xl px-3 py-2">
                        <BookOpen size={15} className="text-blue-400 shrink-0" />
                        <span className="text-xs text-blue-600 font-medium">{course.totalLessons}টি লেসন</span>
                      </div>
                      <div className="flex items-center gap-2 bg-blue-50 rounded-xl px-3 py-2">
                        <Clock size={15} className="text-blue-400 shrink-0" />
                        <span className="text-xs text-blue-600 font-medium truncate">{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-yellow-50 rounded-xl px-3 py-2">
                        <Star size={15} className="text-yellow-400 fill-yellow-400 shrink-0" />
                        <span className="text-xs text-yellow-700 font-medium">{course.rating} রেটিং</span>
                      </div>
                      <div className="flex items-center gap-2 bg-blue-50 rounded-xl px-3 py-2">
                        <Users size={15} className="text-blue-400 shrink-0" />
                        <span className="text-xs text-blue-600 font-medium">{course.enrolledCount}+ জন</span>
                      </div>
                    </div>

                    {/* Instructor */}
                    <div className="flex items-center gap-2.5 mb-5 pb-5 border-b border-blue-50">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white text-xs font-bold shrink-0">
                        {course.instructor[0]}
                      </div>
                      <span className="text-sm text-blue-600 font-medium">{course.instructor}</span>
                    </div>

                    <Link
                      href={`/courses/${course._id}`}
                      className="btn-primary w-full py-3 flex items-center justify-center gap-2 text-sm"
                    >
                      কোর্স দেখুন
                      <ChevronRight size={16} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
