'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Droplets, Mail, Lock, Eye, EyeOff, User, UserPlus, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (form.password !== form.confirmPassword) {
      setError('পাসওয়ার্ড দুটি মিলছে না');
      return;
    }

    if (form.password.length < 6) {
      setError('পাসওয়ার্ড কমপক্ষে ৬ অক্ষর হতে হবে');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'রেজিস্ট্রেশনে সমস্যা হয়েছে');
        return;
      }

      setSuccess('একাউন্ট তৈরি হয়েছে! লগইন হচ্ছে...');

      // Auto login
      await signIn('credentials', {
        email: form.email,
        password: form.password,
        redirect: false,
      });

      setTimeout(() => router.push('/dashboard'), 1000);
    } catch {
      setError('সমস্যা হয়েছে। আবার চেষ্টা করুন।');
    } finally {
      setLoading(false);
    }
  };

  const passwordStrength = () => {
    const p = form.password;
    if (p.length === 0) return null;
    if (p.length < 6) return { level: 1, label: 'দুর্বল', color: 'bg-red-400' };
    if (p.length < 10) return { level: 2, label: 'মাঝামাঝি', color: 'bg-yellow-400' };
    return { level: 3, label: 'শক্তিশালী', color: 'bg-green-400' };
  };

  const strength = passwordStrength();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 flex items-center justify-center p-4">
      <div className="absolute top-20 right-20 w-16 h-20 water-drop opacity-20 animate-float" />
      <div className="absolute bottom-40 left-16 w-12 h-15 water-drop opacity-15 animate-float" style={{ animationDelay: '2s' }} />

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
            <h1 className="text-2xl font-bold text-blue-900 mb-2">একাউন্ট তৈরি করুন 🎉</h1>
            <p className="text-blue-500">বিনামূল্যে রেজিস্ট্রেশন করুন এবং কোর্স শুরু করুন</p>
          </div>

          {error && (
            <div className="flex items-start gap-3 bg-red-50 text-red-700 px-4 py-3 rounded-xl mb-6 border border-red-100">
              <AlertCircle size={18} className="shrink-0 mt-0.5" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          {success && (
            <div className="flex items-start gap-3 bg-green-50 text-green-700 px-4 py-3 rounded-xl mb-6 border border-green-100">
              <CheckCircle2 size={18} className="shrink-0 mt-0.5" />
              <span className="text-sm">{success}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-blue-800 mb-2">পুরো নাম</label>
              <div className="relative">
                <User size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-400" />
                <input
                  type="text"
                  className="input-field"
                  placeholder="আপনার নাম লিখুন"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
            </div>

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
                  placeholder="কমপক্ষে ৬ অক্ষর"
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
              {strength && (
                <div className="mt-2">
                  <div className="flex gap-1">
                    {[1, 2, 3].map(l => (
                      <div
                        key={l}
                        className={`h-1.5 flex-1 rounded-full transition-all ${l <= strength.level ? strength.color : 'bg-gray-200'}`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">পাসওয়ার্ড: {strength.label}</p>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-semibold text-blue-800 mb-2">পাসওয়ার্ড নিশ্চিত করুন</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  className={`input-field ${form.confirmPassword && form.password !== form.confirmPassword ? 'border-red-300' : ''}`}
                  placeholder="পাসওয়ার্ড আবার লিখুন"
                  value={form.confirmPassword}
                  onChange={e => setForm({ ...form, confirmPassword: e.target.value })}
                  required
                />
                {form.confirmPassword && form.password === form.confirmPassword && (
                  <CheckCircle2 size={18} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-green-500" />
                )}
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
                  একাউন্ট তৈরি হচ্ছে...
                </>
              ) : (
                <>
                  <UserPlus size={20} />
                  রেজিস্ট্রেশন করুন
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-blue-500 text-sm">
              ইতিমধ্যে একাউন্ট আছে?{' '}
              <Link href="/login" className="text-blue-600 font-bold hover:underline">
                লগইন করুন
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
