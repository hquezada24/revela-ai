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
    price: "$0",
    period: "/month",
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
    price: "$19",
    period: "/month",
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
    price: "$49",
    period: "/month",
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
  return (
    <div
      id="pricing"
      style={{ background: C.bg, borderTop: `1px solid ${C.border}` }}
    >
      <Section className="py-24">
        <div className="text-center mb-14">
          <SectionLabel>Pricing</SectionLabel>
          <SectionTitle center>
            Choose Your <GradText>Plan</GradText>
          </SectionTitle>
          <p
            className="max-w-sm mx-auto"
            style={{ fontFamily: FONT_UI, color: C.muted, lineHeight: 1.7 }}
          >
            Start free. Upgrade when you&apos;re ready to unlock your full
            potential.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {PLANS.map(
            ({
              name,
              price,
              period,
              desc,
              features,
              cta,
              highlight,
              badge,
            }) => (
              <div
                key={name}
                className="relative rounded-3xl p-6 flex flex-col"
                style={{
                  background: highlight ? "rgba(109,40,217,0.12)" : C.glass,
                  border: highlight
                    ? "1px solid rgba(109,40,217,0.4)"
                    : `1px solid ${C.border}`,
                  boxShadow: highlight
                    ? "0 0 0 1px rgba(109,40,217,0.2), 0 24px 64px rgba(109,40,217,0.2)"
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
                  <div className="flex items-end gap-1 mb-2">
                    <span
                      className="text-4xl font-bold"
                      style={{
                        fontFamily: FONT_DISPLAY,
                        fontStyle: "italic",
                        color: C.text,
                      }}
                    >
                      {price}
                    </span>
                    <span
                      className="text-sm mb-2"
                      style={{ fontFamily: FONT_UI, color: C.muted }}
                    >
                      {period}
                    </span>
                  </div>
                  <p
                    className="text-sm"
                    style={{ fontFamily: FONT_UI, color: C.muted }}
                  >
                    {desc}
                  </p>
                </div>

                <ul className="space-y-2.5 flex-1 mb-7">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <div
                        className="flex h-4.5 w-4.5 mt-0.5 shrink-0 items-center justify-center rounded-full"
                        style={{
                          background: highlight
                            ? C.gradSubtle
                            : "rgba(255,255,255,0.06)",
                          border: `1px solid ${highlight ? "rgba(109,40,217,0.3)" : C.border}`,
                        }}
                      >
                        <Check
                          size={10}
                          style={{ color: highlight ? C.pink : C.muted }}
                        />
                      </div>
                      <span
                        className="text-sm"
                        style={{ fontFamily: FONT_UI, color: C.muted }}
                      >
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full rounded-xl py-3 text-sm font-bold transition-all duration-200 ${highlight ? "hover:-translate-y-px hover:[box-shadow: 0 8px 24px rgba(109,40,217,0.52)]" : "bg-[rgba(255,255,255,0.1)]"}`}
                  style={{
                    fontFamily: FONT_UI,
                    background: highlight ? C.grad : "rgba(255,255,255,0.07)",
                    color: highlight ? "white" : C.text,
                    border: highlight ? "none" : `1px solid ${C.border}`,
                    boxShadow: highlight
                      ? "0 4px 16px rgba(109,40,217,0.4)"
                      : "none",
                  }}
                >
                  {cta}
                </button>
              </div>
            ),
          )}
        </div>
      </Section>
    </div>
  );
}

export default Pricing;
