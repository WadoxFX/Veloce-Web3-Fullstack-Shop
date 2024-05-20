'use client'

import { useScroll, motion, useTransform } from 'framer-motion'
import React, { useRef } from 'react'

import style from '@/styles/pages/home.module.scss'

const PromoVideo = () => {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    layoutEffect: false,
    offset: ['0 1', '1.33 1'],
  })

  const scaleProgress = useTransform(scrollYProgress, [-0.5, 0.35], [0.60, 1])

  return (
    <motion.div ref={ref} className={style.promo_video_container} style={{ scale: scaleProgress }}>
      <video preload='none' autoPlay muted loop>
        <source src='/video/promo.mp4 ' type='video/mp4' />
        Your browser does not support the video tag.
      </video>
    </motion.div>
  )
}

export default PromoVideo
