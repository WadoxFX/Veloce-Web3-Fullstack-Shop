import React from 'react'

import { EthereumIcon, ExchangeArrowIcon } from '@/components/icons'
import { orderPrice } from '@/components/orderPrice'

import style from '../payment.module.scss'

const EthereumRate: React.FC<EthereumRateProps> = ({ sum, rate }) => (
  <div className={style.ethereum_rate}>
    <div className={style.rate_item}>${orderPrice(sum)}</div>

    <ExchangeArrowIcon size={56} />

    <div className={style.ethereum_price_block}>
      <EthereumIcon size={42} />
      <div>{(orderPrice(sum, 0) / rate.USD).toFixed(6)}</div>
    </div>
  </div>
)

export default EthereumRate
