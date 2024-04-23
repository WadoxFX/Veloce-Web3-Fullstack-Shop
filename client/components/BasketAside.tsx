'use client'

import React from 'react'

import style from '@/styles/pages/basket.module.scss'
import { Button, Input } from './ui'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

const BasketAside: React.FC<BasketAsideProps> = ({ sum }) => {
  const router = useRouter()
  const { register, handleSubmit } = useForm()
  return (
    <div className={style.statistic}>
      <aside>
        <form onSubmit={handleSubmit(data => console.log(data))}>
          <Input name='promocode' placeholder='Promo Code*' register={register} />
          <Button size='small' radius='rounded' variant='outlined'>
            Use
          </Button>
        </form>

        <div className={style.total_price}>
          <div className={style.exorbitant_price}>
            <div className={style.product_price}>
              <div>Products:</div> <div className={style.meaning}>${sum}</div>
            </div>

            <div className={style.delivery_price}>
              <div>Delivery:</div>
              <div className={style.meaning}>{sum >= 200 ? 'Free' : '$20'}</div>
            </div>
          </div>

          <hr />
          <div className={style.price}>
            <div>Total</div> <div>${sum >= 200 ? sum : sum + 20}</div>
          </div>
          <hr />
        </div>

        <Button onClick={() => router.push('/basket/pay')} size='large' variant='contained'>
          Checkout
        </Button>
      </aside>
    </div>
  )
}

export default BasketAside
