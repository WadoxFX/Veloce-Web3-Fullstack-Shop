'use client'

import { useScroll, motion, useTransform } from 'framer-motion'
import React, { useRef } from 'react'

import style from '@/styles/pages/home.module.scss'

const PromoVideo = () => {
  const ref = useRef<HTMLImageElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['0 1', '1.33 1'],
  })

  const scaleProgress = useTransform(scrollYProgress, [0.04, 0.35], [0.65, 1])

  return (
    <motion.div className={style.promo_video_container} style={{ scale: scaleProgress }}>
      <video preload='none' autoPlay muted loop>
        <source src='/videos/promo.mp4 ' type='video/mp4' />
        Your browser does not support the video tag.
      </video>
    </motion.div>
  )
}

export default PromoVideo
