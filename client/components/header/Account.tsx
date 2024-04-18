'use client'

import Link from 'next/link'
import React from 'react'
import { useRecoilValue } from 'recoil'

import { profile as profileAtom } from '@/recoil'

import style from './header.module.scss'

const Account = () => {
  const profile = useRecoilValue(profileAtom)
  return profile ? (
    'profile'
  ) : (
    <>
      <Link className={style.login} href='/login'>
        Login
      </Link>
      <Link className={style.signup} href='/signup'>
        Sign Up
      </Link>
    </>
  )
}

export default Account
