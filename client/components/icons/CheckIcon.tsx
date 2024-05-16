import React from 'react'

export const CheckIcon: React.FC<IconProps> = ({ size, color }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={size}
    height={size}
    x='0'
    y='0'
    viewBox='0 0 21 21'
    fillRule='evenodd'
  >
    <g transform='matrix(1.140000000000001,0,0,1.140000000000001,-1.4705599761009314,-1.4707699942588892)'>
      <path
        fill={color || '#00ba00'}
        d='M10.504 1.318a9.189 9.189 0 0 1 0 18.375 9.189 9.189 0 0 1 0-18.375zM8.596 13.49l-2.25-2.252a.986.986 0 0 1 0-1.392.988.988 0 0 1 1.393 0l1.585 1.587 3.945-3.945a.986.986 0 0 1 1.392 0 .987.987 0 0 1 0 1.392l-4.642 4.642a.987.987 0 0 1-1.423-.032z'
      />
    </g>
  </svg>
)
