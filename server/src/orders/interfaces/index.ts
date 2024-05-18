import { Date } from 'mongoose'

export interface MailOrder {
  productIds: string[]
  paid: boolean
  city: string
  method: string
  price: number
  post: string
  buyer: Buyer
  createdAt: Date
}

export interface ContractOrder {
  productIds: string[]
  paid: boolean
  city: string
  method: string
  price: number
  post: string
  address: string
  orderId: number
  buyer: Buyer
  createdAt: Date
}

interface Buyer {
  username: string
  surname: string
  phone: string
}
