'use client'

import React from 'react'
import { useRecoilState } from 'recoil'

import { filterAsideState } from '@/recoil'
import style from '@/styles/pages/shop.module.scss'

import RibbonOption from './RibbonOption'
import { FilterIcon } from './icons'
import { Button } from './ui'

const FiltersRibbon = () => {
  const [state, setState] = useRecoilState<FilterAsideState>(filterAsideState)
  return (
    <>
      <div className={style.line} />
      <div className={style.products_contoler}>
        <h2>New Releases</h2>
        <Button variant='text' onClick={() => setState(prev => ({ ...prev, isOn: !prev.isOn }))}>
          {state.isOn ? 'Hide Filters' : 'Show Filters'}
          <FilterIcon size={24} />
        </Button>
        <RibbonOption />
      </div>
    </>
  )
}

export default FiltersRibbon
