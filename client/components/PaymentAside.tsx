'use client'

import { useSearchParams } from 'next/navigation'
import React from 'react'
import data from '@/promoCodes.json'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { totalPriceCalc } from './totalPriceCalc'
import { priceCalc } from './priceCalc'
import Image from 'next/image'

import style from '@/styles/pages/payment.module.scss'

let promoCode: PromoCode | undefined

const PaymentAside = () => {
  const { data: products } = useLocalStorage('basket')
  const searchParams = useSearchParams()

  let sum: number = 0
  const delivery = sum >= 200 ? null : 20

  for (let i = 0; products.length > i; i += 1)
    sum += priceCalc(products[i].price, products[i].discount || 0)

  if (searchParams)
    promoCode = data.codes.find((item: PromoCode) => item.code === searchParams.get('promocode'))

  return (
    <div className={style.statistic_container}>
      <aside className={style.statistic}>
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
            <div className={style.meaning}>{delivery ? `$${delivery}` : 'Free'}</div>
          </div>

          <div className={style.products_number}>
            <div>Number of Products:</div>
            <div className={style.meaning}>{products.length}</div>
          </div>
        </div>

        <hr />

        <div className={style.products_total}>
          <div>Total:</div>
          <div className={style.meaning}>${totalPriceCalc(sum, delivery, promoCode?.discount)}</div>
        </div>

        {!!products.length && (
          <ul>
            {products.map((product: BasketProduct, id: number) => (
              <li key={id}>
                <Image
                  src={process.env.SERVER_URL + product.image}
                  width={100}
                  height={100}
                  alt={product.title}
                  priority
                />
              </li>
            ))}
          </ul>
        )}
      </aside>
    </div>
  )
}

export default PaymentAside
