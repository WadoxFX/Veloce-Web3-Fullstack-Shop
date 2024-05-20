import React from 'react'

import { BoxIcon, CoinIcon, ExchangeIcon } from '@/components/icons'

import style from '../payment.module.scss'

const MetaMaskStages = () => (
  <div className={style.metaMask_stages}>
    <div className={style.metaMask_stage}>
      <div className={style.stage_buy_product}>
        <CoinIcon size={32} />
        <div>Buy Product</div>
      </div>
      <p>You send the amount for goods to the smart contract account for storage</p>
    </div>
    <hr />
    <div className={style.metaMask_stage}>
      <div className={style.stage_buy_product}>
        <BoxIcon size={32} />
        <div>Sending by mail</div>
      </div>
      <p>Your order is sent to the post office you specified</p>
    </div>
    <hr />
    <div className={style.metaMask_stage}>
      <div className={style.stage_buy_product}>
        <ExchangeIcon size={32} />
        <div>Exchange</div>
      </div>
      <p>
        After receiving the goods, money from the smart contract is transferred to the seller’s
        account
      </p>
    </div>
  </div>
)

export default MetaMaskStages
