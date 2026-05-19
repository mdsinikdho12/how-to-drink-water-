"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import {
  Droplets,
  Menu,
  X,
  LogOut,
  User,
  LayoutDashboard,
  BookOpen,
} from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl  flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
              <img
                src="https://img.icons8.com/arcade/64/water.png"
                alt="পানি খান"
              />
            </div>
            <span className="text-lg font-bold text-blue-900">পানি খান </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-blue-700 hover:text-blue-500 font-medium transition-colors">
              হোম
            </Link>
            <Link
              href="/courses"
              className="text-blue-700 hover:text-blue-500 font-medium transition-colors">
              কোর্সসমূহ
            </Link>
            {session ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-800 font-semibold px-4 py-2 rounded-xl transition-all">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white text-sm font-bold">
                    {session.user?.name?.[0]?.toUpperCase()}
                  </div>
                  {session.user?.name?.split(" ")[0]}
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-blue-50 py-2 z-50">
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-3 px-4 py-3 text-blue-800 hover:bg-blue-50 transition-colors"
                      onClick={() => setDropdownOpen(false)}>
                      <LayoutDashboard size={18} className="text-blue-500" />
                      ড্যাশবোর্ড
                    </Link>
                    <Link
                      href="/courses"
                      className="flex items-center gap-3 px-4 py-3 text-blue-800 hover:bg-blue-50 transition-colors"
                      onClick={() => setDropdownOpen(false)}>
                      <BookOpen size={18} className="text-blue-500" />
                      আমার কোর্স
                    </Link>
                    <div className="border-t border-blue-50 my-1" />
                    <button
                      onClick={() => {
                        signOut({ callbackUrl: "/" });
                        setDropdownOpen(false);
                      }}
                      className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 w-full text-left transition-colors">
                      <LogOut size={18} />
                      লগআউট
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/login" className="btn-secondary py-2 px-4 text-sm">
                  লগইন
                </Link>
                <Link
                  href="/register"
                  className="btn-primary py-2 px-4 text-sm">
                  রেজিস্ট্রেশন
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg text-blue-700"
            onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-blue-50 px-4 py-4 space-y-3">
          <Link
            href="/"
            className="block text-blue-800 font-medium py-2"
            onClick={() => setMenuOpen(false)}>
            হোম
          </Link>
          <Link
            href="/courses"
            className="block text-blue-800 font-medium py-2"
            onClick={() => setMenuOpen(false)}>
            কোর্সসমূহ
          </Link>
          {session ? (
            <>
              <Link
                href="/dashboard"
                className="block text-blue-800 font-medium py-2"
                onClick={() => setMenuOpen(false)}>
                ড্যাশবোর্ড
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="block text-red-500 font-medium py-2">
                লগআউট
              </button>
            </>
          ) : (
            <div className="flex gap-3 pt-2">
              <Link
                href="/login"
                className="btn-secondary py-2 px-4 text-sm flex-1 text-center"
                onClick={() => setMenuOpen(false)}>
                লগইন
              </Link>
              <Link
                href="/register"
                className="btn-primary py-2 px-4 text-sm flex-1 text-center"
                onClick={() => setMenuOpen(false)}>
                রেজিস্ট্রেশন
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
