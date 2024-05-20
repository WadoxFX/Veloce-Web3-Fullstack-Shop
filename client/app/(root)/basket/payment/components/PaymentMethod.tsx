import clsx from 'clsx'
import Image from 'next/image'
import React, { useId } from 'react'

import mailCarIcon from '@/public/mailCar.svg'
import metaMaskIcon from '@/public/metamask.svg'

import style from '../payment.module.scss'

const methods = [
  { method: 'Mail', icon: mailCarIcon },
  { method: 'MetaMask', icon: metaMaskIcon },
]

const PaymentMethod: React.FC<PaymentMethodProps> = ({ method, address, onConnect, register }) => {
  const uid = useId()
  return (
    <div className={style.payment_method}>
      {methods.map(item => (
        <label
          htmlFor={uid + item.method}
          onKeyDown={e => e.stopPropagation()}
          onClick={item.method === 'MetaMask' ? onConnect : undefined}
          className={clsx(style.method, method === item.method && style.active)}
        >
          <input
            id={uid + item.method}
            tabIndex={0}
            value={item.method}
            {...register('method' as string)}
            role='button'
            type='radio'
          />
          <Image src={item.icon} width={100} height={100} alt={item.method} priority />
          <div>
            {item.method === 'MetaMask' && address
              ? `Account: ${address.slice(0, 7)}...${address.slice(38 - 1)}`
              : item.method}
          </div>
        </label>
      ))}
    </div>
  )
}

export default PaymentMethod
