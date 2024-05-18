import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { getLikedProducts } from '@/api/products'
import { priceCalc } from '@/components/priceCalc'
import style from '@/styles/pages/liked.module.scss'

export const metadata: Metadata = {
  title: 'Favorite List ❤️ - Veloce',
  keywords: 'Favorite List, liked, veloce',
  description: 'Your list of products you like',
}

const Liked = async () => {
  const token = cookies().get('token')!.value
  const likedList: LikedProducts = await getLikedProducts({ params: { token } }).then(
    res => res.data,
  )

  return (
    <>
      <h1 className={style.title}>Your favorite products</h1>
      <ul className={style.liked_list}>
        {likedList.map((product: LikedProduct, index) => (
          <>
            <li className={style.liked_product} key={product._id}>
              <Link href={`/products/${product._id}`}>
                <Image
                  src={process.env.SERVER_URL + product.images[0]}
                  width={100}
                  height={100}
                  alt={product.title}
                />
              </Link>
              <div className={style.liked_product_info}>
                <div data-test-id="product_title" className={style.product_title}>{product.title}</div>
                <div>{product.gender} Shoes</div>
                <p>{product.desc}</p>
                <div>${priceCalc(product.price, product.discount ?? 0)}</div>
              </div>
            </li>
            {index !== likedList.length - 1 && <hr />}
          </>
        ))}
      </ul>
    </>
  )
}

export default Liked
