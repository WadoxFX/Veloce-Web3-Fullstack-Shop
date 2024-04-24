import React from 'react'

import { getProduct } from '@/api/products'
import Slider from '@/components/Slider'
import ProductParameters from '@/components/forms/ProductParameters'
import { HeartIcon } from '@/components/icons'
import { Button } from '@/components/ui'
import style from '@/styles/pages/good.module.scss'

const Product: React.FC<Params> = async ({ params: { id } }) => {
  const product: Product = await getProduct({ params: { id } }).then(data => data.data)
  return (
    <div className={style.container}>
      <Slider images={product.images} />

      <div className={style.product_info}>
        <div className={style.product_header}>
          <h1>{product.title}</h1>
          <div className={style.gender}>{product.gender} Shoes</div>
          <div className={style.price}>${product.price}</div>
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
