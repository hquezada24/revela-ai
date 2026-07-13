"use client";
import { useMutation } from "@tanstack/react-query";
import { uploadToR2 } from "@/lib/uploadToR2";

function useUploadToR2() {
  return useMutation({
    mutationFn: ({ uploadUrl, file }: { uploadUrl: string; file: File }) =>
      uploadToR2(uploadUrl, file),
  });
}

export default useUploadToR2;
