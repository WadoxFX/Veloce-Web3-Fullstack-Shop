import { cookies } from 'next/headers'
import React from 'react'

import { getLikedProducts } from '@/api/products'

const Liked = async () => {
  const token = cookies().get('token')!.value
  const likedList: LikedProducts = await getLikedProducts({ params: { token } }).then(res => res.data)
  
  return <p>{likedList.length}</p>
}

export default Liked
