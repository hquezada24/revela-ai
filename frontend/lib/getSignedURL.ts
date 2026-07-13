// lib/job.ts

import { apiFetch } from "./api";
import { PresignedURL, PresignedURLSchema, GetPresignedURL } from "@/schemas";

export async function getSignedURL(
  data: GetPresignedURL,
): Promise<PresignedURL> {
  const response = await apiFetch<PresignedURL>(`/api/v1/uploads/presign`, {
    method: "POST",
    body: JSON.stringify(data),
  });

  console.log("Server response: ", response);

  return PresignedURLSchema.parse(response);
}
