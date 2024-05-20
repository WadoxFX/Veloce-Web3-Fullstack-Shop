'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import { signUpSchema } from '@/@types/zod'
import type { TSignUpSchema } from '@/@types/zod'
import { signUp } from '@/api/auth'
import { Button, InputLabel } from '@/components/ui'

import style from '../../auth.module.scss'

const SignUpForm = () => {
  const [error, setError] = useState<string>('')
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
  })

  const onSubmit = handleSubmit(async data => {
    try {
      signUp({ params: data })
      router.push('/')
    } catch (error: any) {
      setError(String(error.response.data.message))
    }
  })
  return (
    <form className={style.form} onSubmit={onSubmit}>
      <header>
        <h1>Sign Up</h1>
        <p>
          Already registered? <Link href='/login'>Click here</Link>
        </p>
      </header>

      <div className={style.inputs}>
        <div className={style.inputs_line}>
          <InputLabel
            name='username'
            label='Username'
            register={register}
            error={errors.username?.message}
          />
          <InputLabel
            name='surname'
            label='Surname'
            register={register}
            error={errors.surname?.message}
          />
        </div>
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
        <Button data-test-id='signupBotton' variant='contained' size='medium'>
          Log In
        </Button>

        <div className={style.or_content}>
          <hr />
          <div className={style.or}>or</div>
          <hr />
        </div>

        <Button
          onClick={() => router.push('/login')}
          type='button'
          variant='outlined'
          size='medium'
        >
          Log In ➡️
        </Button>
      </div>
    </form>
  )
}

export default SignUpForm
