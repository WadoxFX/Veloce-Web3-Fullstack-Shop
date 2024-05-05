import { cookies } from 'next/headers'
import React from 'react'

import { getLikedProducts } from '@/api/products'
import Link from 'next/link'
import Image from 'next/image'

import style from '@/styles/pages/liked.module.scss'
import { priceCalc } from '@/components/priceCalc'

const Liked = async () => {
  const token = cookies().get('token')!.value
  const likedList: LikedProducts = await getLikedProducts({ params: { token } }).then(
    res => res.data,
  )

  return (
    <>
      <h1 className={style.title}>Your favorite products</h1>
      <ul className={style.liked_list}>
        {likedList.map((product: LikedProduct, id: number) => (
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
                <div>{product.title}</div>
                <div>{product.gender} Shoes</div>
                <p>{product.desc}</p>
                <div>${priceCalc(product.price, product.discount || 0)}</div>
              </div>
            </li>
            {id !== likedList.length - 1 && <hr />}
          </>
        ))}
      </ul>
    </>
  )
}

export default Liked
