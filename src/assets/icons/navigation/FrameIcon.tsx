type Props = {
  width?: number
  height?: number
  fill?: string
}
export const FrameIcon = ({ width = 14, height = 14, fill = '#000000' }: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 9H0V14H5V12H2V9ZM0 5H2V2H5V0H0V5ZM12 12H9V14H14V9H12V12ZM9 0V2H12V5H14V0H9Z"
        fill={fill}
      />
    </svg>
  )
}
