'use client'

import { motion } from 'framer-motion'
import React from 'react'

import style from '@/styles/pages/home.module.scss'

const banner = {
  animate: {
    transition: {
      delayChildren: 0,
      staggerChildren: 0.12,
    },
  },
}

const letterAni = {
  initial: { y: 400 },
  animate: {
    y: 0,
    transition: {
      ease: [0.6, 0.01, -0.05, 0.95],
      duration: 0.5,
    },
  },
}

const Title = () => (
  <motion.span className={style.title} variants={banner} initial='initial' animate='animate'>
    {Array.from('VELOCE').map((item, id) => (
      <motion.svg
        variants={letterAni}
        key={id}
        width='300'
        height='320'
        viewBox='0 0 100 100'
        xmlns='http://www.w3.org/2000/svg'
      >
        <text
          x={[-1, 4, 7, -6, 4, 10][id]}
          y='92'
          fontFamily='Arial'
          fontSize='130'
          fontWeight='800'
          fill='current'
        >
          {item}
        </text>
      </motion.svg>
    ))}
  </motion.span>
)

export default Title
