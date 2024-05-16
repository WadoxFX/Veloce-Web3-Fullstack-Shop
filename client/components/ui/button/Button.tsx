import clsx from 'clsx'
import React from 'react'

import style from './button.module.scss'

type ButtonVariant = 'text' | 'outlined' | 'contained'
type ButtonType = 'button' | 'submit'
type ButtonSize = 'small' | 'medium' | 'large'
type ButtonRadius = 'rounded' | 'round'
interface ButtonProps {
  children: React.ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  radius?: ButtonRadius
  loading?: boolean
  disabled?: boolean
  type?: ButtonType
  onClick?: () => void
}

export const Button: React.FC<ButtonProps> = ({ children, variant, size, radius, loading, disabled, onClick, ...props }) => (
  <button
    className={clsx(style.button, style[variant || ''], style[size || ''], style[radius || ''])}
    onClick={disabled ? undefined : onClick}
    disabled={disabled}
    {...props}
  >
    {loading ? 'Loading...' : children}
  </button>
)
