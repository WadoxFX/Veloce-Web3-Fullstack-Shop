import React from 'react'

import style from './drawStars.module.scss'

const DrawStars: React.FC<DrawStarsProps> = ({ quantity, grade, size }) => (
  <ul className={style.starList}>
    {[...new Array(quantity)].map((i, id) => (
      <li key={id}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width={size}
          height={size}
          x='0'
          y='0'
          viewBox='0 0 511.991 511'
        >
          <g transform='matrix(1,0,0,1,0,10)'>
            <path
              d='M510.652 185.883a27.177 27.177 0 0 0-23.402-18.688l-147.797-13.418-58.41-136.75C276.73 6.98 266.918.497 255.996.497s-20.738 6.483-25.023 16.53l-58.41 136.75-147.82 13.418c-10.837 1-20.013 8.34-23.403 18.688a27.25 27.25 0 0 0 7.937 28.926L121 312.773 88.059 457.86c-2.41 10.668 1.73 21.7 10.582 28.098a27.087 27.087 0 0 0 15.957 5.184 27.14 27.14 0 0 0 13.953-3.86l127.445-76.203 127.422 76.203a27.197 27.197 0 0 0 29.934-1.324c8.851-6.398 12.992-17.43 10.582-28.098l-32.942-145.086 111.723-97.964a27.246 27.246 0 0 0 7.937-28.926zM258.45 409.605'
              fill={id + 1 <= grade ? '#000' : '#dbdbdb'}
            />
          </g>
        </svg>
      </li>
    ))}
  </ul>
)

export default DrawStars
