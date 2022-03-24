import { IconPropTypes } from '@/assets/icons/IconPropTypes'

export const MoveIcon = ({ width = 36, height = 36, fill = '#666' }: IconPropTypes) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill={fill}
        d="M73 48.4l-10.4-9.6v4.8H52.4V33.4h4.8L47.6 23l-8.9 10.4h4.8v10.2H33.4v-4.8L23 48.4l10.4 8.9v-4.8h10.2v10.2h-4.8L47.6 73l9.6-10.4h-4.8V52.4h10.2v4.8L73 48.4z"
      />
    </svg>
  )
}
