"use client";

import { useState } from "react";
import Image from "next/image";
import Section from "./Section";
import SectionTitle from "./SectionTitle";
import SectionLabel from "./SectionLabel";
import GradText from "./GradText";
import C from "@/styles/colors";
import { FONT_UI } from "@/styles/fonts";
import { motion, AnimatePresence } from "motion/react";

const CATEGORIES = [
  "Professional Photos",
  "Hair Studio",
  "Virtual Try-On",
  "Makeup Studio",
  "AI Stylist",
  "Color Analysis",
];

const GALLERY_DATA = {
  "Professional Photos": [
    {
      id: "pp-1",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
      prompt: "Founder portrait for LinkedIn",
      tags: ["HD Portrait", "Studio Lighting", "Natural Retouch"],
      height: 400,
    },
    {
      id: "pp-2",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800",
      prompt: "Modern executive headshot",
      tags: ["HD Portrait", "Studio Lighting"],
      height: 480,
    },
    {
      id: "pp-3",
      image:
        "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800",
      prompt: "Professional startup profile photo",
      tags: ["Natural Retouch", "Studio Lighting"],
      height: 420,
    },
  ],
  "Hair Studio": [
    {
      id: "hs-1",
      image:
        "https://images.unsplash.com/photo-1595476108010-b4d1f10d5e43?auto=format&fit=crop&q=80&w=800",
      prompt: "French bob with soft layers",
      tags: ["Face Shape Match", "Trending"],
      height: 460,
    },
    {
      id: "hs-2",
      image:
        "https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&q=80&w=800",
      prompt: "Textured wolf cut",
      tags: ["Personalized", "Trending"],
      height: 400,
    },
    {
      id: "hs-3",
      image:
        "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&q=80&w=800",
      prompt: "Curtain bangs makeover",
      tags: ["Face Shape Match", "Personalized"],
      height: 500,
    },
  ],
  "Virtual Try-On": [
    {
      id: "vt-1",
      image:
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800",
      prompt: "Business casual for a software engineer",
      tags: ["Outfit Match", "Personalized"],
      height: 480,
    },
    {
      id: "vt-2",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800",
      prompt: "Parisian minimalist office look",
      tags: ["Outfit Match", "Occasion Based"],
      height: 420,
    },
    {
      id: "vt-3",
      image:
        "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=800",
      prompt: "Summer wedding guest outfit",
      tags: ["Occasion Based", "Personalized"],
      height: 460,
    },
  ],
  "Makeup Studio": [
    {
      id: "ms-1",
      image:
        "https://images.unsplash.com/photo-1512496015851-a1c8bc2636a4?auto=format&fit=crop&q=80&w=800",
      prompt: "Natural everyday glow",
      tags: ["Skin Tone Match", "Natural Finish"],
      height: 440,
    },
    {
      id: "ms-2",
      image:
        "https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&q=80&w=800",
      prompt: "Soft glam evening look",
      tags: ["Customizable", "Skin Tone Match"],
      height: 500,
    },
    {
      id: "ms-3",
      image:
        "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=800",
      prompt: "Editorial makeup inspiration",
      tags: ["Customizable", "Natural Finish"],
      height: 400,
    },
  ],
  "AI Stylist": [
    {
      id: "as-1",
      image:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800",
      prompt: "Help me dress for a first date",
      tags: ["Personalized", "Confidence Boost"],
      height: 480,
    },
    {
      id: "as-2",
      image:
        "https://images.unsplash.com/photo-1550614000-4b95dd1ebdd7?auto=format&fit=crop&q=80&w=800",
      prompt: "How can I look more confident?",
      tags: ["Confidence Boost", "Practical Advice"],
      height: 420,
    },
    {
      id: "as-3",
      image:
        "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=800",
      prompt: "Build a capsule wardrobe",
      tags: ["Practical Advice", "Personalized"],
      height: 460,
    },
  ],
  "Color Analysis": [
    {
      id: "ca-1",
      image:
        "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?auto=format&fit=crop&q=80&w=800",
      prompt: "Best colors for warm undertones",
      tags: ["Seasonal Palette", "Personalized"],
      height: 420,
    },
    {
      id: "ca-2",
      image:
        "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=800",
      prompt: "Autumn palette recommendations",
      tags: ["Seasonal Palette", "Instant Results"],
      height: 400,
    },
    {
      id: "ca-3",
      image:
        "https://images.unsplash.com/photo-1618085220188-b4f210d22703?auto=format&fit=crop&q=80&w=800",
      prompt: "Find my ideal neutrals",
      tags: ["Personalized", "Instant Results"],
      height: 480,
    },
  ],
};

