"use client";

import React from "react";
import Section from "../Section";
import C from "@/styles/colors";
import { FONT_DISPLAY, FONT_UI } from "@/styles/fonts";
import Link from "next/link";
import { ChevronRight, ChevronDown } from "lucide-react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { motion } from "motion/react";
import FinalCTA from "../FinalCTA";
import { SERVICES_DATA } from "./servicesData";

interface ServiceLayoutProps {
  sidebar: React.ReactNode;
  children: React.ReactNode;
  faqItems?: { q: string; a: string }[];
  examples?: { id: string; url: string; label?: string }[];
  currentSlug: string;
}

// SERVICES_DATA now lives in `servicesData.ts` to avoid duplication between
// the landing page and individual service pages.

const DEFAULT_FAQ = [
  {
    q: "How does the AI generation process work?",
    a: "Our advanced neural engines analyze your uploaded photos to map specific facial markers, body proportions, or color profiles. It then applies style mappings in seconds to yield natural-looking high-resolution results.",
  },
  {
    q: "Are my uploaded photos secure?",
    a: "Absolutely. All uploaded assets are encrypted during transit and rest, and are automatically purged from our servers within 24 hours of generation.",
  },
  {
    q: "Can I adjust the final output parameters?",
    a: "Yes! You can refine the outputs by modifying settings in the left panel, including color schemes, presets, and optional advanced text descriptions.",
  },
];

export default function ServiceLayout({
  sidebar,
  children,
  faqItems = DEFAULT_FAQ,
  examples = [],
  currentSlug,
}: ServiceLayoutProps) {
  // Filter out current service for "Related Services"
  const relatedServices = SERVICES_DATA.filter((s) => s.slug !== currentSlug).slice(0, 3);

  return (
    <div className="bg-bg min-h-screen flex flex-col">
      {/* Main Workspace Section */}
      <Section className="py-8 flex-1">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left panel: Controls */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-5 w-full rounded-3xl p-6"
            style={{
              background: C.surface,
              border: `1px solid ${C.border}`,
            }}
          >
            {sidebar}
          </motion.div>

          {/* Right panel: Workspace View */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-7 w-full h-full"
          >
            {children}
          </motion.div>
        </div>
      </Section>

      {/* Examples Grid Section */}
      {examples.length > 0 && (
        <div style={{ background: C.surface, borderTop: `1px solid ${C.border}` }}>
          <Section className="py-20">
            <div className="mb-10 text-center lg:text-left">
              <span
                className="inline-block text-xs font-bold uppercase tracking-wider mb-2.5"
                style={{ color: C.pink, fontFamily: FONT_UI }}
              >
                Inspiration Gallery
              </span>
              <h2
                className="text-3xl md:text-4xl"
                style={{
                  fontFamily: FONT_DISPLAY,
                  fontWeight: 700,
                  fontStyle: "italic",
                  color: C.text,
                }}
              >
                Explore Examples
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {examples.map((ex) => (
                <div
                  key={ex.id}
                  className="relative aspect-square rounded-2xl overflow-hidden group"
                  style={{ border: `1px solid ${C.border}` }}
                >
                  <img
                    src={ex.url}
                    alt={ex.label || "Example"}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-xs font-semibold text-white" style={{ fontFamily: FONT_UI }}>
                      {ex.label || "Style transformation"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        </div>
      )}

      {/* FAQ Accordion Section */}
      <div style={{ borderTop: `1px solid ${C.border}`, background: C.bg }}>
        <Section className="py-20 max-w-3xl">
          <div className="text-center mb-10">
            <span
              className="inline-block text-xs font-bold uppercase tracking-wider mb-2.5"
              style={{ color: C.pink, fontFamily: FONT_UI }}
            >
              FAQ
            </span>
            <h2
              className="text-3xl md:text-4xl"
              style={{
                fontFamily: FONT_DISPLAY,
                fontWeight: 700,
                fontStyle: "italic",
                color: C.text,
              }}
            >
              Frequently Asked Questions
            </h2>
          </div>

          <AccordionPrimitive.Root type="single" collapsible className="space-y-3">
            {faqItems.map(({ q, a }, i) => (
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
                <AccordionPrimitive.Content className="overflow-hidden" style={{ fontSize: 0 }}>
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

      {/* Related Services Section */}
      <div style={{ background: C.surface, borderTop: `1px solid ${C.border}` }}>
        <Section className="py-20">
          <div className="mb-10 text-center lg:text-left">
            <span
              className="inline-block text-xs font-bold uppercase tracking-wider mb-2.5"
              style={{ color: C.pink, fontFamily: FONT_UI }}
            >
              Cross-Discover
            </span>
            <h2
              className="text-3xl md:text-4xl"
              style={{
                fontFamily: FONT_DISPLAY,
                fontWeight: 700,
                fontStyle: "italic",
                color: C.text,
              }}
            >
              Related AI Services
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {relatedServices.map((service) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group relative flex flex-col justify-between rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: C.glass,
                    border: `1px solid ${C.border}`,
                    textDecoration: "none",
                  }}
                >
                  <div>
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl mb-4 transition-colors"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: `1px solid ${C.border}`,
                      }}
                    >
                      <Icon size={16} style={{ color: C.pink }} className="group-hover:scale-110 transition-transform duration-200" />
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3
                        className="text-lg font-bold text-white group-hover:text-pink-500 transition-colors"
                        style={{ fontFamily: FONT_UI }}
                      >
                        {service.name}
                      </h3>
                      {service.tag && (
                        <span
                          className="rounded px-1.5 py-0.5 text-[9px] font-bold"
                          style={{
                            background: service.color,
                            color: service.textColor,
                            border: `1px solid ${service.border}`,
                          }}
                        >
                          {service.tag}
                        </span>
                      )}
                    </div>
                    <p className="text-xs" style={{ fontFamily: FONT_UI, color: C.muted, lineHeight: 1.5 }}>
                      {service.desc}
                    </p>
                  </div>
                  <div
                    className="flex items-center gap-1.5 text-xs font-bold mt-6 group-hover:translate-x-1 transition-transform"
                    style={{ color: C.pink, fontFamily: FONT_UI }}
                  >
                    Explore service <ChevronRight size={12} />
                  </div>
                </Link>
              );
            })}
          </div>
        </Section>
      </div>

      {/* CTA Section */}
      <FinalCTA />
    </div>
  );
}
