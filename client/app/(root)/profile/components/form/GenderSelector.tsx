import clsx from 'clsx'
import React from 'react'
import { useRecoilState } from 'recoil'

import { gender } from '@/recoil'

import style from './productCreator.module.scss'

const genders: string[] = ["Men's", "Women's", 'Unisex']

const GenderSelector = () => {
  const [value, setGender] = useRecoilState<string | null>(gender)
  return (
    <ul className={style.gender_list}>
      {genders.map((item: string, id: number) => (
        <li key={id}>
          <button
            type='button'
            className={clsx(style.gender, { [style.active]: item === value })}
            onClick={() => setGender(item)}
          >
            {item}
          </button>
        </li>
      ))}
    </ul>
  )
}

export default GenderSelector
