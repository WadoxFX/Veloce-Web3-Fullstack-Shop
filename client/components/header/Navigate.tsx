import Link from 'next/link'
import React from 'react'

import style from './header.module.scss'

const Navigate = () => (
  <ul className={style.nav_list}>
    <li>
      <Link href='/'>Home</Link>
    </li>
    <li>
      <Link href='/shop'>Shop</Link>
    </li>
  </ul>
)

export default Navigate
