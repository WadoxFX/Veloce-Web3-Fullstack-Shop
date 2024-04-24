import clsx from 'clsx'
import React, { useId } from 'react'

import { useToggle } from '@/hooks/useToggle'

import style from './accordion.module.scss'

type AccordionVariant = 'color' | 'size' | 'select'
interface AccordionProps {
  title: React.ReactNode
  open?: boolean
  elements: string[]
  variant: AccordionVariant
}

export const Accordion: React.FC<AccordionProps> = ({ title, open, elements, variant }) => {
  const [isOn, toggle] = useToggle(open)
  const uuid: string = useId()
  return (
    <div className={style.accordion}>
      <button onClick={toggle}>
        <div>{title}</div> <span>+</span>
      </button>

      {isOn && (
        <ul className={clsx(style[variant])}>
          {elements.map((item: string, id: number) => (
            <li key={id}>
              <input
                className={clsx(variant === 'color' && style[item.toLocaleLowerCase()])}
                id={uuid + item}
                type='checkbox'
              />
              <label htmlFor={uuid + item}>{item}</label>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
