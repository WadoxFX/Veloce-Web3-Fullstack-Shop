import React from 'react'

import style from './basket.module.scss'

const loading = () => (
  <div className={style.preloader}>
    <div className={style.item} />
    <div className={style.item} />
  </div>
)

export default loading
