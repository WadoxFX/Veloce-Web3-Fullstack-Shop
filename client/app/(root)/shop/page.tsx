'use client'

import React from 'react'

import Filters from '@/components/Filters'
import Products from '@/components/Products'
import { FilterIcon } from '@/components/icons'
import { Button } from '@/components/ui'
import { useToggle } from '@/hooks/useToggle'
import style from '@/styles/pages/shop.module.scss'

const Shop = () => {
  const [isOn, toggle] = useToggle(false)
  return (
    <>
      <div className={style.line} />
      <div className={style.products_contoler}>
        <h2>New Releases</h2>
        <Button variant='text' onClick={toggle}>
          {isOn ? 'Hide Filters' : 'Show Filters'}
          <FilterIcon />
        </Button>
        <div>
          Sort By
          <select>
            <option>Featured</option>
            <option>Newest</option>
            <option>High-Low</option>
            <option>Low-High</option>
          </select>
        </div>
      </div>

      <div className={style.container}>
        <Filters state={isOn} />
        <Products />
      </div>
    </>
  )
}

export default Shop
