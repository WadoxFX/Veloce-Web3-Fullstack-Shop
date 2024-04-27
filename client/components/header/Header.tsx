'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

import { BasketIcon } from '../icons'

import Account from './Account'
import Navigate from './Navigate'
import style from './header.module.scss'

const Header = () => {
  const path = usePathname()

  return (
    <header
      className={clsx(
        path.startsWith('/profile') ? style.header_border : style.header,
        path === '/' && style.header_fixed,
        path === '/basket' && style.header_fixed,
      )}
    >
      <nav>
        <Link className={style.title} href='/'>
          Veloce
        </Link>
        <Navigate />
        <div className={style.account_container}>
          <Account />
          <Link href='/basket'>
            <BasketIcon />
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default Header
