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
  const value = useRecoilValue<FiltersList>(filters)
  const { data, isLoading, blocker, ref } = usePagination(4, value)

  if (isLoading) return <Skeleton preloader={ref} />
  if (!data.length && blocker) return <NoData />

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

export default Shop
