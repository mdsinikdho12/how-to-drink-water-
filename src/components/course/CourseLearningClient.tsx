'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import {
  ChevronLeft, ChevronRight, Menu, X, CheckCircle2,
  Play, BookOpen, Clock, Award, Droplets, Home, ScrollText, PartyPopper
} from 'lucide-react';

interface Lesson {
  _id: string;
  title: string;
  description: string;
  duration: string;
  content: string;
  order: number;
}

interface Module {
  _id: string;
  title: string;
  lessons: Lesson[];
}

interface Course {
  _id: string;
  title: string;
  modules: Module[];
  totalLessons: number;
}

interface Progress {
  completedLessons: string[];
  progressPercent: number;
  currentLesson: string;
}

function renderContent(content: string) {
  const lines = content.split('\n');
  return lines.map((line, i) => {
    if (line.startsWith('# ')) return <h1 key={i} className="text-2xl font-bold text-blue-900 mb-4 mt-2 pb-3 border-b-2 border-blue-200">{line.slice(2)}</h1>;
    if (line.startsWith('## ')) return <h2 key={i} className="text-lg font-bold text-blue-700 mt-5 mb-2">{line.slice(3)}</h2>;
    if (line.startsWith('### ')) return <h3 key={i} className="text-base font-semibold text-blue-600 mt-4 mb-2">{line.slice(4)}</h3>;
    if (line.startsWith('- ') || line.startsWith('* ')) return <li key={i} className="text-blue-700 mb-1.5 ml-4 list-disc">{line.slice(2)}</li>;
    if (/^\d+\. /.test(line)) return <li key={i} className="text-blue-700 mb-1.5 ml-4 list-decimal">{line.replace(/^\d+\. /, '')}</li>;
    if (line.startsWith('✅')) return <div key={i} className="flex items-start gap-2 text-green-700 mb-1.5"><span>✅</span><span>{line.slice(2)}</span></div>;
    if (line.trim() === '') return <div key={i} className="h-3" />;
    if (line.startsWith('|')) {
      const cells = line.split('|').filter(c => c.trim());
      if (line.includes('---')) return null;
      return (
        <div key={i} className="flex gap-0">
          {cells.map((cell, j) => (
            <div key={j} className={`flex-1 px-3 py-2 text-sm border border-blue-100 ${i === 0 ? 'bg-blue-600 text-white font-semibold' : 'text-blue-700'}`}>
              {cell.trim()}
            </div>
          ))}
        </div>
      );
    }
    if (line.startsWith('**') && line.endsWith('**')) {
      return <p key={i} className="font-bold text-blue-800 mb-1">{line.replace(/\*\*/g, '')}</p>;
    }
    return <p key={i} className="text-blue-700 mb-2 leading-relaxed">{line}</p>;
  });
}

