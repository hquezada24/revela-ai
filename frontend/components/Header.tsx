"use client";
import { useState, useRef, useCallback } from "react";
import C from "@/styles/colors";
import { FONT_UI, FONT_DISPLAY } from "@/styles/fonts";
import useClickOutside from "@/hooks/useClickOutside";
import {
  Globe,
  ChevronDown,
  ArrowRight,
  Menu,
  X,
  Camera,
  Scissors,
  Shirt,
  Sparkles,
  Palette,
  MessageSquare,
} from "lucide-react";

const NAV_LINKS = ["Features", "How It Works", "Gallery", "Pricing"];
const LANGUAGES = [
  { code: "EN", label: "English", flag: "🇺🇸" },
  { code: "ES", label: "Español", flag: "🇪🇸" },
  { code: "FR", label: "Français", flag: "🇫🇷" },
  { code: "DE", label: "Deutsch", flag: "🇩🇪" },
  { code: "JA", label: "日本語", flag: "🇯🇵" },
];

const FEATURE_ITEMS = [
  {
    name: "Professional Photos",
    desc: "HD portraits & executive headshots",
    icon: Camera,
    color: "rgba(236,72,153,0.12)",
    textColor: "#EC4899",
    border: "rgba(236,72,153,0.25)",
    tag: "HD",
  },
  {
    name: "Hair Studio",
    desc: "Simulate haircuts & shape matches",
    icon: Scissors,
    color: "rgba(109,40,217,0.12)",
    textColor: "#A78BFA",
    border: "rgba(109,40,217,0.25)",
    tag: "3D",
  },
  {
    name: "Virtual Try-On",
    desc: "Try styles and coordinate apparel",
    icon: Shirt,
    color: "rgba(245,158,11,0.12)",
    textColor: "#F59E0B",
    border: "rgba(245,158,11,0.25)",
    tag: "PBR",
  },
  {
    name: "Makeup Studio",
    desc: "Discover real-time color palettes",
    icon: Sparkles,
    color: "rgba(168,85,247,0.12)",
    textColor: "#C084FC",
    border: "rgba(168,85,247,0.25)",
  },
  {
    name: "AI Stylist",
    desc: "Chat with your fashion consultant",
    icon: MessageSquare,
    color: "rgba(59,130,246,0.12)",
    textColor: "#60A5FA",
    border: "rgba(59,130,246,0.25)",
    tag: "AI",
  },
  {
    name: "Color Analysis",
    desc: "Identify your seasonal tone match",
    icon: Palette,
    color: "rgba(16,185,129,0.12)",
    textColor: "#34D399",
    border: "rgba(16,185,129,0.25)",
  },
];

