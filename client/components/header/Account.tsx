'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useRecoilRefresher_UNSTABLE, useRecoilState, useRecoilValueLoadable } from 'recoil'

import { fetchProfile, profile } from '@/recoil'

import { UserIcon } from '../icons'

const Account = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [value, setValue] = useRecoilState<UserProfile | null>(profile)
  const dataLoadable = useRecoilValueLoadable(fetchProfile)
  const refreshUserData = useRecoilRefresher_UNSTABLE(fetchProfile)

  useEffect(() => {
    refreshUserData()
  }, [])

  useEffect(() => {
    if (dataLoadable.state === 'hasValue') {
      setIsLoading(false)
      setValue(dataLoadable.contents as UserProfile)
    }
  }, [dataLoadable])

  if (isLoading) return <div>...</div>

  return (
    <Link href={`/profile/${value?._id}`} aria-label='Your account'>
      <UserIcon size={24} />
    </Link>
  )
}
export default Account
