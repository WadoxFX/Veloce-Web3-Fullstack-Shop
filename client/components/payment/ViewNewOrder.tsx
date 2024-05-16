import React from 'react'

import style from '@/styles/pages/payment.module.scss'

// Page is under construction
const ViewNewOrder: React.FC<ViewNewOrderProps> = ({ loading }) =>
  loading ? <div>Loading...</div> : <div className={style.new_order} />

export default ViewNewOrder
