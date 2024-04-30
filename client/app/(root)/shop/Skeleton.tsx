import React from 'react'

import style from '@/styles/sceleton.module.scss'

interface SkeletonProps {
  preloader: (node?: Element | null | undefined) => void
}

const num: number[] = [...new Array(10)]

export const Skeleton: React.FC<SkeletonProps> = ({ preloader }) => (
  <ul className={style.sceleton_list} ref={preloader}>
    {num.map((_, id) => (
      <li className={style.item} key={id} />
    ))}
  </ul>
)
