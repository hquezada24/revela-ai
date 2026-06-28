// lib/auth.ts

import { z } from "zod";
import { apiFetch } from "./api";

// 1. Define the expected response shape
const LoginResponseSchema = z.object({
  token: z.string(),
  userId: z.string(),
  expiresIn: z.number(),
});

// 2. Infer the type from the schema
type LoginResponse = z.infer<typeof LoginResponseSchema>;

export async function authenticate(
  loginParam: string,
  password: string,
): Promise<LoginResponse> {
  const response = await apiFetch("/login", {
    method: "POST",
    body: JSON.stringify({ login: loginParam, password }),
  });

  return LoginResponseSchema.parse(response);
}

export async function endSession(): Promise<void> {
  await apiFetch("/logout", {
    method: "POST",
  });

  return;
}

const UserResponseSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
});

type UserResponse = z.infer<typeof UserResponseSchema>;

export async function loadUser(): Promise<UserResponse> {
  const res = await apiFetch("/api/me");

  return UserResponseSchema.parse(res);
}
