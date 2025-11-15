import {z} from 'zod';

export const uploadSchema = z.object({
  projectId: z
    .string()
    .uuid()
    .optional()
    .nullable()
});

export type ImageUploadBody = z.infer<typeof uploadSchema>;

export const imageIdSchema = z.object({
  id: z.string().uuid()
});

export type ImageIdParams = z.infer<typeof imageIdSchema>;


