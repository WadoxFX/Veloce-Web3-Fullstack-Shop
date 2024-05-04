import type { Metadata } from 'next'
import React from 'react'

import style from '../auth.module.scss'

import LogInForm from './LogInForm'

export const metadata: Metadata = {
  title: 'Log In - Veloce',
}

const LogIn = () => (
  <div className={style.container}>
    <div className={style.picture} />
    <LogInForm />
  </div>
)

export default LogIn
