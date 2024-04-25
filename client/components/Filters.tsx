import { motion } from 'framer-motion'
import React from 'react'

import style from '@/styles/pages/shop.module.scss'

import { genders, colors, collections, sizes } from './filterItems'
import { Accordion } from './ui/accordion/Accordion'

const Filters: React.FC<FiltersProps> = ({ state }) => (
  <motion.aside
    className={style.filters}
    initial={{ width: 0 }}
    animate={{ width: state ? 300 : 0 }}
  >
    <div className={style.filter_list}>
      <Accordion open title='Gender' filterType='gender' elements={genders} variant='select' />
      <Accordion open title='Collection' filterType='collection' elements={collections} variant='select' />
      <Accordion open title='Color' filterType='color' elements={colors} variant='color' />
      <Accordion open title='Size' filterType='size' elements={sizes} variant='size' />
    </div>
  </motion.aside>
)

export default Filters
