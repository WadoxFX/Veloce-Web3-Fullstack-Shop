import type { Metadata } from 'next'
import React from 'react'

import style from '../auth.module.scss'

import LoginForm from './components/LoginForm'

export const metadata: Metadata = {
  title: 'Login - Veloce',
  keywords: 'Login, login, authorization, Veloce, auth, shop auth',
  description: 'Authorization to log into your account',
}

const Login = () => (
  <div className={style.container}>
    <div className={style.picture} />
    <LoginForm />
  </div>
)

export default Login
