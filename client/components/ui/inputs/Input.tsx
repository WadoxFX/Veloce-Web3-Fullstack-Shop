import React, { useId } from 'react'
import type { UseFormRegister } from 'react-hook-form'

// import style from './input.module.scss'

type InputTypes = 'email' | 'password' | 'text'
interface InputProps {
  name: string
  register: UseFormRegister<any>
  type?: InputTypes
  desc?: string
  error?: string
  placeholder?: string
}

export const Input: React.FC<InputProps> = ({ register, name, desc, error, ...props }) => {
  const id: string = useId()
  return (
    <div>
      <label htmlFor={id}>{name}</label>
      <input {...(register && register(name))} {...props} />
      {desc && <p>{desc}</p>}
      {error && <p>{error}</p>}
    </div>
  )
}