function Header() {
  const [langOpen, setLangOpen] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [lang, setLang] = useState("EN");
  const [mobileOpen, setMobileOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  useClickOutside(
    langRef,
    useCallback(() => setLangOpen(false), []),
  );
  const currentLang = LANGUAGES.find((l) => l.code === lang)!;

  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{
        background: "rgba(7,3,15,0.8)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div className="mx-auto flex h-17 max-w-7xl items-center justify-between gap-6 px-6 lg:px-10">
        {/* Logo */}
        <a href="#" style={{ textDecoration: "none", flexShrink: 0 }}>
          <span
            style={{
              fontFamily: FONT_DISPLAY,
              fontWeight: 700,
              fontSize: "1.65rem",
              letterSpacing: "0.01em",
              fontStyle: "italic",
              background: C.grad,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Révéla
          </span>
        </a>

        {/* Centre nav */}
        <nav className="hidden lg:flex items-center gap-1 flex-1 h-full">
          {NAV_LINKS.map((link) => {
            if (link === "Features") {
              return (
                <div
                  key={link}
                  className="relative h-full flex items-center"
                  onMouseEnter={() => setFeaturesOpen(true)}
                  onMouseLeave={() => setFeaturesOpen(false)}
                >
                  <button
                    className="flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-sm transition-all duration-150 hover:text-text hover:bg-[rgba(255,255,255,0.06)]"
                    style={{
                      fontFamily: FONT_UI,
                      fontWeight: 500,
                      color: featuresOpen ? C.text : C.muted,
                      background: featuresOpen
                        ? "rgba(255,255,255,0.06)"
                        : "transparent",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    <span>{link}</span>
                    <ChevronDown
                      size={12}
                      style={{
                        transform: featuresOpen
                          ? "rotate(180deg)"
                          : "rotate(0)",
                        transition: "transform 0.2s",
                      }}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  <div
                    className="absolute left-0 w-[540px] rounded-3xl p-6 grid grid-cols-2 gap-4 transition-all duration-200"
                    style={{
                      top: "calc(100% - 10px)",
                      zIndex: 60,
                      background: "#130B24",
                      border: `1px solid ${C.border}`,
                      boxShadow: "0 24px 64px rgba(0,0,0,0.6)",
                      pointerEvents: featuresOpen ? "auto" : "none",
                      opacity: featuresOpen ? 1 : 0,
                      transform: `translateY(${featuresOpen ? 0 : -6}px)`,
                    }}
                  >
                    {FEATURE_ITEMS.map((item) => {
                      const Icon = item.icon;
                      return (
                        <a
                          key={item.name}
                          href="#features"
                          onClick={() => setFeaturesOpen(false)}
                          className="group flex gap-4 rounded-2xl p-3 transition-colors duration-200 hover:bg-[rgba(255,255,255,0.04)]"
                          style={{ textDecoration: "none" }}
                        >
                          <div
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors duration-200"
                            style={{
                              background: "rgba(255,255,255,0.05)",
                              border: `1px solid ${C.border}`,
                            }}
                          >
                            <Icon
                              size={16}
                              style={{ color: C.pink }}
                              className="group-hover:scale-110 transition-transform duration-200"
                            />
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span
                                className="text-sm font-semibold transition-colors duration-200 group-hover:text-white"
                                style={{ fontFamily: FONT_UI, color: C.text }}
                              >
                                {item.name}
                              </span>
                              {item.tag && (
                                <span
                                  className="rounded px-1.5 py-0.5 text-[9px] font-bold"
                                  style={{
                                    background: item.color,
                                    color: item.textColor,
                                    border: `1px solid ${item.border}`,
                                  }}
                                >
                                  {item.tag}
                                </span>
                              )}
                            </div>
                            <p
                              className="text-xs mt-0.5"
                              style={{
                                fontFamily: FONT_UI,
                                color: C.muted,
                                lineHeight: 1.4,
                              }}
                            >
                              {item.desc}
                            </p>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>
              );
            }

            return (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(/ /g, "-")}`}
                className="rounded-xl px-3.5 py-2 text-sm transition-all duration-150 hover:text-text hover:bg-[rgba(255,255,255,0.06)]"
                style={{
                  fontFamily: FONT_UI,
                  fontWeight: 500,
                  color: C.muted,
                  textDecoration: "none",
                }}
              >
                {link}
              </a>
            );
          })}
        </nav>

        {/* Right */}
        <div className="hidden lg:flex items-center gap-2.5">
          {/* Language */}
          <div ref={langRef} className="relative">
            <button
              onClick={() => setLangOpen((p) => !p)}
              className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm transition-all duration-150 hover:border-[rgba(255,255,255,0.16)]"
              style={{
                fontFamily: FONT_UI,
                fontWeight: 500,
                color: C.muted,
                border: "1px solid",
                borderColor: C.border,
                background: langOpen ? "rgba(255,255,255,0.06)" : "transparent",
              }}
            >
              <Globe size={12} style={{ color: C.muted }} />
              <span>{currentLang.flag}</span>
              <span>{lang}</span>
              <ChevronDown
                size={11}
                style={{
                  color: C.muted,
                  transform: langOpen ? "rotate(180deg)" : "rotate(0)",
                  transition: "transform 0.2s",
                }}
              />
            </button>

            {/* Lang dropdown */}
            <div
              className="absolute right-0 mt-2 w-44 rounded-2xl py-1.5 overflow-hidden"
              style={{
                top: "100%",
                zIndex: 60,
                background: "#130B24",
                border: `1px solid ${C.border}`,
                boxShadow: "0 16px 48px rgba(0,0,0,0.5)",
                pointerEvents: langOpen ? "auto" : "none",
                opacity: langOpen ? 1 : 0,
                transform: `translateY(${langOpen ? 0 : -6}px)`,
                transition: "opacity 0.16s, transform 0.16s",
              }}
            >
              {LANGUAGES.map(({ code, label, flag }) => (
                <button
                  key={code}
                  onClick={() => {
                    setLang(code);
                    setLangOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 px-4 py-2.5 text-sm transition-colors ${code !== lang ? "hover:[rgba(255,255,255,0.05)]" : ""}`}
                  style={{
                    fontFamily: FONT_UI,
                    color: code === lang ? C.text : C.muted,
                    fontWeight: code === lang ? 600 : 400,
                    background:
                      code === lang ? "rgba(109,40,217,0.15)" : "transparent",
                  }}
                >
                  <span>{flag}</span>
                  <span className="flex-1 text-left">{label}</span>
                  {code === lang && (
                    <div
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: C.violet }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div style={{ width: 1, height: 18, background: C.border }} />

          <button
            className="rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-150 hover:text-text hover:bg-[rgba(255,255,255,0.06)]"
            style={{ fontFamily: FONT_UI, color: C.muted }}
          >
            Log in
          </button>

          <button
            className="flex items-center gap-2 rounded-xl px-5 py-2 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:[box-shadow: 0 8px 28px rgba(109,40,217,0.52)]"
            style={{
              fontFamily: FONT_UI,
              background: C.grad,
              boxShadow: "0 4px 16px rgba(109,40,217,0.4)",
            }}
          >
            Try Free <ArrowRight size={13} />
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden flex items-center justify-center rounded-xl p-2.5 transition-colors"
          style={{ color: C.muted, border: `1px solid ${C.border}` }}
          onClick={() => setMobileOpen((p) => !p)}
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className="lg:hidden overflow-hidden"
        style={{
          maxHeight: mobileOpen ? "480px" : 0,
          transition: "max-height 0.3s ease",
          borderTop: `1px solid ${C.border}`,
        }}
      >
        <div
          className="px-5 py-5 space-y-1"
          style={{ background: "rgba(7,3,15,0.97)" }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/ /g, "-")}`}
              onClick={() => setMobileOpen(false)}
              className="flex w-full items-center rounded-xl px-4 py-3 text-sm"
              style={{
                fontFamily: FONT_UI,
                fontWeight: 500,
                color: C.muted,
                textDecoration: "none",
              }}
            >
              {link}
            </a>
          ))}
          <div className="flex items-center gap-2.5 pt-3">
            <button
              className="flex-1 rounded-xl py-2.5 text-sm font-semibold border"
              style={{
                fontFamily: FONT_UI,
                color: C.text,
                borderColor: C.border,
              }}
            >
              Log in
            </button>
            <button
              className="flex-1 rounded-xl py-2.5 text-sm font-bold text-white"
              style={{ fontFamily: FONT_UI, background: C.grad }}
            >
              Try Free
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
