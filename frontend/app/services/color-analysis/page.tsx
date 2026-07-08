"use client";

import React, { useState } from "react";
import { Palette, ScanFace } from "lucide-react";
import C from "@/styles/colors";
import { FONT_DISPLAY, FONT_UI } from "@/styles/fonts";
import ServiceLayout from "@/components/services/ServiceLayout";
import ServiceHeader from "@/components/services/ServiceHeader";
import UploadCard from "@/components/services/UploadCard";
import GenerateButton from "@/components/services/GenerateButton";
import ResultCard from "@/components/services/ResultCard";

type Season = "Spring" | "Summer" | "Autumn" | "Winter";

interface ColorAnalysisResult {
  season: Season;
  recommended: string[];
  avoid: string[];
  outfits: string[];
  hair: string[];
  makeup: string[];
}

const EXAMPLES = [
  { id: "ca-1", url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=900&h=900&fit=crop&auto=format", label: "Warm spring palette" },
  { id: "ca-2", url: "https://images.unsplash.com/photo-1548142813-c348350df52b?w=900&h=900&fit=crop&auto=format", label: "Cool summer palette" },
  { id: "ca-3", url: "https://images.unsplash.com/photo-1545996124-0501ebae84d0?w=900&h=900&fit=crop&auto=format", label: "Deep winter palette" },
  { id: "ca-4", url: "https://images.unsplash.com/photo-1524503033411-f6e7a82adfe8?w=900&h=900&fit=crop&auto=format", label: "Soft autumn palette" },
];

const mockResult: ColorAnalysisResult = {
  season: "Autumn",
  recommended: ["#B45309", "#92400E", "#0F766E", "#1F2937", "#A16207", "#7C2D12"],
  avoid: ["#F472B6", "#93C5FD", "#A855F7", "#E5E7EB"],
  outfits: ["Camel coat + dark denim", "Olive knit + cream trousers", "Rust top + black blazer"],
  hair: ["Warm chestnut", "Soft copper highlights", "Avoid icy ash tones"],
  makeup: ["Terracotta blush", "Bronze shimmer", "Warm nude lips"],
};

export default function ColorAnalysisServicePage() {
  const [portrait, setPortrait] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<ColorAnalysisResult | null>(null);

  const canAnalyze = Boolean(portrait);

  const analyze = () => {
    if (!canAnalyze) return;
    setIsAnalyzing(true);
    setProgress(0);
    setResult(null);
    let p = 0;
    const timer = window.setInterval(() => {
      p = Math.min(100, p + 10 + Math.round(Math.random() * 8));
      setProgress(p);
      if (p >= 100) {
        window.clearInterval(timer);
        setIsAnalyzing(false);
        setResult(mockResult);
      }
    }, 220);
  };

  const reset = () => {
    setIsAnalyzing(false);
    setProgress(0);
    setResult(null);
  };

  return (
    <div className="bg-bg min-h-screen">
      <ServiceHeader
        title="Color Analysis"
        badge="Palette Scan"
        description="Upload a portrait and run a seasonal analysis. No prompt textbox — the results are structured and actionable."
        icon={Palette}
      />

      <ServiceLayout
        currentSlug="color-analysis"
        examples={EXAMPLES}
        sidebar={
          <div>
            <UploadCard label="Upload Portrait" description="Natural lighting recommended" value={portrait} onUpload={setPortrait} />
            <div className="mt-6">
              <GenerateButton
                onClick={analyze}
                loading={isAnalyzing}
                disabled={!canAnalyze}
                text="Analyze colors"
                loadingText="Analyzing tones..."
              />
              {!canAnalyze && (
                <p className="text-xs mt-3" style={{ fontFamily: FONT_UI, color: C.muted }}>
                  Upload a portrait to start the analysis.
                </p>
              )}
            </div>
          </div>
        }
      >
        <ResultCard isGenerating={isAnalyzing} progress={progress} resultUrl={undefined} onReset={result ? reset : undefined}>
          <div
            className="flex-1 rounded-3xl p-6"
            style={{
              border: `1px solid ${C.border}`,
              background: "#0B0518",
              minHeight: 420,
            }}
          >
            {!result ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl mb-4"
                  style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${C.border}` }}
                >
                  <ScanFace size={20} style={{ color: C.muted }} />
                </div>
                <p className="text-sm font-semibold" style={{ fontFamily: FONT_UI, color: C.text }}>
                  Ready to analyze
                </p>
                <p className="text-xs mt-2" style={{ fontFamily: FONT_UI, color: C.muted, lineHeight: 1.6, maxWidth: 360 }}>
                  Upload a portrait and press “Analyze colors” to receive a seasonal palette, recommended colors, outfit ideas, and more.
                </p>
              </div>
            ) : (
              <div className="space-y-7">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider" style={{ fontFamily: FONT_UI, color: C.pink }}>
                    Season
                  </span>
                  <h2
                    className="text-3xl mt-2"
                    style={{ fontFamily: FONT_DISPLAY, fontStyle: "italic", color: C.text, fontWeight: 750 }}
                  >
                    {result.season}
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ fontFamily: FONT_UI, color: C.text }}>
                      Recommended colors
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {result.recommended.map((hex) => (
                        <div
                          key={hex}
                          className="h-10 w-10 rounded-xl"
                          title={hex}
                          style={{ background: hex, border: "1px solid rgba(255,255,255,0.18)" }}
                        />
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ fontFamily: FONT_UI, color: C.text }}>
                      Colors to avoid
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {result.avoid.map((hex) => (
                        <div
                          key={hex}
                          className="h-10 w-10 rounded-xl opacity-70"
                          title={hex}
                          style={{ background: hex, border: "1px solid rgba(255,255,255,0.18)" }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ fontFamily: FONT_UI, color: C.text }}>
                      Outfit suggestions
                    </p>
                    <ul className="space-y-2">
                      {result.outfits.map((t) => (
                        <li key={t} className="text-xs" style={{ fontFamily: FONT_UI, color: C.muted, lineHeight: 1.6 }}>
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ fontFamily: FONT_UI, color: C.text }}>
                      Hair recommendations
                    </p>
                    <ul className="space-y-2">
                      {result.hair.map((t) => (
                        <li key={t} className="text-xs" style={{ fontFamily: FONT_UI, color: C.muted, lineHeight: 1.6 }}>
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ fontFamily: FONT_UI, color: C.text }}>
                      Makeup recommendations
                    </p>
                    <ul className="space-y-2">
                      {result.makeup.map((t) => (
                        <li key={t} className="text-xs" style={{ fontFamily: FONT_UI, color: C.muted, lineHeight: 1.6 }}>
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ResultCard>
      </ServiceLayout>
    </div>
  );
}

