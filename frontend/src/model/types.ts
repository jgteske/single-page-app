import { z } from 'zod';

export const MyArrayDataSchema = z.object({
  id: z.number(),
  title: z.string().nullable(),
});

export const MyArraySchema = z.array(MyArrayDataSchema);

export const MyModelSchema = z.object({
  name: z.string(),
  title: z.string().optional(),
  array: MyArraySchema,
});

export type MyArrayData = z.infer<typeof MyArrayDataSchema>;
export type MyArray = z.infer<typeof MyArraySchema>;
export type MyModel = z.infer<typeof MyModelSchema>;
