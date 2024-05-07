'use client'

import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'

import { useToggle } from '@/hooks/useToggle'

import { BasketIcon, CloseIcon } from '../icons'

import Account from './Account'
import Navigate from './Navigate'
import style from './header.module.scss'

interface BurgerMenuProps {
  open: boolean
  close: () => void
}

const BurgerMenu: React.FC<BurgerMenuProps> = ({ open, close }) => {
  if (typeof window === 'undefined') return null

  if (open) document.body.setAttribute('no_scroll', '')
  else document.body.removeAttribute('no_scroll')

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className={style.burger_menu}
          initial={{ translateY: window.innerHeight }}
          animate={{ translateY: 0 }}
          exit={{ translateY: window.innerHeight }}
          transition={{ damping: 30, duration: 0.3 }}
        >
          <button aria-label='Close burger menu' onClick={close}>
            <CloseIcon size={24} />
          </button>
          <Navigate />
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}

const Header = () => {
  const [open, toggle] = useToggle(false)
  const path = usePathname()

  useEffect(() => {
    if (open) toggle()
  }, [path])

  return (
    <header
      className={clsx(
        path === '/' && style.header_fixed,
        path.startsWith('/profile') ? style.header_border : style.header,
        path.startsWith('/basket') && style.header_fixed,
        path.startsWith('/products') && style.header_fixed,
      )}
    >
      <Link className={style.title} href='/'>
        Veloce
      </Link>
      <Navigate />

      <div className={style.account_container}>
        <Account />

        <Link href='/basket' aria-label='Your added items to cart'>
          <BasketIcon />
        </Link>
        <button aria-label='Open burger menu' className={style.burger} onClick={toggle}>
          <span />
          <span />
          <span />
        </button>
        <BurgerMenu open={open} close={toggle} />
      </div>
    </header>
  )
}

export default Header
