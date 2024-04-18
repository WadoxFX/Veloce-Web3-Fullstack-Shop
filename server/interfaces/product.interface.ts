import { Types } from 'mongoose'

export interface ProductSize {
  size: string
  quantity: number
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
  sizes: ProductSize[]
}
