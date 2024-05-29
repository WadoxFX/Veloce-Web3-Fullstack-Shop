'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ethers, parseEther } from 'ethers'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import type { TPaymentSchema } from '@/@types/zod'
import { paymentSchema } from '@/@types/zod'
import { createNewOrder } from '@/api/orders'
import { calcSum } from '@/components/calcSum'
import MailOffices from '@/components/mailOffices/MailOffices'
import { orderPrice } from '@/components/orderPrice'
import { Button, Input } from '@/components/ui'
import shoppingABI from '@/contracts/Abi/shoppingABI.json'
import { useLocalStorage } from '@/hooks/useLocalStorage'

import style from '../payment.module.scss'

import EthereumRate from './EthereumRate'
import MetaMaskStages from './MetaMaskStages'
import PaymentMethod from './PaymentMethod'
import ViewNewOrder from './ViewNewOrder'

const PaymentForm: React.FC<PaymentFormProps> = ({ userData, rate }) => {
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null)
  const [contract, setContract] = useState<ethers.Contract | null>(null)
  const [products, setProducts] = useState<BasketProducts>([])
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const { data } = useLocalStorage('basket')

  useEffect(() => {
    setProducts(data)
  }, [data])

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TPaymentSchema>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      method: 'Mail',
    },
  })

  const method: string = watch('method')
  const productIds: string[] = products.map(product => product._id)
  const sum = calcSum(products)

  const onConnect = async () => {
    const { ethereum }: { ethereum?: Ethereum } = window

    if (ethereum) {
      await ethereum.request({ method: 'eth_requestAccounts' })
      const provider = new ethers.BrowserProvider(ethereum)
      const signer = await provider.getSigner()
      const contract = new ethers.Contract(process.env.CONTRACT_URL ?? '', shoppingABI, signer)

      setSigner(signer)
      setContract(contract)
    }

    return null
  }

  const pay = async () => {
    if (contract && signer) {
      try {
        const ethPrice = parseEther((orderPrice(sum, 0) / rate.USD).toString())
        await contract.pay(productIds, ethPrice, { value: ethPrice })
      } catch (error: any) {
        setLoading(false)
        throw new Error('Transaction cancelled')
      }
    }
  }

  const onSetDeliveryInfo = (inputType: 'city' | 'mail', value: string) =>
    setValue(inputType, value)

  const onSubmit = handleSubmit(async data => {
    if (products.length) {
      setLoading(true)

      try {
        if (method === 'MetaMask') await pay()
        const id = method === 'MetaMask' ? await contract?.uuid() : null

        const order = await createNewOrder({
          params: {
            ...data,
            productIds,
            price: orderPrice(sum),
            ...(method === 'MetaMask' && {
              address: signer?.address,
              orderId: Number(id),
              paid: true,
            }),
          },
        })

        localStorage.removeItem('basket')

        setProducts([])
        setOrder(await order.data)
        setLoading(false)
      } catch (error) {
        console.warn(error)
      }
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
          defaultValue={userData?.infos?.phone}
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
              defaultValue={userData?.infos?.city}
              error={errors.city?.message}
              register={register}
            />
            <Input
              name='mail'
              placeholder='Mail number*'
              error={errors.mail?.message}
              register={register}
            />
          </div>

          <Button disabled={!products.length} size='medium' radius='rounded' variant='contained'>
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
              defaultValue={userData?.infos?.city}
              error={errors.city?.message}
              register={register}
            />
            <Input
              name='mail'
              placeholder='Mail number*'
              error={errors.mail?.message}
              register={register}
            />
          </div>

          <Button
            disabled={!signer || !products.length || !!loading}
            size='medium'
            radius='rounded'
            variant='contained'
          >
            Pay
          </Button>
        </div>
      )}

      <ViewNewOrder loading={loading} order={order} />
      <MailOffices
        city={watch('city')}
        mail={watch('mail')}
        onSetDeliveryInfo={onSetDeliveryInfo}
      />
    </form>
  )
}

export default PaymentForm
