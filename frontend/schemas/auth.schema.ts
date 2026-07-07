import { z } from "zod";

export const UserResponseSchema = z.object({
  id: z.string(),
  email: z.string(),
});

export type UserResponse = z.infer<typeof UserResponseSchema>;

export const LoginResponseSchema = z.object({
  message: z.string(),
});

export type LoginResponse = z.infer<typeof LoginResponseSchema>;
