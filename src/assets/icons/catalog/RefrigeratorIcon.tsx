import { IconPropTypes } from '@/assets/icons/IconPropTypes'

export const RefrigeratorIcon = ({ width = 36, height = 36, fill = '#666' }: IconPropTypes) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="6" y="8" width="24" height="14" rx="3" stroke={fill} strokeWidth="2" />
      <rect x="7" y="23" width="22" height="4" rx="2" stroke={fill} strokeWidth="2" />
      <rect x="23" y="28" width="5" height="2" fill={fill} />
    </svg>
  )
}
