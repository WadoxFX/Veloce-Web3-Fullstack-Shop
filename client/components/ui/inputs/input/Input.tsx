import clsx from 'clsx'
import React from 'react'
import type { UseFormRegister } from 'react-hook-form'

import style from './input.module.scss'

type InputTypes = 'email' | 'password' | 'text' | 'number'
interface InputProps {
  name: string
  register: UseFormRegister<any>
  title?: string
  type?: InputTypes
  desc?: string
  error?: string
  placeholder?: string
}

export const Input: React.FC<InputProps> = ({ register, name, desc, title, error, ...props }) => (
  <div className={style.container}>
    {title && <div className={style.title}>{title}</div>}
    {desc && <p>{desc}</p>}
    <input
      className={clsx(clsx(style.input, { [style.error_input]: !!error }))}
      {...(register && register(name))}
      {...props}
    />
    {error && <p className={style.error}>{error}</p>}
  </div>
)
