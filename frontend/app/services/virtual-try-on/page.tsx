"use client";

import React, { useState } from "react";
import { Link2, ShieldCheck, Shirt } from "lucide-react";
import C from "@/styles/colors";
import { FONT_UI } from "@/styles/fonts";
import ServiceLayout from "@/components/services/ServiceLayout";
import ServiceHeader from "@/components/services/ServiceHeader";
import UploadCard from "@/components/services/UploadCard";
import OptionCard from "@/components/services/OptionCard";
import AdvancedSettings from "@/components/services/AdvancedSettings";
import GenerateButton from "@/components/services/GenerateButton";
import ResultCard from "@/components/services/ResultCard";

type Category = "tops" | "outerwear" | "dresses" | "bottoms";

const CATEGORIES: { id: Category; label: string }[] = [
  { id: "tops", label: "Tops" },
  { id: "outerwear", label: "Outerwear" },
  { id: "dresses", label: "Dresses" },
  { id: "bottoms", label: "Bottoms" },
];

const EXAMPLES = [
  { id: "vto-1", url: "https://images.unsplash.com/photo-1520975682034-5f1e0e1be9ef?w=900&h=900&fit=crop&auto=format", label: "Streetwear jacket" },
  { id: "vto-2", url: "https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?w=900&h=900&fit=crop&auto=format", label: "Dress try-on" },
  { id: "vto-3", url: "https://images.unsplash.com/photo-1520975958229-25086a6e2c1b?w=900&h=900&fit=crop&auto=format", label: "Top + jeans" },
  { id: "vto-4", url: "https://images.unsplash.com/photo-1548142813-c348350df52b?w=900&h=900&fit=crop&auto=format", label: "Outerwear fit" },
];

export default function VirtualTryOnServicePage() {
  const [personImage, setPersonImage] = useState<File | null>(null);
  const [clothingImage, setClothingImage] = useState<File | null>(null);

  const [productUrl, setProductUrl] = useState("");
  const [category, setCategory] = useState<Category>("tops");
  const [preservePose, setPreservePose] = useState(true);
  const [advanced, setAdvanced] = useState("");

  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [resultUrl, setResultUrl] = useState<string | undefined>(undefined);

  const canGenerate = Boolean(personImage && (clothingImage || productUrl.trim().length > 0));

  const generate = () => {
    if (!canGenerate) return;
    setIsGenerating(true);
    setProgress(0);
    setResultUrl(undefined);
    let p = 0;
    const timer = window.setInterval(() => {
      p = Math.min(100, p + 8 + Math.round(Math.random() * 7));
      setProgress(p);
      if (p >= 100) {
        window.clearInterval(timer);
        setIsGenerating(false);
        setResultUrl("https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?w=900&h=1200&fit=crop&auto=format");
      }
    }, 230);
  };

  const reset = () => {
    setIsGenerating(false);
    setProgress(0);
    setResultUrl(undefined);
  };

  return (
    <div className="bg-bg min-h-screen">
      <ServiceHeader
        title="Virtual Try-On"
        badge="Try-On"
        description="Upload a person photo and a clothing item (or paste a product URL). Prompts are advanced — the core interface is guided and visual."
        icon={Shirt}
      />

      <ServiceLayout
        currentSlug="virtual-try-on"
        examples={EXAMPLES}
        sidebar={
          <div>
            <UploadCard
              label="Upload Person Image"
              description="Full body works best, neutral background preferred"
              value={personImage}
              onUpload={setPersonImage}
            />

            <div className="mt-6">
              <UploadCard
                label="Upload Clothing Image"
                description="Flat lay or product photo (PNG/JPG)"
                value={clothingImage}
                onUpload={setClothingImage}
              />
            </div>

            <div className="mt-6">
              <div className="flex items-center gap-2 mb-2">
                <Link2 size={14} style={{ color: C.pink }} />
                <span className="text-xs font-bold uppercase tracking-wider" style={{ fontFamily: FONT_UI, color: C.text }}>
                  Product URL (Optional)
                </span>
              </div>
              <input
                value={productUrl}
                onChange={(e) => setProductUrl(e.target.value)}
                placeholder="Paste a product page URL..."
                className="w-full rounded-2xl px-4 py-3 text-sm outline-none"
                style={{
                  fontFamily: FONT_UI,
                  color: C.text,
                  background: "rgba(255,255,255,0.03)",
                  border: `1px solid ${C.border}`,
                }}
              />
              <p className="text-[11px] mt-2" style={{ fontFamily: FONT_UI, color: C.muted, lineHeight: 1.5 }}>
                If you provide a URL, you can skip uploading the clothing image.
              </p>
            </div>

            <div className="mt-6">
              <div className="flex items-center gap-2 mb-3">
                <Shirt size={14} style={{ color: C.pink }} />
                <span className="text-xs font-bold uppercase tracking-wider" style={{ fontFamily: FONT_UI, color: C.text }}>
                  Clothing Category
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {CATEGORIES.map((c) => (
                  <OptionCard key={c.id} selected={category === c.id} onClick={() => setCategory(c.id)} label={c.label} />
                ))}
              </div>
            </div>

            <div className="mt-6">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={preservePose}
                  onChange={(e) => setPreservePose(e.target.checked)}
                  className="mt-1"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={14} style={{ color: C.pink }} />
                    <span className="text-xs font-bold uppercase tracking-wider" style={{ fontFamily: FONT_UI, color: C.text }}>
                      Preserve Pose
                    </span>
                  </div>
                  <p className="text-[11px] mt-1" style={{ fontFamily: FONT_UI, color: C.muted, lineHeight: 1.5 }}>
                    Keeps body proportions and pose stable during try-on.
                  </p>
                </div>
              </label>
            </div>

            <AdvancedSettings title="Advanced Prompt (Optional)">
              <div className="space-y-2">
                <label className="text-xs font-semibold" style={{ fontFamily: FONT_UI, color: C.text }}>
                  Extra instructions
                </label>
                <textarea
                  value={advanced}
                  onChange={(e) => setAdvanced(e.target.value)}
                  placeholder="Ex: keep lighting consistent, realistic fabric folds, preserve face..."
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
                text="Generate try-on"
                loadingText="Applying garment..."
              />
              {!canGenerate && (
                <p className="text-xs mt-3" style={{ fontFamily: FONT_UI, color: C.muted }}>
                  Upload a person image and either a clothing image or product URL.
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

