'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import React from 'react'
import { useForm } from 'react-hook-form'

import type { TProductSizeSchema } from '@/@types/zod'
import { productSizeSchema } from '@/@types/zod'
import style from '@/styles/pages/products.module.scss'

import { basketLocalStorage } from '../basketLocalStorage'
import { Modal } from '../ui'

const ProductParameters: React.FC<ProductParametersProps> = ({ product }) => {
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

    basketLocalStorage({ ...currentProduct, ...size, image: images[0] })
  })

  return (
    <form className={style.sizes} onSubmit={onSubmit}>
      <div>
        <ul className={clsx(product.gender === 'Unisex' ? style.unisex_sizes : style.gender_sizes)}>
          {product.sizes.map((item, id) => (
            <li key={id}>
              <input
                disabled={item.quantity <= 0}
                value={item.size}
                id={`size${id}`}
                type='radio'
                {...register('size')}
              />
              <label
                className={clsx(item.quantity <= 0 && style.label_disabled)}
                htmlFor={`size${id}`}
              >
                {item.size}
              </label>
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
