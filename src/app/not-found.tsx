import Link from 'next/link';
import { Droplets, Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 flex items-center justify-center p-4">
      {/* floating drops */}
      <div className="absolute top-20 left-16 w-16 h-20 water-drop opacity-20 animate-float" />
      <div className="absolute bottom-24 right-16 w-12 h-16 water-drop opacity-15 animate-float" style={{ animationDelay: '2s' }} />

      <div className="text-center max-w-md relative z-10">
        {/* Big drop animation */}
        <div className="relative inline-block mb-8">
          <div className="w-32 h-40 mx-auto bg-gradient-to-br from-blue-400 to-cyan-300 rounded-full rounded-tl-none animate-float shadow-2xl flex items-center justify-center">
            <span className="text-white font-black text-5xl">৪০৪</span>
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white text-lg">!</span>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-blue-900 mb-3">
          পাতাটি পাওয়া যায়নি
        </h1>
        <p className="text-blue-500 text-lg mb-2">
          আপনি যা খুঁজছেন তা এখানে নেই।
        </p>
        <p className="text-blue-400 mb-10 text-sm">
          হয়তো লিংকটি ভুল, অথবা পাতাটি সরিয়ে নেওয়া হয়েছে।
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="btn-primary flex items-center justify-center gap-2 py-3 px-6"
          >
            <Home size={18} />
            হোম পেজে যান
          </Link>
          <Link
            href="/courses"
            className="btn-secondary flex items-center justify-center gap-2 py-3 px-6"
          >
            <Droplets size={18} />
            কোর্স দেখুন
          </Link>
        </div>
      </div>
    </div>
  );
}
