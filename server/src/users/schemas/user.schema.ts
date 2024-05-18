import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, ObjectId, Types } from 'mongoose'

export type UserInfosDocument = HydratedDocument<UserInfos>

@Schema({ _id: false })
export class UserInfos {
  @Prop({ type: String, trim: true, required: false })
  city: string

  @Prop({ type: String, trim: true, required: false })
  country: string

  @Prop({ type: Number, trim: true, required: false })
  phone: number
}

export const UserInfosSchema = SchemaFactory.createForClass(UserInfos)

export type UserDocument = HydratedDocument<User>

@Schema()
export class User {
  @Prop({ type: String, default: 'User' })
  role: string

  @Prop({ type: String, required: true, trim: true })
  username: string

  @Prop({ type: String, required: true, trim: true })
  surname: string

  @Prop({ type: String, required: true, trim: true, unique: true })
  email: string

  @Prop({ type: String, required: true, trim: true })
  password: string

  @Prop({ type: [Types.ObjectId], ref: 'Product' })
  likedList: [ObjectId]

  @Prop({ type: UserInfosSchema, required: false })
  infos: UserInfos
}

export const UserSchema = SchemaFactory.createForClass(User)
