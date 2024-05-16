import { email, password, text } from '@/components/pattern'
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

export type TAboutMeSchema = z.infer<typeof aboutMeSchema>
export const aboutMeSchema = z.object({
  phone: z.string().min(8, 'Must contain at least 10 digits').max(99, 'Must not exceed 99 digits'),
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

  post: z
    .string()
    .min(1, 'Post must contain at least 1 characters')
    .max(99, 'Post must contain at most 99 characters')
    .regex(text)
    .optional(),

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

export type TLogInSchema = z.infer<typeof logInSchema>
export const logInSchema = z.object({
  email: z
    .string()
    .email()
    .max(56, 'Email a valid username, no more than 99 characters')
    .regex(email),

  password: z
    .string()
    .min(6, 'Password must contain at least 6 characters')
    .max(99, 'Password a valid username, no more than 99 characters')
    .regex(password),
})

export type TSignUpSchema = z.infer<typeof signUpSchema>
export const signUpSchema = z.object({
  username: z.string().min(2, 'Min 2 characters').max(99, 'Min 99 characters').regex(text),
  surname: z.string().min(2, 'Min 2 characters').max(99, 'Min 99 characters').regex(text),
  email: z
    .string()
    .email()
    .max(56, 'Email a valid username, no more than 99 characters')
    .regex(email),

  password: z
    .string()
    .min(6, 'Password must contain at least 6 characters')
    .max(99, 'Password a valid username, no more than 99 characters')
    .regex(password),
})

export type TCommentSchema = z.infer<typeof commentSchema>
export const commentSchema = z.object({
  comment: z
    .string()
    .min(6, 'Comment must contain at least 6 characters')
    .max(250, 'Comment must contain at most 250 characters'),
  grade: z.string(),
})

export type TPaymentSchema = z.infer<typeof paymentSchema>
export const paymentSchema = z.object({
  email: z
    .string()
    .email()
    .max(56, 'Email a valid username, no more than 99 characters')
    .regex(email),
  phone: z.string().min(8, 'Must contain at least 10 digits').max(99, 'Must not exceed 99 digits'),
  username: z.string().min(2, 'Min 2 characters').max(99, 'Min 99 characters').regex(text),
  surname: z.string().min(2, 'Min 2 characters').max(99, 'Min 99 characters').regex(text),
  method: z.string(),
})
