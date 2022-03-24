import { IconPropTypes } from '@/assets/icons/IconPropTypes'

export const GardenTapIcon = ({ width = 36, height = 36, fill = '#666' }: IconPropTypes) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="7.5072" y="16.5499" width="20.9854" height="2.90018" fill={fill} />
      <rect
        x="16.5507"
        y="28.4926"
        width="20.9854"
        height="2.8986"
        transform="rotate(-90 16.5507 28.4926)"
        fill={fill}
      />
    </svg>
  )
}
