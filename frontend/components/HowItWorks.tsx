import Section from "./Section";
import SectionTitle from "./SectionTitle";
import SectionLabel from "./SectionLabel";
import GradText from "./GradText";
import C from "@/styles/colors";
import { FONT_UI, FONT_DISPLAY } from "@/styles/fonts";

const STEPS = [
  {
    n: "01",
    title: "Upload a Photo",
    desc: "Start with a selfie or any clear photo. Our AI works with any lighting, background, or pose.",
  },
  {
    n: "02",
    title: "Tell Us What You Want",
    desc: "Describe a goal, occasion, or mood — or just browse styles and let inspiration strike.",
  },
  {
    n: "03",
    title: "Discover New Versions of You",
    desc: "Receive stunning, realistic transformations ready to save, share, or try in real life.",
  },
];

function HowItWorks() {
  return (
    <div id="how-it-works" style={{ background: C.bg }}>
      <Section className="py-24">
        <div className="text-center mb-16">
          <SectionLabel>Process</SectionLabel>
          <SectionTitle center>
            <GradText>Three Simple Steps</GradText>
          </SectionTitle>
          <p
            className="max-w-sm mx-auto"
            style={{ fontFamily: FONT_UI, color: C.muted, lineHeight: 1.7 }}
          >
            From selfie to stunning — your transformation takes less than a
            minute.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 relative">
          {/* Connector line */}
          <div
            className="hidden md:block absolute top-14 left-0 w-[33.3%] h-px"
            style={{
              background:
                "linear-gradient(90deg, rgba(236,72,153,0.4), rgba(109,40,217,0.4))",
            }}
          />
          <div
            className="hidden md:block absolute top-14 left-[calc(33.3%-1px)] w-[33.3%] h-px"
            style={{
              background:
                "linear-gradient(90deg, rgba(109,40,217,0.4), rgba(236,72,153,0.4))",
            }}
          />
          <div
            className="hidden md:block absolute top-14 left-[calc(66.6%-1px)] w-[33.3%] h-px"
            style={{
              background:
                "linear-gradient(90deg, rgba(236,72,153,0.4), rgba(109,40,217,0.2))",
            }}
          />

          {STEPS.map(({ n, title, desc }) => (
            <div key={n} className="flex flex-col items-center text-center">
              <div
                className="flex h-28 w-28 items-center justify-center rounded-full mb-6 text-4xl font-bold relative"
                style={{
                  background: C.gradSubtle,
                  border: "1px solid rgba(109,40,217,0.25)",
                  fontFamily: FONT_DISPLAY,
                  color: "transparent",
                  fontStyle: "italic",
                }}
              >
                <span
                  style={{
                    background: C.grad,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {n}
                </span>
              </div>
              <h3
                className="text-xl font-semibold mb-3"
                style={{
                  fontFamily: FONT_DISPLAY,
                  fontStyle: "italic",
                  color: C.text,
                }}
              >
                {title}
              </h3>
              <p
                className="text-sm leading-relaxed max-w-65"
                style={{ fontFamily: FONT_UI, color: C.muted }}
              >
                {desc}
              </p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

export default HowItWorks;
