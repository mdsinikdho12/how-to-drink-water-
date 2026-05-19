import Link from 'next/link';
import { Droplets, Heart, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <Droplets size={22} className="text-cyan-300" />
              </div>
              <span className="text-xl font-bold">পানি মাস্টারক্লাস</span>
            </div>
            <p className="text-blue-200 text-sm leading-relaxed">
              সঠিক নিয়মে পানি পান শিখুন। ইসলামিক শরিয়াহ এবং আধুনিক বিজ্ঞানের সমন্বয়ে তৈরি বাংলাদেশের প্রথম পানি পান কোর্স।
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-cyan-300">দ্রুত লিংক</h3>
            <ul className="space-y-2 text-blue-200">
              <li><Link href="/" className="hover:text-white transition-colors">হোম</Link></li>
              <li><Link href="/courses" className="hover:text-white transition-colors">কোর্সসমূহ</Link></li>
              <li><Link href="/login" className="hover:text-white transition-colors">লগইন</Link></li>
              <li><Link href="/register" className="hover:text-white transition-colors">রেজিস্ট্রেশন</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-cyan-300">যোগাযোগ</h3>
            <ul className="space-y-3 text-blue-200">
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-cyan-300 shrink-0" />
                <span className="text-sm">info@panicourse.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-cyan-300 shrink-0" />
                <span className="text-sm">+880 1800-000000</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-blue-300 text-sm">
            © ২০২৪ পানি মাস্টারক্লাস। সর্বস্বত্ব সংরক্ষিত।
          </p>
          <p className="text-blue-300 text-sm flex items-center gap-1.5">
            তৈরি করেছেন <Heart size={14} className="text-red-400 fill-red-400" /> সহ
          </p>
        </div>
      </div>
    </footer>
  );
}
