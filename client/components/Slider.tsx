'use client'

import Image from 'next/image'
import React, { useState } from 'react'

import style from '@/styles/pages/product.module.scss'

const Slider: React.FC<{ images: string[] }> = ({ images }) => {
  const [image, setImage] = useState(images[0])
  return (
    <div className={style.slider}>
      <ul>
        {images.map((image: string, id: number) => (
          <li key={id}>
            <Image
              key={id}
              className={style.min_image}
              src={process.env.SERVER_URL + image}
              width={76}
              height={76}
              alt={`image ${id}`}
              onMouseOver={() => setImage(image)}
              priority
            />
          </li>
        ))}
      </ul>

      <Image
        className={style.current_image}
        src={process.env.SERVER_URL + image}
        width={400}
        height={400}
        quality={100}
        alt='Current image'
        priority
      />
    </div>
  )
}

export default Slider
