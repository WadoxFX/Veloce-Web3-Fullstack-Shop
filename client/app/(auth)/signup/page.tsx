import type { Metadata } from 'next'
import React from 'react'

import style from '../auth.module.scss'

import SignUpForm from './SignUpForm'

export const metadata: Metadata = {
  title: 'Sign Up - Veloce',
  keywords: 'Sign Up, login, registration, Veloce, auth, shop auth',
  description: 'Register to create an account',
}

const SignUp = () => (
  <div className={style.container}>
    <div className={style.picture} />
    <SignUpForm />
  </div>
)

export default SignUp
