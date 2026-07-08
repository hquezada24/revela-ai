"use client";

import React from "react";
import C from "@/styles/colors";
import { FONT_UI } from "@/styles/fonts";
import { Sparkles, Download, Share2, RefreshCw } from "lucide-react";
import BeforeAfterSlider from "../BeforeAfterSlider";
import Image from "next/image";

interface ResultCardProps {
  isGenerating: boolean;
  progress: number;
  resultUrl?: string;
  beforeUrl?: string;
  useSlider?: boolean;
  onReset?: () => void;
  children?: React.ReactNode;
}

const PROGRESS_STEPS = [
  { max: 25, text: "Analyzing facial characteristics..." },
  { max: 50, text: "Aligning lighting and models..." },
  { max: 75, text: "Synthesizing style mappings..." },
  { max: 99, text: "Enhancing resolution and details..." },
  { max: 100, text: "Finalizing transformation..." },
];

export default function ResultCard({
  isGenerating,
  progress,
  resultUrl,
  beforeUrl,
  useSlider = false,
  onReset,
  children,
}: ResultCardProps) {
  const currentStep = PROGRESS_STEPS.find((s) => progress <= s.max)?.text || "Processing...";

  const handleDownload = () => {
    if (resultUrl) {
      window.open(resultUrl, "_blank");
    }
  };

  const handleShare = () => {
    if (resultUrl) {
      navigator.clipboard.writeText(resultUrl);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center rounded-3xl p-6 overflow-hidden w-full h-full min-h-[400px]"
      style={{
        border: `1px solid ${C.border}`,
        background: "#0B0518",
      }}
    >
      {/* Background glow effects during generation */}
      {isGenerating && (
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full opacity-35 blur-[80px]"
            style={{
              background: "radial-gradient(circle, #6D28D9, #EC4899)",
              animation: "pulse 3s infinite alternate",
            }}
          />
        </div>
      )}

      {isGenerating ? (
        <div className="relative z-10 flex flex-col items-center justify-center text-center w-full max-w-[280px]">
          {/* Sparkles spinner */}
          <div
            className="flex h-16 w-16 items-center justify-center rounded-2xl mb-6 animate-pulse"
            style={{
              background: C.gradSubtle,
              border: "1px solid rgba(109,40,217,0.3)",
            }}
          >
            <Sparkles size={26} className="text-pink-500 animate-spin" style={{ animationDuration: "3s" }} />
          </div>

          <p
            className="text-lg font-bold mb-1"
            style={{ fontFamily: FONT_UI, color: C.text }}
          >
            Generating style...
          </p>
          <p
            className="text-xs mb-6 h-4 transition-all duration-300"
            style={{ fontFamily: FONT_UI, color: C.muted }}
          >
            {currentStep}
          </p>

          {/* Progress bar container */}
          <div
            className="w-full h-1.5 rounded-full overflow-hidden mb-3"
            style={{ background: "rgba(255,255,255,0.06)" }}
          >
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${progress}%`,
                background: C.grad,
                boxShadow: "0 0 12px rgba(109,40,217,0.8)",
              }}
            />
          </div>

          <span
            className="text-sm font-semibold"
            style={{ fontFamily: FONT_UI, color: C.text }}
          >
            {progress}%
          </span>
        </div>
      ) : resultUrl ? (
        <div className="relative z-10 flex flex-col items-center w-full h-full">
          {/* Display Output */}
          <div className="relative w-full flex-1 flex justify-center items-center mb-6 min-h-[300px]">
            {useSlider && beforeUrl ? (
              <BeforeAfterSlider beforeUrl={beforeUrl} afterUrl={resultUrl} className="max-w-[340px]" />
            ) : (
              <div
                className="relative rounded-2xl overflow-hidden w-full max-w-[340px] aspect-[3/4]"
                style={{ border: `1px solid ${C.border}` }}
              >
                <Image
                  src={resultUrl}
                  alt="AI Generated Transformation"
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center gap-3 w-full max-w-[340px]">
            <button
              onClick={handleDownload}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold text-white transition-all duration-150 hover:opacity-90"
              style={{
                fontFamily: FONT_UI,
                background: C.grad,
              }}
            >
              <Download size={14} /> Download
            </button>
            <button
              onClick={handleShare}
              className="flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-150 hover:bg-[rgba(255,255,255,0.08)] text-white"
              style={{
                background: C.glass,
                border: `1px solid ${C.border}`,
              }}
              title="Copy share link"
            >
              <Share2 size={14} />
            </button>
            {onReset && (
              <button
                onClick={onReset}
                className="flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-150 hover:bg-[rgba(255,255,255,0.08)] text-white"
                style={{
                  background: C.glass,
                  border: `1px solid ${C.border}`,
                }}
                title="Start over"
              >
                <RefreshCw size={14} />
              </button>
            )}
          </div>
        </div>
      ) : children ? (
        <div className="relative z-10 w-full h-full flex flex-col">{children}</div>
      ) : (
        <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-sm">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-xl mb-4"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: `1px solid ${C.border}`,
            }}
          >
            <Sparkles size={20} style={{ color: C.muted }} />
          </div>
          <p
            className="text-sm font-semibold mb-1"
            style={{ fontFamily: FONT_UI, color: C.text }}
          >
            Awaiting parameters
          </p>
          <p
            className="text-xs"
            style={{ fontFamily: FONT_UI, color: C.muted, lineHeight: 1.5 }}
          >
            Configure inputs in the sidebar and click generate to view your premium transformation.
          </p>
        </div>
      )}
    </div>
  );
}
