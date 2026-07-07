import { z } from "zod";

export const LoginDataSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export type LoginData = z.infer<typeof LoginDataSchema>;

export const UserBaseSchema = z.object({
  email: z.string(),
  age: z.number().nullish(),
  profile_photo_url: z.string().nullish(),
  preferred_language: z.enum(["en", "es"]),
});

export const UserCreateSchema = UserBaseSchema.extend({
  password: z.string(),
});

export const UserReadSchema = UserBaseSchema.extend({
  id: z.number(),
  onboarding_completed: z.boolean(),
  created_at: z.string(),
});

export type UserRead = z.infer<typeof UserReadSchema>;

export const UserSchema = UserReadSchema.extend({
  password: z.string(),
});
