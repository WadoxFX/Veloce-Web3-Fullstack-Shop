'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'

import { aboutMeSchema } from '@/@types/zod'
import type { TAboutMeSchema } from '@/@types/zod'
import { editProfile } from '@/api/users'
import { Button, Input } from '@/components/ui'

import { revalidateProfile } from './action'

const ProfileForm: React.FC<{ userData: User; userId: string }> = ({ userData, userId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAboutMeSchema>({
    resolver: zodResolver(aboutMeSchema),
  })

  const onSubmit = handleSubmit(async data => {
    await editProfile({ params: { ...data, userId } })
    await revalidateProfile()
  })

  return (
    <form onSubmit={onSubmit}>
      <Input
        title='Username'
        desc='Enter your real name that is used to receive the parcel'
        name='username'
        placeholder='Dima*'
        register={register}
        defaultValue={userData.username}
        error={errors.username?.message}
      />
      <Input
        title='Surname'
        desc='Enter your real surname used to receive the parcel'
        name='surname'
        placeholder='Malnyk*'
        register={register}
        defaultValue={userData.surname}
        error={errors.surname?.message}
      />
      <Input
        title='Phone'
        desc='In case of problems with delivery'
        name='phone'
        placeholder='1234567890*'
        register={register}
        defaultValue={userData.infos?.phone}
        error={errors.phone?.message}
      />

      <Input
        title='Country'
        desc='Country where the parcel needs to be sent'
        name='country'
        placeholder='United States*'
        register={register}
        defaultValue={userData.infos?.country}
        error={errors.country?.message}
      />
      <Input
        title='City'
        desc='City where the parcel needs to be sent'
        name='city'
        placeholder='New York*'
        register={register}
        defaultValue={userData.infos?.city}
        error={errors.city?.message}
      />

      <Button data-test-id='save_profile' variant='contained' size='medium'>
        Save Profile
      </Button>
    </form>
  )
}

export default ProfileForm
