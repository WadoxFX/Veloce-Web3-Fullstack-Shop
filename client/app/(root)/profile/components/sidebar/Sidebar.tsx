import { cookies } from 'next/headers'
import React from 'react'

import { profileByToken } from '@/api/auth'
import heardIcon from '@/public/heard.svg'
import orderIcon from '@/public/order.svg'
import plusIcon from '@/public/plus.svg'
import userIcon from '@/public/user.svg'

import NavItemList from './NavItemList'
import style from './sidebar.module.scss'

const Sidebar = async () => {
  const token = cookies().get('token')
  const user = await profileByToken({ params: { token: token!.value } }).then(res => res.data)

  const navItams: NavItems = [
    { title: 'About Me', link: '/profile', icon: userIcon },
    { title: 'Liked List', link: '/profile/liked', icon: heardIcon },
    { title: 'User Orders', link: '/profile/orders', icon: orderIcon, role: 'Admin' },
    { title: 'New Product', link: '/profile/create', icon: plusIcon },
  ]

  return (
    <aside className={style.container}>
      <NavItemList navItams={navItams} userRole={user.role} />
    </aside>
  )
}

export default Sidebar
