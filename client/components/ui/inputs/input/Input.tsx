import clsx from 'clsx'
import type { ComponentProps } from 'react'
import type { UseFormRegister } from 'react-hook-form'

import style from './input.module.scss'

interface InputProps extends ComponentProps<'input'> {
  name: string
  defaultValue?: string
  register: UseFormRegister<any>
  title?: string
  desc?: string
  error?: string
  placeholder?: string
}

export const Input: React.FC<InputProps> = ({ register, name, desc, title, error, ...props }) => (
  <div className={style.container}>
    {title && <h3>{title}</h3>}
    {desc && <p>{desc}</p>}
    <input
      data-test-id={name}
      className={clsx(clsx(style.input, { [style.error_input]: !!error }))}
      {...(register && register(name))}
      {...props}
    />
    {error && <p className={style.error}>{error}</p>}
  </div>
)
