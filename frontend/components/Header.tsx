"use client";
import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import C from "@/styles/colors";
import { FONT_UI, FONT_DISPLAY } from "@/styles/fonts";
import useClickOutside from "@/hooks/useClickOutside";
import LoginDialog from "@/components/auth/LoginDialog";
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
import useAuth from "@/hooks/useAuth";
import Avatar from "./Avatar";
import { motion, AnimatePresence } from "motion/react";
import { PiOpenAiLogo } from "react-icons/pi";
import { Banana } from "lucide-react";

const NAV_LINKS = [
  "Features",
  "AI Models",
  "How It Works",
  "Gallery",
  "Pricing",
];
const LANGUAGES = [
  { code: "EN", label: "English", flag: "🇺🇸" },
  { code: "ES", label: "Español", flag: "🇪🇸" },
  { code: "FR", label: "Français", flag: "🇫🇷" },
  { code: "DE", label: "Deutsch", flag: "🇩🇪" },
  { code: "JA", label: "日本語", flag: "🇯🇵" },
];

const FEATURE_ITEMS = [
  {
    name: "Portraits",
    desc: "Executive headshots",
    icon: Camera,
    color: "rgba(236,72,153,0.12)",
    textColor: "#EC4899",
    border: "rgba(236,72,153,0.25)",
    tag: "HD",
    link: "/services/portraits",
  },
  {
    name: "Hair Studio",
    desc: "Simulate haircuts",
    icon: Scissors,
    color: "rgba(109,40,217,0.12)",
    textColor: "#A78BFA",
    border: "rgba(109,40,217,0.25)",
    tag: "3D",
    link: "/services/hair-studio",
  },
  {
    name: "Virtual Try-On",
    desc: "Try styles",
    icon: Shirt,
    color: "rgba(245,158,11,0.12)",
    textColor: "#F59E0B",
    border: "rgba(245,158,11,0.25)",
    tag: "PBR",
    link: "/services/virtual-try-on",
  },
  {
    name: "Makeup Studio",
    desc: "Real-time color palettes",
    icon: Sparkles,
    color: "rgba(168,85,247,0.12)",
    textColor: "#C084FC",
    border: "rgba(168,85,247,0.25)",
    link: "/services/makeup-studio",
  },
  {
    name: "AI Stylist",
    desc: "Fashion consultant",
    icon: MessageSquare,
    color: "rgba(59,130,246,0.12)",
    textColor: "#60A5FA",
    border: "rgba(59,130,246,0.25)",
    tag: "AI",
    link: "/services/ai-stylist",
  },
  {
    name: "Color Analysis",
    desc: "Seasonal tone match",
    icon: Palette,
    color: "rgba(16,185,129,0.12)",
    textColor: "#34D399",
    border: "rgba(16,185,129,0.25)",
    link: "/services/color-analysis",
  },
];

const AI_MODELS = [
  {
    name: "GPT Image 2",
    desc: "Latest model",
    image: <PiOpenAiLogo />,
  },
  {
    name: "SD3",
    desc: "Stable Diffusion 3",
    image: "/models/sd3.png",
  },
  {
    name: "Nano Banana 2",
    desc: "Nano Banana's model",
    image: <Banana />,
  },
  {
    name: "Grok Imagine",
    desc: "xAI's model",
    image: "/models/grok-imagine.png",
  },
  {
    name: "Soul 2.0",
    desc: "Higgsfield's model",
    image: "/models/sora-3.png",
  },
  {
    name: "Inpaint",
    desc: "OpenArt AI model",
    image: "/models/claude-sonnet-5.png",
  },
];

