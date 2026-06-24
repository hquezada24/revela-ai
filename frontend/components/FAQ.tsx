import C from "@/styles/colors";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import Section from "./Section";
import SectionLabel from "./SectionLabel";
import SectionTitle from "./SectionTitle";
import GradText from "./GradText";
import { FONT_UI } from "@/styles/fonts";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "Are my photos private?",
    a: "Yes. Your photos are encrypted end-to-end and never shared with third parties. We use your images solely to generate your transformations and delete raw uploads within 24 hours.",
  },
  {
    q: "Can I delete my data?",
    a: "Absolutely. You can permanently delete your account, photos, and all generated content at any time from your account settings. Deletion is immediate and irreversible.",
  },
  {
    q: "How long do transformations take?",
    a: "Most transformations complete in 10–30 seconds depending on complexity. Professional photo generation may take up to 60 seconds for the highest quality output.",
  },
  {
    q: "Does it work for everyone?",
    a: "Révéla is designed to work across all skin tones, face shapes, ages, and genders. Our AI models are trained on diverse datasets to ensure beautiful, accurate results for everyone.",
  },
  {
    q: "Are the recommendations personalized?",
    a: "Yes. The AI Stylist learns your preferences, body type, lifestyle, and goals over time to deliver increasingly personalized advice the more you use it.",
  },
  {
    q: "Can I use Révéla on mobile devices?",
    a: "Révéla is fully responsive and optimized for mobile. A native iOS and Android app is coming soon with camera integration for real-time previews.",
  },
];

function FAQ() {
  return (
    <div style={{ background: C.surface, borderTop: `1px solid ${C.border}` }}>
      <Section className="py-24 max-w-3xl">
        <div className="text-center mb-12">
          <SectionLabel>FAQ</SectionLabel>
          <SectionTitle center>
            Common <GradText>Questions</GradText>
          </SectionTitle>
        </div>

        <AccordionPrimitive.Root
          type="single"
          collapsible
          className="space-y-3"
        >
          {FAQS.map(({ q, a }, i) => (
            <AccordionPrimitive.Item
              key={i}
              value={`item-${i}`}
              className="rounded-2xl overflow-hidden"
              style={{ border: `1px solid ${C.border}`, background: C.glass }}
            >
              <AccordionPrimitive.Header>
                <AccordionPrimitive.Trigger
                  className="group flex w-full items-center justify-between px-6 py-4 text-left text-sm font-semibold transition-colors"
                  style={{
                    fontFamily: FONT_UI,
                    color: C.text,
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  {q}
                  <ChevronDown
                    size={15}
                    className="shrink-0 ml-4 transition-transform duration-200 group-data-[state=open]:rotate-180"
                    style={{ color: C.muted }}
                  />
                </AccordionPrimitive.Trigger>
              </AccordionPrimitive.Header>
              <AccordionPrimitive.Content
                className="overflow-hidden"
                style={{ fontSize: 0 }}
              >
                <p
                  className="px-6 pb-5 text-sm leading-relaxed"
                  style={{ fontFamily: FONT_UI, color: C.muted }}
                >
                  {a}
                </p>
              </AccordionPrimitive.Content>
            </AccordionPrimitive.Item>
          ))}
        </AccordionPrimitive.Root>
      </Section>
    </div>
  );
}

export default FAQ;
