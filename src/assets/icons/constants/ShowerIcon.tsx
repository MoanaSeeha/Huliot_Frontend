import { IconPropTypes } from '@/assets/icons/IconPropTypes'

export const ShowerIcon = ({ width = 36, height = 36, fill = '#666' }: IconPropTypes) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.5 6a6.507 6.507 0 00-6.484 6.07A7.02 7.02 0 009.293 17h13.414a7.019 7.019 0 00-5.686-4.924A4.5 4.5 0 0126 12.5V30h2V12.5A6.507 6.507 0 0021.5 6z"
        fill={fill}
      />
      <path
        d="M8 18h16v2H8v-2zM16 29a1 1 0 100-2 1 1 0 000 2zM16 26a1 1 0 100-2 1 1 0 000 2zM20 29a1 1 0 100-2 1 1 0 000 2zM20 26a1 1 0 100-2 1 1 0 000 2zM12 29a1 1 0 100-2 1 1 0 000 2zM12 26a1 1 0 100-2 1 1 0 000 2zM16 23a1 1 0 100-2 1 1 0 000 2zM20 23a1 1 0 100-2 1 1 0 000 2zM12 23a1 1 0 100-2 1 1 0 000 2z"
        fill={fill}
      />
    </svg>
  )
}
