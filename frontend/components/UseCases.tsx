import Section from "./Section";
import SectionTitle from "./SectionTitle";
import SectionLabel from "./SectionLabel";
import GradText from "./GradText";
import C from "@/styles/colors";
import { FONT_UI, FONT_DISPLAY } from "@/styles/fonts";
import Image from "next/image";
import { Briefcase, Heart, CalendarHeart, Sparkles } from "lucide-react";

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

const USE_CASES = [
  {
    img: IMGS.interview,
    icon: Briefcase,
    title: "Interviews",
    desc: "Look polished and confident for your next big opportunity.",
  },
  {
    img: IMGS.dating,
    icon: Heart,
    title: "Dating",
    desc: "Present your most attractive and authentic self.",
  },
  {
    img: IMGS.event,
    icon: CalendarHeart,
    title: "Special Events",
    desc: "Prepare for weddings, galas, and milestone celebrations.",
  },
  {
    img: IMGS.everyday,
    icon: Sparkles,
    title: "Everyday Style",
    desc: "Make the most of your wardrobe every single day.",
  },
];

function UseCases() {
  return (
    <div
      id="use-cases"
      style={{ background: C.surface, borderTop: `1px solid ${C.border}` }}
    >
      <Section className="py-24">
        <div className="mb-14">
          <SectionLabel>Use Cases</SectionLabel>
          <SectionTitle>
            Designed for <GradText>Real Life</GradText>
          </SectionTitle>
          <p
            style={{
              fontFamily: FONT_UI,
              color: C.muted,
              lineHeight: 1.7,
              maxWidth: 420,
            }}
          >
            Whether it&apos;s a job interview or a first date, Révéla helps you
            show up as the best version of yourself.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {USE_CASES.map(({ img, icon: Icon, title, desc }) => (
            <div
              key={title}
              className="group relative overflow-hidden rounded-2xl"
              style={{
                aspectRatio: "3/4",
                background: C.surface,
                cursor: "default",
              }}
            >
              <Image
                src={img}
                alt={title}
                width={100}
                height={100}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              {/* Gradient overlay */}
              <div
                className="absolute inset-0 transition-opacity duration-300"
                style={{
                  background:
                    "linear-gradient(to top, rgba(7,3,15,0.92) 0%, rgba(7,3,15,0.3) 50%, transparent 100%)",
                }}
              />
              {/* Content */}
              <div className="absolute inset-x-0 bottom-0 p-5">
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-xl mb-3"
                  style={{
                    background: C.gradSubtle,
                    border: "1px solid rgba(109,40,217,0.3)",
                  }}
                >
                  <Icon size={15} style={{ color: C.pink }} />
                </div>
                <h3
                  className="text-lg font-semibold mb-1"
                  style={{
                    fontFamily: FONT_DISPLAY,
                    fontStyle: "italic",
                    color: C.text,
                  }}
                >
                  {title}
                </h3>
                <p
                  className="text-xs leading-relaxed"
                  style={{ fontFamily: FONT_UI, color: C.muted }}
                >
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

export default UseCases;
