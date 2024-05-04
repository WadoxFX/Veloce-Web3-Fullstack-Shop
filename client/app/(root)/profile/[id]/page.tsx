import { cookies } from 'next/headers'
import React from 'react'

import ProfileForm from './ProfileForm'

const Profile: React.FC<Params> = async ({ params: { id } }) => {
  const cookie = cookies().get('token')
  const url = `${process.env.SERVER_URL}auth/profile?token=${cookie?.value}`
  const res = await fetch(url, { cache: 'no-cache' })
  const data: UserProfile = await res.json()

  return <ProfileForm userData={data} userId={id} />
}

export default Profile
