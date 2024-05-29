import clsx from 'clsx'
import { ethers } from 'ethers'
import Link from 'next/link'
import React, { memo, useEffect, useState } from 'react'

import { deleteOrder } from '@/api/orders'
import { CheckMarkIcon, CrossIcon, TrashIcon } from '@/components/icons'
import shoppingABI from '@/contracts/Abi/shoppingABI.json'

import style from './orderSchema.module.scss'

type OrderStatuses = 'send' | 'delivered' | 'accepted' | 'rejected'

const OrderSchema: React.FC<{ order: Order }> = memo(({ order }) => {
  const [status, setStatus] = useState<string>('')
  const [inView, setInView] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(true)
  const [contract, setContract] = useState<ethers.Contract | null>(null)
  const [message, setMessage] = useState<string>('')

  const getStatus = async (contract?: ethers.Contract | null) => {
    try {
      if (contract) {
        const status: string = await contract.getOrderStatus(order.address, order.orderId)
        setStatus(status)
        setLoading(false)
      }
    } catch (error) {
      setMessage('Order not found in smart contract')
    }
  }

  useEffect(() => {
    const onConnect = async () => {
      const { ethereum } = window

      if (order.method === 'MetaMask') {
        await ethereum.request({ method: 'eth_requestAccounts' })
        const signer = await new ethers.BrowserProvider(ethereum).getSigner()
        const contract = new ethers.Contract(process.env.CONTRACT_URL ?? '', shoppingABI, signer)

        await getStatus(contract)
        setContract(contract)
      }
    }

    onConnect()
  }, [order])

  const onSetStatus = async (status: OrderStatuses) => {
    try {
      if (contract) {
        setLoading(true)
        await contract[status](order.address, order.orderId)
        await getStatus(contract)

        if (inView) {
          const onDeleteOrder = async () => {
            await deleteOrder({ params: { orderId: order._id } })
            setInView(false)
          }

          const propStatus = status.charAt(0).toUpperCase() + status.slice(1)
          if (propStatus === 'Accepted' ?? 'Rejected') onDeleteOrder()
        }
      }
    } catch (error) {
      setLoading(false)
      setMessage('The request has been canceled or you are not the contract creator')
    }
  }

  const onDeleteOrder = async () => {
    await deleteOrder({ params: { orderId: order._id } })
    setInView(false)
  }

  if (!inView) return <i>Order Deleted</i>

  return (
    <>
      <div className={style.order}>
        <div className={style.order_logo} />
        <div className={style.info_container}>
          <div className={style.order_info}>
            <div className={style.order_status}>
              <Link
                href={{ pathname: '/order', query: { orderId: order._id } }}
                className={style.parameter}
              >
                Id: <div className={style.meaning}>{order._id}</div>
              </Link>
              <div className={clsx(order.paid ? style.paid : style.not_paid)}>
                {order.paid ? (
                  <>
                    <CheckMarkIcon size={12} color='#3aa271' /> Paid
                  </>
                ) : (
                  <>
                    <CrossIcon size={12} color='#a23a3a' />
                    Not Paid
                  </>
                )}
              </div>
            </div>
          </div>

          <div className={style.infos}>
            <div>
              {order.buyer.username} {order.buyer.surname}
            </div>
            <div className={style.parameter}>
              Price: <div className={style.meaning}>${order.price}</div>
            </div>
            {order.method === 'MetaMask' ? (
              <div className={style.parameter}>
                Status: <div className={style.meaning}>{loading ? 'Loading...' : status}</div>
              </div>
            ) : (
              <div className={style.parameter}>
                Method: <div className={style.meaning}>{order.method}</div>
              </div>
            )}
          </div>

          <div className={style.order_statistic}>
            <div className={style.parameter}>
              City: <div className={style.meaning}>{order.city}</div> Mail:
              <div className={style.meaning}>{order.mail}</div>
            </div>

            {order.method === 'MetaMask' ? (
              <select
                className={style.controller}
                onChange={e => onSetStatus(e.target.value as OrderStatuses)}
              >
                <option disabled={status !== 'Paid'} value='send'>
                  Send
                </option>
                <option disabled={status !== 'Sent'} value='delivered'>
                  Delivered
                </option>
                <option disabled={status !== 'Delivered'} value='accepted'>
                  Accepted
                </option>
                <option disabled={status !== 'Delivered'} value='rejected'>
                  Rejected
                </option>
              </select>
            ) : (
              <button onClick={onDeleteOrder} aria-label='Delete order'>
                <TrashIcon size={18} />
              </button>
            )}
          </div>
        </div>
      </div>
      {message && <i>{message}</i>}
    </>
  )
})

export default OrderSchema
