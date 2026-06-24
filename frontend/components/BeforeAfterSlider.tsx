"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import { ChevronsLeftRight } from "lucide-react";
import { FONT_UI } from "@/styles/fonts";
import C from "@/styles/colors";
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

function BeforeAfterSlider() {
  const [pos, setPos] = useState(42);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const update = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const r = containerRef.current.getBoundingClientRect();
    setPos(Math.max(5, Math.min(95, ((clientX - r.left) / r.width) * 100)));
  }, []);

  useEffect(() => {
    const move = (e: MouseEvent | TouchEvent) => {
      if (!dragging) return;
      update("touches" in e ? e.touches[0].clientX : e.clientX);
    };
    const up = () => setDragging(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    window.addEventListener("touchmove", move, { passive: true });
    window.addEventListener("touchend", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("touchmove", move);
      window.removeEventListener("touchend", up);
    };
  }, [dragging, update]);

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden rounded-3xl select-none w-full h-full"
      style={{
        aspectRatio: "3/4",
        cursor: "col-resize",
        background: C.surface,
        maxWidth: 420,
      }}
      onMouseDown={(e) => {
        setDragging(true);
        update(e.clientX);
      }}
      onTouchStart={(e) => {
        setDragging(true);
        update(e.touches[0].clientX);
      }}
    >
      {/* Before */}
      <Image
        src={IMGS.heroBefore}
        alt="Before transformation"
        width={1200}
        height={600}
        style={{
          width: "100%",
          height: "auto",
        }}
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
      />

      {/* After — clipped */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <Image
          src={IMGS.heroAfter}
          width={1200}
          height={600}
          style={{
            width: "100%",
            height: "auto",
          }}
          alt="After transformation"
          className="w-full h-full object-cover"
          loading="eager"
        />
      </div>

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 w-px"
        style={{
          left: `${pos}%`,
          background: "rgba(255,255,255,0.9)",
          transform: "translateX(-50%)",
        }}
      >
        {/* Handle */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full"
          style={{
            width: 44,
            height: 44,
            background: "white",
            boxShadow: "0 4px 24px rgba(0,0,0,0.35)",
          }}
        >
          <ChevronsLeftRight size={18} style={{ color: C.violet }} />
        </div>
      </div>

      {/* Labels */}
      <span
        className="absolute bottom-4 left-4 rounded-full px-3 py-1 text-xs font-semibold"
        style={{
          background: "rgba(0,0,0,0.55)",
          color: "rgba(255,255,255,0.8)",
          fontFamily: FONT_UI,
          backdropFilter: "blur(8px)",
        }}
      >
        Before
      </span>
      <span
        className="absolute bottom-4 right-4 rounded-full px-3 py-1 text-xs font-bold text-white"
        style={{ background: C.grad, fontFamily: FONT_UI }}
      >
        After Révéla
      </span>

      {/* Drag hint */}
      <div
        className="absolute inset-x-0 bottom-14 flex justify-center pointer-events-none"
        style={{ opacity: dragging ? 0 : 0.7, transition: "opacity 0.3s" }}
      >
        <span
          className="rounded-full px-3 py-1 text-[11px]"
          style={{
            background: "rgba(0,0,0,0.4)",
            color: "white",
            fontFamily: FONT_UI,
            backdropFilter: "blur(6px)",
          }}
        >
          ← drag to compare →
        </span>
      </div>
    </div>
  );
}

export default BeforeAfterSlider;
