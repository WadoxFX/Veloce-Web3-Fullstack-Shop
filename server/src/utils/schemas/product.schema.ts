import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type SizeDocument = HydratedDocument<Size>

@Schema()
export class Size {
  @Prop({ type: String, required: true, trim: true })
  size: string

  @Prop({ type: String, required: true, trim: true })
  quantity: string
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

  @Prop({ type: [SizeSchema], required: true, trim: true })
  sizes: Size[]
}

export const ProductSchema = SchemaFactory.createForClass(Product)
