'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { useRecoilValue } from 'recoil'

import { productSchema } from '@/@types/zod'
import type { TProductSchema } from '@/@types/zod'
import { createProduct } from '@/api/products'
import { gender as activeGender } from '@/recoil'

import { Button, Input, InputFile, InputSize, TextArea } from '../ui'

import GenderSelector from './GenderSelector'
import style from './productCreator.module.scss'

const ProductCreator = () => {
  const [error, setError] = useState<string>('')
  const gender: string | null = useRecoilValue(activeGender)
  const {
    register,
    handleSubmit,
    resetField,
    watch,
    control,
    formState: { errors },
  } = useForm<TProductSchema>({
    resolver: zodResolver(productSchema),
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'sizes',
  })

  const onSubmit = handleSubmit(async data => {
    try {
      const { files, sizes, ...productData } = data
      const fd: FormData = new FormData()

      fd.append('sizes', JSON.stringify(sizes))
      fd.append('gender', gender || '')

      for (const key in productData) {
        if (Object.prototype.hasOwnProperty.call(productData, key)) {
          fd.append(key, String(productData[key]))
        }
      }

      for (let i = 0; files.length > i; i += 1) fd.append('file', files[i])

      await createProduct({ params: fd })
    } catch (error: any) {
      setError(String(error.response.data.message))
    }
  })

  return (
    <form className={style.form_container} onSubmit={onSubmit}>
      <Input
        name='title'
        title='Title'
        desc='Name representing the product.'
        placeholder='Title*'
        register={register}
        error={errors.title?.message}
      />
      <Input
        name='brand'
        title='Brand'
        desc='Product brand.'
        placeholder='Brand*'
        register={register}
        error={errors.brand?.message}
      />
      <Input
        name='price'
        title='Price'
        desc='The price of the product.'
        placeholder='Price*'
        register={register}
        error={errors.price?.message}
      />
      <Input
        name='discount'
        title='Discount'
        desc='Enter the percentage by how much you want to change the price (optional).'
        placeholder='0-100'
        register={register}
        error={errors.discount?.message}
      />
      <TextArea
        name='desc'
        title='Description'
        desc='Describe the product, as an example, indicate the model, series, collection and year of manufacture.'
        placeholder='Description*'
        register={register}
        error={errors.desc?.message}
      />
      <GenderSelector />
      <InputFile
        name='files'
        accept='Image/*'
        files={watch('files')}
        register={register}
        resetField={resetField}
        error={errors.files?.message}
        multiple
      />
      <Input name='color' register={register} placeholder='Color*' error={errors.color?.message} />
      <InputSize
        register={register}
        fields={fields}
        append={append}
        remove={remove}
        error={errors.sizes?.message}
      />
      <div className={style.select_container}>
        Collection:
        <select {...register('collection')}>
          <option value='Air Force 1'>Air Force 1</option>
          <option value='Air Max'>Air Max</option>
          <option value='Alpha Huarache'>Alpha Huarache</option>
          <option value='Blazer'>Blazer</option>
          <option value='Nike Vomero'>Nike Vomero</option>
          <option value='Converse'>Converse</option>
        </select>
      </div>

      {error && <p className={style.error}>{error}</p>}

      <Button size='medium' radius='round' variant='contained'>
        Create
      </Button>
    </form>
  )
}

export default ProductCreator
