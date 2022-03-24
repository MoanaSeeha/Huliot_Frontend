import { IconPropTypes } from '@/assets/icons/IconPropTypes'

export const ToiletIcon = ({ width = 36, height = 36, fill = '#666' }: IconPropTypes) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="5" y="22" width="26" height="8" rx="2" stroke={fill} strokeWidth="2" />
      <path
        d="M9 15C9 10.0294 13.0294 6 18 6C22.9706 6 27 10.0294 27 15V21H9L9 15Z"
        stroke={fill}
        strokeWidth="2"
      />
      <path
        d="M14 14C14 11.7909 15.7909 10 18 10C20.2091 10 22 11.7909 22 14V17H14V14Z"
        stroke={fill}
        strokeWidth="2"
      />
    </svg>
  )
}
