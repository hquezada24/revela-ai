"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import C from "@/styles/colors";
import { FONT_UI } from "@/styles/fonts";

interface AuthInputProps {
  id?: string;
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  autoComplete?: string;
  error?: string;
}

export default function AuthInput({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  autoComplete,
  error,
}: AuthInputProps) {
  const [showPw, setShowPw] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPw ? "text" : "password") : type;

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        style={{
          fontFamily: FONT_UI,
          fontSize: "0.75rem",
          fontWeight: 600,
          color: C.muted,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={inputType}
          placeholder={placeholder}
          value={value}
          autoComplete={autoComplete}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl px-4 py-3.5 text-sm outline-none transition-all duration-200 focus:ring-2"
          style={{
            fontFamily: FONT_UI,
            background: "rgba(255,255,255,0.04)",
            border: error
              ? "1px solid rgba(236,72,153,0.5)"
              : `1px solid ${C.border}`,
            color: C.text,
            caretColor: C.violet,
          }}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPw((p) => !p)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-100 opacity-60"
            aria-label={showPw ? "Ocultar contraseña" : "Mostrar contraseña"}
          >
            {showPw ? (
              <EyeOff size={16} style={{ color: C.muted }} />
            ) : (
              <Eye size={16} style={{ color: C.muted }} />
            )}
          </button>
        )}
      </div>
      {error && (
        <p
          style={{
            fontFamily: FONT_UI,
            fontSize: "0.7rem",
            color: C.pink,
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
}
