"use client";

import { useState } from "react";
import Section from "./Section";
import SectionTitle from "./SectionTitle";
import SectionLabel from "./SectionLabel";
import GradText from "./GradText";
import { FONT_UI, FONT_DISPLAY } from "@/styles/fonts";
import C from "@/styles/colors";
import { Check } from "lucide-react";

const PLANS = [
  {
    name: "Free",
    price: { monthly: "$0", yearly: "$0" },
    period: { monthly: "/month", yearly: "/month" },
    note: { monthly: "", yearly: "Always free" },
    desc: "Perfect for exploring your style.",
    features: [
      "5 transformations / month",
      "Basic color analysis",
      "AI Stylist access",
      "Standard resolution exports",
    ],
    cta: "Start Free",
    highlight: false,
  },
  {
    name: "Pro",
    price: { monthly: "$19", yearly: "$15" },
    period: { monthly: "/month", yearly: "/month" },
    note: { monthly: "", yearly: "Billed annually ($180/yr)" },
    desc: "For serious self-transformation.",
    features: [
      "Unlimited transformations",
      "Professional photo generation",
      "Closet AI",
      "High-resolution exports",
      "Priority processing",
    ],
    cta: "Get Pro",
    highlight: true,
    badge: "Most Popular",
  },
  {
    name: "Premium",
    price: { monthly: "$49", yearly: "$39" },
    period: { monthly: "/month", yearly: "/month" },
    note: { monthly: "", yearly: "Billed annually ($468/yr)" },
    desc: "Everything, plus the future first.",
    features: [
      "Everything in Pro",
      "Early access to new features",
      "Priority processing",
      "Premium support",
      "Custom style profiles",
    ],
    cta: "Get Premium",
    highlight: false,
  },
];

function Pricing() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">(
    "monthly",
  );

  return (
    <div
      id="pricing"
      style={{ background: C.bg, borderTop: `1px solid ${C.border}` }}
    >
      <Section className="py-24">
        {/* Header */}
        <div className="text-center mb-10">
          <SectionLabel>Pricing</SectionLabel>
          <SectionTitle center>
            Choose Your <GradText>Plan</GradText>
          </SectionTitle>
          <p
            className="max-w-sm mx-auto mt-4"
            style={{ fontFamily: FONT_UI, color: C.muted, lineHeight: 1.7 }}
          >
            Start free. Upgrade when you&apos;re ready to unlock your full
            potential.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-16">
          <div
            className="inline-flex rounded-full p-1 border"
            style={{
              background: "rgba(255,255,255,0.03)",
              borderColor: C.border,
            }}
          >
            <button
              onClick={() => setBillingPeriod("monthly")}
              className="rounded-full px-5 py-2 text-xs font-semibold transition-all duration-200"
              style={{
                background:
                  billingPeriod === "monthly" ? C.grad : "transparent",
                color: billingPeriod === "monthly" ? "white" : C.muted,
                fontFamily: FONT_UI,
                border: "none",
                cursor: "pointer",
              }}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod("yearly")}
              className="rounded-full px-5 py-2 text-xs font-semibold transition-all duration-200 flex items-center gap-1.5"
              style={{
                background: billingPeriod === "yearly" ? C.grad : "transparent",
                color: billingPeriod === "yearly" ? "white" : C.muted,
                fontFamily: FONT_UI,
                border: "none",
                cursor: "pointer",
              }}
            >
              <span>Yearly</span>
              <span
                className="rounded-full px-2 py-0.5 text-[9px] font-bold"
                style={{
                  background:
                    billingPeriod === "yearly"
                      ? "rgba(255,255,255,0.2)"
                      : "rgba(236,72,153,0.15)",
                  color: billingPeriod === "yearly" ? "white" : C.pink,
                  fontFamily: FONT_UI,
                }}
              >
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto px-4 md:px-0">
          {PLANS.map(
            ({
              name,
              price,
              period,
              note,
              desc,
              features,
              cta,
              highlight,
              badge,
            }) => {
              const currentPrice = price[billingPeriod];
              const currentPeriod = period[billingPeriod];
              const currentNote = note[billingPeriod];

              return (
                <div
                  key={name}
                  className="relative rounded-3xl p-8 flex flex-col transition-all duration-300"
                  style={{
                    background: highlight ? "rgba(109,40,217,0.12)" : C.glass,
                    border: highlight
                      ? "1px solid rgba(109,40,217,0.4)"
                      : `1px solid ${C.border}`,
                    boxShadow: highlight
                      ? "0 0 0 1px rgba(109,40,217,0.1), 0 24px 64px rgba(109,40,217,0.25)"
                      : "none",
                  }}
                >
                  {badge && (
                    <div
                      className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-bold text-white"
                      style={{
                        background: C.grad,
                        fontFamily: FONT_UI,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {badge}
                    </div>
                  )}

                  <div className="mb-6">
                    <p
                      className="text-sm font-semibold mb-1"
                      style={{
                        fontFamily: FONT_UI,
                        color: highlight ? C.pink : C.muted,
                      }}
                    >
                      {name}
                    </p>
                    <div className="flex items-end gap-1.5 mb-1">
                      <span
                        className="text-4xl font-bold"
                        style={{
                          fontFamily: FONT_DISPLAY,
                          fontStyle: "italic",
                          color: C.text,
                        }}
                      >
                        {currentPrice}
                      </span>
                      <span
                        className="text-sm mb-1.5"
                        style={{ fontFamily: FONT_UI, color: C.muted }}
                      >
                        {currentPeriod}
                      </span>
                    </div>
                    {/* Annually Billed Note */}
                    <div style={{ height: 16 }}>
                      {currentNote && (
                        <p
                          className="text-[11px] font-medium"
                          style={{
                            fontFamily: FONT_UI,
                            color: highlight ? C.pink : C.muted,
                          }}
                        >
                          {currentNote}
                        </p>
                      )}
                    </div>
                    <p
                      className="text-sm mt-4"
                      style={{
                        fontFamily: FONT_UI,
                        color: C.muted,
                        lineHeight: 1.5,
                      }}
                    >
                      {desc}
                    </p>
                  </div>

                  <ul className="space-y-3 flex-1 mb-8">
                    {features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <div
                          className="flex h-4.5 w-4.5 mt-0.5 shrink-0 items-center justify-center rounded-full"
                          style={{
                            background: highlight
                              ? C.gradSubtle
                              : "rgba(255,255,255,0.06)",
                            border: `1px solid ${
                              highlight ? "rgba(109,40,217,0.3)" : C.border
                            }`,
                          }}
                        >
                          <Check
                            size={10}
                            style={{ color: highlight ? C.pink : C.muted }}
                          />
                        </div>
                        <span
                          className="text-sm leading-normal"
                          style={{ fontFamily: FONT_UI, color: C.muted }}
                        >
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`w-full rounded-xl py-3 text-sm font-bold transition-all duration-200 ${
                      highlight
                        ? "hover:-translate-y-px hover:[box-shadow: 0 8px 24px rgba(109,40,217,0.52)]"
                        : "bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.15)]"
                    }`}
                    style={{
                      fontFamily: FONT_UI,
                      background: highlight ? C.grad : "rgba(255,255,255,0.07)",
                      color: highlight ? "white" : C.text,
                      border: highlight ? "none" : `1px solid ${C.border}`,
                      boxShadow: highlight
                        ? "0 4px 16px rgba(109,40,217,0.4)"
                        : "none",
                      cursor: "pointer",
                    }}
                  >
                    {cta}
                  </button>
                </div>
              );
            },
          )}
        </div>
      </Section>
    </div>
  );
}

export default Pricing;
