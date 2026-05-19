'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BookOpen, CheckCircle2 } from 'lucide-react';

export default function EnrollButton({ courseId }: { courseId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [enrolled, setEnrolled] = useState(false);

  const handleEnroll = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/courses/${courseId}`, {
        method: 'POST',
      });
      if (res.ok) {
        setEnrolled(true);
        setTimeout(() => router.push(`/dashboard/course/${courseId}`), 1000);
      }
    } catch {
      alert('এনরোলমেন্টে সমস্যা হয়েছে');
    } finally {
      setLoading(false);
    }
  };

  if (enrolled) {
    return (
      <div className="btn-primary w-full py-4 flex items-center justify-center gap-2 text-base bg-green-500">
        <CheckCircle2 size={20} />
        এনরোল হয়েছেন! লোড হচ্ছে...
      </div>
    );
  }

  return (
    <button
      onClick={handleEnroll}
      disabled={loading}
      className="btn-primary w-full py-4 flex items-center justify-center gap-2 text-base disabled:opacity-60"
    >
      {loading ? (
        <>
          <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
          এনরোল হচ্ছে...
        </>
      ) : (
        <>
          <BookOpen size={20} />
          বিনামূল্যে এনরোল করুন
        </>
      )}
    </button>
  );
}
