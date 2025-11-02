import { z } from "zod";

export const productSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  price: z.number().min(0, "Price must be positive"),
  description: z.string().optional(),
  category: z.string().min(2, "Category is required"),
  files: z
    .any()
    .refine((files) => files?.length > 0, "At least one file is required")
    .optional(),
  video: z.any().optional(),
});

export type ProductFormValues = z.infer<typeof productSchema>;
