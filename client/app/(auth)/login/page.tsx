import type { Metadata } from 'next'
import React from 'react'

import style from '../auth.module.scss'

import LogInForm from './components/LogInForm'

export const metadata: Metadata = {
  title: 'Log In - Veloce',
  keywords: 'Log In, login, authorization, Veloce, auth, shop auth',
  description: 'Authorization to log into your account',
}

const LogIn = () => (
  <div className={style.container}>
    <div className={style.picture} />
    <LogInForm />
  </div>
)

export default LogIn
