import { Bot, Cpu, Banana, Zap, Sparkles, Wand2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface AIModel {
  name: string;
  desc: string;
  icon: LucideIcon;
}

export const AI_MODELS: AIModel[] = [
  {
    name: "GPT Image 2",
    desc: "Latest model",
    icon: Bot,
  },
  {
    name: "SD3",
    desc: "Stable Diffusion 3",
    icon: Cpu,
  },
  {
    name: "Nano Banana 2",
    desc: "Nano Banana's model",
    icon: Banana,
  },
  {
    name: "Grok Imagine",
    desc: "xAI's model",
    icon: Zap,
  },
  {
    name: "Soul 2.0",
    desc: "Higgsfield's model",
    icon: Sparkles,
  },
  {
    name: "Inpaint",
    desc: "OpenArt AI model",
    icon: Wand2,
  },
];
