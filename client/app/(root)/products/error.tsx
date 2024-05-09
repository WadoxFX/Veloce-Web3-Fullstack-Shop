'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import notFoundicon from '@/public/404.svg'
import style from '@/styles/pages/404.module.scss'

const Error = () => (
  <div className={style.container}>
    <Image src={notFoundicon} width={1000} height={1000} alt='404 Not Found' priority />

    <div className={style.content_container}>
      <div className={style.content}>
        <h1>
          Oops.
          <br /> Page Not Found
        </h1>

        <div>
          <p>Page does not exist or has been deleted, to go back</p>
          <span>
            <Link href='/'>Click Here</Link>
          </span>
        </div>
      </div>
    </div>
  </div>
)

export default Error
