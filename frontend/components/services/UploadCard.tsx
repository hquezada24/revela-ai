"use client";

import React, { useRef, useState, useEffect } from "react";
import { Upload, X } from "lucide-react";
import C from "@/styles/colors";
import { FONT_UI } from "@/styles/fonts";
import Image from "next/image";

interface UploadCardProps {
  label: string;
  description?: string;
  onUpload: (file: File | null) => void;
  value: File | undefined;
  className?: string;
}

export default function UploadCard({
  label,
  description = "PNG, JPG up to 10MB",
  onUpload,
  value,
  className = "",
}: UploadCardProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!value) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(value);
    setPreviewUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [value]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith("image/")) {
        onUpload(file);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onUpload(e.target.files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const clearFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    onUpload(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <label
        className="block text-xs font-bold uppercase tracking-wider mb-2"
        style={{ fontFamily: FONT_UI, color: C.text }}
      >
        {label}
      </label>

      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={previewUrl ? undefined : triggerFileInput}
        className={`relative flex flex-col items-center justify-center rounded-2xl p-6 transition-all duration-300 ${
          previewUrl
            ? "cursor-default"
            : "cursor-pointer hover:border-[rgba(255,255,255,0.16)] hover:bg-[rgba(255,255,255,0.02)]"
        }`}
        style={{
          minHeight: "180px",
          border: `2px dashed ${isDragActive ? C.violet : C.border}`,
          background: isDragActive ? "rgba(109,40,217,0.06)" : C.glass,
          boxShadow: isDragActive ? "0 0 20px rgba(109,40,217,0.15)" : "none",
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        {previewUrl ? (
          <div className="relative w-full h-44 rounded-xl overflow-hidden group">
            <Image
              src={previewUrl}
              alt="Uploaded preview"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={triggerFileInput}
                className="rounded-xl px-4 py-2 text-xs font-semibold text-white bg-violet-600 hover:bg-violet-700 transition-colors"
                style={{ fontFamily: FONT_UI }}
              >
                Change Photo
              </button>
              <button
                type="button"
                onClick={clearFile}
                className="rounded-xl p-2 text-white bg-red-600/80 hover:bg-red-700 transition-colors"
                title="Remove photo"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-xl mb-3 transition-transform"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: `1px solid ${C.border}`,
              }}
            >
              <Upload size={20} style={{ color: C.pink }} />
            </div>
            <p
              className="text-sm font-semibold"
              style={{ fontFamily: FONT_UI, color: C.text }}
            >
              Drag & drop photo, or{" "}
              <span style={{ color: C.pink }}>browse</span>
            </p>
            <p
              className="text-xs mt-1.5"
              style={{ fontFamily: FONT_UI, color: C.muted }}
            >
              {description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
