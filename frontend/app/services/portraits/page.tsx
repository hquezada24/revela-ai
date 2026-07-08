"use client";

import React, { useEffect, useState } from "react";
import { Camera, Crop, Images, Wand2 } from "lucide-react";
import C from "@/styles/colors";
import { FONT_UI } from "@/styles/fonts";
import ServiceLayout from "@/components/services/ServiceLayout";
import ServiceHeader from "@/components/services/ServiceHeader";
import UploadCard from "@/components/services/UploadCard";
import OptionCard from "@/components/services/OptionCard";
import AdvancedSettings from "@/components/services/AdvancedSettings";
import GenerateButton from "@/components/services/GenerateButton";
import ResultCard from "@/components/services/ResultCard";

type PortraitStyle = "studio" | "executive" | "creative" | "cinematic";
type Aspect = "1:1" | "3:4" | "4:5";
type Count = 1 | 2 | 4;

const STYLE_OPTIONS: { id: PortraitStyle; label: string; badge?: string }[] = [
  { id: "studio", label: "Studio Natural", badge: "Best" },
  { id: "executive", label: "Executive Clean" },
  { id: "creative", label: "Creative Editorial" },
  { id: "cinematic", label: "Cinematic Contrast" },
];

const ASPECT_OPTIONS: { id: Aspect; label: string }[] = [
  { id: "3:4", label: "3:4 Portrait" },
  { id: "4:5", label: "4:5 Feed" },
  { id: "1:1", label: "1:1 Square" },
];

const COUNT_OPTIONS: { id: Count; label: string }[] = [
  { id: 1, label: "1 image" },
  { id: 2, label: "2 images" },
  { id: 4, label: "4 images" },
];

const EXAMPLES = [
  {
    id: "ex-1",
    url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=900&h=900&fit=crop&auto=format",
    label: "Clean studio headshot",
  },
  {
    id: "ex-2",
    url: "https://images.unsplash.com/photo-1545996124-0501ebae84d0?w=900&h=900&fit=crop&auto=format",
    label: "Soft editorial light",
  },
  {
    id: "ex-3",
    url: "https://images.unsplash.com/photo-1548142813-c348350df52b?w=900&h=900&fit=crop&auto=format",
    label: "Cinematic tones",
  },
  {
    id: "ex-4",
    url: "https://images.unsplash.com/photo-1524503033411-f6e7a82adfe8?w=900&h=900&fit=crop&auto=format",
    label: "Executive polish",
  },
];

export default function PortraitsServicePage() {
  const [portrait, setPortrait] = useState<File | null>(null);
  const [style, setStyle] = useState<PortraitStyle>("studio");
  const [aspect, setAspect] = useState<Aspect>("3:4");
  const [count, setCount] = useState<Count>(2);
  const [advanced, setAdvanced] = useState("");

  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [resultUrl, setResultUrl] = useState<string | undefined>(undefined);
  const [beforePreviewUrl, setBeforePreviewUrl] = useState<string | undefined>(undefined);

  const canGenerate = Boolean(portrait);

  useEffect(() => {
    if (!portrait) {
      setBeforePreviewUrl(undefined);
      return;
    }
    const url = URL.createObjectURL(portrait);
    setBeforePreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [portrait]);

  const generate = () => {
    if (!canGenerate) return;
    setIsGenerating(true);
    setProgress(0);
    setResultUrl(undefined);

    let p = 0;
    const timer = window.setInterval(() => {
      p = Math.min(100, p + 6 + Math.round(Math.random() * 8));
      setProgress(p);
      if (p >= 100) {
        window.clearInterval(timer);
        setIsGenerating(false);
        setResultUrl("https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=900&h=1200&fit=crop&auto=format");
      }
    }, 260);
  };

  const reset = () => {
    setIsGenerating(false);
    setProgress(0);
    setResultUrl(undefined);
  };

  return (
    <div className="bg-bg min-h-screen">
      <ServiceHeader
        title="Portraits"
        badge="Portrait Engine"
        description="Upload a portrait, choose a style, and generate premium headshots. Prompts are optional — the core workflow is visual and guided."
        icon={Camera}
      />

      <ServiceLayout
        currentSlug="portraits"
        examples={EXAMPLES}
        sidebar={
          <div>
            <UploadCard label="Upload Portrait" description="Front-facing photos work best" value={portrait} onUpload={setPortrait} />

            <div className="mt-6">
              <div className="flex items-center gap-2 mb-3">
                <Wand2 size={14} style={{ color: C.pink }} />
                <span className="text-xs font-bold uppercase tracking-wider" style={{ fontFamily: FONT_UI, color: C.text }}>
                  Style
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {STYLE_OPTIONS.map((o) => (
                  <OptionCard
                    key={o.id}
                    selected={style === o.id}
                    onClick={() => setStyle(o.id)}
                    label={o.label}
                    badge={o.badge}
                  />
                ))}
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center gap-2 mb-3">
                <Crop size={14} style={{ color: C.pink }} />
                <span className="text-xs font-bold uppercase tracking-wider" style={{ fontFamily: FONT_UI, color: C.text }}>
                  Aspect Ratio
                </span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {ASPECT_OPTIONS.map((o) => (
                  <OptionCard key={o.id} selected={aspect === o.id} onClick={() => setAspect(o.id)} label={o.label} />
                ))}
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center gap-2 mb-3">
                <Images size={14} style={{ color: C.pink }} />
                <span className="text-xs font-bold uppercase tracking-wider" style={{ fontFamily: FONT_UI, color: C.text }}>
                  Output Count
                </span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {COUNT_OPTIONS.map((o) => (
                  <OptionCard key={o.id} selected={count === o.id} onClick={() => setCount(o.id)} label={o.label} />
                ))}
              </div>
            </div>

            <AdvancedSettings title="Optional Instructions">
              <div className="space-y-2">
                <label className="text-xs font-semibold" style={{ fontFamily: FONT_UI, color: C.text }}>
                  Additional notes
                </label>
                <textarea
                  value={advanced}
                  onChange={(e) => setAdvanced(e.target.value)}
                  placeholder="Ex: neutral background, subtle smile, no heavy retouching..."
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
              <GenerateButton
                onClick={generate}
                loading={isGenerating}
                disabled={!canGenerate}
                text="Generate portraits"
                loadingText="Rendering portraits..."
              />
              {!canGenerate && (
                <p className="text-xs mt-3" style={{ fontFamily: FONT_UI, color: C.muted }}>
                  Upload a portrait to unlock generation.
                </p>
              )}
            </div>
          </div>
        }
      >
        <ResultCard
          isGenerating={isGenerating}
          progress={progress}
          resultUrl={resultUrl}
          useSlider
          beforeUrl={beforePreviewUrl}
          onReset={resultUrl ? reset : undefined}
        />
      </ServiceLayout>
    </div>
  );
}

