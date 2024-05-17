import React from 'react'

import style from '@/styles/pages/basket.module.scss'

const Skeleton = () => (
  <div className={style.preloader}>
    <div className={style.item} />
    <div className={style.item} />
  </div>
)

export default Skeleton
