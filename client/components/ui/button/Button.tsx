import clsx from 'clsx'
import React from 'react'

import style from './button.module.scss'

type ButtonVariant = 'text' | 'outlined ' | 'contained'
type ButtonSize = 'small' | 'medium' | 'large'
type ButtonRadius = 'rounded' | 'round'
interface ButtonProps {
  children: React.ReactNode
  variant: ButtonVariant
  size?: ButtonSize
  radius?: ButtonRadius
  loading?: boolean
  onClick?: () => void
}

export const Button: React.FC<ButtonProps> = ({ children, variant, size, radius, loading, onClick, ...props }) => (
  <button
    className={clsx(style.button, style[variant], style[size || 'small'], style[radius || ''])}
    onClick={onClick}
    {...props}
  >
    {loading ? 'Loading' : children}
  </button>
)
