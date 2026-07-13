// hooks/usePresignedURL.tsx
"use client";
import { useMutation } from "@tanstack/react-query";
import { getSignedURL } from "@/lib/getSignedURL";
import { GetPresignedURL } from "@/schemas";

function usePresignedURL() {
  return useMutation({
    mutationFn: (data: GetPresignedURL) => getSignedURL(data),
  });
}

export default usePresignedURL;
