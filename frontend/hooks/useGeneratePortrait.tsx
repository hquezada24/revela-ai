"use client";
import { useMutation } from "@tanstack/react-query";
import { PortraitCreate } from "@/schemas";
import { generatePortrait } from "@/lib/portrait";

function useGeneratePortrait() {
  return useMutation({
    mutationFn: (data: PortraitCreate) => generatePortrait(data),
  });
}

export default useGeneratePortrait;
