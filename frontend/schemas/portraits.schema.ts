import { string, z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const PromptSchema = z.object({
  style: z.enum(["studio", "executive", "creative", "cinematic"]),
  aspect: z.enum(["1:1", "3:4", "4:5"]),
  count: z.int(),
  prompt: z.string(),
  // image: z
  //   .instanceof(File, { message: "Please select a valid file." })
  //   .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
  //   .refine(
  //     (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
  //     "Only .jpg, .png and .webp formats are supported.",
  //   ),
});

export type Prompt = z.infer<typeof PromptSchema>;

export const JobReadSchema = z.object({
  id: z.int(),
  user_id: z.int(),
  status: z.enum(["queued", "processing", "completed", "failed"]),
  progress: z.int().nullish(),
  error_message: z.string().nullish(),
  output: z.record(string(), string()).nullish(),
  started_at: z.string().nullish(),
  completed_at: z.string().nullish(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type JobRead = z.infer<typeof JobReadSchema>;

export const PortraitCreateSchema = z.object({
  input_data: PromptSchema,
  tool: z.enum(["portrait"]),
  input_image_keys: z.array(z.string()).min(1),
});

export type PortraitCreate = z.infer<typeof PortraitCreateSchema>;

export const PresignedURLSchema = z.object({
  object_key: z.string(),
  upload_url: z.string(),
});

export type PresignedURL = z.infer<typeof PresignedURLSchema>;

export const GetPresignedURLSchema = z.object({
  filename: z.string(),
  content_type: z.string(),
});

export type GetPresignedURL = z.infer<typeof GetPresignedURLSchema>;
