import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { priceCalc } from '../priceCalc'

import style from './productSchema.module.scss'

export const ProductSchema: React.FC<{ product: Product }> = ({ product }) => (
  <li>
    <Link href={`/goods/${product._id}`} className={style.product}>
      <Image
        src={process.env.SERVER_URL + product.images[0]}
        width={800}
        height={800}
        alt={product.title}
        priority
      />
      <h3>{product.title}</h3>
      <p>{product.gender} Shoes</p>
      <p>Color: {product.color}</p>

      <div className={style.price}>
        {product.discount ? (
          <>
            <div>${priceCalc(product.price, product.discount || 0)}</div>
            <s className={style.old_price}>${product.price}</s>
            <div className={style.discount}>-{product.discount}%</div>
          </>
        ) : (
          <>${product.price}</>
        )}
      </div>
    </Link>
  </li>
)
