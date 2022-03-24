type Props = {
  width: number
  height: number
  fill: string
}
export const KitsIcon = ({ width = 24, height = 24, fill = '#666' }: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M14.5 9v0a1 1 0 011-1h5a1 1 0 011 1v0" stroke={fill} strokeWidth={2} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 12a1 1 0 011-1h22a1 1 0 011 1v4.28l-9 3V18a1 1 0 00-1-1h-4a1 1 0 00-1 1v1.28l-9-3V12zm0 6.387V27a1 1 0 001 1h22a1 1 0 001-1v-8.613l-9 3V22a1 1 0 01-1 1h-4a1 1 0 01-1-1v-.613l-9-3zM17 19v2h2v-2h-2z"
        fill={fill}
      />
    </svg>
  )
}
