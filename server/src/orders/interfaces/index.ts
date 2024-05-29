import { Date } from 'mongoose'

export interface MailOrder {
  productIds: string[]
  paid: boolean
  city: string
  mail: string
  method: string
  price: number
  buyer: Buyer
  createdAt: Date
}

export interface ContractOrder {
  productIds: string[]
  paid: boolean
  city: string
  mail: string
  method: string
  price: number
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
