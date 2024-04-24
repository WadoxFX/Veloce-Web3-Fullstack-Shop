'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import BasketAside from '@/components/BasketAside'
import { TrashIcon } from '@/components/icons'
import { Button } from '@/components/ui'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import style from '@/styles/pages/basket.module.scss'

const Basket = () => {
  const { data, loading, clear } = useLocalStorage('basket')
  if (loading) return <p>Loading...</p>

  let sum: number = 0
  for (let i = 0; data.length > i; i += 1) {
    sum += data[i].price
  }

  return (
    <div className={style.container}>
      <ul className={style.products_list}>
        {data.map((product: BasketProduct, id: number) => (
          <li className={style.product} key={id}>
            <Link href={`/goods/${product._id}`}>
              <Image
                className={style.product_image}
                src={process.env.SERVER_URL + product.image}
                width={400}
                height={400}
                alt={product.title}
                priority
              />
            </Link>
            <div className={style.product_info}>
              <div className={style.product_stats}>
                <div className={style.product_header}>
                  <h3>{product.title}</h3>
                  <div>${product.price}</div>
                </div>
                <p>{product.gender} Shoes</p>
                <p>Size: {product.size}</p>
                <p>Color: {product.color}</p>
              </div>
              <div>
                <Button variant='text' onClick={() => clear(id)}>
                  <TrashIcon color='#000' size={24} />
                </Button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <BasketAside sum={sum} />
    </div>
  )
}

export default Basket
