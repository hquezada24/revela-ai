"use client";

import React, { useState } from "react";
import { ChevronDown, Sliders } from "lucide-react";
import C from "@/styles/colors";
import { FONT_UI } from "@/styles/fonts";
import { motion, AnimatePresence } from "motion/react";

interface AdvancedSettingsProps {
  children: React.ReactNode;
  title?: string;
}

export default function AdvancedSettings({
  children,
  title = "Advanced Parameters",
}: AdvancedSettingsProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="w-full rounded-2xl overflow-hidden mt-6"
      style={{
        border: `1px solid ${C.border}`,
        background: "rgba(255,255,255,0.01)",
      }}
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center justify-between px-4 py-3.5 text-xs font-bold uppercase tracking-wider text-left transition-colors hover:bg-[rgba(255,255,255,0.03)]"
        style={{
          fontFamily: FONT_UI,
          color: C.text,
          border: "none",
          cursor: "pointer",
        }}
      >
        <div className="flex items-center gap-2">
          <Sliders size={12} style={{ color: C.pink }} />
          <span>{title}</span>
        </div>
        <ChevronDown
          size={14}
          className="transition-transform duration-200"
          style={{
            color: C.muted,
            transform: isOpen ? "rotate(180deg)" : "rotate(0)",
          }}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div
              className="px-4 pb-4 pt-2 space-y-4"
              style={{ borderTop: `1px solid ${C.border}` }}
            >
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
