'use client'

import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

import style from './sidebar.module.scss'

const NavItemList: React.FC<NavItemListProps> = ({ navItams, userRole }) => {
  const path = usePathname()

  return (
    <nav>
      <ul>
        {navItams.map((item: NavItem, index) => {
          if (item.role === 'Admin' && userRole !== 'Admin') return null
          return (
            <li key={index}>
              <Link
                className={clsx(path === item.link ? style.active_item : style.nav_item)}
                href={item.link}
              >
                <Image src={item.icon} width={24} height={24} alt={item.title} />
                <div className={style.nav_title}>{item.title}</div>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default NavItemList
