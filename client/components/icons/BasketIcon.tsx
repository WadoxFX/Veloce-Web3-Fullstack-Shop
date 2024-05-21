import React from 'react'

export const BasketIcon: React.FC<IconProps> = ({ size }) => (
  <svg xmlns='http://www.w3.org/2000/svg' width={size} height={size} viewBox='12 10 80 80'>
    <g>
      <path
        d='M32.28 82h35.44C73.94 82 79 76.94 79 70.72V37c0-1.1-.9-2-2-2H65v-3c0-8.27-6.73-15-15-15s-15 6.73-15 15v3H23c-1.1 0-2 .9-2 2v33.72C21 76.94 26.06 82 32.28 82zM39 32c0-6.07 4.93-11 11-11s11 4.93 11 11v3H39zm-14 7h10v5c0 1.1.9 2 2 2s2-.9 2-2v-5h22v5c0 1.1.9 2 2 2s2-.9 2-2v-5h10v31.72c0 4.01-3.27 7.28-7.28 7.28H32.28C28.27 78 25 74.73 25 70.72z'
        fill='current'
      />
    </g>
  </svg>
)
