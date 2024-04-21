import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import style from '@/styles/pages/shop.module.scss'

const ProductSchema: React.FC<{ product: Product }> = ({ product }) => (
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

      <div className={style.price}>${product.price}</div>
    </Link>
  </li>
)

export default ProductSchema
