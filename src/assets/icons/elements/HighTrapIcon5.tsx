import { IconPropTypes } from '@/assets/icons/IconPropTypes'

export const HighTrapIcon5 = ({ width = 36, height = 36, fill = '#666' }: IconPropTypes) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="20" cy="20" r="8" stroke={fill} strokeWidth="2" />
      <path d="M14 14L26 26M14 26L26 14" stroke={fill} strokeWidth="2" />
      <path
        d="M4.29688 12H5.50391V8.51172H9.49219V12H10.7031V4H9.49219V7.47656H5.50391V4H4.29688V12Z"
        fill={fill}
      />
    </svg>
  )
}
