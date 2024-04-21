'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useRecoilValue } from 'recoil'

import type { TProductSizeSchema } from '@/@types/zod'
import { productSizeSchema } from '@/@types/zod'
import { addToBasket } from '@/api/products/action/addToBasket'
import { profile as profileStorage } from '@/recoil'
import style from '@/styles/pages/good.module.scss'

import { basketLocalStorage } from './basketLocalStorage'
import { Modal } from './ui'

const ProductParameters: React.FC<ProductParametersProps> = ({ product }) => {
  const profile = useRecoilValue(profileStorage)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TProductSizeSchema>({
    resolver: zodResolver(productSizeSchema),
    defaultValues: {
      size: '',
    },
  })

  const onSubmit = handleSubmit(size => {
    const { sizes, images, ...currentProduct } = product
    if (profile?._id) {
      addToBasket()
    } else {
      basketLocalStorage({ ...currentProduct, ...size, image: images[0] })
    }
  })

  return (
    <form className={style.sizes} onSubmit={onSubmit}>
      <div>
        <ul className={clsx(product.gender === 'Unisex' ? style.unisex_sizes : style.gender_sizes)}>
          {product.sizes.map((item, id) => (
            <li key={id}>
              <input value={item.size} id={`size${id}`} type='radio' {...register('size')} />
              <label htmlFor={`size${id}`}>{item.size}</label>
            </li>
          ))}
        </ul>
        {errors.size && <p className={style.error}>{errors.size.message}</p>}
      </div>

      <Modal product={{ ...product, image: product.images[0], size: watch('size') }}>
        Add to Bag
      </Modal>
    </form>
  )
}

export default ProductParameters
