"use client";

import { useState } from "react";
import Section from "./Section";
import SectionTitle from "./SectionTitle";
import SectionLabel from "./SectionLabel";
import GradText from "./GradText";
import C from "@/styles/colors";
import { FONT_UI, FONT_DISPLAY } from "@/styles/fonts";
import { Palette, Scissors, Shirt, Cpu } from "lucide-react";

const MODELS = [
  {
    name: "Lumina-Skin v4.2",
    label: "Color & Tone",
    desc: "Uses advanced spectral mapping to analyze skin undertones, surface tones, and contrast ratios. Automatically suggests your perfect seasonal color palette.",
    specs: [
      { name: "Accuracy", value: "99.4%" },
      { name: "Latency", value: "0.4s" },
      { name: "Input", value: "Standard Selfie" },
    ],
    glow: "rgba(236, 72, 153, 0.15)", // Pink glow
    borderColor: "rgba(236, 72, 153, 0.4)",
    icon: Palette,
  },
  {
    name: "KeraStyle-Net",
    label: "Hair Studio",
    desc: "Simulates hair textures, volumes, lengths, and colors while respecting natural facial geometry. Matches styles to your specific face shape.",
    specs: [
      { name: "Geometry", value: "3D Face Mesh" },
      { name: "Resolution", value: "Up to 4K" },
      { name: "Simulation", value: "Physics Flow" },
    ],
    glow: "rgba(109, 40, 217, 0.15)", // Violet glow
    borderColor: "rgba(109, 40, 217, 0.4)",
    icon: Scissors,
  },
  {
    name: "AuraFit-Outfit",
    label: "Virtual Try-On",
    desc: "Maps garments onto your body shape using physics-based drape modeling. Corrects for light directions and fabric folds for a realistic fit.",
    specs: [
      { name: "Drape Acc.", value: "98.7%" },
      { name: "Multi-Angle", value: "360° Mapping" },
      { name: "Texture", value: "PBR Material" },
    ],
    glow: "rgba(245, 158, 11, 0.15)", // Amber glow
    borderColor: "rgba(245, 158, 11, 0.4)",
    icon: Shirt,
  },
  {
    name: "StyleMind LLM",
    label: "AI Stylist",
    desc: "A custom fine-tuned multimodal styling assistant trained on millions of luxury fashion lookbooks. Provides instant context-aware style advice.",
    specs: [
      { name: "Base Model", value: "Multimodal LLM" },
      { name: "Data Scale", value: "10M+ Styles" },
      { name: "Capabilities", value: "Closet Sync" },
    ],
    glow: "rgba(168, 85, 247, 0.15)", // Purple glow
    borderColor: "rgba(168, 85, 247, 0.4)",
    icon: Cpu,
  },
];

function AIModels() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div
      id="ai-models"
      style={{
        background: C.surface,
        borderTop: `1px solid ${C.border}`,
        borderBottom: `1px solid ${C.border}`,
      }}
    >
      <Section className="py-24">
        {/* Section Header */}
        <div className="text-center mb-16">
          <SectionLabel>Technology</SectionLabel>
          <SectionTitle center>
            Powered by Custom <GradText>AI Models</GradText>
          </SectionTitle>
          <p
            className="max-w-xl mx-auto mt-6 text-lg"
            style={{ fontFamily: FONT_UI, color: C.muted, lineHeight: 1.7 }}
          >
            Explore the specialized neural network architectures custom-built to deliver
            high-fidelity style transformations.
          </p>
        </div>

        {/* Models Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto px-4 lg:px-0">
          {MODELS.map((model, i) => {
            const isHovered = hoveredIdx === i;
            const Icon = model.icon;

            return (
              <div
                key={model.name}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="relative rounded-[2rem] p-8 flex flex-col transition-all duration-300 transform"
                style={{
                  background: C.glass,
                  border: `1px solid ${isHovered ? model.borderColor : C.border}`,
                  transform: isHovered ? "translateY(-6px)" : "translateY(0)",
                  boxShadow: isHovered
                    ? `0 24px 64px -12px ${model.glow}, 0 0 20px -2px ${model.glow}`
                    : "none",
                  cursor: "default",
                }}
              >
                {/* Glow Radial Background */}
                <div
                  className="absolute inset-0 pointer-events-none rounded-[2rem] transition-opacity duration-500"
                  style={{
                    opacity: isHovered ? 1 : 0,
                    background: `radial-gradient(circle at 12% 15%, ${model.glow} 0%, transparent 60%)`,
                  }}
                />

                {/* Card Header */}
                <div className="flex items-center justify-between mb-8 relative">
                  {/* Icon Wrapper */}
                  <div
                    className="flex h-13 w-13 items-center justify-center rounded-2xl transition-all duration-300"
                    style={{
                      background: isHovered ? C.grad : C.gradSubtle,
                      border: `1px solid ${isHovered ? "transparent" : "rgba(255,255,255,0.08)"}`,
                      boxShadow: isHovered
                        ? `0 8px 24px -6px ${model.borderColor}`
                        : "none",
                    }}
                  >
                    <Icon
                      size={20}
                      style={{
                        color: isHovered ? "white" : C.pink,
                        transition: "color 0.3s",
                      }}
                    />
                  </div>

                  {/* Version/Label Badge */}
                  <div
                    className="rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide backdrop-blur-md transition-all duration-300"
                    style={{
                      background: isHovered
                        ? model.borderColor
                        : "rgba(255,255,255,0.05)",
                      border: `1px solid ${isHovered ? "transparent" : C.border}`,
                      color: isHovered ? "white" : C.muted,
                      fontFamily: FONT_UI,
                    }}
                  >
                    {model.label}
                  </div>
                </div>

                {/* Model Info */}
                <div className="flex-1 relative">
                  <h3
                    className="text-2xl font-bold mb-3 transition-colors duration-300"
                    style={{
                      fontFamily: FONT_DISPLAY,
                      fontStyle: "italic",
                      color: isHovered ? "white" : C.text,
                    }}
                  >
                    {model.name}
                  </h3>
                  <p
                    className="text-sm leading-relaxed mb-8"
                    style={{
                      fontFamily: FONT_UI,
                      color: C.muted,
                      lineHeight: 1.7,
                    }}
                  >
                    {model.desc}
                  </p>
                </div>

                {/* Tech Specs Grid */}
                <div
                  className="grid grid-cols-3 gap-4 pt-6 relative"
                  style={{
                    borderTop: `1px solid ${
                      isHovered ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.06)"
                    }`,
                    transition: "border-color 0.3s",
                  }}
                >
                  {model.specs.map((spec) => (
                    <div key={spec.name} className="flex flex-col">
                      <span
                        className="text-[10px] font-semibold uppercase tracking-wider mb-1"
                        style={{ fontFamily: FONT_UI, color: C.muted }}
                      >
                        {spec.name}
                      </span>
                      <span
                        className="text-xs font-bold"
                        style={{
                          fontFamily: FONT_UI,
                          color: isHovered ? C.text : "rgba(255,255,255,0.8)",
                          transition: "color 0.3s",
                        }}
                      >
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Section>
    </div>
  );
}

export default AIModels;
