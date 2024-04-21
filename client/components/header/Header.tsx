import Link from 'next/link'
import React from 'react'

import { BasketIcon } from '../icons'

import Account from './Account'
import Navigate from './Navigate'
import style from './header.module.scss'

const Header = () => (
  <header className={style.header}>
    <nav>
      <Link className={style.title} href='/'>
        Veloce
      </Link>
      <Navigate />
      <div className={style.account_container}>
        <Account />
        <BasketIcon />
      </div>
    </nav>
  </header>
)

export default Header
