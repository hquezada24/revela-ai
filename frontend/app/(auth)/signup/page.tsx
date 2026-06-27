"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Sparkles, User, Bell, Check } from "lucide-react";
import C from "@/styles/colors";
import { FONT_UI, FONT_DISPLAY } from "@/styles/fonts";
import AuthInput from "@/components/auth/AuthInput";
import AuthStepIndicator from "@/components/auth/AuthStepIndicator";

const STEPS = ["Cuenta", "Perfil", "Estilo", "¡Listo!"];

const STYLE_GOALS = [
  { id: "professional", label: "Fotos profesionales", emoji: "📸" },
  { id: "makeup", label: "Maquillaje", emoji: "💄" },
  { id: "hair", label: "Peinados", emoji: "💇" },
  { id: "outfits", label: "Outfits", emoji: "👗" },
  { id: "color", label: "Análisis de color", emoji: "🎨" },
  { id: "stylist", label: "Estilista IA", emoji: "✨" },
];

export default function SignupPage() {
  const [step, setStep] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [animDir, setAnimDir] = useState<"forward" | "backward">("forward");

  // Step 0: Account
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Step 1: Profile
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");

  // Step 2: Style Goals
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  function goNext() {
    if (step === 0) {
      let ok = true;
      if (!email.includes("@")) {
        setEmailError("Ingresa un correo válido");
        ok = false;
      } else {
        setEmailError("");
      }
      if (password.length < 8) {
        setPasswordError("Mínimo 8 caracteres");
        ok = false;
      } else {
        setPasswordError("");
      }
      if (!ok) return;
    }
    if (step === 1) {
      if (!name.trim()) {
        setNameError("Por favor ingresa tu nombre");
        return;
      }
      setNameError("");
    }
    setAnimDir("forward");
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }

  function goBack() {
    setAnimDir("backward");
    setStep((s) => Math.max(s - 1, 0));
  }

  function toggleGoal(id: string) {
    setSelectedGoals((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  }

  return (
    <div
      className="relative flex min-h-screen flex-col overflow-hidden"
      style={{ background: C.bg }}
    >
      {/* Ambient glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-32 -right-32 h-72 w-72 rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, #EC4899, transparent 70%)",
          }}
        />
        <div
          className="absolute top-1/2 -left-40 h-80 w-80 rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, #6D28D9, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-10 right-1/4 h-56 w-56 rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #F59E0B, transparent 70%)",
          }}
        />
      </div>

      <div className="relative flex flex-1 flex-col items-center justify-center px-6 py-12">
        {/* Logo */}
        <Link href="/" className="mb-8">
          <span
            style={{
              fontFamily: FONT_DISPLAY,
              fontWeight: 700,
              fontSize: "2rem",
              fontStyle: "italic",
              background: C.grad,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Révéla
          </span>
        </Link>

        {/* Card */}
        <div
          className={`w-full max-w-sm rounded-3xl p-7 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{
            background: "rgba(16,7,32,0.88)",
            border: `1px solid ${C.border}`,
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            boxShadow:
              "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(109,40,217,0.08)",
          }}
        >
          {/* Step Indicator */}
          <div className="mb-7">
            <AuthStepIndicator steps={STEPS} currentStep={step} />
          </div>

          {/* Step Content */}
          <div
            key={step}
            style={{
              animation: `${animDir === "forward" ? "slideInRight" : "slideInLeft"} 0.28s cubic-bezier(0.22, 1, 0.36, 1) both`,
            }}
          >
            {/* ─── Step 0: Account ─── */}
            {step === 0 && (
              <div className="flex flex-col gap-5">
                <div>
                  <div
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold mb-3"
                    style={{
                      background: "rgba(236,72,153,0.12)",
                      color: C.pink,
                      border: "1px solid rgba(236,72,153,0.25)",
                      fontFamily: FONT_UI,
                    }}
                  >
                    <Sparkles size={9} /> CREA TU CUENTA
                  </div>
                  <h2
                    style={{
                      fontFamily: FONT_DISPLAY,
                      fontWeight: 700,
                      fontStyle: "italic",
                      fontSize: "1.75rem",
                      color: C.text,
                      lineHeight: 1.15,
                    }}
                  >
                    Comienza tu{" "}
                    <span
                      style={{
                        background: C.grad,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      transformación
                    </span>
                  </h2>
                  <p
                    className="mt-1.5 text-xs"
                    style={{
                      fontFamily: FONT_UI,
                      color: C.muted,
                      lineHeight: 1.6,
                    }}
                  >
                    Gratis para siempre. Sin tarjeta requerida.
                  </p>
                </div>

                <AuthInput
                  id="signup-email"
                  label="Correo electrónico"
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={setEmail}
                  autoComplete="email"
                  error={emailError}
                />
                <AuthInput
                  id="signup-password"
                  label="Contraseña"
                  type="password"
                  placeholder="Mínimo 8 caracteres"
                  value={password}
                  onChange={setPassword}
                  autoComplete="new-password"
                  error={passwordError}
                />

                {/* Password strength */}
                {password.length > 0 && (
                  <div className="flex gap-1.5">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="h-1 flex-1 rounded-full transition-all duration-300"
                        style={{
                          background:
                            password.length >= (i + 1) * 3
                              ? i < 2
                                ? C.pink
                                : C.violet
                              : "rgba(255,255,255,0.08)",
                        }}
                      />
                    ))}
                  </div>
                )}

                {/* Google */}
                <button
                  type="button"
                  className="flex w-full items-center justify-center gap-2.5 rounded-xl py-3 text-sm font-semibold transition-all duration-200 hover:border-[rgba(255,255,255,0.18)] hover:bg-[rgba(255,255,255,0.06)]"
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
                  Continuar con Google
                </button>

                <p
                  className="text-center text-[11px]"
                  style={{ fontFamily: FONT_UI, color: C.muted }}
                >
                  Al registrarte aceptas nuestros{" "}
                  <span style={{ color: C.violet }}>Términos</span> y{" "}
                  <span style={{ color: C.violet }}>Privacidad</span>
                </p>
              </div>
            )}

            {/* ─── Step 1: Profile ─── */}
            {step === 1 && (
              <div className="flex flex-col gap-5">
                <div>
                  <div
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold mb-3"
                    style={{
                      background: "rgba(109,40,217,0.15)",
                      color: C.violet,
                      border: "1px solid rgba(109,40,217,0.25)",
                      fontFamily: FONT_UI,
                    }}
                  >
                    <User size={9} /> TU PERFIL
                  </div>
                  <h2
                    style={{
                      fontFamily: FONT_DISPLAY,
                      fontWeight: 700,
                      fontStyle: "italic",
                      fontSize: "1.75rem",
                      color: C.text,
                      lineHeight: 1.15,
                    }}
                  >
                    ¿Cómo te{" "}
                    <span
                      style={{
                        background: C.grad,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      llamamos?
                    </span>
                  </h2>
                  <p
                    className="mt-1.5 text-xs"
                    style={{
                      fontFamily: FONT_UI,
                      color: C.muted,
                      lineHeight: 1.6,
                    }}
                  >
                    Tu IA estilista personal te saludará por tu nombre.
                  </p>
                </div>

                <AuthInput
                  id="signup-name"
                  label="Nombre o apodo"
                  type="text"
                  placeholder="p.ej. Sofía"
                  value={name}
                  onChange={setName}
                  autoComplete="given-name"
                  error={nameError}
                />

                {/* Avatar placeholder */}
                <div className="flex flex-col items-center gap-3 py-4">
                  <div
                    className="relative h-20 w-20 rounded-full flex items-center justify-center"
                    style={{
                      background: "rgba(109,40,217,0.12)",
                      border: "2px dashed rgba(109,40,217,0.35)",
                    }}
                  >
                    <User size={28} style={{ color: C.muted }} />
                    <button
                      type="button"
                      className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full flex items-center justify-center text-white text-xs font-bold"
                      style={{ background: C.grad }}
                    >
                      +
                    </button>
                  </div>
                  <p
                    className="text-xs"
                    style={{ fontFamily: FONT_UI, color: C.muted }}
                  >
                    Foto de perfil (opcional)
                  </p>
                </div>
              </div>
            )}

            {/* ─── Step 2: Style Goals ─── */}
            {step === 2 && (
              <div className="flex flex-col gap-5">
                <div>
                  <div
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold mb-3"
                    style={{
                      background: "rgba(245,158,11,0.12)",
                      color: "#F59E0B",
                      border: "1px solid rgba(245,158,11,0.25)",
                      fontFamily: FONT_UI,
                    }}
                  >
                    ✦ TUS METAS
                  </div>
                  <h2
                    style={{
                      fontFamily: FONT_DISPLAY,
                      fontWeight: 700,
                      fontStyle: "italic",
                      fontSize: "1.75rem",
                      color: C.text,
                      lineHeight: 1.15,
                    }}
                  >
                    ¿Qué quieres{" "}
                    <span
                      style={{
                        background: C.grad,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      explorar?
                    </span>
                  </h2>
                  <p
                    className="mt-1.5 text-xs"
                    style={{
                      fontFamily: FONT_UI,
                      color: C.muted,
                      lineHeight: 1.6,
                    }}
                  >
                    Selecciona uno o varios. Puedes cambiarlos después.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  {STYLE_GOALS.map((goal) => {
                    const selected = selectedGoals.includes(goal.id);
                    return (
                      <button
                        key={goal.id}
                        type="button"
                        onClick={() => toggleGoal(goal.id)}
                        className="relative flex flex-col items-start gap-1.5 rounded-2xl p-3.5 text-left transition-all duration-200"
                        style={{
                          background: selected
                            ? "rgba(109,40,217,0.18)"
                            : "rgba(255,255,255,0.03)",
                          border: selected
                            ? "1px solid rgba(109,40,217,0.45)"
                            : `1px solid ${C.border}`,
                          boxShadow: selected
                            ? "0 0 16px rgba(109,40,217,0.2)"
                            : "none",
                        }}
                      >
                        {selected && (
                          <div
                            className="absolute top-2.5 right-2.5 h-4 w-4 rounded-full flex items-center justify-center"
                            style={{ background: C.grad }}
                          >
                            <Check size={9} color="white" />
                          </div>
                        )}
                        <span className="text-lg">{goal.emoji}</span>
                        <span
                          className="text-xs font-semibold"
                          style={{
                            fontFamily: FONT_UI,
                            color: selected ? C.text : C.muted,
                          }}
                        >
                          {goal.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ─── Step 3: Done! ─── */}
            {step === 3 && (
              <div className="flex flex-col items-center text-center gap-5 py-2">
                {/* Success animation */}
                <div
                  className="relative h-20 w-20 rounded-full flex items-center justify-center"
                  style={{
                    background: C.gradSubtle,
                    border: "2px solid rgba(109,40,217,0.4)",
                    boxShadow:
                      "0 0 40px rgba(109,40,217,0.35), 0 0 0 12px rgba(109,40,217,0.08)",
                  }}
                >
                  <Check size={32} style={{ color: C.violet }} />
                </div>

                <div>
                  <h2
                    style={{
                      fontFamily: FONT_DISPLAY,
                      fontWeight: 700,
                      fontStyle: "italic",
                      fontSize: "1.75rem",
                      color: C.text,
                      lineHeight: 1.2,
                    }}
                  >
                    ¡Ya eres parte de{" "}
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
                    !
                  </h2>
                  <p
                    className="mt-2 text-sm"
                    style={{
                      fontFamily: FONT_UI,
                      color: C.muted,
                      lineHeight: 1.65,
                    }}
                  >
                    Tu viaje de transformación está a punto de comenzar. Sube tu primera foto y deja que la IA trabaje la magia.
                  </p>
                </div>

                {/* Notifications opt-in */}
                <div
                  className="w-full flex items-center gap-3 rounded-2xl p-4"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: `1px solid ${C.border}`,
                  }}
                >
                  <Bell size={18} style={{ color: C.violet }} />
                  <div className="flex-1 text-left">
                    <p
                      className="text-xs font-semibold"
                      style={{ fontFamily: FONT_UI, color: C.text }}
                    >
                      Activa notificaciones
                    </p>
                    <p
                      className="text-[11px]"
                      style={{ fontFamily: FONT_UI, color: C.muted }}
                    >
                      Entérate de nuevas funciones y tips de estilo
                    </p>
                  </div>
                  <div
                    className="h-5 w-9 rounded-full relative cursor-pointer"
                    style={{ background: C.grad }}
                  >
                    <div
                      className="absolute right-0.5 top-0.5 h-4 w-4 rounded-full bg-white transition-all"
                    />
                  </div>
                </div>

                <Link
                  href="/"
                  className="mt-1 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    fontFamily: FONT_UI,
                    background: C.grad,
                    boxShadow: "0 6px 24px rgba(109,40,217,0.45)",
                  }}
                >
                  Comenzar mi transformación <ArrowRight size={15} />
                </Link>
              </div>
            )}
          </div>

          {/* Navigation buttons */}
          {step < STEPS.length - 1 && (
            <div className={`flex gap-3 mt-6 ${step === 0 ? "justify-end" : "justify-between"}`}>
              {step > 0 && (
                <button
                  type="button"
                  onClick={goBack}
                  className="flex items-center gap-1.5 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-150 hover:bg-[rgba(255,255,255,0.06)]"
                  style={{
                    fontFamily: FONT_UI,
                    color: C.muted,
                    border: `1px solid ${C.border}`,
                  }}
                >
                  <ArrowLeft size={14} /> Atrás
                </button>
              )}
              <button
                type="button"
                onClick={goNext}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
                style={{
                  fontFamily: FONT_UI,
                  background: C.grad,
                  boxShadow: "0 6px 24px rgba(109,40,217,0.4)",
                }}
              >
                {step === 2 ? "Finalizar" : "Continuar"} <ArrowRight size={14} />
              </button>
            </div>
          )}
        </div>

        {/* Footer link */}
        {step === 0 && (
          <p
            className="mt-7 text-xs"
            style={{ fontFamily: FONT_UI, color: C.muted }}
          >
            ¿Ya tienes cuenta?{" "}
            <Link
              href="/login"
              className="font-semibold"
              style={{ color: C.violet }}
            >
              Inicia sesión
            </Link>
          </p>
        )}
      </div>

      {/* Step slide animations */}
      <style>{`
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(18px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-18px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
