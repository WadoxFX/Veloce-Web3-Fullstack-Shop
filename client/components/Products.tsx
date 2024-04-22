'use client'

import React from 'react'

import { usePagination } from '@/hooks/usePagination'
import style from '@/styles/pages/shop.module.scss'

import { ProductSchema } from './ProductSchema'

const Products = () => {
  const { data, ref } = usePagination(1)

  return (
    <ul className={style.products_list} ref={ref}>
      {data.map((product: Product) => (
        <ProductSchema product={product} key={product._id} />
      ))}
    </ul>
  )
}

export default Products
