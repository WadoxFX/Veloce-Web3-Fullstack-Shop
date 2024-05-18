import React from 'react'

import style from '@/styles/pages/payment.module.scss'
import { AvatarIcon, CheckMarkIcon, CrossIcon } from '@/components/icons'
import clsx from 'clsx'

const ViewNewOrder: React.FC<ViewNewOrderProps> = ({ loading, order }) => {
  if (loading && !order) return <p>Loading...</p>

  const { username, surname } = order?.buyer || {}

  const orderDate = (date: Date) => {
    const unixDate = new Date(date)
    const option = Intl.DateTimeFormat('ua', { month: 'short', day: 'numeric', year: 'numeric' })
    return option.format(unixDate)
  }

  return (
    order && (
      <div className={style.order_container}>
        <hr />
        <div className={style.order}>
          <div>Id: {order._id}</div>

          <div className={style.order_info}>
            <div className={style.buyer}>
              <AvatarIcon size={42} />
              <div className={style.fullname}>
                <div>{username?.[0]}.</div>
                <div>{surname}</div>
              </div>
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
      </div>
    )
  )
}

export default ViewNewOrder
