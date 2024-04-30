import React from 'react'
import { useRecoilValue } from 'recoil'

import { filterAsideState } from '@/recoil'
import style from '@/styles/pages/shop.module.scss'

import { genders, colors, collections, sizes } from './filterItems'
import { Accordion } from './ui'

const Filters = () => {
  const state = useRecoilValue<FilterAsideState>(filterAsideState)
  return (
    <div aria-disabled={state.delay} className={style.filter_list}>
      <Accordion open title='Gender' filterType='gender' elements={genders} variant='select' />
      <Accordion open title='Collection' filterType='collection' elements={collections} variant='select' />
      <Accordion open title='Color' filterType='color' elements={colors} variant='color' />
      <Accordion open title='Size' filterType='size' elements={sizes} variant='size' />
    </div>
  )
}

export default Filters
