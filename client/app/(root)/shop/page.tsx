'use client'

import clsx from 'clsx'
import React from 'react'
import { useRecoilValue } from 'recoil'

import { ProductSchema } from '@/components/ProductSchema'
import { usePagination } from '@/hooks/usePagination'
import { filters } from '@/recoil'
import style from '@/styles/pages/shop.module.scss'

import NoData from './NoData'
import { Skeleton } from './Skeleton'

const Shop = () => {
  const filterOptions = useRecoilValue<FiltersList>(filters)
  const { data, blocker, ref } = usePagination<Products>('products', 3, filterOptions)

  if (!data.length && blocker) return <NoData />
  if (!data.length) return <Skeleton preloader={ref} />

  return (
    <div className={style.product_container}>
      <ul className={style.products_list}>
        {data.map(product => (
          <ProductSchema product={product} key={product._id} />
        ))}
      </ul>

      <div className={clsx(!data.length && style.preloader)} ref={ref} />
    </div>
  )
}

export default Shop