function Header() {
  const [langOpen, setLangOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<"Features" | "AI Models" | null>(
    null,
  );
  const [prevMenu, setPrevMenu] = useState<"Features" | "AI Models" | null>(
    null,
  );

  const handleMenuEnter = (menu: "Features" | "AI Models") => {
    if (activeMenu !== menu) setPrevMenu(activeMenu);
    setActiveMenu(menu);
  };
  const [lang, setLang] = useState("EN");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const { user } = useAuth();
  const langRef = useRef<HTMLDivElement>(null);
  useClickOutside(
    langRef,
    useCallback(() => setLangOpen(false), []),
  );
  const currentLang = LANGUAGES.find((l) => l.code === lang)!;

  const contentVariants = {
    initial: (direction: number) => ({
      x: prevMenu ? direction * -50 : 0,
      opacity: 0,
    }),
    animate: { x: 0, opacity: 1 },
    exit: (direction: number) => ({ x: direction * 50, opacity: 0 }),
  };

  return (
    <>
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
          <Link href="/" style={{ textDecoration: "none", flexShrink: 0 }}>
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
          </Link>

          {/* Centre nav */}
          <div
            className="hidden lg:flex flex-1 items-center h-full relative justify-center"
            onMouseLeave={() => setActiveMenu(null)}
          >
            <nav className="flex items-center gap-1 h-full">
              {NAV_LINKS.map((link) => {
                if (link === "Features") {
                  return (
                    <div
                      key={link}
                      className="relative h-full flex items-center"
                      onMouseEnter={() => handleMenuEnter("Features")}
                    >
                      <Link
                        href={"/services"}
                        className="flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-sm transition-all duration-150 hover:text-text hover:bg-[rgba(255,255,255,0.06)]"
                        style={{
                          fontFamily: FONT_UI,
                          fontWeight: 500,
                          color: activeMenu === "Features" ? C.text : C.muted,
                          background:
                            activeMenu === "Features"
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
                            transform:
                              activeMenu === "Features"
                                ? "rotate(180deg)"
                                : "rotate(0)",
                            transition: "transform 0.2s",
                          }}
                        />
                      </Link>
                    </div>
                  );
                }

                if (link === "AI Models") {
                  return (
                    <div
                      key={link}
                      className="relative h-full flex items-center"
                      onMouseEnter={() => handleMenuEnter("AI Models")}
                    >
                      <button
                        className="flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-sm transition-all duration-150 hover:text-text hover:bg-[rgba(255,255,255,0.06)]"
                        style={{
                          fontFamily: FONT_UI,
                          fontWeight: 500,
                          color: activeMenu === "AI Models" ? C.text : C.muted,
                          background:
                            activeMenu === "AI Models"
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
                            transform:
                              activeMenu === "AI Models"
                                ? "rotate(180deg)"
                                : "rotate(0)",
                            transition: "transform 0.2s",
                          }}
                        />
                      </button>
                    </div>
                  );
                }

                return (
                  <a
                    key={link}
                    href={
                      link === "Pricing"
                        ? "/pricing"
                        : `#${link.toLowerCase().replace(/ /g, "-")}`
                    }
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

            <AnimatePresence>
              {activeMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 w-135 rounded-3xl overflow-hidden"
                  style={{
                    top: "calc(100% - 10px)",
                    zIndex: 60,
                    background: "#130B24",
                    border: `1px solid ${C.border}`,
                    boxShadow: "0 24px 64px rgba(0,0,0,0.6)",
                  }}
                >
                  <motion.div layout className="relative w-full">
                    <AnimatePresence
                      mode="popLayout"
                      initial={false}
                      custom={activeMenu === "Features" ? -1 : 1}
                    >
                      {activeMenu === "Features" && (
                        <motion.div
                          key="features"
                          variants={contentVariants}
                          custom={activeMenu === "Features" ? -1 : 1}
                          initial="initial"
                          animate="animate"
                          exit="exit"
                          transition={{ duration: 0.3, ease: "easeOut" }}
                          className="p-6 grid grid-cols-2 gap-4 w-full"
                        >
                          {FEATURE_ITEMS.map((item) => {
                            const Icon = item.icon;
                            return (
                              <Link
                                key={item.name}
                                href={item.link}
                                onClick={() => setActiveMenu(null)}
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
                                      style={{
                                        fontFamily: FONT_UI,
                                        color: C.text,
                                      }}
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
                              </Link>
                            );
                          })}
                        </motion.div>
                      )}

                      {activeMenu === "AI Models" && (
                        <motion.div
                          key="models"
                          variants={contentVariants}
                          custom={activeMenu === "AI Models" ? 1 : -1}
                          initial="initial"
                          animate="animate"
                          exit="exit"
                          transition={{ duration: 0.3, ease: "easeOut" }}
                          className="p-6 grid grid-cols-2 gap-4 w-full"
                        >
                          {AI_MODELS.map((item) => {
                            return (
                              <a
                                key={item.name}
                                href="#features"
                                onClick={() => setActiveMenu(null)}
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
                                  {/* Icon placeholder if needed */}
                                  {item.image}
                                </div>
                                <div>
                                  <div className="flex items-center gap-1.5">
                                    <span
                                      className="text-sm font-semibold transition-colors duration-200 group-hover:text-white"
                                      style={{
                                        fontFamily: FONT_UI,
                                        color: C.text,
                                      }}
                                    >
                                      {item.name}
                                    </span>
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
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

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
                  background: langOpen
                    ? "rgba(255,255,255,0.06)"
                    : "transparent",
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

            {!user && (
              <>
                <button
                  onClick={() => setLoginOpen(true)}
                  className="rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-150 hover:text-text hover:bg-[rgba(255,255,255,0.06)]"
                  style={{ fontFamily: FONT_UI, color: C.muted }}
                >
                  Log in
                </button>

                <Link
                  href="/signup"
                  className="flex items-center gap-2 rounded-xl px-5 py-2 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    fontFamily: FONT_UI,
                    background: C.grad,
                    boxShadow: "0 4px 16px rgba(109,40,217,0.4)",
                    textDecoration: "none",
                  }}
                >
                  Try Free <ArrowRight size={13} />
                </Link>
              </>
            )}
            {user && <Avatar email={user.email} />}
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
        {!user && (
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
                  href={
                    link === "Pricing"
                      ? "/pricing"
                      : `#${link.toLowerCase().replace(/ /g, "-")}`
                  }
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
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 rounded-xl py-2.5 text-sm font-semibold border text-center"
                  style={{
                    fontFamily: FONT_UI,
                    color: C.text,
                    borderColor: C.border,
                    textDecoration: "none",
                  }}
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 rounded-xl py-2.5 text-sm font-bold text-white text-center"
                  style={{
                    fontFamily: FONT_UI,
                    background: C.grad,
                    textDecoration: "none",
                  }}
                >
                  Try Free
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Desktop login dialog */}
      <LoginDialog open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}

export default Header;
