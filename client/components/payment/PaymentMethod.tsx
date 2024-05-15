import clsx from 'clsx'
import Image from 'next/image'
import React from 'react'

import mailCarIcon from '@/public/mailCar.svg'
import metaMaskIcon from '@/public/metamask.svg'
import style from '@/styles/pages/payment.module.scss'

const methods = [
  { method: 'Mail', icon: mailCarIcon },
  { method: 'MetaMask', icon: metaMaskIcon },
]

const PaymentMethod: React.FC<PaymentMethodProps> = ({ method, address, onConnect, register }) => (
  <div className={style.payment_method}>
    {methods.map((item, id: number) => (
      <label
        htmlFor={`method-${id}`}
        key={id}
        onClick={item.method === 'MetaMask' ? onConnect : undefined}
        className={clsx(style.method, method === item.method && style.active)}
      >
        <input
          role='button'
          id={`method-${id}`}
          tabIndex={0}
          {...register('method' as string)}
          value={item.method}
          type='radio'
        />
        <Image src={item.icon} width={100} height={100} alt={item.method} />
        <div>
          {item.method === 'MetaMask' && address
            ? `Account: ${address.slice(0, 7)}...${address.slice(38 - 1)}`
            : item.method}
        </div>
      </label>
    ))}
  </div>
)

export default PaymentMethod
