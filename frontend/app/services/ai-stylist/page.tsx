"use client";

import React, { useMemo, useRef, useState } from "react";
import { MessageSquare, Send, Sparkles, Upload } from "lucide-react";
import { motion } from "motion/react";
import C from "@/styles/colors";
import { FONT_UI } from "@/styles/fonts";
import ServiceHeader from "@/components/services/ServiceHeader";
import ServiceLayout from "@/components/services/ServiceLayout";
import UploadCard from "@/components/services/UploadCard";
import OptionCard from "@/components/services/OptionCard";
import AdvancedSettings from "@/components/services/AdvancedSettings";

type Persona = "minimalist" | "street" | "classic" | "bold";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
}

const PERSONAS: { id: Persona; label: string; badge?: string }[] = [
  { id: "classic", label: "Classic Tailored", badge: "Best" },
  { id: "minimalist", label: "Minimalist" },
  { id: "street", label: "Streetwear" },
  { id: "bold", label: "Bold Statement" },
];

const SUGGESTED = [
  "Build a 7-day outfit plan for work + weekend.",
  "What colors should I wear for an interview?",
  "Suggest 3 outfits from a capsule wardrobe (10 items).",
  "Help me style a white sneaker with 3 looks.",
];

const EXAMPLES = [
  { id: "sty-1", url: "https://images.unsplash.com/photo-1520975682034-5f1e0e1be9ef?w=900&h=900&fit=crop&auto=format", label: "Outfit direction" },
  { id: "sty-2", url: "https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?w=900&h=900&fit=crop&auto=format", label: "Wardrobe planning" },
  { id: "sty-3", url: "https://images.unsplash.com/photo-1520975958229-25086a6e2c1b?w=900&h=900&fit=crop&auto=format", label: "Occasion styling" },
  { id: "sty-4", url: "https://images.unsplash.com/photo-1548142813-c348350df52b?w=900&h=900&fit=crop&auto=format", label: "Color pairings" },
];

function makeId() {
  return Math.random().toString(16).slice(2);
}

