'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  Award, Droplets, Printer, ArrowLeft,
  CheckCircle2, Star, Shield, BookOpen
} from 'lucide-react';

interface CourseData {
  title: string;
  instructor: string;
  totalLessons: number;
}

export default function CertificatePage({ params }: { params: { id: string } }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [course, setCourse] = useState<CourseData | null>(null);
  const [progress, setProgress] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') { router.push('/login'); return; }
    if (status !== 'authenticated') return;

    Promise.all([
      fetch(`/api/courses/${params.id}`).then(r => r.json()),
      fetch(`/api/courses/${params.id}/progress`).then(r => r.json()),
    ]).then(([courseRes, progressRes]) => {
      setCourse(courseRes.course);
      setProgress(progressRes.progress);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [status, params.id]);

  const completionDate = progress?.completedAt
    ? new Date(progress.completedAt).toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' })
    : new Date().toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' });

  const isEligible = progress?.progressPercent === 100 ||
    (progress?.completedLessons?.length >= (course?.totalLessons ?? 0) && (course?.totalLessons ?? 0) > 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-cyan-800 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4" />
          <p className="text-blue-200">লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-cyan-900 flex flex-col items-center justify-center p-6 print:bg-white print:p-0">

      {/* Top Controls */}
      <div className="mb-8 flex items-center gap-4 print:hidden w-full max-w-3xl">
        <Link href="/dashboard" className="flex items-center gap-2 text-blue-300 hover:text-white transition-colors text-sm font-medium">
          <ArrowLeft size={18} />
          ড্যাশবোর্ড
        </Link>
        <div className="flex-1" />
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white border border-white/20 px-5 py-2.5 rounded-xl font-semibold transition-all text-sm"
        >
          <Printer size={16} />
          প্রিন্ট / PDF সেভ
        </button>
      </div>

      {/* Not eligible warning */}
      {!isEligible && progress !== null && (
        <div className="mb-6 bg-yellow-500/20 border border-yellow-400/40 text-yellow-200 px-6 py-4 rounded-2xl max-w-3xl w-full flex items-start gap-3 print:hidden">
          <Shield size={20} className="shrink-0 mt-0.5 text-yellow-300" />
          <div>
            <p className="font-semibold">কোর্স এখনো সম্পন্ন হয়নি</p>
            <p className="text-sm text-yellow-300 mt-0.5">
              সার্টিফিকেট পেতে সব লেসন শেষ করুন। এখন: {progress?.completedLessons?.length || 0}/{course?.totalLessons || 0} লেসন।
            </p>
            <Link href={`/dashboard/course/${params.id}`} className="inline-flex items-center gap-1.5 mt-2 text-sm font-bold text-yellow-200 hover:text-white">
              <BookOpen size={14} />
              কোর্সে ফিরে যান →
            </Link>
          </div>
        </div>
      )}

      {/* CERTIFICATE CARD */}
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-[0_30px_80px_rgba(0,0,0,0.5)] print:shadow-none overflow-hidden">

        {/* Top gold ribbon */}
        <div className="h-3 bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500" />

        <div className="relative p-10 sm:p-14">
          {/* Watermark */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
            <Droplets size={400} className="text-blue-900" />
          </div>

          {/* Corner borders */}
          <div className="absolute top-6 left-6 w-16 h-16 border-t-4 border-l-4 border-blue-200 rounded-tl-xl" />
          <div className="absolute top-6 right-6 w-16 h-16 border-t-4 border-r-4 border-blue-200 rounded-tr-xl" />
          <div className="absolute bottom-6 left-6 w-16 h-16 border-b-4 border-l-4 border-blue-200 rounded-bl-xl" />
          <div className="absolute bottom-6 right-6 w-16 h-16 border-b-4 border-r-4 border-blue-200 rounded-br-xl" />

          <div className="relative z-10 text-center">

            {/* Logo */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center shadow-lg">
                <Droplets size={26} className="text-white" />
              </div>
              <div className="text-left">
                <p className="font-black text-blue-900 text-lg leading-tight">পানি মাস্টারক্লাস</p>
                <p className="text-blue-400 text-xs tracking-widest uppercase">Water Drinking Academy</p>
              </div>
            </div>

            {/* Star divider */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent to-yellow-400" />
              <div className="flex gap-1.5">
                <Star size={14} className="text-yellow-400 fill-yellow-400" />
                <Star size={18} className="text-yellow-500 fill-yellow-500" />
                <Star size={14} className="text-yellow-400 fill-yellow-400" />
              </div>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent to-yellow-400" />
            </div>

            <p className="text-blue-400 text-sm font-bold tracking-[0.3em] uppercase mb-3">Certificate of Completion</p>
            <p className="text-blue-500 text-base mb-3">এই সার্টিফিকেট প্রদান করা হচ্ছে</p>

            {/* Name */}
            <div className="my-5 py-4 px-8 bg-gradient-to-r from-blue-50 via-cyan-50 to-blue-50 rounded-2xl border border-blue-100 inline-block">
              <h2 className="text-4xl sm:text-5xl font-black text-blue-900">
                {session?.user?.name || 'শিক্ষার্থী'}
              </h2>
            </div>

            <p className="text-blue-500 text-base mb-4">সফলভাবে সম্পন্ন করেছেন</p>

            {/* Course name */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-2xl px-8 py-4 mb-8 inline-block max-w-xl">
              <h3 className="text-lg sm:text-xl font-bold leading-snug">
                {course?.title || 'পানি পান মাস্টারক্লাস: বেসিক থেকে অ্যাডভান্সড'}
              </h3>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-center gap-8 mb-8 flex-wrap">
              <div className="text-center">
                <div className="text-2xl font-black text-blue-800">{course?.totalLessons || 24}</div>
                <div className="text-xs text-blue-400">লেসন</div>
              </div>
              <div className="w-px h-10 bg-blue-100" />
              <div className="text-center">
                <div className="text-2xl font-black text-blue-800">৫</div>
                <div className="text-xs text-blue-400">মডিউল</div>
              </div>
              <div className="w-px h-10 bg-blue-100" />
              <div className="text-center">
                <div className="flex justify-center mb-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />)}
                </div>
                <div className="text-xs text-blue-400">রেটিং</div>
              </div>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent to-blue-200" />
              <CheckCircle2 size={24} className="text-green-500 shrink-0" />
              <div className="flex-1 h-px bg-gradient-to-l from-transparent to-blue-200" />
            </div>

            {/* Footer */}
            <div className="flex items-end justify-between gap-6 flex-wrap">
              <div className="text-center min-w-28">
                <p className="text-base font-bold text-blue-800 mb-1">{completionDate}</p>
                <div className="h-0.5 bg-blue-200 mb-1" />
                <p className="text-xs text-blue-400 tracking-wide">সম্পন্নের তারিখ</p>
              </div>

              {/* Seal */}
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-300 to-amber-500 flex items-center justify-center shadow-lg border-4 border-yellow-200">
                    <div className="text-center">
                      <Award size={28} className="text-white mx-auto mb-0.5" />
                      <p className="text-white text-[8px] font-black leading-tight">VERIFIED</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 rounded-full border-4 border-dashed border-yellow-300 animate-spin" style={{ animationDuration: '20s' }} />
                </div>
                <p className="text-xs text-blue-400 mt-2">অফিশিয়াল সিল</p>
              </div>

              <div className="text-center min-w-28">
                <div className="flex justify-center mb-1">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold text-sm">ড</div>
                </div>
                <div className="h-0.5 bg-blue-200 mb-1" />
                <p className="text-xs text-blue-600 font-bold">{course?.instructor || 'ড. আবু বকর সিদ্দিকী'}</p>
                <p className="text-xs text-blue-400">প্রধান ইন্সট্রাক্টর</p>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom gold ribbon */}
        <div className="h-3 bg-gradient-to-r from-yellow-500 via-amber-300 to-yellow-400" />
      </div>

      {/* Action buttons */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4 print:hidden">
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 bg-white text-blue-800 font-bold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
        >
          <Printer size={18} />
          PDF হিসেবে সেভ করুন
        </button>
        <Link
          href="/dashboard"
          className="flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white border border-white/20 px-6 py-3 rounded-xl font-semibold transition-all"
        >
          <ArrowLeft size={18} />
          ড্যাশবোর্ডে ফিরুন
        </Link>
      </div>

      <style jsx global>{`
        @media print {
          body { background: white !important; }
          @page { margin: 0; size: A4 landscape; }
        }
      `}</style>
    </div>
  );
}
