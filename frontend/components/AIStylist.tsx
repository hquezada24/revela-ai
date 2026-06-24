import Section from "./Section";
import SectionLabel from "./SectionLabel";
import SectionTitle from "./SectionTitle";
import GradText from "./GradText";
import { FONT_UI } from "@/styles/fonts";
import { Check, Sparkles, Send } from "lucide-react";
import C from "@/styles/colors";

const CHAT = [
  {
    role: "user",
    text: "I have an interview at a tech startup next week. What should I wear?",
  },
  {
    role: "revela",
    text: "For a modern startup environment, I recommend business casual pieces in navy and neutral tones. Try a well-fitted blazer over a simple shirt, paired with dark chinos or tailored trousers. Minimalist accessories like a clean watch will give you a polished yet approachable look — confident without being overdressed.",
  },
  { role: "user", text: "What about my hair? I usually keep it casual." },
  {
    role: "revela",
    text: "A neat, slightly structured version of your natural style works perfectly. Consider a light hold product to keep it tidy without looking overly formal. This signals attention to detail — exactly what interviewers remember.",
  },
];

function AIStylist() {
  return (
    <div style={{ background: C.surface, borderTop: `1px solid ${C.border}` }}>
      <Section className="py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionLabel>AI Stylist</SectionLabel>
            <SectionTitle>
              Meet Your Personal
              <br />
              <GradText>AI Stylist</GradText>
            </SectionTitle>
            <p
              className="mb-8"
              style={{ fontFamily: FONT_UI, color: C.muted, lineHeight: 1.75 }}
            >
              Have a conversation with Révéla like you would with a trusted
              friend who happens to be a world-class fashion expert. Ask
              anything — get advice that actually fits your life.
            </p>
            <ul className="space-y-3">
              {[
                "Personalized to your body type, skin tone, and lifestyle",
                "Knows current trends and timeless classics",
                "Gets smarter the more you interact",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div
                    className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full mt-0.5"
                    style={{
                      background: C.gradSubtle,
                      border: "1px solid rgba(109,40,217,0.3)",
                    }}
                  >
                    <Check size={11} style={{ color: C.pink }} />
                  </div>
                  <span
                    className="text-sm"
                    style={{ fontFamily: FONT_UI, color: C.muted }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Chat UI */}
          <div
            className="rounded-3xl overflow-hidden"
            style={{ border: `1px solid ${C.border}`, background: "#0B0518" }}
          >
            {/* Chat header */}
            <div
              className="flex items-center gap-3 px-5 py-4"
              style={{
                borderBottom: `1px solid ${C.border}`,
                background: "rgba(255,255,255,0.03)",
              }}
            >
              <div
                className="flex h-9 w-9 items-center justify-center rounded-xl"
                style={{ background: C.grad }}
              >
                <Sparkles size={15} style={{ color: "white" }} />
              </div>
              <div>
                <p
                  className="text-sm font-semibold"
                  style={{ fontFamily: FONT_UI, color: C.text }}
                >
                  Révéla AI Stylist
                </p>
                <p
                  className="text-xs"
                  style={{ fontFamily: FONT_UI, color: C.muted }}
                >
                  Always available · Perfectly personal
                </p>
              </div>
              <div className="ml-auto flex items-center gap-1.5">
                <div
                  className="h-2 w-2 rounded-full"
                  style={{ background: "#22C55E" }}
                />
                <span
                  className="text-xs"
                  style={{ fontFamily: FONT_UI, color: C.muted }}
                >
                  Online
                </span>
              </div>
            </div>

            {/* Messages */}
            <div
              className="flex flex-col gap-3 p-5 max-h-72 overflow-y-auto"
              style={{ scrollbarWidth: "none" }}
            >
              {CHAT.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "revela" && (
                    <div
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg mr-2 mt-1"
                      style={{ background: C.grad }}
                    >
                      <Sparkles size={11} color="white" />
                    </div>
                  )}
                  <div
                    className="max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed"
                    style={{
                      fontFamily: FONT_UI,
                      background:
                        msg.role === "user"
                          ? "rgba(255,255,255,0.07)"
                          : "rgba(109,40,217,0.14)",
                      color: msg.role === "user" ? C.muted : C.text,
                      border:
                        msg.role === "revela"
                          ? "1px solid rgba(109,40,217,0.25)"
                          : `1px solid ${C.border}`,
                      borderRadius:
                        msg.role === "user"
                          ? "16px 4px 16px 16px"
                          : "4px 16px 16px 16px",
                    }}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div
              className="flex items-center gap-3 px-4 py-4"
              style={{ borderTop: `1px solid ${C.border}` }}
            >
              <input
                placeholder="Ask your AI stylist anything..."
                className="flex-1 rounded-xl px-4 py-2.5 text-sm outline-none"
                style={{
                  fontFamily: FONT_UI,
                  background: "rgba(255,255,255,0.05)",
                  border: `1px solid ${C.border}`,
                  color: C.text,
                }}
                readOnly
              />
              <button
                className="flex h-10 w-10 items-center justify-center rounded-xl transition-opacity hover:opacity-80"
                style={{ background: C.grad }}
              >
                <Send size={14} color="white" />
              </button>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}

export default AIStylist;
