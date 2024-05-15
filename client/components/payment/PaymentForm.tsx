'use client'

import { ethers } from 'ethers'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Input } from '@/components/ui'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import style from '@/styles/pages/payment.module.scss'

import { calcSum } from '../calcSum'

import EthereumRate from './EthereumRate'
import MetaMaskStages from './MetaMaskStages'
import PaymentMethod from './PaymentMethod'

const PaymentForm = () => {
  const { data: products } = useLocalStorage('basket')
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null)
  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      method: 'Mail',
    },
  })

  const method: string = watch('method')
  const sum = calcSum(products)

  const onConnect = async () => {
    const { ethereum }: { ethereum?: Ethereum } = window

    if (ethereum) {
      await ethereum.request({ method: 'eth_requestAccounts' })
      const provider = new ethers.BrowserProvider(ethereum)
      const signer = await provider.getSigner()
      return setSigner(signer)
    }

    return null
  }

  const onSubmit = handleSubmit(() => {})
  return (
    <form onSubmit={onSubmit}>
      <div className={style.section}>
        <h1>Personal data</h1>
        <p>The data will be used to confirm identity upon receipt of the parcel.</p>
      </div>

      <div className={style.personal_data_inputs}>
        <Input name='Username' placeholder='Username*' register={register} />
        <Input name='Surname' placeholder='Surname*' register={register} />
        <Input name='Email' placeholder='Email*' register={register} />
        <Input name='Phone' placeholder='Phone*' register={register} />
      </div>

      <div className={style.section}>
        <h2>Payment method</h2>
        <p>Update your billing details and address.</p>
      </div>

      <PaymentMethod
        method={method}
        address={signer?.address}
        onConnect={onConnect}
        register={register}
      />

      {method === 'Mail' ? (
        <div>1</div>
      ) : (
        <div className={style.metaMask_method}>
          <div className={style.section}>
            <h3>How it works?</h3>
            <p>Using a smart contract, delivery can be divided into three stages.</p>
          </div>
          <MetaMaskStages />

          <div className={style.section}>
            <h3>Currency Converter</h3>
            <p>Current price of Ethereum compared to the US dollar.</p>
          </div>
          <EthereumRate sum={sum} />
        </div>
      )}
    </form>
  )
}

export default PaymentForm
