'use client'

import React from 'react'
import { useForm } from 'react-hook-form'

import { Button, Input, TextArea } from '@/components/ui'
import style from '@/styles/pages/payment.module.scss'

const Pay = () => {
  const { register, handleSubmit } = useForm()
  const onSubmit = () => {}

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={style.contact_details}>
        <h1>Contact details</h1>
        <div className={style.contact_details_inputs}>
          <Input name='username' placeholder='Username*' title='Username' register={register} />
          <Input name='surname' placeholder='Surname*' title='Surname' register={register} />
          <Input name='email' placeholder='Email*' title='Email' register={register} />
          <Input name='phone' placeholder='Phone*' title='Phone' register={register} />
        </div>
      </div>

      <div className={style.delivery_address}>
        <h2>Delivery address</h2>
        <div className={style.aaa}>
          <div className={style.delivery_address_inputs}>
            <Input name='country' placeholder='Country*' title='Country' register={register} />
            <Input name='city' placeholder='City*' title='City' register={register} />
          </div>
          <Input name='post' placeholder='Post office*' register={register} />
          <TextArea name='comment' placeholder='Your comment...' register={register} />
        </div>
      </div>

      <Button size='medium' variant='contained'>
        Order
      </Button>
    </form>
  )
}

export default Pay
