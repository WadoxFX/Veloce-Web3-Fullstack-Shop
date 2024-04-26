'use client'

import clsx from 'clsx'
import React from 'react'
import { useRecoilValue } from 'recoil'

import { usePagination } from '@/hooks/usePagination'
import { filters } from '@/recoil'
import style from '@/styles/pages/shop.module.scss'

import { ProductSchema } from './ProductSchema'

const Products = () => {
  const value = useRecoilValue<FiltersList>(filters)
  const { data, ref } = usePagination(3, value)

  return (
    <div className={style.product_container}>
      <ul className={style.products_list}>
        {data.map((product: Product) => (
          <ProductSchema product={product} key={product._id} />
        ))}
      </ul>

      <div className={clsx(!data.length && style.preloader)} ref={ref} />
    </div>
  )
}

export default Products
