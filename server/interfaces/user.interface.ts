import { ObjectId, Types } from 'mongoose'

export interface UserType {
  _id: Types.ObjectId
  role: string
  username: string
  surname: string
  email: string
  password: string
  likedList: ObjectId[]
  infos: UserInfos
}

interface UserInfos {
  city: string
  country: string
  phone: number
}

export interface Token {
  token: string
}