function Features() {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);

  const activeItems = GALLERY_DATA[activeCategory as keyof typeof GALLERY_DATA];

  return (
    <div
      id="features"
      style={{
        background: C.surface,
        borderTop: `1px solid ${C.border}`,
        borderBottom: `1px solid ${C.border}`,
      }}
    >
      <Section className="py-24">
        {/* Header */}
        <div className="text-center mb-12">
          <SectionLabel>Platform</SectionLabel>
          <SectionTitle center>
            Everything You Need to
            <br />
            <GradText>Reinvent Your Style</GradText>
          </SectionTitle>
          <p
            className="max-w-xl mx-auto mt-6 text-lg"
            style={{ fontFamily: FONT_UI, color: C.muted, lineHeight: 1.7 }}
          >
            Explore real AI-powered transformations across styling, beauty, and
            professional identity. See what&apos;s possible before trying it
            yourself.
          </p>
        </div>

        {/* Filters */}
        <div className="flex overflow-x-auto no-scrollbar pb-6 mb-8 justify-start lg:justify-center gap-3 px-4 lg:px-0 scroll-smooth">
          {CATEGORIES.map((category) => {
            const isActive = category === activeCategory;
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "text-white"
                    : "text-[rgba(255,255,255,0.7)] hover:text-white"
                }`}
                style={{
                  fontFamily: FONT_UI,
                  background: isActive ? C.gradSubtle : C.glass,
                  border: `1px solid ${isActive ? "rgba(109,40,217,0.4)" : C.border}`,
                  boxShadow: isActive
                    ? "0 4px 14px rgba(109,40,217,0.2)"
                    : "none",
                }}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Gallery */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 px-4 lg:px-0">
          <AnimatePresence mode="popLayout">
            {activeItems.map((item, i) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                key={item.id}
                className="break-inside-avoid mb-6 relative rounded-[2rem] overflow-hidden group cursor-pointer"
                style={{
                  height: item.height,
                  border: `1px solid ${C.border}`,
                  background: C.glass,
                }}
              >
                {/* Image */}
                <Image
                  src={item.image}
                  alt={item.prompt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,10,10,0.95)] via-[rgba(10,10,10,0.3)] to-transparent pointer-events-none transition-opacity duration-300" />

                {/* Before -> After Badge */}
                <div
                  className="absolute top-5 left-5 px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-wide backdrop-blur-md"
                  style={{
                    background: "rgba(255,255,255,0.15)",
                    border: "1px solid rgba(255,255,255,0.25)",
                    color: "white",
                    fontFamily: FONT_UI,
                  }}
                >
                  Before → After
                </div>

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col justify-end">
                  <p
                    className="text-white text-lg font-medium mb-4 leading-snug drop-shadow-md"
                    style={{ fontFamily: FONT_UI }}
                  >
                    &quot;{item.prompt}&quot;
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 text-[11px] font-medium rounded-full backdrop-blur-md whitespace-nowrap"
                        style={{
                          background: "rgba(255,255,255,0.1)",
                          border: "1px solid rgba(255,255,255,0.15)",
                          color: "rgba(255,255,255,0.9)",
                          fontFamily: FONT_UI,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </Section>
    </div>
  );
}

export default Features;
