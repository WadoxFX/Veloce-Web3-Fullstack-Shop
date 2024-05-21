'use client'

import { getOrder } from '@/api/orders'
import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

import style from './order.module.scss'
import { Button, InputLabel } from '@/components/ui'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

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
  return (
    <div className={style.container}>
      {params.get('orderId') ? (
        <div>{!loading ? order?.price : 'Loading...'}</div>
      ) : (
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
      )}
    </div>
  )
}

export default Order
