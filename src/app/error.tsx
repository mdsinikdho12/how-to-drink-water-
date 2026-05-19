'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-red-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <AlertTriangle size={40} className="text-red-500" />
        </div>
        <h2 className="text-2xl font-bold text-blue-900 mb-3">সমস্যা হয়েছে!</h2>
        <p className="text-blue-500 mb-8">
          একটি অপ্রত্যাশিত সমস্যা ঘটেছে। আবার চেষ্টা করুন।
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="btn-primary flex items-center justify-center gap-2 py-3 px-6"
          >
            <RefreshCw size={18} />
            আবার চেষ্টা করুন
          </button>
          <Link href="/" className="btn-secondary flex items-center justify-center gap-2 py-3 px-6">
            <Home size={18} />
            হোমে যান
          </Link>
        </div>
      </div>
    </div>
  );
}
