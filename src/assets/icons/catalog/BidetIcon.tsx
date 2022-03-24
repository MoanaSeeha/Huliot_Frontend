import { IconPropTypes } from '@/assets/icons/IconPropTypes'

export const BidetIcon = ({ width = 36, height = 36, fill = '#666' }: IconPropTypes) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 16C9 11.0294 13.0294 7 18 7C22.9706 7 27 11.0294 27 16V29H9L9 16Z"
        stroke={fill}
        strokeWidth="2"
      />
      <path
        d="M14 16C14 13.7909 15.7909 12 18 12C20.2091 12 22 13.7909 22 16V22H14L14 16Z"
        stroke={fill}
        strokeWidth="2"
      />
      <circle cx="13.5" cy="25.5" r="1.5" fill={fill} />
      <circle cx="22.5" cy="25.5" r="1.5" fill={fill} />
    </svg>
  )
}
