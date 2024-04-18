import { z } from 'zod'

export type TProductSchema = z.infer<typeof productSchema>
export const productSchema = z.object({
  title: z
    .string()
    .min(6, 'Title must contain at least 6 characters')
    .max(99, 'Title must contain at most 99 characters'),

  brand: z
    .string()
    .min(1, 'Brand must contain at least 1 characters')
    .max(99, 'Brand must contain at most 99 characters'),

  price: z
    .string()
    .min(1, 'Price must contain at least 1 characters')
    .max(99999, 'Price must contain at most 99999 characters'),

  gender: z.string().optional(),
  files: z.custom<FileList>().refine(file => file?.length > 0, 'At least one file is required.'),
  discount: z.string().optional(),
  desc: z
    .string()
    .min(18, 'Description must contain at least 18 characters')
    .max(500, 'Description must contain at most 500 characters'),

  sizes: z
    .array(
      z.object({ id: z.string().optional(), size: z.string().min(1), quantity: z.string().min(1) }),
    )
    .refine(sizes => sizes.length > 0, { message: 'At least one size is required.' }),

  color: z
    .string()
    .min(1, 'Color must contain at least 1 characters')
    .max(99, 'Color must contain at most 99 characters'),

  collection: z.string(),
})
