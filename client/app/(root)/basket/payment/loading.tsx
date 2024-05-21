import React from 'react'

import style from './payment.module.scss'

const loading = () => (
  <div className={style.loading}>
    <div className={style.personal_data} />
    <div className={style.methods}>
      <div className={style.method} />
      <div className={style.method} />
    </div>
    <div className={style.delivery_location} />
    <div className={style.bask_button} />
  </div>
)

export default loading
