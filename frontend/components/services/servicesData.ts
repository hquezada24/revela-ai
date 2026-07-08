import type { LucideIcon } from "lucide-react";
import { Camera, Scissors, Shirt, Sparkles, MessageSquare, Palette } from "lucide-react";

export interface ServiceMeta {
  name: string;
  slug: "portraits" | "hair-studio" | "virtual-try-on" | "makeup-studio" | "ai-stylist" | "color-analysis";
  desc: string;
  icon: LucideIcon;
  color: string;
  textColor: string;
  border: string;
  tag?: string;
  badge?: string;
}

export const SERVICES_DATA: ServiceMeta[] = [
  {
    name: "Portraits",
    slug: "portraits",
    desc: "Executive-grade HD headshots with studio lighting.",
    icon: Camera,
    color: "rgba(236,72,153,0.12)",
    textColor: "#EC4899",
    border: "rgba(236,72,153,0.25)",
    tag: "HD",
    badge: "Portrait Engine",
  },
  {
    name: "Hair Studio",
    slug: "hair-studio",
    desc: "Simulate haircuts and explore hair colors in 3D.",
    icon: Scissors,
    color: "rgba(109,40,217,0.12)",
    textColor: "#A78BFA",
    border: "rgba(109,40,217,0.25)",
    tag: "3D",
    badge: "Hair Studio",
  },
  {
    name: "Virtual Try-On",
    slug: "virtual-try-on",
    desc: "Instantly dress your photos in any clothing item.",
    icon: Shirt,
    color: "rgba(245,158,11,0.12)",
    textColor: "#F59E0B",
    border: "rgba(245,158,11,0.25)",
    tag: "PBR",
    badge: "Try-On",
  },
  {
    name: "Makeup Studio",
    slug: "makeup-studio",
    desc: "Experiment with makeup presets and color palettes.",
    icon: Sparkles,
    color: "rgba(168,85,247,0.12)",
    textColor: "#C084FC",
    border: "rgba(168,85,247,0.25)",
    badge: "Makeup Lab",
  },
  {
    name: "AI Stylist",
    slug: "ai-stylist",
    desc: "Receive conversational, personalized fashion advice.",
    icon: MessageSquare,
    color: "rgba(59,130,246,0.12)",
    textColor: "#60A5FA",
    border: "rgba(59,130,246,0.25)",
    tag: "AI",
    badge: "Stylist Chat",
  },
  {
    name: "Color Analysis",
    slug: "color-analysis",
    desc: "Discover seasonal undertones and styling palettes.",
    icon: Palette,
    color: "rgba(16,185,129,0.12)",
    textColor: "#34D399",
    border: "rgba(16,185,129,0.25)",
    badge: "Palette Scan",
  },
];

