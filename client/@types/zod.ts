import { email, text } from '@/components/pattern'
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

export type TProductSizeSchema = z.infer<typeof productSizeSchema>
export const productSizeSchema = z.object({
  size: z.string().min(1, 'You must choose your size'),
})

export type TPromoCodeSchema = z.infer<typeof promoCodeSchema>
export const promoCodeSchema = z.object({
  promocode: z.string().optional(),
})

export type TPaymentSchema = z.infer<typeof paymentSchema>
export const paymentSchema = z.object({
  phone: z.string().min(10, 'Must contain at least 10 digits').max(99, 'Must not exceed 99 digits'),
  city: z
    .string()
    .min(1, 'City must contain at least 1 characters')
    .max(99, 'City must contain at most 99 characters')
    .regex(text),

  country: z
    .string()
    .min(1, 'Country must contain at least 1 characters')
    .max(99, 'Country must contain at most 99 characters')
    .regex(text),

  email: z
    .string()
    .min(4, 'Email must contain at least 1 characters')
    .max(99, 'Email must contain at most 99 characters')
    .regex(email),

  post: z
    .string()
    .min(4, 'Post must contain at least 6 characters')
    .max(99, 'Post must contain at most 99 characters')
    .regex(text),

  surname: z
    .string()
    .min(1, 'Enter a valid surname')
    .max(99, 'Enter a valid surname, no more than 99 characters')
    .regex(text),

  username: z
    .string()
    .min(1, 'Enter a valid username')
    .max(99, 'Enter a valid username, no more than 99 characters')
    .regex(text),

  comment: z.string().max(99).optional(),
})
