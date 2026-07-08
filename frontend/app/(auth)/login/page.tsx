"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import C from "@/styles/colors";
import { FONT_UI, FONT_DISPLAY } from "@/styles/fonts";
import AuthInput from "@/components/auth/AuthInput";
import { LoginData, LoginDataSchema } from "@/schemas";
import useAuth from "@/hooks/useAuth";
import useLogIn from "@/hooks/useLogIn";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { fetchUser } = useAuth();
  const { mutateAsync } = useLogIn();

  const onSubmit = async (data: LoginData) => {
    const result = LoginDataSchema.safeParse(data);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setEmailError(fieldErrors.email?.[0] ? "Enter a valid email" : "");
      setPasswordError(
        fieldErrors.password?.[0] ? "At least 8 characters" : "",
      );
      return;
    }
    setEmailError("");
    setPasswordError("");

    try {
      await mutateAsync(data);
      await fetchUser();
    } catch (error) {
      if (error instanceof Error) {
        console.log(`Error message: ${error.message}`);
      }
    }
  };

  return (
    <div
      className="relative flex min-h-screen flex-col overflow-hidden"
      style={{ background: C.bg }}
    >
      {/* Ambient glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-40 -left-40 h-80 w-80 rounded-full opacity-25"
          style={{
            background: "radial-gradient(circle, #6D28D9, transparent 70%)",
          }}
        />
        <div
          className="absolute top-1/3 -right-32 h-72 w-72 rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, #EC4899, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-60 w-96 rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #6D28D9, transparent 70%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative flex flex-1 flex-col items-center justify-center px-6 py-12">
        {/* Logo */}
        <Link href="/" className="mb-10">
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
        {/* ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"} */}
        <div
          className={`w-full max-w-sm rounded-3xl p-7 transition-all duration-700 `}
          style={{
            background: "rgba(16,7,32,0.85)",
            border: `1px solid ${C.border}`,
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            boxShadow:
              "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(109,40,217,0.08)",
          }}
        >
          {/* Header */}
          <div className="mb-7">
            <div
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold mb-4"
              style={{
                background: "rgba(109,40,217,0.15)",
                color: C.violet,
                border: "1px solid rgba(109,40,217,0.25)",
                fontFamily: FONT_UI,
              }}
            >
              <Sparkles size={9} />
              WELCOME
            </div>
            <h1
              style={{
                fontFamily: FONT_DISPLAY,
                fontWeight: 700,
                fontStyle: "italic",
                fontSize: "1.9rem",
                color: C.text,
                lineHeight: 1.15,
                letterSpacing: "-0.01em",
              }}
            >
              Log in to{" "}
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
            </h1>
            <p
              className="mt-1.5 text-xs"
              style={{ fontFamily: FONT_UI, color: C.muted, lineHeight: 1.6 }}
            >
              Get access to your personalized AI-powered style
            </p>
          </div>

          {/* Form */}
          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <AuthInput
              id="login-email"
              label="Email"
              type="email"
              placeholder="email@domain.com"
              value={email}
              onChange={setEmail}
              autoComplete="email"
              error={emailError}
            />
            <AuthInput
              id="login-password"
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={setPassword}
              autoComplete="current-password"
              error={passwordError}
            />

            {/* Forgot password */}
            <div className="flex justify-end -mt-1">
              <button
                type="button"
                className="text-xs transition-opacity hover:opacity-100 opacity-70"
                style={{ fontFamily: FONT_UI, color: C.violet }}
              >
                Forgot your password?
              </button>
            </div>

            {/* Submit */}
            <button
              onClick={() => onSubmit({ email, password })}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
              style={{
                fontFamily: FONT_UI,
                background: C.grad,
                boxShadow: "0 6px 24px rgba(109,40,217,0.45)",
              }}
            >
              Log in <ArrowRight size={15} />
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-1">
              <div className="flex-1 h-px" style={{ background: C.border }} />
              <span
                className="text-[11px]"
                style={{ fontFamily: FONT_UI, color: C.muted }}
              >
                or continue with
              </span>
              <div className="flex-1 h-px" style={{ background: C.border }} />
            </div>

            {/* Google OAuth button */}
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
              {/* Google icon SVG */}
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
        </div>

        {/* Footer link */}
        <p
          className="mt-7 text-xs"
          style={{ fontFamily: FONT_UI, color: C.muted }}
        >
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-semibold transition-opacity hover:opacity-90"
            style={{ color: C.violet }}
          >
            Sign up for free
          </Link>
        </p>
      </div>
    </div>
  );
}
