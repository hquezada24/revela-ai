"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import useClickOutside from "@/hooks/useClickOutside";
import { LogOut, Settings, User, Sparkles, Crown } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import C from "@/styles/colors";
import { FONT_UI } from "@/styles/fonts";
import Link from "next/link";

type AvatarProps = {
  email: string;
  size?: "sm" | "md" | "lg";
};

const sizes = {
  sm: "h-10 w-10 text-base",
  md: "h-12 w-12 text-lg",
  lg: "h-16 w-16 text-2xl",
};

export default function Avatar({ email, size = "md" }: AvatarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const initial = email?.trim()?.charAt(0).toUpperCase() || "?";
  
  const { logout } = useAuth();

  useClickOutside(
    dropdownRef,
    useCallback(() => setIsOpen(false), [])
  );

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
    }
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen]);

  // Mock Premium data for demonstration
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isPremium, setIsPremium] = useState(false);
  const credits = isPremium ? 1250 : 15;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((p) => !p)}
        className={`
          ${sizes[size]}
          relative flex items-center justify-center
          rounded-full
          bg-linear-to-br
          from-indigo-600
          via-violet-600
          to-fuchsia-500
          font-bold
          text-white
          ring-1
          ring-white/20
          shadow-[0_0_30px_rgba(139,92,246,0.35)]
          backdrop-blur-xl
          transition-all duration-300
          hover:scale-105
          hover:shadow-[0_0_40px_rgba(139,92,246,0.5)]
          focus:outline-none focus:ring-2 focus:ring-fuchsia-500
        `}
      >
        <div className="absolute inset-0 bg-white/10 blur-xl rounded-full"></div>
        <span className="relative z-10">{initial}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute right-0 mt-3 w-72 rounded-3xl overflow-hidden origin-top-right"
            style={{
              background: "rgba(16,7,32,0.95)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: `1px solid ${C.border}`,
              boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(109,40,217,0.08)",
              zIndex: 100,
            }}
          >
            {/* Header */}
            <div className="p-5 border-b" style={{ borderColor: C.border }}>
              <div className="flex items-center gap-3">
                <div
                  className="h-10 w-10 relative flex items-center justify-center rounded-full bg-linear-to-br from-indigo-600 via-violet-600 to-fuchsia-500 font-bold text-white text-base flex-shrink-0"
                >
                  {initial}
                </div>
                <div className="overflow-hidden">
                  <p 
                    className="truncate text-sm font-semibold"
                    style={{ fontFamily: FONT_UI, color: C.text }}
                  >
                    {email}
                  </p>
                  <p 
                    className="truncate text-[11px] mt-0.5"
                    style={{ fontFamily: FONT_UI, color: C.muted }}
                  >
                    {isPremium ? "Premium member" : "Free account"}
                  </p>
                </div>
              </div>
            </div>

            {/* Credits Section */}
            <div className="p-5">
              {isPremium ? (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md" style={{ background: "rgba(245,158,11,0.15)", border: "1px solid rgba(245,158,11,0.3)" }}>
                      <Crown size={12} color="#F59E0B" />
                      <span className="text-[10px] font-bold text-amber-500 uppercase tracking-wider" style={{ fontFamily: FONT_UI }}>Premium</span>
                    </div>
                    <span className="text-xs font-semibold text-white">{credits} credits</span>
                  </div>
                  <Link href="/billing" className="text-xs text-center font-medium transition-colors hover:text-white" style={{ color: C.muted }}>
                    Manage Subscription
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium" style={{ color: C.muted }}>Credits remaining</span>
                    <span className="text-sm font-bold text-white">{credits}</span>
                  </div>
                  <Link
                    href="/pricing"
                    onClick={() => setIsOpen(false)}
                    className="flex w-full items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-bold text-white transition-all hover:opacity-90"
                    style={{
                      background: C.grad,
                      boxShadow: "0 4px 16px rgba(109,40,217,0.3)",
                      fontFamily: FONT_UI,
                    }}
                  >
                    <Sparkles size={13} />
                    Go Premium
                  </Link>
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="h-px w-full" style={{ background: C.border }} />

            {/* Menu Items */}
            <div className="p-2 flex flex-col">
              <Link
                href="/profile"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2.5 rounded-xl px-4 py-3 text-sm transition-colors hover:bg-[rgba(255,255,255,0.06)] group"
                style={{ fontFamily: FONT_UI, color: C.muted }}
              >
                <User size={16} className="group-hover:text-white transition-colors" />
                <span className="group-hover:text-white transition-colors font-medium">Profile</span>
              </Link>
              <Link
                href="/settings"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2.5 rounded-xl px-4 py-3 text-sm transition-colors hover:bg-[rgba(255,255,255,0.06)] group"
                style={{ fontFamily: FONT_UI, color: C.muted }}
              >
                <Settings size={16} className="group-hover:text-white transition-colors" />
                <span className="group-hover:text-white transition-colors font-medium">Settings</span>
              </Link>
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  logout();
                }}
                className="flex w-full items-center gap-2.5 rounded-xl px-4 py-3 text-sm transition-colors hover:bg-[rgba(236,72,153,0.1)] group"
                style={{ fontFamily: FONT_UI, color: C.pink }}
              >
                <LogOut size={16} />
                <span className="font-medium">Log out</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
