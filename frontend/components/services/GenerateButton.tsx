"use client";
import C from "@/styles/colors";
import { FONT_UI } from "@/styles/fonts";
import { Sparkles } from "lucide-react";

interface GenerateButtonProps {
  onClick: () => void;
  loading: boolean;
  disabled?: boolean;
  text: string;
  loadingText?: string;
  className?: string;
}

export default function GenerateButton({
  onClick,
  loading,
  disabled = false,
  text,
  loadingText = "Transforming...",
  className = "",
}: GenerateButtonProps) {
  const isButtonDisabled = disabled || loading;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isButtonDisabled}
      className={`group relative flex items-center justify-center gap-2.5 rounded-2xl w-full py-4 text-base font-bold text-white transition-all duration-200 ${
        isButtonDisabled
          ? "opacity-60 cursor-not-allowed"
          : "hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(109,40,217,0.6)]"
      } ${className}`}
      style={{
        fontFamily: FONT_UI,
        background: C.grad,
        boxShadow: isButtonDisabled
          ? "none"
          : "0 8px 24px rgba(109,40,217,0.4)",
        border: "none",
        cursor: isButtonDisabled ? "not-allowed" : "pointer",
      }}
    >
      {loading ? (
        <>
          <div className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
          <span>{loadingText}</span>
        </>
      ) : (
        <>
          <Sparkles
            size={16}
            className="text-white group-hover:animate-pulse"
          />
          <span>{text}</span>
        </>
      )}
    </button>
  );
}
