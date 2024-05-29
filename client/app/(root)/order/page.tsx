'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { getOrder } from '@/api/orders'
import { orderDate } from '@/components/orderDate'
import Slider from '@/components/slider/Slider'
import { Button, InputLabel } from '@/components/ui'

import style from './order.module.scss'

const orderSchema = z.object({
  orderId: z
    .string()
    .min(24, 'Order id length must not be less than 24 characters')
    .max(24, 'order id length must not be more than 24 characters'),
})
type TOrderSchema = z.infer<typeof orderSchema>

const Order = () => {
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TOrderSchema>({
    resolver: zodResolver(orderSchema),
  })

  const router = useRouter()
  const searchParams = useSearchParams()
  const params = useMemo(() => new URLSearchParams(searchParams), [searchParams])
  const images = order?.productIds.map(item => item.images[0])

  useEffect(() => {
    const getOrderData = async () => {
      const orderId = params.get('orderId')
      if (orderId) {
        setLoading(true)
        const data = await getOrder({ params: { orderId } }).then(res => res.data)
        setOrder(data)
        setLoading(false)
      }
    }

    getOrderData()
  }, [params])

  const onSubmit = handleSubmit(data => router.push(`/order?orderId=${data.orderId}`))

  if (!params.get('orderId')) {
    <div className={style.form_container}>
      <form onSubmit={onSubmit}>
        <InputLabel
          label='OrderId'
          name='orderId'
          register={register}
          error={errors.orderId?.message}
        />
        <Button radius='rounded' variant='contained' size='medium'>
          Search
        </Button>
      </form>
    </div>
  }

  return (
    <div className={style.container}>
      {params.get('orderId') ? (
        !loading && order ? (
          <div className={style.content_container}>
            <Slider images={images ?? []} />
            <div className={style.content}>
              <div className={style.order_info}>
                <div className={style.order}>
                  <hr />
                  <div>Order Id</div>
                  <hr />
                </div>

                <div>Order Id: {order._id}</div>
                <ul>Date of creation: {orderDate(order.createdAt)}</ul>
              </div>

              <div>
                <div className={style.order_infos}>
                  <hr />
                  <div>Infos</div>
                  <hr />
                </div>

                <div>Method: {order.method}</div>
                <div>Proce: ${order.price}</div>
                <div>Count: {order.productIds.length}</div>
                <div>Status: {order.paid ? 'Paid' : 'Not paid'}</div>
                <div>Phone: {order.buyer.phone}</div>
                {order.address && <div>Buyer Address: {order.address}</div>}
              </div>

              <div>
                <div className={style.order_delivery}>
                  <hr />
                  <div>Delivery</div>
                  <hr />
                </div>

                <div>City: {order.city}</div>
                <div>Mail: №{order.mail}</div>
              </div>
            </div>
          </div>
        ) : (
          'Loading...'
        )
      ) : (
        <div className={style.form_container}>
          <form onSubmit={onSubmit}>
            <InputLabel
              label='OrderId'
              name='orderId'
              register={register}
              error={errors.orderId?.message}
            />
            <Button radius='rounded' variant='contained' size='medium'>
              Search
            </Button>
          </form>
        </div>
      )}
    </div>
  )
}

export default Order
