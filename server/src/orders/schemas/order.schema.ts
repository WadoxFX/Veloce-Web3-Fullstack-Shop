import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Date, HydratedDocument } from 'mongoose'

export type BayerDocument = HydratedDocument<Bayer>

@Schema({ _id: false })
export class Bayer {
  @Prop({ type: String, required: true, trim: true })
  surname: string

  @Prop({ type: String, required: true, trim: true })
  username: string

  @Prop({ type: String, required: true, trim: true })
  phone: string
}

export const BayerSchema = SchemaFactory.createForClass(Bayer)

export type OrderDocument = HydratedDocument<Order>

@Schema()
export class Order {
  @Prop({ type: [String], required: true, trim: true })
  productIds: string[]

  @Prop({ type: Boolean, default: false })
  paid: boolean

  @Prop({ type: String, required: false, trim: true })
  address?: string

  @Prop({ type: String, required: false, trim: true })
  orderId?: string

  @Prop({ type: String, required: true, trim: true })
  city: string

  @Prop({ type: String, required: true, trim: true })
  post: string

  @Prop({ type: String, required: true, trim: true })
  method: string

  @Prop({ type: Number, required: true, trim: true })
  price: number

  @Prop({ type: BayerSchema, required: true })
  buyer: Bayer

  @Prop({ type: Date, default: Date.now })
  createdAt: Date
}

export const OrderSchema = SchemaFactory.createForClass(Order)
