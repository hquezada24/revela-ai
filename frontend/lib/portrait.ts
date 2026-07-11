// lib/portrait.ts

import { apiFetch } from "./api";
import { JobReadSchema, PortraitCreate, JobRead } from "@/schemas";

export async function generatePortrait(data: PortraitCreate): Promise<JobRead> {
  const response = await apiFetch<JobRead>("/api/v1/portraits", {
    method: "POST",
    body: JSON.stringify(data),
  });

  return JobReadSchema.parse(response);
}
