'use client'

import { motion } from 'framer-motion'
import React from 'react'
import { useRecoilValue } from 'recoil'

import { filterAsideState } from '@/recoil'
import style from '@/styles/pages/shop.module.scss'

import Filters from './Filters'

const FilterAside = () => {
  const state = useRecoilValue<FilterAsideState>(filterAsideState)
  return (
    <motion.aside
      className={style.filters}
      initial={{ width: 0 }}
      animate={{ width: state.isOn ? 300 : 0 }}
    >
      <Filters />
    </motion.aside>
  )
}

export default FilterAside
