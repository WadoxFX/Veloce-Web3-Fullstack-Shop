import React, { useEffect, useState } from 'react'

import style from '@/styles/pages/payment.module.scss'

import { EthereumIcon, ExchangeArrowIcon } from '../icons'
import { Button } from '../ui'

const url: string = 'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD,ETH'

const EthereumRate: React.FC<EthereumRateProps> = ({ sum, pay }) => {
  const [rate, setRate] = useState<ExchangeRates | null>(null)

  useEffect(() => {
    const getExchangeRates = async () => {
      const res = await fetch(url)
      const data: ExchangeRates = await res.json()
      setRate(data)
    }

    getExchangeRates()
  }, [])

  if (!rate) return <p>Loading...</p>

  return (
    <>
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

      <div>
        <Button
          size='medium'
          radius='rounded'
          variant='contained'
          onClick={() => pay(sum / rate.USD)}
        >
          Pay
        </Button>
      </div>
    </>
  )
}

export default EthereumRate
