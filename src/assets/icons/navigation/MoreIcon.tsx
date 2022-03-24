import { IconPropTypes } from '@/assets/icons/IconPropTypes'

export const MoreIcon = ({ width = 36, height = 36, fill = '#666' }: IconPropTypes) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="9" cy="18" r="2" fill={fill} />
      <circle cx="18" cy="18" r="2" fill={fill} />
      <circle cx="27" cy="18" r="2" fill={fill} />
    </svg>
  )
}
