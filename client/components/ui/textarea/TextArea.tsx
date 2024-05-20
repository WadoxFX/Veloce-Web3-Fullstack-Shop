import clsx from 'clsx'
import type { ComponentProps } from 'react'
import type { UseFormRegister } from 'react-hook-form'

import style from './textArea.module.scss'

interface TextAreaProps extends ComponentProps<'textarea'> {
  name: string
  register: UseFormRegister<any>
  title?: string
  desc?: string
  error?: string
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
