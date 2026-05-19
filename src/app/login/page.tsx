'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Droplets, Mail, Lock, Eye, EyeOff, LogIn, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        email: form.email,
        password: form.password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        router.push('/dashboard');
        router.refresh();
      }
    } catch {
      setError('লগইনে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 flex items-center justify-center p-4">
      {/* Background water drops */}
      <div className="absolute top-20 left-20 w-20 h-24 water-drop opacity-20 animate-float" />
      <div className="absolute bottom-20 right-20 w-14 h-18 water-drop opacity-15 animate-float" style={{ animationDelay: '3s' }} />

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg">
              <Droplets size={24} className="text-white" />
            </div>
            <span className="text-2xl font-bold text-blue-900">পানি মাস্টারক্লাস</span>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-blue-50">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-blue-900 mb-2">স্বাগতম ফিরে আসুন! 👋</h1>
            <p className="text-blue-500">আপনার একাউন্টে লগইন করুন</p>
          </div>

          {error && (
            <div className="flex items-start gap-3 bg-red-50 text-red-700 px-4 py-3 rounded-xl mb-6 border border-red-100">
              <AlertCircle size={18} className="shrink-0 mt-0.5" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-blue-800 mb-2">ইমেইল</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-400" />
                <input
                  type="email"
                  className="input-field"
                  placeholder="আপনার ইমেইল লিখুন"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-blue-800 mb-2">পাসওয়ার্ড</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="input-field pr-12"
                  placeholder="পাসওয়ার্ড লিখুন"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-blue-400 hover:text-blue-600 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-4 flex items-center justify-center gap-2.5 text-base mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  লগইন হচ্ছে...
                </>
              ) : (
                <>
                  <LogIn size={20} />
                  লগইন করুন
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-blue-500 text-sm">
              একাউন্ট নেই?{' '}
              <Link href="/register" className="text-blue-600 font-bold hover:underline">
                রেজিস্ট্রেশন করুন
              </Link>
            </p>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link href="/" className="text-blue-400 text-sm hover:text-blue-600 transition-colors">
            ← হোম পেজে ফিরুন
          </Link>
        </div>
      </div>
    </div>
  );
}
