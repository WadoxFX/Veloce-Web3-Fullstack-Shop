'use client'

import Image from 'next/image'
import React from 'react'
import { createPortal } from 'react-dom'

import { CheckIcon, CloseIcon } from '@/components/icons'
import { Button } from '@/components/ui'
import { useToggle } from '@/hooks/useToggle'

import style from './modal.module.scss'
import { useRouter } from 'next/navigation'

interface ModalProps {
  children: React.ReactNode
  product: BasketProduct
}

interface ModalContentProps {
  state: boolean
  close: () => void
  product: BasketProduct
}

const ModalContent: React.FC<ModalContentProps> = ({ state, product, close }) => {
  if (typeof window === 'undefined') return null
  const router = useRouter()
  return createPortal(
    state && (
      <div role='button' onClick={close} onKeyDown={close} tabIndex={0} className={style.overlay}>
        <div
          role='button'
          onClick={e => e.stopPropagation()}
          onKeyDown={e => e.stopPropagation()}
          tabIndex={0}
          className={style.content}
        >
          <div className={style.modal_header}>
            <div className={style.modal_title}>
              <CheckIcon size={16} />
              <div>Added to Bag</div>
            </div>
            <Button variant='text' onClick={close}>
              <CloseIcon size={16} />
            </Button>
          </div>
          <div className={style.product}>
            <Image
              src={process.env.SERVER_URL + product.image}
              width={260}
              height={260}
              alt={product.title}
            />
            <div className={style.product_info}>
              <div>{product.title}</div>
              <div className={style.greey}>{product.gender} Shoes</div>
              <div className={style.greey}>Size: {product.size}</div>
              <div>${product.price}</div>
            </div>
          </div>
          <div className={style.controlers}>
            <Button onClick={() => router.push('/basket')} size='medium' variant='outlined'>
              View Bag
            </Button>
            <Button size='medium' variant='contained'>
              Checkout
            </Button>
          </div>
        </div>
      </div>
    ),
    document.body,
  )
}

export const Modal: React.FC<ModalProps> = ({ children, product }) => {
  const [isOn, toggle] = useToggle()
  return (
    <>
      <Button disabled={!product.size} onClick={toggle} size='large' variant='contained'>
        {children}
      </Button>

      <ModalContent product={product} state={isOn} close={toggle} />
    </>
  )
}
