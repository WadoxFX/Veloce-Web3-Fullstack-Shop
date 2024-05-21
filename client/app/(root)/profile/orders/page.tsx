'use client'

import React from 'react'

import { usePagination } from '@/hooks/usePagination'

import OrderSchema from '../components/order/OrderSchema'
import style from '../profile.module.scss'

const Orders = () => {
  const { data, ref } = usePagination<Orders>('orders', 6)

  return (
    <ul className={style.orders}>
      {data.map((order, index) => (
        <React.Fragment key={order._id}>
          <OrderSchema order={order} />
          {data.length > index + 1 && <hr />}
        </React.Fragment>
      ))}
      <li ref={ref} />
    </ul>
  )
}

export default Orders
