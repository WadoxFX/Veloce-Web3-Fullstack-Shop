import React from 'react'
import type { UseFormRegister } from 'react-hook-form'

import style from './inputLabel.module.scss'

type InputTypes = 'email' | 'password' | 'text' | 'number'
interface InputLabelProps {
  name: string
  label?: string
  type?: InputTypes
  register: UseFormRegister<any>
  error?: string
}

export const InputLabel: React.FC<InputLabelProps> = ({ name, label, register, error, ...props }) => (
  <div className={style.container}>
    <input placeholder=' ' id={name} {...(register && register(name))} {...props} />
    {label && <label htmlFor={name}>{label}</label>}
    {error && <p className={style.error}>{error}</p>}
  </div>
)
