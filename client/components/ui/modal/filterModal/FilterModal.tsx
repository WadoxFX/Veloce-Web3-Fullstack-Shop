'use client'

import { motion, AnimatePresence } from 'framer-motion'
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

  if (state.isOn && innerWidth <= 960) document.body.setAttribute('no_scroll', '')
  else document.body.removeAttribute('no_scroll')

  return createPortal(
    <AnimatePresence>
      {!!state.isOn && innerWidth <= 960 && (
        <motion.div
          className={style.content}
          initial={{ translateY: window.innerHeight }}
          animate={{ translateY: 0 }}
          exit={{ translateY: window.innerHeight }}
          transition={{ damping: 30, duration: 0.3 }}
        >
          <button
            aria-label='Close modal'
            className={style.close}
            onClick={() => setState(prev => ({ ...prev, isOn: !prev.isOn }))}
          >
            <CloseIcon size={24} />
          </button>
          <Filters />
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
