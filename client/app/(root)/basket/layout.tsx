import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Basket',
  keywords: 'Basket, Veloce basket',
  description: 'List of goods given by you for payment',
}

const BasketLayout = ({ children }: Children) => children

export default BasketLayout
