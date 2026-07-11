"use client";

import React from "react";
import C from "@/styles/colors";
import { FONT_UI } from "@/styles/fonts";
import Image from "next/image";
import { Check } from "lucide-react";

interface OptionCardProps {
  selected: boolean;
  onClick: () => void;
  label: string;
  icon?: React.ReactNode;
  image?: string;
  badge?: string;
  className?: string;
}

export default function OptionCard({
  selected,
  onClick,
  label,
  icon,
  image,
  badge,
  className = "",
}: OptionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative flex flex-col items-center justify-center rounded-2xl p-4 transition-all duration-300 w-full overflow-hidden text-left outline-none ${
        image ? "aspect-square" : "min-h-17.5"
      } ${className}`}
      style={{
        background: selected ? "rgba(109,40,217,0.12)" : C.glass,
        border: `1px solid ${selected ? "rgba(109,40,217,0.6)" : C.border}`,
        boxShadow: selected ? "0 0 16px rgba(109,40,217,0.25)" : "none",
        cursor: "pointer",
      }}
    >
      {/* Background image if provided */}
      {image && (
        <div className="absolute inset-0 z-0">
          <Image
            src={image}
            alt={label}
            fill
            sizes="(max-width: 640px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[rgba(7,3,15,0.9)] via-[rgba(7,3,15,0.4)] to-transparent" />
        </div>
      )}

      {/* Selected Indicator */}
      {selected && (
        <div
          className="absolute top-2.5 right-2.5 z-20 flex h-5 w-5 items-center justify-center rounded-full"
          style={{ background: C.violet }}
        >
          <Check size={11} className="text-white font-bold" />
        </div>
      )}

      {/* Badge Indicator */}
      {badge && !selected && (
        <span
          className="absolute top-2 right-2 z-20 rounded px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider"
          style={{
            background: C.gradSubtle,
            color: C.pink,
            border: "1px solid rgba(236,72,153,0.25)",
            fontFamily: FONT_UI,
          }}
        >
          {badge}
        </span>
      )}

      {/* Content */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between items-start">
        {icon && (
          <div
            className="mb-2 flex h-8 w-8 items-center justify-center rounded-xl transition-colors duration-200"
            style={{
              background: selected
                ? "rgba(255,255,255,0.08)"
                : "rgba(255,255,255,0.03)",
              border: `1px solid ${selected ? "rgba(109,40,217,0.3)" : C.border}`,
            }}
          >
            {icon}
          </div>
        )}

        {image ? (
          <span
            className="mt-auto text-sm font-semibold transition-colors duration-200 text-white"
            style={{ fontFamily: FONT_UI }}
          >
            {label}
          </span>
        ) : (
          <span
            className="text-sm font-semibold transition-colors duration-200"
            style={{
              fontFamily: FONT_UI,
              color: selected ? C.text : "rgba(245,241,255,0.8)",
            }}
          >
            {label}
          </span>
        )}
      </div>
    </button>
  );
}
