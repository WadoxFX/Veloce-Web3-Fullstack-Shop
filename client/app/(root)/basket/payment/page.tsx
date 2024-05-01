'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'

import { paymentSchema } from '@/@types/zod'
import type { TPaymentSchema } from '@/@types/zod'
import { Button, Input, TextArea } from '@/components/ui'
import style from '@/styles/pages/payment.module.scss'

const Payment = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TPaymentSchema>({
    resolver: zodResolver(paymentSchema),
  })

  const onSubmit = handleSubmit(() => {})

  return (
    <form onSubmit={onSubmit}>
      <div className={style.contact_details}>
        <h1>Contact details</h1>
        <div className={style.contact_details_inputs}>
          <Input
            name='username'
            placeholder='Username*'
            title='Username'
            register={register}
            error={errors.username?.message}
          />
          <Input
            name='surname'
            placeholder='Surname*'
            title='Surname'
            register={register}
            error={errors.surname?.message}
          />
          <Input
            name='email'
            placeholder='Email*'
            title='Email'
            register={register}
            error={errors.email?.message}
          />
          <Input
            name='phone'
            placeholder='Phone*'
            title='Phone'
            register={register}
            error={errors.phone?.message}
          />
        </div>
      </div>

      <div className={style.delivery_address}>
        <h2>Delivery address</h2>
        <div className={style.aaa}>
          <div className={style.delivery_address_inputs}>
            <Input
              name='country'
              placeholder='Country*'
              title='Country'
              register={register}
              error={errors.country?.message}
            />
            <Input
              name='city'
              placeholder='City*'
              title='City'
              register={register}
              error={errors.city?.message}
            />
          </div>
          <Input
            name='post'
            placeholder='Post office*'
            register={register}
            error={errors.post?.message}
          />
          <TextArea
            name='comment'
            placeholder='Your comment...'
            register={register}
            error={errors.comment?.message}
          />
        </div>
      </div>

      <Button size='medium' variant='contained'>
        Order
      </Button>
    </form>
  )
}

export default Payment
