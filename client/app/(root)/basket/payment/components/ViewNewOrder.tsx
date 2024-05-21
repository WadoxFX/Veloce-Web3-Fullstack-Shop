import clsx from 'clsx'
import Link from 'next/link'
import React from 'react'

import { CheckMarkIcon, CrossIcon } from '@/components/icons'
import { orderDate } from '@/components/orderDate'

import style from '../payment.module.scss'

const ViewNewOrder: React.FC<ViewNewOrderProps> = ({ loading, order }) => {
  if (loading && !order) return <p>Loading...</p>
  const { username, surname } = order?.buyer ?? {}

  return (
    order && (
      <Link
        href={{ pathname: '/order', query: { orderId: order._id } }}
        className={style.order_container}
      >
        <hr />
        <div className={style.order}>
          <div className={style.order_id}>Id: {order._id.slice(0, 12)}...</div>

          <div className={style.order_info}>
            <div className={style.fullname}>
              <div>{username?.[0]}.</div>
              <div>{surname}</div>
            </div>

            <div className={style.price}>USD ${order.price}</div>
            <data>{orderDate(order.createdAt)}</data>
            <div className={clsx(order.paid ? style.paid : style.not_paid)}>
              {order.paid ? (
                <>
                  <CheckMarkIcon size={16} color='#3aa271' /> Paid
                </>
              ) : (
                <>
                  <CrossIcon size={16} color='#a23a3a' />
                  Not Paid
                </>
              )}
            </div>
          </div>
        </div>
        <hr />
      </Link>
    )
  )
}

export default ViewNewOrder
