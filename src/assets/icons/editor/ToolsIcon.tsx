type Props = {
  width: number
  height: number
  fill: string
}
export const ToolsIcon = ({ width = 24, height = 24, fill = '#666' }: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.191 21.535a1 1 0 010-1.414l1.414-1.414a1 1 0 011.414 0l6.59 6.59a2 2 0 11-2.828 2.829l-6.59-6.59z"
        fill={fill}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.98 20.75l-2.037-2.038-6.585 6.585a2 2 0 002.829 2.829l5.797-5.798-.084-.084a1 1 0 010-1.414l.08-.08zM22.056 16.968l1.174-1.174a2 2 0 00-2.828-2.829l-2.465 2.465 1.977 1.977a2 2 0 012.142-.439z"
        fill={fill}
      />
      <path fill="#666" d="M11.207 13.138l1.414-1.414 7.115 7.115-1.414 1.414z" />
      <path
        d="M7.92 10.7a1 1 0 01.066-1.341l.856-.857a1 1 0 011.343-.065l2.328 1.915a1 1 0 01.072 1.48l-1.27 1.269a1 1 0 01-1.48-.072l-1.914-2.328z"
        fill={fill}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M26.271 7.329a5 5 0 102.982 3.167l-2.055 1.998a2.07 2.07 0 01-2.869 0l-.251-.245a1.933 1.933 0 010-2.788L26.27 7.33z"
        fill={fill}
      />
    </svg>
  )
}
