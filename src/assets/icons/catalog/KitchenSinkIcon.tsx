import { IconPropTypes } from '@/assets/icons/IconPropTypes'

export const KitchenSinkIcon = ({ width = 36, height = 36, fill = '#666' }: IconPropTypes) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="5" y="9" width="26" height="18" rx="3" stroke={fill} strokeWidth="2" />
      <path d="M9 13L27 13V23H9L9 13Z" stroke={fill} strokeWidth="2" />
      <circle cx="18" cy="19" r="2" fill={fill} />
      <rect x="17" y="9" width="2" height="7" fill={fill} />
    </svg>
  )
}
