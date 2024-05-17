'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import { logInSchema } from '@/@types/zod'
import type { TLogInSchema } from '@/@types/zod'
import { logIn } from '@/api/auth'
import { Button, InputLabel } from '@/components/ui'

import style from '../../auth.module.scss'

const LogInForm = () => {
  const [error, setError] = useState<string>('')
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLogInSchema>({
    resolver: zodResolver(logInSchema),
  })

  const onSubmit = handleSubmit(async data => {
    try {
      await logIn({ params: data })
      router.push('/')
    } catch (error: any) {
      setError(String(error.response.data.message))
    }
  })
  return (
    <form className={style.form} onSubmit={onSubmit}>
      <header>
        <h1>Log In</h1>
        <p>
          Don&apos;t have an account? <Link href='/signup'>Click here</Link>
        </p>
      </header>

      <div className={style.inputs}>
        <InputLabel
          type='email'
          name='email'
          label='Email'
          register={register}
          error={errors.email?.message}
        />
        <InputLabel
          type='password'
          name='password'
          label='Password'
          register={register}
          error={errors.password?.message}
        />
        {error && <p className={style.error}>{error}</p>}
      </div>

      <div className={style.controllers}>
        <Button variant='contained' size='medium'>
          Log In
        </Button>

        <div className={style.or_content}>
          <hr />
          <div className={style.or}>or</div>
          <hr />
        </div>

        <Button
          onClick={() => router.push('/signup')}
          type='button'
          variant='outlined'
          size='medium'
        >
          Sign Up ➡️
        </Button>
      </div>
    </form>
  )
}

export default LogInForm
