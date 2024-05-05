'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

import style from '@/components/footer/footer.module.scss'

interface BackButtonProps {
  children: React.ReactNode
}

const BackButton: React.FC<BackButtonProps> = ({ children }) => {
  const path = usePathname()
  return (
    <Link href={`${path}/#`} className={style.footer_content}>
      {children}
    </Link>
  )
}

export default BackButton
