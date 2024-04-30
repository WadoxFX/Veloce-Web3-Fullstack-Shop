'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useRecoilState } from 'recoil'

import Filters from '@/components/Filters'
import { CloseIcon } from '@/components/icons'
import { filterAsideState } from '@/recoil'

import style from './filterModal.module.scss'

export const FilterModal = () => {
  const [innerWidth, setInnerWidth] = useState<number>(0)
  const [state, setState] = useRecoilState<FilterAsideState>(filterAsideState)

  useEffect(() => {
    const handleResize = () => setInnerWidth(window.innerWidth)
    handleResize()

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (typeof window === 'undefined') return null
  return createPortal(
    !!state.isOn && innerWidth <= 960 && (
      <motion.div className={style.overlay}>
        <div className={style.content}>
          <button
            aria-label='Close modal'
            className={style.close}
            onClick={() => setState(prev => ({ ...prev, isOn: !prev.isOn }))}
          >
            <CloseIcon size={20} />
          </button>
          <Filters />
        </div>
      </motion.div>
    ),
    document.body,
  )
}