export default function AIStylistServicePage() {
  const [persona, setPersona] = useState<Persona>("classic");
  const [photo, setPhoto] = useState<File | null>(null);
  const [goals, setGoals] = useState("");

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: makeId(),
      role: "assistant",
      text: "Hi — I’m your AI Stylist. Tell me what you’re dressing for (work, date, event), your vibe, and any items you want to include. You can also upload a photo.",
    },
  ]);
  const [draft, setDraft] = useState("");

  const listRef = useRef<HTMLDivElement>(null);

  const placeholderReply = useMemo(() => {
    const personaLine =
      persona === "classic"
        ? "classic, tailored"
        : persona === "minimalist"
          ? "minimal, clean"
          : persona === "street"
            ? "streetwear-forward"
            : "bold statement";
    return `Got it — I’ll keep the direction ${personaLine}. Share your size/fit preferences, climate, and budget, and I’ll recommend 3 outfit options with accessories.`;
  }, [persona]);

  const send = (text: string) => {
    const clean = text.trim();
    if (!clean) return;

    const userMsg: ChatMessage = { id: makeId(), role: "user", text: clean };
    setMessages((prev) => [...prev, userMsg]);
    setDraft("");

    window.setTimeout(() => {
      const assistantMsg: ChatMessage = { id: makeId(), role: "assistant", text: placeholderReply };
      setMessages((prev) => [...prev, assistantMsg]);
      window.setTimeout(() => listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" }), 50);
    }, 550);
  };

  return (
    <div className="bg-bg min-h-screen">
      <ServiceHeader
        title="AI Stylist"
        badge="Stylist Chat"
        description="A conversational workspace for outfit and style recommendations. This service is not image generation — it’s tailored guidance with optional photo context."
        icon={MessageSquare}
      />

      <ServiceLayout
        currentSlug="ai-stylist"
        examples={EXAMPLES}
        sidebar={
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={14} style={{ color: C.pink }} />
              <span className="text-xs font-bold uppercase tracking-wider" style={{ fontFamily: FONT_UI, color: C.text }}>
                Stylist persona
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {PERSONAS.map((p) => (
                <OptionCard key={p.id} selected={persona === p.id} onClick={() => setPersona(p.id)} label={p.label} badge={p.badge} />
              ))}
            </div>

            <div className="mt-6">
              <UploadCard label="Upload outfit / portrait (optional)" description="Helps with fit + color suggestions" value={photo} onUpload={setPhoto} />
            </div>

            <AdvancedSettings title="Context (Optional)">
              <div className="space-y-2">
                <label className="text-xs font-semibold" style={{ fontFamily: FONT_UI, color: C.text }}>
                  Your goals
                </label>
                <textarea
                  value={goals}
                  onChange={(e) => setGoals(e.target.value)}
                  placeholder="Ex: 3 outfits for a summer wedding, prefer neutrals, budget $200..."
                  className="w-full rounded-2xl p-3 text-sm outline-none"
                  style={{
                    fontFamily: FONT_UI,
                    color: C.text,
                    background: "rgba(255,255,255,0.03)",
                    border: `1px solid ${C.border}`,
                    minHeight: 100,
                    resize: "vertical",
                  }}
                />
              </div>
            </AdvancedSettings>

            <div className="mt-6">
              <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ fontFamily: FONT_UI, color: C.text }}>
                Suggested prompts
              </p>
              <div className="space-y-2">
                {SUGGESTED.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => send(s)}
                    className="w-full text-left rounded-2xl px-4 py-3 text-xs font-semibold transition-colors hover:bg-[rgba(255,255,255,0.04)]"
                    style={{
                      fontFamily: FONT_UI,
                      color: "rgba(245,241,255,0.85)",
                      background: C.glass,
                      border: `1px solid ${C.border}`,
                      cursor: "pointer",
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        }
      >
        <div
          className="rounded-3xl overflow-hidden flex flex-col"
          style={{
            border: `1px solid ${C.border}`,
            background: "#0B0518",
            minHeight: 520,
          }}
        >
          <div className="px-6 py-5 flex items-center justify-between" style={{ borderBottom: `1px solid ${C.border}` }}>
            <div>
              <p className="text-sm font-bold" style={{ fontFamily: FONT_UI, color: C.text }}>
                Stylist Chat
              </p>
              <p className="text-xs mt-1" style={{ fontFamily: FONT_UI, color: C.muted }}>
                Ask for outfits, colors, capsules, occasions, and shopping guidance.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-2xl"
                style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${C.border}` }}
                title="Upload (from left panel)"
              >
                <Upload size={16} style={{ color: C.muted }} />
              </div>
            </div>
          </div>

          <div ref={listRef} className="flex-1 overflow-auto px-6 py-5 space-y-4">
            {messages.map((m) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className="max-w-[78%] rounded-2xl px-4 py-3"
                  style={{
                    background: m.role === "user" ? "rgba(109,40,217,0.24)" : "rgba(255,255,255,0.04)",
                    border: `1px solid ${m.role === "user" ? "rgba(109,40,217,0.45)" : C.border}`,
                  }}
                >
                  <p className="text-sm" style={{ fontFamily: FONT_UI, color: C.text, lineHeight: 1.55 }}>
                    {m.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="p-5" style={{ borderTop: `1px solid ${C.border}` }}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(draft);
              }}
              className="flex items-center gap-3"
            >
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Ask your stylist..."
                className="flex-1 rounded-2xl px-4 py-3 text-sm outline-none"
                style={{
                  fontFamily: FONT_UI,
                  color: C.text,
                  background: "rgba(255,255,255,0.03)",
                  border: `1px solid ${C.border}`,
                }}
              />
              <button
                type="submit"
                className="flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  fontFamily: FONT_UI,
                  background: C.grad,
                  boxShadow: "0 10px 30px rgba(109,40,217,0.35)",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <Send size={14} />
                Send
              </button>
            </form>
            <p className="text-[11px] mt-3" style={{ fontFamily: FONT_UI, color: C.muted }}>
              This is UI scaffolding. Next step: connect to your backend chat endpoint.
            </p>
          </div>
        </div>
      </ServiceLayout>
    </div>
  );
}

