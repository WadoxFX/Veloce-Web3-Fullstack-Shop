import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Date, HydratedDocument, ObjectId, Types } from 'mongoose'

export type SizeDocument = HydratedDocument<Size>

@Schema({ _id: false })
export class Size {
  @Prop({ type: String, required: true, trim: true })
  size: string

  @Prop({ type: Number, required: true, trim: true })
  quantity: number
}

export const SizeSchema = SchemaFactory.createForClass(Size)

export type ProductDocument = HydratedDocument<Product>

@Schema()
export class Product {
  @Prop({ type: String, required: true, trim: true })
  title: string

  @Prop({ type: Number, required: true, trim: true })
  price: number

  @Prop({ type: String, required: true, trim: true })
  desc: string

  @Prop({ type: String, required: true, trim: true })
  gender: string

  @Prop({ type: String, required: true, trim: true })
  color: string

  @Prop({ type: String, required: true, trim: true })
  brand: string

  @Prop({ type: Number, required: false, trim: true })
  discount?: number

  @Prop({ type: String, required: true, trim: true })
  collection: string

  @Prop({ type: [String], required: true, trim: true })
  images: string[]

  @Prop({ type: [Types.ObjectId], ref: 'User' })
  addedToFavorite: [ObjectId]

  @Prop({ type: Date, default: Date.now })
  createdAt: Date

  @Prop({ type: [SizeSchema], required: true, trim: true })
  sizes: Size[]
}

export const ProductSchema = SchemaFactory.createForClass(Product)
