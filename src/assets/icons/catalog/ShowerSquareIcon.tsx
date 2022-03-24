import { IconPropTypes } from '@/assets/icons/IconPropTypes'

export const ShowerSquareIcon = ({ width = 36, height = 36, fill = '#666' }: IconPropTypes) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="7" y="7" width="22" height="22" rx="3" stroke={fill} strokeWidth="2" />
      <circle cx="11.5" cy="24.5" r="2.5" fill={fill} />
      <path d="M12 19L12 11" stroke={fill} strokeWidth="2" strokeLinecap="round" />
      <path
        d="M15.1765 20.5208L21.1765 14.5208"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M17 24H25" stroke={fill} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
