'use client'

import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { useRecoilValue } from 'recoil'

import heardIcon from '@/public/heard.svg'
import plusIcon from '@/public/plus.svg'
import userIcon from '@/public/user.svg'
import { profile } from '@/recoil'

import style from './sidebar.module.scss'

const Sidebar = () => {
  const data = useRecoilValue(profile)
  const path: string = usePathname()

  const navItams: NavItems = [
    { title: 'About Me', link: `/profile/${data?._id || '../'}`, icon: userIcon, alt: 'About me icon' },
    { title: 'Liked List', link: '/profile/liked', icon: heardIcon, alt: 'Liked list icon' },
    { title: 'New Product', link: '/profile/create', icon: plusIcon, alt: 'New product icon' },
  ]

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
                <Image src={item.icon} width={24} height={24} alt={item.alt || item.title} />
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
