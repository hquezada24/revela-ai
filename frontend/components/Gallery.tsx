import Section from "./Section";
import SectionTitle from "./SectionTitle";
import SectionLabel from "./SectionLabel";
import GradText from "./GradText";
import C from "@/styles/colors";
import { FONT_UI } from "@/styles/fonts";
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

const GALLERY = [
  { img: IMGS.g1, label: "Casual → Business", tall: true },
  { img: IMGS.g2, label: "With Beard → Clean Shave", tall: false },
  { img: IMGS.g3, label: "Natural → Glam Makeup", tall: true },
  { img: IMGS.g4, label: "Everyday → Professional Portrait", tall: false },
  { img: IMGS.g5, label: "Long → Short Hair", tall: true },
  { img: IMGS.g6, label: "Casual → Evening Look", tall: false },
];

function Gallery() {
  return (
    <div
      id="gallery"
      style={{ background: C.bg, borderTop: `1px solid ${C.border}` }}
    >
      <Section className="py-24">
        <div className="text-center mb-14">
          <SectionLabel>Gallery</SectionLabel>
          <SectionTitle center>
            See the <GradText>Difference</GradText>
          </SectionTitle>
          <p
            className="max-w-sm mx-auto"
            style={{ fontFamily: FONT_UI, color: C.muted, lineHeight: 1.7 }}
          >
            Real transformations from real people. Hover to see more.
          </p>
        </div>

        <div className="columns-2 md:columns-3 gap-4 space-y-4">
          {GALLERY.map(({ img, label, tall }) => (
            <div
              key={label}
              className="group relative overflow-hidden rounded-2xl break-inside-avoid"
              style={{
                aspectRatio: tall ? "3/4" : "4/3",
                background: C.surface,
                cursor: "default",
              }}
            >
              <Image
                src={img}
                alt={label}
                width={100}
                height={100}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              {/* Hover overlay */}
              <div
                className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    "linear-gradient(to top, rgba(7,3,15,0.85) 0%, transparent 60%)",
                }}
              >
                <span
                  className="rounded-full px-3 py-1 text-xs font-semibold text-white"
                  style={{ background: C.grad, fontFamily: FONT_UI }}
                >
                  {label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

export default Gallery;
