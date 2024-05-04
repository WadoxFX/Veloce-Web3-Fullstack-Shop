import { cookies } from 'next/headers'

import React from 'react'

import PaymentForm from './PaymentForm'

const Payment = async () => {
  const cookie = cookies().get('token')
  let data

  if (cookie) {
    const url = `${process.env.SERVER_URL}auth/profile?token=${cookie?.value}`
    const res = await fetch(url, { cache: 'no-cache' })
    data = await res.json()
  }

  return <PaymentForm userData={data || null} />
}

export default Payment
