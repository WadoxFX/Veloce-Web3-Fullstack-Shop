'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

import { calcSum } from '@/components/calcSum'
import { orderPrice } from '@/components/orderPrice'
import { Button } from '@/components/ui'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import promocodes from '@/promocodes.json'

import style from '../payment.module.scss'

let promoCode: PromoCode | undefined

const PaymentAside = () => {
  const { data: products } = useLocalStorage('basket')
  const router = useRouter()
  const searchParams = useSearchParams()
  const sum = calcSum(products)

  if (searchParams) {
    const { codes } = promocodes
    promoCode = codes.find((item: PromoCode) => item.code === searchParams.get('promocode'))
  }

  return (
    <div className={style.statistic_container}>
      <aside>
        <div className={style.statistic_infos}>
          <div className={style.products_price}>
            <div>Product price:</div>
            <div className={style.meaning}>${sum}</div>
          </div>

          {promoCode && (
            <div className={style.products_promo_code}>
              <div>Promo code:</div>
              <div className={style.meaning}>{promoCode?.discount}%</div>
            </div>
          )}

          <div className={style.products_delivery}>
            <div>Delivery:</div>
            <div className={style.meaning}>{sum <= 200 ? '$20' : 'Free'}</div>
          </div>

          <div className={style.products_number}>
            <div>Number of Products:</div>
            <div className={style.meaning}>{products.length}</div>
          </div>
        </div>
        <hr />

        <div className={style.products_total}>
          <div>Total:</div>
          <div className={style.meaning}>${orderPrice(sum)}</div>
        </div>
        <hr />

        <Button onClick={() => router.back()} size='large' variant='contained'>
          Back
        </Button>
      </aside>
    </div>
  )
}

export default PaymentAside
