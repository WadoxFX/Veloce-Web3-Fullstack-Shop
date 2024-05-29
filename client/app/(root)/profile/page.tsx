import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import React from 'react'

import ProfileForm from './components/form/ProfileForm'

export async function generateMetadata(): Promise<Metadata> {
  const cookie = cookies().get('token')
  const url = `${process.env.SERVER_URL}auth/profile?token=${cookie?.value}`

  const res = await fetch(url, { cache: 'no-cache' })
  const data: UserProfile = await res.json()

  return {
    title: `${data.username} ${data.surname} - Veloce`,
    keywords: `${data.username} ${data.surname}, account, veloce, user`,
    description: 'Fill out your account to get a better experience using the site',
  }
}

const Profile: React.FC<Params> = async () => {
  const cookie = cookies().get('token')
  const url = `${process.env.SERVER_URL}auth/profile?token=${cookie?.value}`

  const res = await fetch(url, { cache: 'no-cache' })
  const data: UserProfile = await res.json()

  return <ProfileForm userData={data} userId={data._id} />
}

export default Profile
