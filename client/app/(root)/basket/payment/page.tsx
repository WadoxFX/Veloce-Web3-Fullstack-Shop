import { cookies } from 'next/headers'
import React from 'react'

import { getExchangeRates } from '@/api/currency'
import PaymentForm from '@/components/payment/PaymentForm'

const Payment = async () => {
  const cookie = cookies().get('token')
  const rate = await getExchangeRates()

  let data
  if (cookie) {
    const url = `${process.env.SERVER_URL}auth/profile?token=${cookie?.value}`
    const res = await fetch(url, { cache: 'no-cache' })
    data = await res.json()
  }

  return <PaymentForm userData={data} rate={rate} />
}

export default Payment
