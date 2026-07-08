// hooks/useCreateUser.tsx
"use client";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "@/lib/auth";
import { LoginData } from "@/schemas"; // Using LoginData since registration only needs email/password right now

function useCreateUser() {
  return useMutation({
    mutationFn: (data: LoginData) => registerUser(data.email, data.password),
  });
}

export default useCreateUser;
