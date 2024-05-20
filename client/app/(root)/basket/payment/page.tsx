import { cookies } from 'next/headers'
import React from 'react'

import { getExchangeRates } from '@/api/currency'

import PaymentForm from './components/PaymentForm'

const Payment = async () => {
  const authToken = cookies().get('token')
  const rate = await getExchangeRates('USD')

  let data
  if (authToken) {
    const url = `${process.env.SERVER_URL}auth/profile?token=${authToken?.value}`
    const res = await fetch(url, { cache: 'no-cache' })
    data = await res.json()
  }

  return <PaymentForm userData={data} rate={rate} />
}

export default Payment
