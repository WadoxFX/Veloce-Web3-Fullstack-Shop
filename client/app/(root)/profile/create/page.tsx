import type { Metadata } from 'next'
import React from 'react'

import ProductCreator from '@/components/forms/ProductCreator'

export const metadata: Metadata = {
  title: 'Create Product - Veloce',
  keywords: 'Create product, veloce, new product, products',
  description: 'Create a product by filling in the fields with product data',
}

const Create = () => <ProductCreator />

export default Create
