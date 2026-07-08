"use client";

import React, { useState } from "react";
import { Palette, Sliders, Sparkles } from "lucide-react";
import C from "@/styles/colors";
import { FONT_UI } from "@/styles/fonts";
import ServiceLayout from "@/components/services/ServiceLayout";
import ServiceHeader from "@/components/services/ServiceHeader";
import UploadCard from "@/components/services/UploadCard";
import OptionCard from "@/components/services/OptionCard";
import AdvancedSettings from "@/components/services/AdvancedSettings";
import GenerateButton from "@/components/services/GenerateButton";
import ResultCard from "@/components/services/ResultCard";

type Preset = "soft-glam" | "natural" | "editorial" | "night-out";
type PaletteId = "rose" | "nude" | "berry" | "bronze";

const PRESETS: { id: Preset; label: string; badge?: string }[] = [
  { id: "natural", label: "Natural Lift", badge: "Best" },
  { id: "soft-glam", label: "Soft Glam" },
  { id: "editorial", label: "Editorial" },
  { id: "night-out", label: "Night Out" },
];

const PALETTES: { id: PaletteId; label: string }[] = [
  { id: "nude", label: "Nude" },
  { id: "rose", label: "Rose" },
  { id: "berry", label: "Berry" },
  { id: "bronze", label: "Bronze" },
];

const EXAMPLES = [
  { id: "mk-1", url: "https://images.unsplash.com/photo-1524503033411-f6e7a82adfe8?w=900&h=900&fit=crop&auto=format", label: "Soft glam" },
  { id: "mk-2", url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=900&h=900&fit=crop&auto=format", label: "Natural lift" },
  { id: "mk-3", url: "https://images.unsplash.com/photo-1548142813-c348350df52b?w=900&h=900&fit=crop&auto=format", label: "Editorial" },
  { id: "mk-4", url: "https://images.unsplash.com/photo-1545996124-0501ebae84d0?w=900&h=900&fit=crop&auto=format", label: "Bronze night" },
];

export default function MakeupStudioServicePage() {
  const [face, setFace] = useState<File | null>(null);
  const [preset, setPreset] = useState<Preset>("natural");
  const [palette, setPalette] = useState<PaletteId>("nude");
  const [intensity, setIntensity] = useState(55);
  const [advanced, setAdvanced] = useState("");

  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [resultUrl, setResultUrl] = useState<string | undefined>(undefined);

  const canGenerate = Boolean(face);

  const generate = () => {
    if (!canGenerate) return;
    setIsGenerating(true);
    setProgress(0);
    setResultUrl(undefined);
    let p = 0;
    const timer = window.setInterval(() => {
      p = Math.min(100, p + 7 + Math.round(Math.random() * 7));
      setProgress(p);
      if (p >= 100) {
        window.clearInterval(timer);
        setIsGenerating(false);
        setResultUrl("https://images.unsplash.com/photo-1546961342-ea5f69250b49?w=900&h=1200&fit=crop&auto=format");
      }
    }, 240);
  };

  const reset = () => {
    setIsGenerating(false);
    setProgress(0);
    setResultUrl(undefined);
  };

  return (
    <div className="bg-bg min-h-screen">
      <ServiceHeader
        title="Makeup Studio"
        badge="Makeup Lab"
        description="Upload a face, pick a preset and palette, then fine-tune intensity. Prompts are advanced — the primary controls are visual."
        icon={Sparkles}
      />

      <ServiceLayout
        currentSlug="makeup-studio"
        examples={EXAMPLES}
        sidebar={
          <div>
            <UploadCard label="Upload Face" description="Front-facing, good lighting recommended" value={face} onUpload={setFace} />

            <div className="mt-6">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={14} style={{ color: C.pink }} />
                <span className="text-xs font-bold uppercase tracking-wider" style={{ fontFamily: FONT_UI, color: C.text }}>
                  Preset
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {PRESETS.map((p) => (
                  <OptionCard key={p.id} selected={preset === p.id} onClick={() => setPreset(p.id)} label={p.label} badge={p.badge} />
                ))}
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center gap-2 mb-3">
                <Palette size={14} style={{ color: C.pink }} />
                <span className="text-xs font-bold uppercase tracking-wider" style={{ fontFamily: FONT_UI, color: C.text }}>
                  Color Palette
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {PALETTES.map((p) => (
                  <OptionCard key={p.id} selected={palette === p.id} onClick={() => setPalette(p.id)} label={p.label} />
                ))}
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Sliders size={14} style={{ color: C.pink }} />
                  <span className="text-xs font-bold uppercase tracking-wider" style={{ fontFamily: FONT_UI, color: C.text }}>
                    Intensity
                  </span>
                </div>
                <span className="text-xs font-semibold" style={{ fontFamily: FONT_UI, color: C.muted }}>
                  {intensity}%
                </span>
              </div>
              <input
                type="range"
                min={10}
                max={100}
                value={intensity}
                onChange={(e) => setIntensity(Number(e.target.value))}
                className="w-full"
              />
              <p className="text-[11px] mt-2" style={{ fontFamily: FONT_UI, color: C.muted, lineHeight: 1.5 }}>
                Higher intensity increases contrast, pigment, and definition.
              </p>
            </div>

            <AdvancedSettings title="Advanced Prompt (Optional)">
              <div className="space-y-2">
                <label className="text-xs font-semibold" style={{ fontFamily: FONT_UI, color: C.text }}>
                  Extra instructions
                </label>
                <textarea
                  value={advanced}
                  onChange={(e) => setAdvanced(e.target.value)}
                  placeholder="Ex: keep freckles, subtle eyeliner, glossy lips..."
                  className="w-full rounded-2xl p-3 text-sm outline-none"
                  style={{
                    fontFamily: FONT_UI,
                    color: C.text,
                    background: "rgba(255,255,255,0.03)",
                    border: `1px solid ${C.border}`,
                    minHeight: 92,
                    resize: "vertical",
                  }}
                />
              </div>
            </AdvancedSettings>

            <div className="mt-6">
              <GenerateButton onClick={generate} loading={isGenerating} disabled={!canGenerate} text="Generate makeup" loadingText="Applying makeup..." />
              {!canGenerate && (
                <p className="text-xs mt-3" style={{ fontFamily: FONT_UI, color: C.muted }}>
                  Upload a face photo to start.
                </p>
              )}
            </div>
          </div>
        }
      >
        <ResultCard isGenerating={isGenerating} progress={progress} resultUrl={resultUrl} onReset={resultUrl ? reset : undefined} />
      </ServiceLayout>
    </div>
  );
}

