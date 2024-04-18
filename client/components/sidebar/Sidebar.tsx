'use client'

import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

import plusIcon from '@/public/plus.svg'
import userIcon from '@/public/user.svg'

import style from './sidebar.module.scss'

const navItams: NavItems = [
  { title: 'About me', link: '/profile/123', icon: userIcon },
  { title: 'New Product', link: '/profile/create', icon: plusIcon },
]

const Sidebar = () => {
  const path: string = usePathname()
  return (
    <aside className={style.container}>
      <nav>
        <ul>
          {navItams.map((item: NavItem, id: number) => (
            <li key={id}>
              <Link
                className={clsx(path === item.link ? style.active_item : style.nav_item)}
                href={item.link}
              >
                <Image src={item.icon} width={24} height={24} alt={item.title} />
                <div className={style.nav_title}>{item.title}</div>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar
