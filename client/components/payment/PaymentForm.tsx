'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ethers, parseEther } from 'ethers'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import type { TPaymentSchema } from '@/@types/zod'
import { paymentSchema } from '@/@types/zod'
import { Input } from '@/components/ui'
import shoppingABI from '@/contracts/Abi/shoppingABI.json'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import style from '@/styles/pages/payment.module.scss'

import { calcSum } from '../calcSum'
import { CheckIcon } from '../icons'

import EthereumRate from './EthereumRate'
import MetaMaskStages from './MetaMaskStages'
import PaymentMethod from './PaymentMethod'

const shoppingURL = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512'

const PaymentForm = () => {
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null)
  const [status, setStatus] = useState<string>('')
  const { data: products } = useLocalStorage('basket')
  const { register, handleSubmit, watch } = useForm<TPaymentSchema>({
    resolver: zodResolver(paymentSchema),
  })

  const method: string = watch('method')
  const sum = calcSum(products)

  const onConnect = async () => {
    const { ethereum }: { ethereum?: Ethereum } = window

    if (ethereum) {
      await ethereum.request({ method: 'eth_requestAccounts' })
      const provider = new ethers.BrowserProvider(ethereum)
      const signer = await provider.getSigner()
      setSigner(signer)
    }

    return null
  }

  const pay = async (price: number) => {
    try {
      const productsId: string[] = []

      for (let i = 0; products.length > i; i += 1) productsId.push(products[i]._id)

      const contract = new ethers.Contract(shoppingURL, shoppingABI, signer)
      const ethPrice = parseEther(price.toString())

      contract.on('Payed', (_, __, status: string) => setStatus(status))
      await contract.pay(productsId, ethPrice, { value: ethPrice })
    } catch (error) {
      console.warn('Transaction cancelled')
    }
  }

  const onSubmit = handleSubmit(data => console.log(data))
  return (
    <form onSubmit={onSubmit}>
      <div className={style.section}>
        <h1>Personal data</h1>
        <p>The data will be used to confirm identity upon receipt of the parcel.</p>
      </div>

      <div className={style.personal_data_inputs}>
        <Input name='username' placeholder='Username*' register={register} />
        <Input name='surname' placeholder='Surname*' register={register} />
        <Input name='email' placeholder='Email*' register={register} />
        <Input name='phone' placeholder='Phone*' register={register} />
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
          <EthereumRate sum={sum} pay={pay} />

          {status && (
            <p className={style.status}>
              <CheckIcon size={16} color='#00c9a7' />
              <div>{status}</div>
            </p>
          )}
        </div>
      )}
    </form>
  )
}

export default PaymentForm
