// lib/auth.ts

import { apiFetch } from "./api";
import {
  LoginResponse,
  LoginResponseSchema,
  UserRead,
  UserReadSchema,
} from "@/schemas";

export async function authenticate(
  email: string,
  password: string,
): Promise<LoginResponse> {
  const response = await apiFetch<LoginResponse>("/api/v1/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  return LoginResponseSchema.parse(response);
}

export async function endSession(): Promise<void> {
  await apiFetch("/api/v1/auth/logout", {
    method: "POST",
  });

  return;
}

export async function loadUser(): Promise<UserRead> {
  const res = await apiFetch<UserRead>("/api/v1/users/me");
  return UserReadSchema.parse(res);
}
