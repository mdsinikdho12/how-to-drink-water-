import { Droplets } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center">
      <div className="text-center">
        <div className="relative inline-block mb-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center animate-pulse shadow-xl">
            <Droplets size={32} className="text-white" />
          </div>
          <div className="absolute inset-0 rounded-full border-4 border-blue-300 border-t-blue-600 animate-spin" />
        </div>
        <p className="text-blue-500 font-medium">লোড হচ্ছে...</p>
      </div>
    </div>
  );
}
