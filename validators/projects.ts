import {z} from 'zod';

export const createSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  price: z.number().positive(),
  area: z.number().positive(),
  rooms: z.number()
    .int()
    .positive()
});

export type ProjectCreateInput = z.infer<typeof createSchema>;

export const editSchema = z.object({
  id: z.number()
    .int()
    .positive(),
  title: z.string().min(1),
  description: z.string().min(1),
  price: z.number().positive(),
  area: z.number().positive(),
  rooms: z.number()
    .int()
    .positive()
});

export type ProjectEditInput = {id: number} & Partial<z.infer<typeof editSchema>>;

export const deleteSchema = z.array(
  z.number()
    .int()
    .positive()
);

export type ProjectDeleteInput = z.infer<typeof deleteSchema>;