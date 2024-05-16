import type { Metadata } from 'next'

import PaymentAside from '@/components/payment/PaymentAside'
import style from '@/styles/pages/payment.module.scss'

export const metadata: Metadata = {
  title: 'Payment',
  keywords: 'Payment, Veloce, purchase products, order, arrange delivery',
  description: 'Provide personal information to send your ordered goods to the post office',
}

const PaymentLayout = ({ children }: Children) => (
  <div className={style.container}>
    {children}
    <PaymentAside />
  </div>
)

export default PaymentLayout
