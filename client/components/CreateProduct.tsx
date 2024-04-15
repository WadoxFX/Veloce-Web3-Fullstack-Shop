'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'

import { productSchema } from '@/@types/zod'
import type { TProductSchema } from '@/@types/zod'

import { Input } from './ui'

const CreateProduct = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<TProductSchema>({
    resolver: zodResolver(productSchema),
  })

  const onSubmit = handleSubmit(data => console.log(data))
  return (
    <form onSubmit={onSubmit}>
      <Input
        name='title'
        placeholder='Title'
        desc='This name will represent the product.'
        register={register}
        error={errors.title?.message}
      />
      <Input
        name='price'
        placeholder='Price'
        desc='The price of the product.'
        register={register}
        error={errors.price?.message}
      />
      <button>Send</button>
    </form>
  )
}

export default CreateProduct
