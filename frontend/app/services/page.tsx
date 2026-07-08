"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import Section from "@/components/Section";
import C from "@/styles/colors";
import { FONT_DISPLAY, FONT_UI } from "@/styles/fonts";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import { ChevronRight } from "lucide-react";
import { SERVICES_DATA } from "@/components/services/servicesData";

export default function ServicesLandingPage() {
  return (
    <div className="bg-bg min-h-screen">
      {/* Hero */}
      <Section className="pt-16 pb-10">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-6"
          >
            <span
              className="inline-block text-xs font-bold uppercase tracking-wider mb-3"
              style={{ color: C.pink, fontFamily: FONT_UI }}
            >
              Services
            </span>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl"
              style={{
                fontFamily: FONT_DISPLAY,
                fontWeight: 750,
                fontStyle: "italic",
                color: C.text,
                letterSpacing: "-0.02em",
              }}
            >
              Every AI capability.
              <br />
              Its own premium product.
            </h1>
            <p
              className="mt-4 text-sm md:text-base max-w-xl"
              style={{ fontFamily: FONT_UI, color: C.muted, lineHeight: 1.65 }}
            >
              Revela AI is built as a suite of specialized workspaces — each one tuned for a specific outcome:
              portraits, try-on, makeup, hair, styling chat, and color analysis.
            </p>

            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <Link
                href="/services/portraits"
                className="inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  fontFamily: FONT_UI,
                  background: C.grad,
                  boxShadow: "0 10px 30px rgba(109,40,217,0.35)",
                  textDecoration: "none",
                }}
              >
                Start with Portraits <ChevronRight size={14} />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold transition-colors hover:bg-[rgba(255,255,255,0.06)]"
                style={{
                  fontFamily: FONT_UI,
                  color: C.text,
                  border: `1px solid ${C.border}`,
                  textDecoration: "none",
                }}
              >
                View pricing
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="lg:col-span-6"
          >
            <div
              className="rounded-3xl p-4"
              style={{
                border: `1px solid ${C.border}`,
                background: C.surface,
                boxShadow: "0 18px 60px rgba(0,0,0,0.35)",
              }}
            >
              <BeforeAfterSlider aspectRatio="4/5" className="w-full" />
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Services Grid */}
      <div style={{ background: C.surface, borderTop: `1px solid ${C.border}` }}>
        <Section className="py-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES_DATA.map((service, idx) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.slug}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.35, delay: Math.min(idx * 0.03, 0.15) }}
                >
                  <Link
                    href={`/services/${service.slug}`}
                    className="group relative flex h-full flex-col justify-between rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1"
                    style={{
                      background: C.glass,
                      border: `1px solid ${C.border}`,
                      textDecoration: "none",
                    }}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <div
                          className="flex h-11 w-11 items-center justify-center rounded-2xl"
                          style={{
                            background: "rgba(255,255,255,0.03)",
                            border: `1px solid ${C.border}`,
                          }}
                        >
                          <Icon size={18} style={{ color: C.pink }} className="group-hover:scale-110 transition-transform duration-200" />
                        </div>
                        {service.tag && (
                          <span
                            className="rounded px-2 py-1 text-[10px] font-bold tracking-wider"
                            style={{
                              background: service.color,
                              color: service.textColor,
                              border: `1px solid ${service.border}`,
                              fontFamily: FONT_UI,
                            }}
                          >
                            {service.tag}
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg font-bold" style={{ fontFamily: FONT_UI, color: C.text }}>
                        {service.name}
                      </h3>
                      <p className="text-xs mt-2" style={{ fontFamily: FONT_UI, color: C.muted, lineHeight: 1.6 }}>
                        {service.desc}
                      </p>
                    </div>

                    <div
                      className="mt-7 inline-flex items-center gap-1.5 text-xs font-bold transition-transform group-hover:translate-x-1"
                      style={{ fontFamily: FONT_UI, color: C.pink }}
                    >
                      Learn more <ChevronRight size={12} />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </Section>
      </div>
    </div>
  );
}

