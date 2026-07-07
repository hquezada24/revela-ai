// hooks/useRegister.ts
"use client";
import { useMutation } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";

type RegisterData = {
  email: string;
  password: string;
};

type RegisterResponse = {
  id: string;
  email: string;
};

function useCreateUser() {
  return useMutation<RegisterResponse, Error, RegisterData>({
    mutationFn: (data: RegisterData) =>
      apiFetch<RegisterResponse>("/api/v1/auth/register", {
        method: "POST",
        body: JSON.stringify(data),
      }),
  });
}

export default useCreateUser;
