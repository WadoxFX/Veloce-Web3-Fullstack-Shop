'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ethers, parseEther } from 'ethers'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import type { TPaymentSchema } from '@/@types/zod'
import { paymentSchema } from '@/@types/zod'
import { createNewOrder } from '@/api/orders'
import { Button, Input } from '@/components/ui'
import shoppingABI from '@/contracts/Abi/shoppingABI.json'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import style from '@/styles/pages/payment.module.scss'

import { calcSum } from '../calcSum'
import { CheckIcon } from '../icons'

import EthereumRate from './EthereumRate'
import MetaMaskStages from './MetaMaskStages'
import PaymentMethod from './PaymentMethod'
import ViewNewOrder from './ViewNewOrder'

const shoppingURL = '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9'

const PaymentForm: React.FC<PaymentFormProps> = ({ userData, rate }) => {
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null)
  const [contract, setContract] = useState<ethers.Contract | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [status, setStatus] = useState<PayedStatus | null>(null)
  const { data: products } = useLocalStorage('basket')
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TPaymentSchema>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      method: 'Mail',
    },
  })

  const method: string = watch('method')
  const productsId: string[] = products.map(product => product._id)
  const sum = calcSum(products)

  const onConnect = async () => {
    const { ethereum }: { ethereum?: Ethereum } = window

    if (ethereum) {
      await ethereum.request({ method: 'eth_requestAccounts' })
      const provider = new ethers.BrowserProvider(ethereum)
      const signer = await provider.getSigner()
      const contract = new ethers.Contract(shoppingURL, shoppingABI, signer)

      setSigner(signer)
      setContract(contract)
    }

    return null
  }

  const pay = async () => {
    if (contract) {
      try {
        const ethPrice = parseEther((sum / rate.USD).toString())
        contract.on('Payed', async (_, orderId, message) => setStatus({ orderId, message }))
        await contract.pay(productsId, ethPrice, { value: ethPrice })
      } catch (error) {
        setLoading(false)
        console.warn('Transaction cancelled')
      }
    }
  }

  const onSubmit = handleSubmit(async data => {
    if (!products.length) throw new Error('No Products')
    setLoading(true)

    try {
      if (method === 'MetaMask') await pay()

      const id = await contract?.uuid()
      await createNewOrder({
        params: {
          ...data,
          address: signer?.address,
          orderId: Number(id),
        },
      })
    } catch (error) {
      console.warn(error)
    }
  })

  return (
    <form onSubmit={onSubmit}>
      <div className={style.section}>
        <h1>Personal data</h1>
        <p>The data will be used to confirm identity upon receipt of the parcel.</p>
      </div>

      <div className={style.personal_data_inputs}>
        <Input
          name='username'
          placeholder='Username*'
          defaultValue={userData?.username}
          error={errors.username?.message}
          register={register}
        />
        <Input
          name='surname'
          placeholder='Surname*'
          defaultValue={userData?.surname}
          error={errors.surname?.message}
          register={register}
        />
        <Input
          name='phone'
          placeholder='Phone*'
          defaultValue={userData?.infos.phone}
          error={errors.phone?.message}
          register={register}
        />
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
        <>
          <div className={style.section}>
            <h3>Delivery location</h3>
            <p>Specify the location of the post office to send the parcel to.</p>
          </div>

          <div className={style.delivery_location_inputs}>
            <Input
              name='city'
              placeholder='City*'
              defaultValue={userData?.infos.city}
              error={errors.city?.message}
              register={register}
            />
            <Input
              name='post'
              placeholder='Post*'
              error={errors.post?.message}
              register={register}
            />
          </div>

          <Button size='medium' radius='rounded' variant='contained'>
            Confirm Order
          </Button>
        </>
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
          <EthereumRate sum={sum} rate={rate} />

          <div className={style.section}>
            <h3>Delivery location</h3>
            <p>Specify the location of the post office to send the parcel to.</p>
          </div>

          <div className={style.delivery_location_inputs}>
            <Input
              name='city'
              placeholder='City*'
              defaultValue={userData?.infos.city}
              error={errors.city?.message}
              register={register}
            />
            <Input
              name='post'
              placeholder='Post*'
              error={errors.post?.message}
              register={register}
            />
          </div>

          <Button disabled={!signer} size='medium' radius='rounded' variant='contained'>
            Pay
          </Button>
          {status && (
            <div className={style.status}>
              <CheckIcon size={16} color='#00c9a7' />
              <div>{status.message}</div>
            </div>
          )}

          <ViewNewOrder loading={loading} order={null} />
        </div>
      )}
    </form>
  )
}

export default PaymentForm
