"use client";
import Section from "./Section";
import { FONT_DISPLAY, FONT_UI } from "@/styles/fonts";
import { Zap, ArrowRight, Upload } from "lucide-react";
import GradText from "./GradText";
import C from "@/styles/colors";

function FinalCTA() {
  return (
    <div style={{ background: C.bg, borderTop: `1px solid ${C.border}` }}>
      <Section className="py-32">
        <div
          className="relative rounded-3xl overflow-hidden px-8 py-20 text-center"
          style={{
            background: C.gradSubtle,
            border: "1px solid rgba(109,40,217,0.25)",
          }}
        >
          {/* Glows */}
          <div className="pointer-events-none absolute inset-0">
            <div
              className="absolute -top-24 left-1/4 h-64 w-64 rounded-full opacity-30"
              style={{
                background: "radial-gradient(circle, #6D28D9, transparent 70%)",
              }}
            />
            <div
              className="absolute -bottom-24 right-1/4 h-64 w-64 rounded-full opacity-25"
              style={{
                background: "radial-gradient(circle, #EC4899, transparent 70%)",
              }}
            />
          </div>

          <div className="relative">
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold mb-8"
              style={{
                background: "rgba(245,158,11,0.14)",
                color: C.amber,
                border: "1px solid rgba(245,158,11,0.25)",
                fontFamily: FONT_UI,
              }}
            >
              <Zap size={11} /> Free to start — no credit card required
            </div>

            <h2
              className="text-4xl md:text-6xl mb-5 leading-tight"
              style={{
                fontFamily: FONT_DISPLAY,
                fontWeight: 700,
                fontStyle: "italic",
                color: C.text,
                letterSpacing: "-0.02em",
              }}
            >
              See Who You <GradText>Could Become</GradText>
            </h2>

            <p
              className="text-lg max-w-lg mx-auto mb-10"
              style={{ fontFamily: FONT_UI, color: C.muted, lineHeight: 1.75 }}
            >
              Upload your first photo and discover new possibilities through
              AI-powered style transformation.
            </p>

            <button
              className="inline-flex items-center gap-3 rounded-2xl px-8 py-4 text-base font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:[box-shadow: 0 14px 48px rgba(109,40,217,0.6)]"
              style={{
                fontFamily: FONT_UI,
                background: C.grad,
                boxShadow: "0 8px 32px rgba(109,40,217,0.5)",
              }}
            >
              <Upload size={16} /> Get Started for Free <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </Section>
    </div>
  );
}

export default FinalCTA;
