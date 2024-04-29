import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import style from '@/styles/pages/basket.module.scss'

import { TrashIcon } from './icons'
import { priceCalc } from './priceCalc'
import { Button } from './ui'

const BasketItem: React.FC<BasketItemProps> = ({ product, id, clear }) => (
  <li className={style.product}>
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
          <div>${priceCalc(product.price, product.discount || 0)}</div>
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
)

export default BasketItem
