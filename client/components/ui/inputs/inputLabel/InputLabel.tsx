import React, { ComponentProps } from 'react'
import type { UseFormRegister } from 'react-hook-form'

import style from './inputLabel.module.scss'

interface InputLabelProps extends ComponentProps<'input'> {
  name: string
  label?: string
  register: UseFormRegister<any>
  error?: string
}

export const InputLabel: React.FC<InputLabelProps> = ({ name, label, register, error, ...props }) => (
  <div className={style.container}>
    <input data-test-id={name} placeholder=' ' {...(register && register(name))} {...props} />
    {label && <label htmlFor={name}>{label}</label>}
    {error && <p className={style.error}>{error}</p>}
  </div>
)