export default function CourseLearningClient({ course, progress }: { course: Course; progress: Progress }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentLessonId, setCurrentLessonId] = useState<string>(() => {
    if (progress.currentLesson) return progress.currentLesson;
    return course.modules[0]?.lessons[0]?._id || '';
  });
  const [completedLessons, setCompletedLessons] = useState<string[]>(progress.completedLessons || []);
  const [saving, setSaving] = useState(false);

  const allLessons: Lesson[] = course.modules.flatMap(m => m.lessons);
  const currentLesson = allLessons.find(l => l._id === currentLessonId) || allLessons[0];
  const currentIndex = allLessons.findIndex(l => l._id === currentLessonId);

  const progressPercent = Math.round((completedLessons.length / course.totalLessons) * 100);

  const markComplete = useCallback(async (lessonId: string) => {
    if (completedLessons.includes(lessonId)) return;
    const updated = [...completedLessons, lessonId];
    setCompletedLessons(updated);
    setSaving(true);
    try {
      await fetch(`/api/courses/${course._id}/progress`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lessonId, currentLesson: lessonId }),
      });
    } finally {
      setSaving(false);
    }
  }, [completedLessons, course._id]);

  const goToLesson = (lessonId: string) => {
    setCurrentLessonId(lessonId);
  };

  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col">
      {/* Top Bar */}
      <div className="glass border-b border-white/50 shadow-sm fixed top-0 left-0 right-0 z-40 h-14">
        <div className="flex items-center gap-3 h-full px-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg text-blue-600 hover:bg-blue-100 transition-colors"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <Link href="/dashboard" className="flex items-center gap-1.5 text-blue-500 hover:text-blue-700 transition-colors">
            <Home size={16} />
            <span className="text-sm hidden sm:block">ড্যাশবোর্ড</span>
          </Link>
          <div className="text-blue-300 hidden sm:block">/</div>
          <span className="text-blue-800 font-semibold text-sm truncate flex-1">{course.title}</span>
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-28 bg-blue-200 rounded-full h-2 hidden sm:block">
              <div className="progress-bar h-2" style={{ width: `${progressPercent}%` }} />
            </div>
            <span className="text-xs font-bold text-blue-700">{progressPercent}%</span>
          </div>
        </div>
      </div>

      <div className="flex flex-1 pt-14">
        {/* Sidebar */}
        <aside
          className={`${sidebarOpen ? 'w-80' : 'w-0'} shrink-0 transition-all duration-300 overflow-hidden fixed left-0 top-14 bottom-0 bg-white border-r border-blue-100 z-30 shadow-lg`}
        >
          <div className="h-full overflow-y-auto py-4">
            <div className="px-4 mb-4">
              <div className="bg-blue-50 rounded-xl p-3">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs font-semibold text-blue-600">সামগ্রিক অগ্রগতি</span>
                  <span className="text-xs font-bold text-blue-800">{progressPercent}%</span>
                </div>
                <div className="w-full bg-blue-200 rounded-full h-2">
                  <div className="progress-bar h-2" style={{ width: `${progressPercent}%` }} />
                </div>
                <p className="text-xs text-blue-400 mt-1.5">{completedLessons.length}/{course.totalLessons} লেসন সম্পন্ন</p>
              </div>
            </div>

            {course.modules.map((mod, mi) => (
              <div key={mod._id} className="mb-2">
                <div className="px-4 py-2">
                  <div className="text-xs font-bold text-blue-400 uppercase tracking-wide">মডিউল {mi + 1}</div>
                  <h3 className="text-sm font-bold text-blue-900 mt-0.5">{mod.title}</h3>
                </div>
                <div>
                  {mod.lessons.map(lesson => {
                    const isCompleted = completedLessons.includes(lesson._id);
                    const isCurrent = lesson._id === currentLessonId;
                    return (
                      <button
                        key={lesson._id}
                        onClick={() => goToLesson(lesson._id)}
                        className={`w-full text-left px-4 py-3 flex items-start gap-3 hover:bg-blue-50 transition-colors ${isCurrent ? 'bg-blue-50 border-r-3 border-blue-500' : ''}`}
                      >
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                          isCompleted ? 'bg-green-500' : isCurrent ? 'bg-blue-500' : 'bg-blue-100'
                        }`}>
                          {isCompleted ? (
                            <CheckCircle2 size={14} className="text-white" />
                          ) : (
                            <Play size={10} className={`${isCurrent ? 'text-white' : 'text-blue-400'} ml-0.5`} />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm leading-snug ${isCurrent ? 'text-blue-700 font-semibold' : isCompleted ? 'text-green-700' : 'text-blue-600'}`}>
                            {lesson.title}
                          </p>
                          <p className="text-xs text-blue-400 mt-0.5">{lesson.duration}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-80' : 'ml-0'} min-h-[calc(100vh-3.5rem)]`}>
          <div className="max-w-3xl mx-auto px-4 sm:px-8 py-8">
            {/* Lesson Header */}
            <div className="mb-6">
              <div className="flex items-center gap-2 text-blue-400 text-sm mb-2">
                <BookOpen size={14} />
                <span>লেসন {currentIndex + 1} / {allLessons.length}</span>
                <span>•</span>
                <Clock size={14} />
                <span>{currentLesson?.duration}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-2">{currentLesson?.title}</h1>
              <p className="text-blue-500">{currentLesson?.description}</p>
            </div>

            {/* Content Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-blue-50 p-6 sm:p-8 mb-6">
              <div className="lesson-content">
                {currentLesson && renderContent(currentLesson.content)}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
              {!completedLessons.includes(currentLesson?._id || '') ? (
                <button
                  onClick={() => currentLesson && markComplete(currentLesson._id)}
                  disabled={saving}
                  className="btn-primary flex items-center gap-2 py-3 px-6 w-full sm:w-auto justify-center"
                >
                  {saving ? (
                    <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  ) : (
                    <CheckCircle2 size={18} />
                  )}
                  লেসন সম্পন্ন করুন
                </button>
              ) : (
                <div className="flex items-center gap-2 bg-green-50 text-green-700 px-5 py-3 rounded-xl font-semibold border border-green-200">
                  <CheckCircle2 size={18} className="fill-green-100" />
                  সম্পন্ন হয়েছে ✓
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between gap-4">
              {prevLesson ? (
                <button
                  onClick={() => goToLesson(prevLesson._id)}
                  className="flex items-center gap-2 bg-white border border-blue-200 text-blue-700 hover:bg-blue-50 px-5 py-3 rounded-xl font-semibold transition-all"
                >
                  <ChevronLeft size={18} />
                  <span className="hidden sm:block text-sm">আগের লেসন</span>
                </button>
              ) : <div />}

              {nextLesson ? (
                <button
                  onClick={() => { markComplete(currentLesson._id); goToLesson(nextLesson._id); }}
                  className="btn-primary flex items-center gap-2 px-5 py-3 ml-auto"
                >
                  <span className="text-sm">পরের লেসন</span>
                  <ChevronRight size={18} />
                </button>
              ) : (
                (progressPercent === 100 || (completedLessons.length >= allLessons.length - 1 && completedLessons.includes(currentLesson?._id || ''))) ? (
                  <Link
                    href={`/dashboard/certificate/${course._id}`}
                    className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-white px-6 py-3 rounded-xl font-bold ml-auto shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all text-sm"
                  >
                    <ScrollText size={18} />
                    সার্টিফিকেট নিন 🏆
                  </Link>
                ) : null
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
