type Props = {
  width?: number
  height?: number
  fill?: string
}
export const ArrowRight = ({ width = 24, height = 24, fill = '#000000' }: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10 7L15 12L10 17V7Z" fill={fill} />
    </svg>
  )
}
