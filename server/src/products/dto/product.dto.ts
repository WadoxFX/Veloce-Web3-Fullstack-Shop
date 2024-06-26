import { Date, ObjectId } from 'mongoose'

export class ProductDto {
  sizes: string
  gender: string
  title: string
  brand: string
  price: string
  discount: string
  desc: string
  color: string
  collection: string
  addedToFavorite: ObjectId[]
  createdAt: Date
}
