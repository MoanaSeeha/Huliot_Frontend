import { palette } from '@/styles'

type Props = {
  width?: number
  height?: number
  fill?: string
  disabled?: boolean
}
export const DownloadIcon = ({
  width = 18,
  height = 18,
  fill = '#000000',
  disabled = false,
}: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 18 18"
      fill={disabled ? palette.paleGrey : fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M16 10V15C16 15.55 15.55 16 15 16H3C2.45 16 2 15.55 2 15V10C2 9.45 1.55 9 1 9C0.45 9 0 9.45 0 10V16C0 17.1 0.9 18 2 18H16C17.1 18 18 17.1 18 16V10C18 9.45 17.55 9 17 9C16.45 9 16 9.45 16 10ZM10 9.67L11.88 7.79C12.27 7.4 12.9 7.4 13.29 7.79C13.68 8.18 13.68 8.81 13.29 9.2L9.7 12.79C9.31 13.18 8.68 13.18 8.29 12.79L4.7 9.2C4.31 8.81 4.31 8.18 4.7 7.79C5.09 7.4 5.72 7.4 6.11 7.79L8 9.67V1C8 0.45 8.45 0 9 0C9.55 0 10 0.45 10 1V9.67Z" />
    </svg>
  )
}
