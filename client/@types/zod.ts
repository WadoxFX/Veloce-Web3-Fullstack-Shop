import { z } from 'zod'

export type TProductSchema = z.infer<typeof productSchema>
export const productSchema = z.object({
  title: z
    .string()
    .min(6, 'Title must contain at least 6 characters')
    .max(99, 'Title must contain at most 99 characters'),
  price: z.number().max(999999),
})
