import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import NewProductSlider from '@/components/NewProductSlider'
import PromoVideo from '@/components/PromoVideo'
import Title from '@/components/Title'
import { ArrowIcon } from '@/components/icons'
import basketballCard from '@/public/gif/basketball.gif'
import style from '@/styles/pages/home.module.scss'

const Home = () => (
  <div className={style.container}>
    <div className={style.banner}>
      <Title />
      <div className={style.banner_content}>
        <p>
          Step forward with us
          <br /> Style✨and comfort in everyone
          <br /> a pair of shoes.
        </p>

        <div className={style.fast_link}>
          <Link href='/shop'>See the range of products</Link>
          <div>(Scroll)</div>
        </div>
      </div>
    </div>

    <PromoVideo />
    <p className={style.promo_desc}>
      Running Isn&apos;t Just Running
      <br /> (Date — 22.04.2024)
    </p>

    <div className={style.about_us}>
      <ArrowIcon />
      <div className={style.about_us_content_container}>
        <h2>
          Let&apos;s get to know each other,
          <br /> we&apos;ll tell you why you should
          <div>
            choose us.
            <Image
              className={style.card}
              src={basketballCard}
              width={0}
              height={0}
              alt='Basketball Cart'
            />
          </div>
        </h2>

        <div className={style.about_us_content}>
          <div className={style.about_us_min_title}>(About us)</div>
          <p>
            We collaborate with well-known brands, conduct collaborations on unique shoe models, and
            produce our own products. Our stores are available throughout the country.
          </p>
        </div>
      </div>
    </div>

    <NewProductSlider />
  </div>
)

export default Home
