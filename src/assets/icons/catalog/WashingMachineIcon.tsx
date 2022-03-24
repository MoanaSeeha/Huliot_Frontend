import { IconPropTypes } from '@/assets/icons/IconPropTypes'

export const WashingMachineIcon = ({ width = 36, height = 36, fill = '#666' }: IconPropTypes) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="7" y="7" width="22" height="22" rx="3" stroke={fill} strokeWidth="2" />
      <path d="M8.5 28L27.5 8M8.5 8L27.5 28" stroke={fill} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
