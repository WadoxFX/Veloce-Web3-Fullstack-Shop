'use client'

import React from 'react'

import { usePagination } from '@/hooks/usePagination'

import OrderSchema from '../components/order/OrderSchema'
import style from '../profile.module.scss'

const Orders = () => {
  const { data, ref } = usePagination<Orders>('orders', 10)

  return (
    <ul className={style.orders} ref={ref}>
      {data.map((order, index) => (
        <React.Fragment key={order._id}>
          <OrderSchema order={order} />
          {data.length > index + 1 && <hr />}
        </React.Fragment>
      ))}
    </ul>
  )
}

export default Orders
