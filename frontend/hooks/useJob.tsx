"use client";
import { useQuery } from "@tanstack/react-query";
import { getJob } from "@/lib/job";

function useJob(jobId: number | null) {
  return useQuery({
    queryKey: ["job", jobId],
    queryFn: () => getJob(jobId),
    refetchInterval: (query) => {
      const status = query.state.data?.status;

      return status === "completed" || status === "failed" ? false : 1000;
    },
  });
}

export default useJob;
