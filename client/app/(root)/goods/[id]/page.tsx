import type { Metadata } from 'next'
import React from 'react'

import { getProduct } from '@/api/products'
import Slider from '@/components/Slider'
import ProductParameters from '@/components/forms/ProductParameters'
import { HeartIcon } from '@/components/icons'
import { Button } from '@/components/ui'
import style from '@/styles/pages/good.module.scss'
import { priceCalc } from '@/components/priceCalc'

export async function generateMetadata({ params: { id } }: Params): Promise<Metadata> {
  const product: Product = await getProduct({ params: { id } }).then(res => res.data)
  return {
    title: product.title,
    keywords: `${product.title}, sneakers $${product.price} shoes, sneakers`,
    description: product.desc,
  }
}

const Product: React.FC<Params> = async ({ params: { id } }) => {
  const product: Product = await getProduct({ params: { id } }).then(res => res.data)
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
          <div className={style.size_title}>Select Size</div>
          <ProductParameters product={product} />

          <Button size='large' variant='outlined'>
            Favorite <HeartIcon />
          </Button>
        </div>

        <p>{product.desc}</p>
      </div>
    </div>
  )
}

export default Product
