import { IconPropTypes } from '@/assets/icons/IconPropTypes'

export const TrapIconOutlined = ({ width = 36, height = 36, fill = '#666' }: IconPropTypes) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="18" cy="18" r="10" stroke={fill} strokeWidth="2" />
      <path d="M10 11L25 25M10 25L25 11" stroke={fill} strokeWidth="2" />
    </svg>
  )
}
