'use client';

import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import {
  User, Mail, Calendar, BookOpen, Award, Edit2,
  Save, X, LogOut, CheckCircle2, TrendingUp, Droplets
} from 'lucide-react';

export default function ProfilePage() {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [profileData, setProfileData] = useState<any>(null);
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!session) { router.push('/login'); return; }
    fetch('/api/users/profile')
      .then(r => r.json())
      .then(d => {
        setProfileData(d);
        setNewName(d.user?.name || '');
      });
  }, [session]);

  const handleSave = async () => {
    if (!newName.trim()) return;
    setSaving(true);
    try {
      const res = await fetch('/api/users/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName }),
      });
      if (res.ok) {
        setMessage('প্রোফাইল আপডেট হয়েছে ✓');
        setEditing(false);
        setProfileData((prev: any) => ({ ...prev, user: { ...prev.user, name: newName } }));
        setTimeout(() => setMessage(''), 3000);
      }
    } finally {
      setSaving(false);
    }
  };

  const totalCompleted = profileData?.progress?.filter((p: any) => p.progressPercent === 100).length || 0;
  const avgProgress = profileData?.progress?.length
    ? Math.round(profileData.progress.reduce((a: number, p: any) => a + p.progressPercent, 0) / profileData.progress.length)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-24 pb-16">

        {/* Profile Header */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl p-8 text-white mb-6 relative overflow-hidden">
          <div className="absolute -right-10 -top-10 opacity-10">
            <Droplets size={180} />
          </div>
          <div className="flex items-center gap-5 relative z-10">
            <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-4xl font-bold border-2 border-white/30 shrink-0">
              {profileData?.user?.name?.[0]?.toUpperCase() || '?'}
            </div>
            <div className="flex-1 min-w-0">
              {editing ? (
                <div className="flex items-center gap-2">
                  <input
                    value={newName}
                    onChange={e => setNewName(e.target.value)}
                    className="bg-white/20 text-white placeholder-white/60 border border-white/40 rounded-xl px-3 py-2 text-lg font-bold w-full focus:outline-none focus:border-white"
                    placeholder="আপনার নাম"
                    autoFocus
                  />
                  <button onClick={handleSave} disabled={saving} className="p-2 bg-white/20 rounded-xl hover:bg-white/30">
                    {saving ? <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" /> : <Save size={20} />}
                  </button>
                  <button onClick={() => setEditing(false)} className="p-2 bg-white/20 rounded-xl hover:bg-white/30">
                    <X size={20} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold truncate">{profileData?.user?.name}</h1>
                  <button onClick={() => setEditing(true)} className="p-1.5 bg-white/20 rounded-lg hover:bg-white/30 shrink-0">
                    <Edit2 size={16} />
                  </button>
                </div>
              )}
              <p className="text-blue-100 mt-1 flex items-center gap-1.5">
                <Mail size={14} />
                {profileData?.user?.email}
              </p>
            </div>
          </div>
        </div>

        {message && (
          <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-3 rounded-xl mb-4 border border-green-200">
            <CheckCircle2 size={18} />
            {message}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { icon: <BookOpen size={20} className="text-blue-500" />, value: profileData?.user?.enrolledCourses?.length || 0, label: 'এনরোল', bg: 'bg-blue-50' },
            { icon: <Award size={20} className="text-yellow-500" />, value: totalCompleted, label: 'সম্পন্ন', bg: 'bg-yellow-50' },
            { icon: <TrendingUp size={20} className="text-purple-500" />, value: `${avgProgress}%`, label: 'অগ্রগতি', bg: 'bg-purple-50' },
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-blue-50 text-center">
              <div className={`w-10 h-10 ${s.bg} rounded-xl flex items-center justify-center mx-auto mb-2`}>{s.icon}</div>
              <div className="text-2xl font-bold text-blue-900">{s.value}</div>
              <div className="text-xs text-blue-400 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Account Info */}
        <div className="bg-white rounded-2xl shadow-sm border border-blue-50 p-6 mb-6">
          <h2 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
            <User size={20} className="text-blue-500" />
            একাউন্ট তথ্য
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-blue-50">
              <span className="text-blue-500 text-sm">নাম</span>
              <span className="font-semibold text-blue-900">{profileData?.user?.name}</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-blue-50">
              <span className="text-blue-500 text-sm">ইমেইল</span>
              <span className="font-semibold text-blue-900 text-sm">{profileData?.user?.email}</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-blue-500 text-sm">যোগদান</span>
              <span className="font-semibold text-blue-900 text-sm">
                {profileData?.user?.createdAt
                  ? new Date(profileData.user.createdAt).toLocaleDateString('bn-BD')
                  : '—'}
              </span>
            </div>
          </div>
        </div>

        {/* Course Progress */}
        {profileData?.progress?.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-blue-50 p-6 mb-6">
            <h2 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
              <TrendingUp size={20} className="text-blue-500" />
              কোর্সের অগ্রগতি
            </h2>
            <div className="space-y-4">
              {profileData.progress.map((p: any, i: number) => {
                const course = profileData.user.enrolledCourses?.find(
                  (c: any) => c._id?.toString() === p.courseId?.toString()
                );
                return (
                  <div key={i}>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-sm text-blue-700 font-medium truncate mr-4">
                        {course?.title || 'কোর্স'}
                      </span>
                      <span className="text-sm font-bold text-blue-800 shrink-0">{p.progressPercent}%</span>
                    </div>
                    <div className="w-full bg-blue-100 rounded-full h-2">
                      <div className="progress-bar h-2" style={{ width: `${p.progressPercent}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Danger Zone */}
        <div className="bg-white rounded-2xl shadow-sm border border-red-100 p-6">
          <h2 className="text-lg font-bold text-red-600 mb-4">সেটিংস</h2>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="flex items-center gap-2 text-red-500 hover:text-red-700 font-semibold transition-colors"
          >
            <LogOut size={18} />
            লগআউট করুন
          </button>
        </div>
      </div>
    </div>
  );
}
