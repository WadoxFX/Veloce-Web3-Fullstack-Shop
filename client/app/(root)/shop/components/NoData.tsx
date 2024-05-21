import React from 'react'

import style from '@/styles/pages/shop.module.scss'

const NoData = () => (
  <div className={style.no_data_container}>
    <div className={style.no_data_message}>
      <h2>No products found</h2>
      <p>Your filters do not match the configuration of any product</p>
    </div>
  </div>
)

export default NoData
