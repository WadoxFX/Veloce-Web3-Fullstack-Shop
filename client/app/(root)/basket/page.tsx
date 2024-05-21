'use client'

import React from 'react'

import { calcSum } from '@/components/calcSum'
import { useLocalStorage } from '@/hooks/useLocalStorage'

import style from './basket.module.scss'
import BasketAside from './components/BasketAside'
import BasketItem from './components/BasketItem'
import Skeleton from './components/Skeleton'

const Basket = () => {
  const { data, loading, clear } = useLocalStorage('basket')
  if (loading) return <Skeleton />

  const sum = calcSum(data)
  return (
    <div className={style.container}>
      <ul className={style.products_list}>
        {!data.length && (
          <div className={style.message}>
            <h2>No added products</h2>
            <p>You don&apos;t have any saved products in your cart!</p>
          </div>
        )}
        {data.map((product: BasketProduct, id: number) => (
          <BasketItem product={product} id={id} onClear={clear} key={id} />
        ))}
      </ul>
      <BasketAside sum={sum} />
    </div>
  )
}

export default Basket
