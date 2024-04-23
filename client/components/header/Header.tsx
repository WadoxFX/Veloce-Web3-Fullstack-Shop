'use client'

import Link from 'next/link'
import React from 'react'

import { BasketIcon } from '../icons'

import Account from './Account'
import Navigate from './Navigate'
import style from './header.module.scss'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

const Header = () => {
  const path = usePathname()  
  return (
    <header className={clsx(path.startsWith('/profile') ? style.header_fixed : style.header)}>
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
