import React from 'react'

import style from '@/styles/pages/payment.module.scss'

import { EthereumIcon, ExchangeArrowIcon } from '@/components/icons'
import { orderPrice } from '@/components/orderPrice'

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
