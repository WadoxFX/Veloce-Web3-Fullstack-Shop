'use client'

import clsx from 'clsx'
import React, { useId } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'

import { useToggle } from '@/hooks/useToggle'
import { filterAsideState, filters as filterList } from '@/recoil'

import style from './accordion.module.scss'

type AccordionVariant = 'color' | 'size' | 'select'
interface AccordionProps {
  title: React.ReactNode
  open?: boolean
  elements: string[]
  filterType: keyof FiltersList
  variant: AccordionVariant
}

export const Accordion: React.FC<AccordionProps> = ({
  title,
  open,
  filterType,
  elements,
  variant,
}) => {
  const [isOn, toggle] = useToggle(open)
  const [filters, setFilters] = useRecoilState<FiltersList>(filterList)
  const setState = useSetRecoilState<FilterAsideState>(filterAsideState)
  const uuid: string = useId()

  const addNewFilter = (element: string) => {
    setFilters((prev: FiltersList) => ({
      ...prev,
      [filterType]: [...(prev[filterType] ?? []), element],
    }))
    setState(prev => ({ ...prev, delay: true }))
    setTimeout(() => {
      setState(prev => ({ ...prev, delay: false }))
    }, 1000)
  }

  const removeFilter = (element: string) => {
    setFilters((prev: FiltersList) => {
      const updated = {
        ...prev,
        [filterType]: (prev[filterType] ?? []).filter((item: string) => item !== element),
      }

      if (updated[filterType]?.length === 0) {
        delete updated[filterType]
      }

      return updated
    })

    setState(prev => ({ ...prev, delay: true }))
    setTimeout(() => {
      setState(prev => ({ ...prev, delay: false }))
    }, 1000)
  }

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
                checked={(filters[filterType] ?? []).includes(item)}
                onChange={e => (e.target.checked ? addNewFilter(item) : removeFilter(item))}
              />
              <label htmlFor={uuid + item}>{item}</label>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
