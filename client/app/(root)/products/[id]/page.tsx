import type { Metadata } from 'next'
import React from 'react'

import { getProduct } from '@/api/products'
import FavoriteButton from '@/components/FavoriteButton'
import Slider from '@/components/Slider'
import Comments from '@/components/comments/Comments'
import ProductParameters from '@/components/forms/ProductParameters'
import { priceCalc } from '@/components/priceCalc'
import style from '@/styles/pages/product.module.scss'

export async function generateMetadata({ params: { id } }: Params): Promise<Metadata> {
  const product: Product = await getProduct({ params: { id } }).then(res => res.data)

  return {
    title: product.title,
    keywords: `${product.title}, sneakers $${product.price} shoes, sneakers`,
    description: product.desc,
  }
}

const Product: React.FC<Params> = async ({ params: { id } }) => {
  const res = await fetch(`${process.env.SERVER_URL}products/${id}`, { cache: 'no-cache' })
  const product: Product = await res.json()
  return (
    <div className={style.container}>
      <Slider images={product.images} />

      <div className={style.product_info}>
        <div className={style.product_header}>
          <h1>{product.title}</h1>
          <div className={style.gender}>{product.gender} Shoes</div>
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
        </div>

        <div className={style.sizes_box}>
          <div className={style.size_title}>
            <hr />
            <h3>Select Size</h3>
            <hr />
          </div>
          <ProductParameters product={product} />
          <FavoriteButton productId={product._id} favoriteList={product.addedToFavorite} />
        </div>

        <div className={style.description}>
          <div className={style.desc_title}>
            <hr />
            <h3>Description</h3>
            <hr />
          </div>
          <p>{product.desc}</p>
        </div>

        <div className={style.comments}>
          <div className={style.coments_title}>
            <hr />
            <h4>Comments</h4>
            <hr />
          </div>
          <Comments productId={id} comments={product.comments} />
        </div>
      </div>
    </div>
  )
}

export default Product
