'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'

import { aboutMeSchema } from '@/@types/zod'
import type { TAboutMeSchema } from '@/@types/zod'
import { Button, Input, TextArea } from '@/components/ui'
import style from '@/styles/pages/payment.module.scss'

const PaymentForm: React.FC<{ userData: User }> = ({ userData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAboutMeSchema>({
    resolver: zodResolver(aboutMeSchema),
  })

  const onSubmit = handleSubmit(() => {})
  return (
    <form onSubmit={onSubmit}>
      <div className={style.contact_details}>
        <h1>Contact details</h1>
        <div className={style.inputs_group}>
          <Input
            name='username'
            title='Username'
            placeholder='Username*'
            desc='Enter your real name that is used to receive the parcel'
            register={register}
            defaultValue={userData?.username}
            error={errors.username?.message}
          />
          <Input
            name='surname'
            title='Surname'
            placeholder='Surname*'
            desc='Enter your real surname used to receive the parcel'
            register={register}
            defaultValue={userData?.surname}
            error={errors.surname?.message}
          />
          <Input
            name='phone'
            title='Phone'
            placeholder='Phone*'
            desc='In case of problems with delivery'
            register={register}
            defaultValue={userData?.infos.phone}
            error={errors.phone?.message}
          />
        </div>
      </div>

      <div className={style.delivery_address}>
        <h2>Delivery address</h2>
        <div className={style.inputs_group}>
          <Input
            name='country'
            title='Country'
            placeholder='Country*'
            desc='Country where the parcel needs to be sent'
            register={register}
            defaultValue={userData?.infos.country}
            error={errors.country?.message}
          />
          <Input
            name='city'
            title='City'
            placeholder='City*'
            desc='City where the parcel needs to be sent'
            register={register}
            defaultValue={userData?.infos.city}
            error={errors.city?.message}
          />
          <Input
            name='post'
            title='Post'
            placeholder='Post office*'
            desc='Enter the mail number to receive the parcel'
            register={register}
            error={errors.post?.message}
          />
          <TextArea
            name='comment'
            title='Comment'
            placeholder='Your comment...'
            desc='(Optional) Your shipping preferences'
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

export default PaymentForm
