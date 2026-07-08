"use client";

import { useState, useEffect, useRef } from "react";
import { X, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import C from "@/styles/colors";
import { FONT_UI, FONT_DISPLAY } from "@/styles/fonts";
import AuthInput from "@/components/auth/AuthInput";
import useClickOutside from "@/hooks/useClickOutside";
import useLogIn from "@/hooks/useLogIn";
import useAuth from "@/hooks/useAuth";
import { LoginData } from "@/schemas";

interface LoginDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function LoginDialog({ open, onClose }: LoginDialogProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const { fetchUser } = useAuth();
  const { mutateAsync } = useLogIn();

  useClickOutside(panelRef, () => {
    if (open) onClose();
  });

  // Animate in/out
  useEffect(() => {
    if (open) {
      // tiny delay so CSS transition fires
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Prevent body scroll while open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const onSubmit = async (data: LoginData) => {
    try {
      console.log("submitting: ", data);
      await mutateAsync(data);
      await fetchUser();
      onClose();
    } catch (error) {
      if (error instanceof Error) {
        console.log(`Error message: ${error.message}`);
      }
    }
  };

  if (!open && !visible) return null;

  return (
    <div
      className="fixed inset-0 z-[200] hidden lg:flex items-center justify-center"
      style={{
        background: `rgba(7,3,15,${visible ? "0.72" : "0"})`,
        backdropFilter: visible ? "blur(8px)" : "blur(0px)",
        WebkitBackdropFilter: visible ? "blur(8px)" : "blur(0px)",
        transition: "background 0.25s, backdrop-filter 0.25s",
      }}
    >
      <div
        ref={panelRef}
        className="relative w-full max-w-md rounded-3xl p-9"
        style={{
          background: "rgba(16,7,32,0.95)",
          border: `1px solid ${C.border}`,
          boxShadow:
            "0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(109,40,217,0.1)",
          transform: visible
            ? "translateY(0) scale(1)"
            : "translateY(-12px) scale(0.97)",
          opacity: visible ? 1 : 0,
          transition:
            "transform 0.28s cubic-bezier(0.22,1,0.36,1), opacity 0.28s",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-[rgba(255,255,255,0.07)]"
          style={{ color: C.muted }}
          aria-label="Cerrar"
        >
          <X size={16} />
        </button>

        {/* Logo */}
        <div className="flex items-center gap-2.5 mb-7">
          <span
            style={{
              fontFamily: FONT_DISPLAY,
              fontWeight: 700,
              fontSize: "1.5rem",
              fontStyle: "italic",
              background: C.grad,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Révéla
          </span>
        </div>

        {/* Header */}
        <div className="mb-6">
          <div
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold mb-3"
            style={{
              background: "rgba(109,40,217,0.15)",
              color: C.violet,
              border: "1px solid rgba(109,40,217,0.25)",
              fontFamily: FONT_UI,
            }}
          >
            <Sparkles size={9} />
            BIENVENIDA DE VUELTA
          </div>
          <h2
            style={{
              fontFamily: FONT_DISPLAY,
              fontWeight: 700,
              fontStyle: "italic",
              fontSize: "1.9rem",
              color: C.text,
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
            }}
          >
            Inicia sesión en{" "}
            <span
              style={{
                background: C.grad,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Révéla
            </span>
          </h2>
          <p
            className="mt-1.5 text-xs"
            style={{ fontFamily: FONT_UI, color: C.muted, lineHeight: 1.6 }}
          >
            Accede a tu estilo personalizado con IA
          </p>
        </div>

        {/* Form */}
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit({ email, password });
          }}
        >
          <AuthInput
            id="dialog-email"
            label="Correo electrónico"
            type="email"
            placeholder="tu@email.com"
            value={email}
            onChange={setEmail}
            autoComplete="email"
          />
          <AuthInput
            id="dialog-password"
            label="Contraseña"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={setPassword}
            autoComplete="current-password"
          />

          <div className="flex justify-end -mt-1">
            <button
              type="button"
              className="text-xs opacity-70 hover:opacity-100 transition-opacity"
              style={{ fontFamily: FONT_UI, color: C.violet }}
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          <button
            type="submit"
            className="mt-1 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            style={{
              fontFamily: FONT_UI,
              background: C.grad,
              boxShadow: "0 6px 24px rgba(109,40,217,0.45)",
            }}
          >
            Iniciar sesión <ArrowRight size={15} />
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-1">
            <div className="flex-1 h-px" style={{ background: C.border }} />
            <span
              className="text-[11px]"
              style={{ fontFamily: FONT_UI, color: C.muted }}
            >
              o continúa con
            </span>
            <div className="flex-1 h-px" style={{ background: C.border }} />
          </div>

          {/* Google */}
          <button
            type="button"
            className="flex w-full items-center justify-center gap-2.5 rounded-xl py-3 text-sm font-semibold transition-all duration-200 hover:border-[rgba(255,255,255,0.18)] hover:bg-[rgba(255,255,255,0.06)] active:scale-[0.98]"
            style={{
              fontFamily: FONT_UI,
              color: C.text,
              border: `1px solid ${C.border}`,
              background: "rgba(255,255,255,0.04)",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 18 18">
              <path
                d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
                fill="#4285F4"
              />
              <path
                d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
                fill="#34A853"
              />
              <path
                d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
                fill="#FBBC05"
              />
              <path
                d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z"
                fill="#EA4335"
              />
            </svg>
            Google
          </button>
        </form>

        {/* Footer */}
        <p
          className="mt-6 text-center text-xs"
          style={{ fontFamily: FONT_UI, color: C.muted }}
        >
          ¿No tienes cuenta?{" "}
          <Link
            href="/signup"
            onClick={onClose}
            className="font-semibold hover:opacity-90 transition-opacity"
            style={{ color: C.violet }}
          >
            Regístrate gratis
          </Link>
        </p>
      </div>
    </div>
  );
}
