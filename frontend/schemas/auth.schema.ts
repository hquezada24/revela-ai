import { z } from "zod";

export const UserResponseSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
});

export type UserResponse = z.infer<typeof UserResponseSchema>;

export const LoginResponseSchema = z.object({
  token: z.string(),
  userId: z.string(),
  expiresIn: z.number(),
});

export type LoginResponse = z.infer<typeof LoginResponseSchema>;
