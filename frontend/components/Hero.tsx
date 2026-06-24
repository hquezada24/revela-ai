import Section from "./Section";
import GradText from "./GradText";
import C from "@/styles/colors";
import { FONT_UI, FONT_DISPLAY } from "@/styles/fonts";
import { ArrowRight, Upload, Star } from "lucide-react";
import BeforeAfterSlider from "./BeforeAfterSlider";
import Image from "next/image";

const IMGS = {
  heroAfter:
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=700&h=900&fit=crop&auto=format",
  heroBefore:
    "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=700&h=900&fit=crop&auto=format",
  interview:
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=700&fit=crop&auto=format",
  dating:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=700&fit=crop&auto=format",
  event:
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=700&fit=crop&auto=format",
  everyday:
    "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=700&fit=crop&auto=format",
  g1: "https://images.unsplash.com/photo-1487412947147-5cebf100d293?w=400&h=540&fit=crop&auto=format",
  g2: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&auto=format",
  g3: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=520&fit=crop&auto=format",
  g4: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=460&fit=crop&auto=format",
  g5: "https://images.unsplash.com/photo-1546961342-ea5f69250b49?w=400&h=540&fit=crop&auto=format",
  g6: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=380&fit=crop&auto=format",
};

function Hero() {
  return (
    <div className="relative overflow-hidden" style={{ background: C.bg }}>
      {/* Ambient glows */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute -top-64 -left-64 h-150 w-150 rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, #6D28D9, transparent 70%)",
          }}
        />
        <div
          className="absolute top-1/4 right-0 h-125 w-125 rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, #EC4899, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 left-1/3 h-100 w-100 rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #F59E0B, transparent 70%)",
          }}
        />
      </div>

      <Section className="relative py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-20 xl:gap-28 items-center">
          {/* Left */}
          <div className="flex flex-col items-start">
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold mb-8"
              style={{
                background: "rgba(245,158,11,0.12)",
                color: "#F59E0B",
                border: "1px solid rgba(245,158,11,0.25)",
                fontFamily: FONT_UI,
              }}
            >
              ✦ AI-Powered Style Transformation
            </div>

            <h1
              className="text-5xl md:text-6xl lg:text-[4.5rem] leading-[1.05] mb-6"
              style={{
                fontFamily: FONT_DISPLAY,
                fontWeight: 700,
                fontStyle: "italic",
                color: C.text,
                letterSpacing: "-0.02em",
              }}
            >
              Discover Your
              <br />
              <GradText>Best Look</GradText>
              <br />
              with AI
            </h1>

            <p
              className="text-lg mb-10 max-w-xl"
              style={{
                fontFamily: FONT_UI,
                color: C.muted,
                lineHeight: 1.75,
                fontWeight: 400,
              }}
            >
              Try on outfits, explore new hairstyles, experiment with makeup,
              and receive personalized style recommendations based on your
              unique features.
            </p>

            <div className="flex items-center gap-3 flex-wrap">
              <button
                className="flex items-center gap-2.5 rounded-2xl px-7 py-3.5 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:[box-shadow: 0 14px 40px rgba(109,40,217,0.55)]"
                style={{
                  fontFamily: FONT_UI,
                  background: C.grad,
                  boxShadow: "0 8px 32px rgba(109,40,217,0.45)",
                }}
              >
                <Upload size={15} />
                Upload Your Photo
              </button>

              <button
                className="flex items-center gap-2 rounded-2xl px-7 py-3.5 text-sm font-semibold transition-all duration-150 hover:border-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.07)]"
                style={{
                  fontFamily: FONT_UI,
                  color: C.text,
                  border: `1px solid ${C.border}`,
                  background: C.glass,
                }}
              >
                Try the Demo <ArrowRight size={14} />
              </button>
            </div>

            {/* Social proof */}
            <div className="mt-10 flex items-center gap-4">
              <div className="flex -space-x-3">
                {[IMGS.everyday, IMGS.g2, IMGS.g3, IMGS.g6].map((src, i) => (
                  <Image
                    key={i}
                    src={src}
                    width={100}
                    height={100}
                    alt=""
                    className="h-9 w-9 rounded-full object-cover ring-2"
                  />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 mb-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      fill="#F59E0B"
                      style={{ color: "#F59E0B" }}
                    />
                  ))}
                </div>
                <p
                  className="text-xs"
                  style={{ fontFamily: FONT_UI, color: C.muted }}
                >
                  Loved by <strong style={{ color: C.text }}>24,000+</strong>{" "}
                  style seekers
                </p>
              </div>
            </div>
          </div>

          {/* Right — slider */}
          <div className="flex justify-center lg:justify-end">
            <BeforeAfterSlider />
          </div>
        </div>
      </Section>
    </div>
  );
}

export default Hero;
