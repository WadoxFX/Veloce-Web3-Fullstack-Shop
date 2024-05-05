import { Date, ObjectId, Types } from 'mongoose'

export interface ProductSize {
  size: string
  quantity: number
}

export type OptionType = 'High-Low' | 'Low-High' | 'Newest' | 'Featured'
export interface FiltersType {
  gender: string[]
  collection: string[]
  color: string[]
  size: string[]
  option?: OptionType
}

export interface ProductOption {
  limit: number
  page: number
  filters?: FiltersType
}

export interface ProductType {
  _id: Types.ObjectId
  title: string
  price: number
  desc: string
  gender: string
  color: string
  brand: string
  discount?: number | null
  collection: string
  images: string[]
  addedToFavorite: ObjectId[]
  sizes: ProductSize[]
  createdAt: Date
}

export interface ProductFavorite {
  productId: Types.ObjectId
  userId: Types.ObjectId
}
