'use client'

import React from 'react'

import style from '@/components/footer/footer.module.scss'

import BackButton from './BackButton'

const Footer = () => (
  <footer className={style.footer}>
    <div className={style.footer_title}>
      {Array.from('VELOCE').map((item, id) => (
        <svg
          key={id}
          width='300'
          height='320'
          viewBox='0 0 100 100'
          xmlns='http://www.w3.org/2000/svg'
        >
          <text
            x={[-1, 4, 7, -4, 4, 10][id]}
            y='100'
            fontFamily='Arial'
            fontSize='130'
            fontWeight='800'
            fill='current'
          >
            {item}
          </text>
        </svg>
      ))}
    </div>
    <BackButton>Back to top ↑</BackButton>
    <div className={style.footer_content}>Copyright &copy; Veloce 2024</div>
  </footer>
)

export default Footer
