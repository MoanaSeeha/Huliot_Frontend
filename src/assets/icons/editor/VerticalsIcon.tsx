type Props = {
  width: number
  height: number
  fill: string
}
export const VerticalsIcon = ({ width = 24, height = 24, fill = '#666' }: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20 12.8a.8.8 0 00-.8-.8H17a1 1 0 00-1 1v7l4-7.2z"
        fill={fill}
      />
      <path
        d="M21.826 13h-7.652a1 1 0 01-.759-1.65l3.826-4.464a1 1 0 011.518 0l3.826 4.463a1 1 0 01-.76 1.651z"
        fill={fill}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 23.1a.9.9 0 00.9.9H19a1 1 0 001-1v-8l-4 8.1z"
        fill={fill}
      />
      <path
        d="M14.174 23h7.652a1 1 0 01.759 1.65l-3.826 4.464a1 1 0 01-1.518 0l-3.826-4.463a1 1 0 01.76-1.651z"
        fill={fill}
      />
    </svg>
  )
}
