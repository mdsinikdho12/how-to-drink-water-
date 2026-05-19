import Link from "next/link";
import {
  Droplets,
  Star,
  BookOpen,
  Clock,
  CheckCircle2,
  Award,
  Sparkles,
  ChevronRight,
  Play,
  ShieldCheck,
  Zap,
  Globe,
  FlaskConical,
  Trophy,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const features = [
  {
    icon: "📚",
    emoji: true,
    title: "৫টি সম্পূর্ণ মডিউল",
    desc: "বেসিক থেকে অ্যাডভান্সড পর্যন্ত সব কিছু",
  },
  {
    icon: "🕌",
    emoji: true,
    title: "ইসলামিক শরিয়াহ",
    desc: "কুরআন-হাদিসের আলোকে পানি পানের আদব",
  },
  {
    icon: "🔬",
    emoji: true,
    title: "বৈজ্ঞানিক পদ্ধতি",
    desc: "গবেষণা ভিত্তিক হাইড্রেশন টেকনিক",
  },
  {
    icon: "🏆",
    emoji: true,
    title: "সার্টিফিকেট",
    desc: "কোর্স শেষে অফিশিয়াল সার্টিফিকেট পান",
  },
  {
    icon: "🇧🇩",
    emoji: true,
    title: "বাংলা ভাষায়",
    desc: "১০০% বাংলায় তৈরি, সহজ ভাষায়",
  },
  {
    icon: "⏱️",
    emoji: true,
    title: "নিজের সময়ে শিখুন",
    desc: "যেকোনো সময়, যেকোনো ডিভাইসে",
  },
];

const modules = [
  {
    no: "০১",
    title: "পানির পরিচয় ও গুরুত্ব",
    lessons: 3,
    icon: "💧",
    bg: "#dbeafe",
  },
  {
    no: "০২",
    title: "ইসলামিক শরিয়াহ অনুযায়ী পানি পান",
    lessons: 4,
    icon: "🕌",
    bg: "#d1fae5",
  },
  {
    no: "০৩",
    title: "বৈজ্ঞানিক পদ্ধতিতে পানি পান",
    lessons: 4,
    icon: "🔬",
    bg: "#ede9fe",
  },
  {
    no: "০৪",
    title: "বিশেষ পরিস্থিতিতে পানি পান",
    lessons: 4,
    icon: "🏥",
    bg: "#ffe4e6",
  },
  {
    no: "০৫",
    title: "অ্যাডভান্সড হাইড্রেশন টেকনিক",
    lessons: 3,
    icon: "⭐",
    bg: "#fef3c7",
  },
];

const testimonials = [
  {
    name: "রাহেলা বেগম",
    location: "ঢাকা",
    text: "এই কোর্স করার পর আমার স্বাস্থ্য অনেক ভালো হয়েছে। ইসলামিক পদ্ধতিতে পানি পানের নিয়ম জানতে পেরেছি।",
    rating: 5,
    avatar: "র",
  },
  {
    name: "মোহাম্মদ করিম",
    location: "চট্টগ্রাম",
    text: "অবিশ্বাস্য! পানি খাওয়ার উপরও যে এত কিছু জানার আছে, আগে কখনো ভাবিনি। অসাধারণ কোর্স।",
    rating: 5,
    avatar: "ম",
  },
  {
    name: "সুমাইয়া আক্তার",
    location: "সিলেট",
    text: "রমজানে পানি পানের কৌশল সবচেয়ে কাজে লেগেছে। বাচ্চাদের সঠিক নিয়মে খাওয়াতে পারছি এখন।",
    rating: 5,
    avatar: "স",
  },
];

const stats = [
  { value: "৫,০০০+", label: "শিক্ষার্থী" },
  { value: "২৪", label: "লেসন" },
  { value: "৪.৯", label: "রেটিং" },
  { value: "১০০%", label: "বাংলায়" },
];

const islamicPoints = [
  "বিসমিল্লাহ বলে পানি পান করা",
  "ডান হাতে ও বসে পানি পান করা",
  "তিন চুমুকে পানি পান করার সুন্নাহ",
  "পাত্রে ফুঁ না দেওয়া",
  "যমযমের পানির বিশেষ ফজিলত",
];

export default function HomePage() {
  return (
    <div className="min-h-screen font-hind">
      <Navbar />

      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden pt-28 pb-32"
        style={{
          background:
            "linear-gradient(160deg,#003580 0%,#0066cc 45%,#0099cc 100%)",
        }}>
        {/* floating drops */}
        {[
          { w: 120, h: 150, top: "10%", left: "4%", delay: "0s", op: 0.5 },
          { w: 70, h: 90, top: "30%", right: "6%", delay: "2s", op: 0.35 },
          { w: 50, h: 65, bottom: "15%", left: "20%", delay: "1s", op: 0.3 },
          { w: 90, h: 110, top: "55%", right: "18%", delay: "3s", op: 0.25 },
        ].map((d, i) => (
          <div
            key={i}
            className="absolute animate-float pointer-events-none"
            style={{
              width: d.w,
              height: d.h,
              top: d.top,
              left: (d as any).left,
              right: (d as any).right,
              bottom: (d as any).bottom,
              background: "rgba(255,255,255,0.07)",
              borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
              opacity: d.op,
              animationDelay: d.delay,
            }}
          />
        ))}

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div
            className="inline-flex items-center gap-2 text-sm font-semibold mb-7 px-4 py-2 rounded-full"
            style={{
              background: "rgba(255,255,255,0.15)",
              border: "1px solid rgba(255,255,255,0.25)",
              color: "#cce8ff",
            }}>
            <Sparkles size={14} className="text-yellow-300" />
            বাংলাদেশের প্রথম পানি পান কোর্স
          </div>

          <h1 className="text-5xl sm:text-6xl font-bold text-white leading-tight mb-4">
            সঠিক নিয়মে
            <span className="block" style={{ color: "#67e8f9" }}>
              পানি পান করা শিখুন
            </span>
          </h1>

          <p
            className="text-lg mb-10 max-w-lg mx-auto leading-relaxed"
            style={{ color: "#a5d8ff" }}>
            ইসলামিক শরিয়াহ ও আধুনিক বিজ্ঞানের আলোকে পানি পানের সম্পূর্ণ গাইড —
            সুস্বাস্থ্য অর্জন করুন, সুন্নাহ মেনে চলুন।
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
            <Link
              href="/register"
              className="flex items-center justify-center gap-2 bg-white font-bold text-base px-8 py-4 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-2xl"
              style={{ color: "#0055cc" }}>
              <Play size={18} fill="currentColor" />
              বিনামূল্যে শুরু করুন
            </Link>
            <Link
              href="/courses"
              className="flex items-center justify-center gap-2 font-semibold text-base px-8 py-4 rounded-xl transition-all hover:bg-white/20"
              style={{
                background: "rgba(255,255,255,0.12)",
                border: "1.5px solid rgba(255,255,255,0.35)",
                color: "#fff",
              }}>
              কোর্স দেখুন
              <ChevronRight size={18} />
            </Link>
          </div>

          <div
            className="flex flex-wrap items-center justify-center gap-6"
            style={{ color: "#a5d8ff" }}>
            {[
              "বিনামূল্যে এনরোল",
              "সার্টিফিকেট প্রদান",
              "লাইফটাইম অ্যাক্সেস",
            ].map((t, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <div
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: "#67e8f9" }}
                />
                {t}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <div
        className="bg-white border-b grid grid-cols-2 md:grid-cols-4"
        style={{ borderColor: "#e8f3ff" }}>
        {stats.map((s, i) => (
          <div
            key={i}
            className="py-7 text-center"
            style={{ borderRight: i < 3 ? "0.5px solid #e8f3ff" : "none" }}>
            <div className="text-3xl font-bold gradient-text leading-none mb-1">
              {s.value}
            </div>
            <div className="text-sm font-medium" style={{ color: "#7a9ab0" }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* ── FEATURES ── */}
      <section className="py-16" style={{ background: "#f5faff" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2
              className="text-3xl font-bold mb-2"
              style={{ color: "#0a2540" }}>
              এই কোর্সে কী পাবেন?
            </h2>
            <p style={{ color: "#5a7a90" }}>
              শুধু পানি পান নয় — একটি সুস্থ জীবনযাপনের পূর্ণ গাইড
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 hover-lift"
                style={{ border: "0.5px solid #dceefa" }}>
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
                  style={{ background: "#eef6ff" }}>
                  {f.icon}
                </div>
                <h3 className="font-bold mb-1.5" style={{ color: "#0a2540" }}>
                  {f.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#6a8aa0" }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MODULES ── */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2
              className="text-3xl font-bold mb-2"
              style={{ color: "#0a2540" }}>
              কোর্সের কারিকুলাম
            </h2>
            <p style={{ color: "#5a7a90" }}>
              ৫টি মডিউল, ২৪টি লেসন — সম্পূর্ণ বিশেষজ্ঞ গাইড
            </p>
          </div>
          <div className="max-w-2xl mx-auto space-y-3">
            {modules.map((m, i) => (
              <Link
                key={i}
                href="/courses"
                className="flex items-center gap-4 rounded-2xl px-5 py-4 group transition-all"
                style={{
                  background: "#f5faff",
                  border: "0.5px solid #d8eefa",
                }}>
                <div
                  className="w-13 h-13 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ background: m.bg, width: 52, height: 52 }}>
                  {m.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div
                    className="text-xs font-bold mb-0.5"
                    style={{
                      color: "#7aabbf",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                    }}>
                    মডিউল {m.no}
                  </div>
                  <div
                    className="font-bold text-sm leading-snug"
                    style={{ color: "#0a2540" }}>
                    {m.title}
                  </div>
                  <div
                    className="text-xs mt-1 flex items-center gap-1"
                    style={{ color: "#8ab0c0" }}>
                    <BookOpen size={12} />
                    {m.lessons}টি লেসন
                  </div>
                </div>
                <ChevronRight
                  size={18}
                  className="flex-shrink-0 transition-transform group-hover:translate-x-1"
                  style={{ color: "#b0cfe0" }}
                />
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/courses"
              className="btn-primary inline-flex items-center gap-2 px-8 py-3.5 text-base">
              সম্পূর্ণ কোর্স দেখুন <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── ISLAMIC ── */}
      <section
        className="py-16"
        style={{ background: "linear-gradient(135deg,#f0faf4,#e6f9f2)" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div>
              <div
                className="inline-flex items-center gap-2 text-sm font-bold px-3 py-1.5 rounded-full mb-5"
                style={{ background: "#d1f0e0", color: "#15803d" }}>
                <ShieldCheck size={14} />
                ইসলামিক শরিয়াহ
              </div>
              <h2
                className="text-3xl font-bold mb-4 leading-snug"
                style={{ color: "#14532d" }}>
                সুন্নাহ মেনে পানি পান করুন
              </h2>
              <p
                className="text-base mb-7 leading-relaxed"
                style={{ color: "#2d6a44" }}>
                রাসুলুল্লাহ ﷺ এর সুন্নাহ অনুযায়ী পানি পানের সম্পূর্ণ গাইড —
                কুরআন ও হাদিসের আলোকে।
              </p>
              <div className="space-y-3">
                {islamicPoints.map((pt, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: "#22c55e" }}>
                      <CheckCircle2 size={13} className="text-white" />
                    </div>
                    <span className="font-medium" style={{ color: "#166534" }}>
                      {pt}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right card */}
            <div
              className="rounded-3xl p-8"
              style={{ background: "#fff", border: "0.5px solid #c6e8d5" }}>
              <p
                className="text-xs font-bold text-center mb-5 tracking-widest uppercase"
                style={{ color: "#7abf96" }}>
                পানি পানের দোয়া
              </p>
              <div
                className="rounded-2xl p-5 text-center mb-3"
                style={{
                  background: "#f0faf4",
                  border: "0.5px solid #c6e8d5",
                }}>
                <p
                  className="text-3xl font-bold mb-2 leading-relaxed"
                  dir="rtl"
                  style={{ color: "#14532d", fontFamily: "serif" }}>
                  بِسْمِ اللَّهِ
                </p>
                <p
                  className="text-sm font-semibold"
                  style={{ color: "#4a9065" }}>
                  পানি পানের আগে
                </p>
              </div>
              <div
                className="rounded-2xl p-5 text-center"
                style={{
                  background: "#eef6ff",
                  border: "0.5px solid #b8d8f8",
                }}>
                <p
                  className="text-3xl font-bold mb-2 leading-relaxed"
                  dir="rtl"
                  style={{ color: "#0a3880", fontFamily: "serif" }}>
                  الْحَمْدُ لِلَّهِ
                </p>
                <p
                  className="text-sm font-semibold"
                  style={{ color: "#3a6aaa" }}>
                  পানি পানের পরে
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold" style={{ color: "#0a2540" }}>
              শিক্ষার্থীরা কী বলছেন
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="rounded-2xl p-6 hover-lift"
                style={{ background: "#fff", border: "0.5px solid #dceefa" }}>
                <div className="flex gap-0.5 mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star
                      key={j}
                      size={15}
                      className="fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p
                  className="text-sm leading-relaxed mb-5"
                  style={{ color: "#3a5a70" }}>
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                    style={{
                      background: "linear-gradient(135deg,#0077e6,#00c8d4)",
                    }}>
                    {t.avatar}
                  </div>
                  <div>
                    <div
                      className="text-sm font-bold"
                      style={{ color: "#0a2540" }}>
                      {t.name}
                    </div>
                    <div className="text-xs" style={{ color: "#8ab0c0" }}>
                      {t.location}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="py-20 text-center relative overflow-hidden"
        style={{
          background: "linear-gradient(160deg,#003580,#0066cc 50%,#0099cc)",
        }}>
        {[
          { w: 100, h: 130, top: "5%", right: "8%", delay: "0s", op: 0.2 },
          { w: 60, h: 80, bottom: "10%", left: "10%", delay: "2s", op: 0.15 },
        ].map((d, i) => (
          <div
            key={i}
            className="absolute animate-float pointer-events-none"
            style={{
              width: d.w,
              height: d.h,
              top: (d as any).top,
              bottom: (d as any).bottom,
              left: (d as any).left,
              right: (d as any).right,
              opacity: d.op,
              background: "rgba(255,255,255,0.07)",
              borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
              animationDelay: d.delay,
            }}
          />
        ))}
        <div className="relative z-10 max-w-xl mx-auto px-4">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-4xl mx-auto mb-6"
            style={{ background: "rgba(255,255,255,0.15)" }}>
            💧
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            আজই শুরু করুন আপনার যাত্রা
          </h2>
          <p
            className="text-base mb-10 leading-relaxed"
            style={{ color: "#a5d8ff" }}>
            হাজার হাজার মানুষ সঠিক নিয়মে পানি পান শিখে সুস্বাস্থ্য উপভোগ করছেন।
            আপনি কি পিছিয়ে থাকবেন?
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-3 bg-white font-bold text-base px-10 py-5 rounded-2xl transition-all hover:-translate-y-0.5 hover:shadow-2xl"
            style={{ color: "#0044aa" }}>
            <Droplets size={20} style={{ color: "#0077e6" }} />
            বিনামূল্যে রেজিস্ট্রেশন করুন
            <ChevronRight size={18} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
