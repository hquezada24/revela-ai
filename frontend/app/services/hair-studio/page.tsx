"use client";

import React, { useState } from "react";
import { Droplets, Ruler, Scissors } from "lucide-react";
import C from "@/styles/colors";
import { FONT_UI } from "@/styles/fonts";
import ServiceLayout from "@/components/services/ServiceLayout";
import ServiceHeader from "@/components/services/ServiceHeader";
import UploadCard from "@/components/services/UploadCard";
import OptionCard from "@/components/services/OptionCard";
import AdvancedSettings from "@/components/services/AdvancedSettings";
import GenerateButton from "@/components/services/GenerateButton";
import ResultCard from "@/components/services/ResultCard";

type HairLength = "short" | "medium" | "long";
type HairColor = "natural" | "blonde" | "copper" | "black" | "platinum";

const HAIRCUTS = [
  {
    id: "bob",
    label: "Modern Bob",
    image: "https://images.unsplash.com/photo-1520975661595-6453be3f7070?w=900&h=900&fit=crop&auto=format",
  },
  {
    id: "layers",
    label: "Soft Layers",
    image: "https://images.unsplash.com/photo-1520975682034-5f1e0e1be9ef?w=900&h=900&fit=crop&auto=format",
  },
  {
    id: "fade",
    label: "Clean Fade",
    image: "https://images.unsplash.com/photo-1520975958229-25086a6e2c1b?w=900&h=900&fit=crop&auto=format",
  },
  {
    id: "curtain",
    label: "Curtain Bangs",
    image: "https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?w=900&h=900&fit=crop&auto=format",
  },
];

const LENGTHS: { id: HairLength; label: string }[] = [
  { id: "short", label: "Short" },
  { id: "medium", label: "Medium" },
  { id: "long", label: "Long" },
];

const COLORS: { id: HairColor; label: string }[] = [
  { id: "natural", label: "Natural" },
  { id: "blonde", label: "Blonde" },
  { id: "copper", label: "Copper" },
  { id: "black", label: "Black" },
  { id: "platinum", label: "Platinum" },
];

const EXAMPLES = [
  { id: "hs-1", url: "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?w=900&h=900&fit=crop&auto=format", label: "Short + platinum" },
  { id: "hs-2", url: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=900&h=900&fit=crop&auto=format", label: "Layers + natural" },
  { id: "hs-3", url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=900&h=900&fit=crop&auto=format", label: "Fade + black" },
  { id: "hs-4", url: "https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?w=900&h=900&fit=crop&auto=format", label: "Curtain + copper" },
];

export default function HairStudioServicePage() {
  const [photo, setPhoto] = useState<File | null>(null);
  const [haircutId, setHaircutId] = useState<string>(HAIRCUTS[0].id);
  const [hairColor, setHairColor] = useState<HairColor>("natural");
  const [length, setLength] = useState<HairLength>("medium");
  const [advanced, setAdvanced] = useState("");

  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [resultUrl, setResultUrl] = useState<string | undefined>(undefined);

  const canGenerate = Boolean(photo);

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
        setResultUrl("https://images.unsplash.com/photo-1524503033411-f6e7a82adfe8?w=900&h=1200&fit=crop&auto=format");
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
        title="Hair Studio"
        badge="Hair Studio"
        description="Upload a photo and explore haircuts, length, and color. Advanced prompts are optional — the primary workflow is visual."
        icon={Scissors}
      />

      <ServiceLayout
        currentSlug="hair-studio"
        examples={EXAMPLES}
        sidebar={
          <div>
            <UploadCard label="Upload Photo" description="Clear face + hair works best" value={photo} onUpload={setPhoto} />

            <div className="mt-6">
              <div className="flex items-center gap-2 mb-3">
                <Scissors size={14} style={{ color: C.pink }} />
                <span className="text-xs font-bold uppercase tracking-wider" style={{ fontFamily: FONT_UI, color: C.text }}>
                  Haircut Gallery
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {HAIRCUTS.map((cut) => (
                  <OptionCard
                    key={cut.id}
                    selected={haircutId === cut.id}
                    onClick={() => setHaircutId(cut.id)}
                    label={cut.label}
                    image={cut.image}
                  />
                ))}
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center gap-2 mb-3">
                <Droplets size={14} style={{ color: C.pink }} />
                <span className="text-xs font-bold uppercase tracking-wider" style={{ fontFamily: FONT_UI, color: C.text }}>
                  Hair Color
                </span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {COLORS.map((c) => (
                  <OptionCard key={c.id} selected={hairColor === c.id} onClick={() => setHairColor(c.id)} label={c.label} />
                ))}
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center gap-2 mb-3">
                <Ruler size={14} style={{ color: C.pink }} />
                <span className="text-xs font-bold uppercase tracking-wider" style={{ fontFamily: FONT_UI, color: C.text }}>
                  Hair Length
                </span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {LENGTHS.map((l) => (
                  <OptionCard key={l.id} selected={length === l.id} onClick={() => setLength(l.id)} label={l.label} />
                ))}
              </div>
            </div>

            <AdvancedSettings title="Advanced Prompt (Optional)">
              <div className="space-y-2">
                <label className="text-xs font-semibold" style={{ fontFamily: FONT_UI, color: C.text }}>
                  Extra instructions
                </label>
                <textarea
                  value={advanced}
                  onChange={(e) => setAdvanced(e.target.value)}
                  placeholder="Ex: keep bangs, natural texture, realistic lighting..."
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
                text="Generate hair look"
                loadingText="Styling hair..."
              />
              {!canGenerate && (
                <p className="text-xs mt-3" style={{ fontFamily: FONT_UI, color: C.muted }}>
                  Upload a photo to start styling.
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

