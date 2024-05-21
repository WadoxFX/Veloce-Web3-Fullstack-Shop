'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import { promoCodeSchema } from '@/@types/zod'
import type { TPromoCodeSchema } from '@/@types/zod'
import { orderPrice } from '@/components/orderPrice'
import { Button, Input } from '@/components/ui'
import promoList from '@/promocodes.json'

import style from '../basket.module.scss'

const BasketAside: React.FC<BasketAsideProps> = ({ sum }) => {
  const [promoCode, setPromoCode] = useState<PromoCode | null>(null)
  const { register, handleSubmit } = useForm<TPromoCodeSchema>({
    resolver: zodResolver(promoCodeSchema),
  })

  const router = useRouter()
  const delivery: number | null = sum >= 200 ? null : 20

  const onSubmit = handleSubmit(data => {
    const { promocode } = data
    const code = promoList.codes.find((item: PromoCode) => item.code === promocode)

    if (code) setPromoCode(code)
  })

  return (
    <div className={style.statistic}>
      <aside>
        <form onSubmit={onSubmit}>
          <div className={style.promo_code}>
            <Input data-test-id="promocode_input" name='promocode' placeholder='Test code: WELCOME24' register={register} />
            <Button data-test-id="use_promocode" size='small' radius='rounded' variant='outlined'>
              Use
            </Button>
          </div>

          <div className={style.total_price}>
            <div className={style.exorbitant_price}>
              <div className={style.product_price}>
                <div>Products:</div> <div className={style.meaning}>${sum}</div>
              </div>

              {promoCode && (
                <div data-test-id="promo_code_discount" className={style.promo_code_discount}>
                  <div>Code:</div>
                  <div className={style.meaning}>{promoCode.discount}%</div>
                </div>
              )}

              <div className={style.delivery_price}>
                <div>Delivery:</div>
                <div className={style.meaning}>{delivery ? `$${delivery}` : 'Free'}</div>
              </div>
            </div>

            <hr />
            <div className={style.price}>
              <div>Total</div>
              <div>${orderPrice(sum)}</div>
            </div>
            <hr />
          </div>
          <Button
            size='large'
            disabled={sum === 0}
            variant='contained'
            onClick={() =>
              router.push(`/basket/payment${promoCode ? `?promocode=${promoCode.code}` : ''}`)
            }
          >
            Checkout
          </Button>
        </form>
      </aside>
    </div>
  )
}

export default BasketAside
