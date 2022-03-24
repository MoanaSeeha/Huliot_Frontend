import { IconPropTypes } from '@/assets/icons/IconPropTypes'

export const BathIcon = ({ width = 36, height = 36, fill = '#666' }: IconPropTypes) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="5" y="9" width="26" height="18" rx="3" stroke={fill} strokeWidth="2" />
      <path
        d="M8 14C8 13.4477 8.44772 13 9 13H24C26.2091 13 28 14.7909 28 17V19C28 21.2091 26.2091 23 24 23H9C8.44772 23 8 22.5523 8 22V14Z"
        stroke={fill}
        strokeWidth="2"
      />
      <circle cx="13" cy="18" r="2" fill={fill} />
      <rect x="5" y="19" width="2" height="5" transform="rotate(-90 5 19)" fill={fill} />
    </svg>
  )
}
