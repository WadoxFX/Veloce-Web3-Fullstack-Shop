import React from 'react'

import style from '@/styles/pages/payment.module.scss'

import { EthereumIcon, ExchangeArrowIcon } from '../icons'

const EthereumRate: React.FC<EthereumRateProps> = ({ sum, rate }) => (
  <div className={style.ethereum_rate}>
    <div className={style.rate_item}>
      $<div>{sum}</div>
    </div>

    <ExchangeArrowIcon size={56} />

    <div className={style.ethereum_price_block}>
      <EthereumIcon size={42} />
      <div>{(sum / rate.USD).toFixed(6)}</div>
    </div>
  </div>
)

export default EthereumRate
