import React from 'react'

import style from '@/styles/pages/shop.module.scss'
import { useRecoilState } from 'recoil'
import { filterAsideState, filters } from '@/recoil'

const RibbonOption = () => {
  const [state, setState] = useRecoilState<FilterAsideState>(filterAsideState)
  const [_, setOption] = useRecoilState<FiltersList>(filters)

  const addOption = (option: string) => {
    setOption(prev => ({ ...prev, option }))
    setState(prev => ({ ...prev, delay: true }))
    setTimeout(() => {
      setState(prev => ({ ...prev, delay: false }))
    }, 1000)
  }

  return (
    <div className={style.ribbon_options}>
      Sort By
      <select aria-disabled={state.delay} onChange={e => addOption(e.target.value)}>
        <option value=''>Featured</option>
        <option value='Newest'>Newest</option>
        <option value='High-Low'>High-Low</option>
        <option value='Low-High'>Low-High</option>
      </select>
    </div>
  )
}

export default RibbonOption
