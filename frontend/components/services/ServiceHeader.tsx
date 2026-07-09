"use client";

import React from "react";
import C from "@/styles/colors";
import { FONT_DISPLAY, FONT_UI } from "@/styles/fonts";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface ServiceHeaderProps {
  title: string;
  description: string;
  badge: string;
  icon?: React.ComponentType<{
    size?: number;
    className?: string;
    style?: React.CSSProperties;
  }>;
}

export default function ServiceHeader({
  title,
  description,
  badge,
  icon: Icon,
}: ServiceHeaderProps) {
  return (
    <div className="relative w-full pt-10 pb-8 overflow-hidden">
      {/* Ambient background glow for headers */}
      <div
        className="pointer-events-none absolute -top-24 left-10 h-48 w-48 rounded-full opacity-10 blur-[60px]"
        style={{ background: C.violet }}
      />
      <div
        className="pointer-events-none absolute -top-16 right-20 h-36 w-36 rounded-full opacity-10 blur-[50px]"
        style={{ background: C.pink }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
        {/* Breadcrumbs */}
        <div
          className="flex items-center gap-1.5 mb-5 text-xs font-semibold"
          style={{ fontFamily: FONT_UI, color: C.muted }}
        >
          <Link
            href="/"
            className="hover:text-white transition-colors"
            style={{ textDecoration: "none" }}
          >
            Home
          </Link>
          <ChevronRight size={10} />
          <Link
            href="/services"
            className="hover:text-white transition-colors"
            style={{ textDecoration: "none" }}
          >
            Services
          </Link>
          <ChevronRight size={10} />
          <span className="text-white/80">{title}</span>
        </div>

        {/* Title and Badge row */}
        <div className="flex items-center gap-3.5 mb-3 flex-wrap">
          {Icon && (
            <div
              className="flex h-10 w-10 items-center justify-center rounded-xl"
              style={{
                background: C.gradSubtle,
                border: `1px solid rgba(109,40,217,0.3)`,
              }}
            >
              <Icon size={18} style={{ color: C.pink }} />
            </div>
          )}
          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold font-italic"
            style={{
              fontFamily: FONT_DISPLAY,
              fontWeight: 700,
              fontStyle: "italic",
              color: C.text,
              letterSpacing: "-0.01em",
            }}
          >
            {title}
          </h1>

          <span
            className="rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase"
            style={{
              background: C.gradSubtle,
              color: C.pink,
              border: "1px solid rgba(236,72,153,0.25)",
              fontFamily: FONT_UI,
            }}
          >
            {badge}
          </span>
        </div>

        {/* Description */}
        <p
          className="max-w-2xl text-sm md:text-base"
          style={{
            fontFamily: FONT_UI,
            color: C.muted,
            lineHeight: 1.6,
          }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}
