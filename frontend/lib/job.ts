// lib/job.ts

import { apiFetch } from "./api";
import { JobReadSchema, JobRead } from "@/schemas";

export async function getJob(jobId: number | null): Promise<JobRead> {
  const response = await apiFetch<JobRead>(`/api/v1/jobs/${jobId}`);

  return JobReadSchema.parse(response);
}
