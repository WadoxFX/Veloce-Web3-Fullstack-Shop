import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Veloce - Shop',
  keywords: 'sneakers, shoes, Veloce, sports, sports shoe store, Nike, Adidas, Puma',
  description: 'Sports shoe store, original products from famous brands - Veloce',
}

const ShopLayout = ({ children }: Children) => children

export default ShopLayout
