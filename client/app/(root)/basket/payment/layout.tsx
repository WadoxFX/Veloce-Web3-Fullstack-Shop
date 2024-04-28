import type { Metadata } from 'next'

import style from '@/styles/pages/payment.module.scss'
import PaymentAside from '@/components/PaymentAside'

export const metadata: Metadata = {
  title: 'Payment',
  keywords: '',
  description: '',
}

const PaymentLayout = ({ children }: Children) => (
  <div className={style.container}>
    {children}
    <PaymentAside />
  </div>
)

export default PaymentLayout
