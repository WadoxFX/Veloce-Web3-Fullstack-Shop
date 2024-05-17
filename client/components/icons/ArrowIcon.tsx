import React from 'react'

export const ArrowIcon: React.FC<IconProps> = ({ size }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 20 20"
  >
    <g>
      <path
        d="m12 2-1.4 1.4L16.2 9H0v2h16.2l-5.6 5.6L12 18l8-8z"
        fill="current"
      />
    </g>
  </svg>
)

