'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useRecoilRefresher_UNSTABLE, useRecoilState, useRecoilValueLoadable } from 'recoil'

import { addInFavorite, removeFromFavorites } from '@/api/products'
import { revalidateProduct } from '@/app/(root)/products/[id]/action'
import { fetchProfile, profile } from '@/recoil'

import { HeartIcon } from './icons'
import { Button } from './ui'

interface FavoriteProps {
  productId: string
  favoriteList: string[]
}

const FavoriteButton: React.FC<FavoriteProps> = ({ productId, favoriteList }) => {
  const [value, setValue] = useRecoilState<UserProfile | null>(profile)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const dataLoadable = useRecoilValueLoadable(fetchProfile)
  const refreshUserData = useRecoilRefresher_UNSTABLE(fetchProfile)
  const router = useRouter()

  useEffect(() => {
    refreshUserData()
  }, [])

  useEffect(() => {
    if (dataLoadable.state === 'hasValue') {
      setIsLoading(false)
      setValue(dataLoadable.contents as UserProfile)
    }
  }, [dataLoadable])

  const handlerFavorite = async () => {
    if (value?._id) {
      if (favoriteList.includes(value._id))
        await removeFromFavorites({ params: { productId, userId: value._id } })
      else await addInFavorite({ params: { productId, userId: value._id } })

      await revalidateProduct()
    } else router.push('/login')
  }

  return (
    <Button
      size='large'
      variant='outlined'
      loading={isLoading}
      disabled={isLoading}
      data-test-id="favorite"
      onClick={handlerFavorite}
    >
      Favorite
      <HeartIcon size={16} contained={!favoriteList.includes(value?._id ?? '')} />
    </Button>
  )
}

export default FavoriteButton
