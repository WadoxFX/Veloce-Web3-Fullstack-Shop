import clsx from 'clsx'
import React from 'react'
import type { UseFormRegister } from 'react-hook-form'

import style from './textArea.module.scss'

type TextAreaTypes = 'email' | 'password' | 'text' | 'number'
interface TextAreaProps {
  name: string
  register: UseFormRegister<any>
  title?: string
  type?: TextAreaTypes
  desc?: string
  error?: string
  placeholder?: string
}

export const TextArea: React.FC<TextAreaProps> = ({
  register,
  name,
  desc,
  title,
  error,
  ...props
}) => (
  <div className={style.textarea_controler}>
    {title && <div className={style.title}>{title}</div>}
    {desc && <p>{desc}</p>}
    <textarea
      className={clsx(clsx(style.textarea, { [style.error_textarea]: !!error }))}
      {...(register && register(name))}
      {...props}
    />
    {error && <p className={style.error}>{error}</p>}
  </div>
)
