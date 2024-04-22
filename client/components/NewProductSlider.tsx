import React from 'react'

import { getNewProducts } from '@/api/products'
import style from '@/styles/pages/home.module.scss'

import { ProductSchema } from './ProductSchema'


const NewProductSlider = async () => {
  const products = await getNewProducts().then(data => data.data)
  return (
    <ul className={style.recommendations}>
      {products.map(product => (
        <ProductSchema key={product._id} product={product} />
      ))}
    </ul>
  )
}

export default NewProductSlider
