"use client";

import React from "react";
import Image from "next/image";
import C from "@/styles/colors";
import { FONT_UI } from "@/styles/fonts";
import { Download, ExternalLink } from "lucide-react";

interface GalleryImage {
  id: string;
  url: string;
  label?: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  onSelect?: (id: string) => void;
  className?: string;
}

export default function ImageGallery({
  images,
  onSelect,
  className = "",
}: ImageGalleryProps) {
  const handleDownload = (e: React.MouseEvent, url: string, name: string) => {
    e.stopPropagation();
    // Since these are remote unsplash links or relative paths,
    // we can open them in a new tab or trigger standard download.
    // For direct mock downloads, opening in a new window is safe.
    window.open(url, "_blank");
  };

  return (
    <div className={`grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6 ${className}`}>
      {images.map((img, i) => (
        <div
          key={img.id || i}
          onClick={() => onSelect && onSelect(img.id)}
          className={`group relative aspect-square rounded-2xl overflow-hidden cursor-pointer ${
            onSelect ? "transition-all hover:scale-[1.02]" : ""
          }`}
          style={{
            border: `1px solid ${C.border}`,
            background: C.glass,
          }}
        >
          {/* Image */}
          <Image
            src={img.url}
            alt={img.label || "Gallery Image"}
            fill
            sizes="(max-width: 768px) 50vw, 33vw"
            className="object-cover transition-transform duration-750 group-hover:scale-105"
          />

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 z-10" />

          {/* Action buttons */}
          <div className="absolute top-3 right-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
            <button
              onClick={(e) => handleDownload(e, img.url, `revela-${img.id}`)}
              className="flex h-8 w-8 items-center justify-center rounded-lg backdrop-blur-md hover:bg-white/20 transition-colors text-white"
              style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)" }}
              title="Download image"
            >
              <Download size={14} />
            </button>
            {onSelect && (
              <div
                className="flex h-8 w-8 items-center justify-center rounded-lg backdrop-blur-md text-white"
                style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)" }}
              >
                <ExternalLink size={14} />
              </div>
            )}
          </div>

          {/* Label overlay */}
          {img.label && (
            <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
              <span
                className="text-xs font-medium text-white/90 truncate block"
                style={{ fontFamily: FONT_UI }}
              >
                {img.label}
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
