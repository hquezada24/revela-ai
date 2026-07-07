"use client";
import { useMutation } from "@tanstack/react-query";
import { LoginData } from "@/schemas";
import { authenticate } from "@/lib/auth";

function useLogIn() {
  return useMutation({
    mutationFn: (data: LoginData) => authenticate(data.email, data.password),
  });
}

export default useLogIn;
