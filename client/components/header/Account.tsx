'use client'

import Link from 'next/link'
import React from 'react'
import { useRecoilValue } from 'recoil'

import { profile as profileAtom } from '@/recoil'

import { UserIcon } from '../icons'

const Account = () => {
  const profile = useRecoilValue(profileAtom)
  return (
    <Link href={`/profile/${profile?._id}`}>
      <UserIcon size={24} />
    </Link>
  )
}
export default Account
