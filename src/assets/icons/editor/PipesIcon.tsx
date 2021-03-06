type Props = {
  width: number
  height: number
  fill: string
}
export const PipesIcon = ({ width = 24, height = 24, fill = '#666' }: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.438 6H7.405C6.63 6 6 6.631 6 7.406c0 .775.63 1.407 1.406 1.407h7.032a1.408 1.408 0 000-2.813zM28.594 27.188h-7.032c-.775 0-1.406.63-1.406 1.406 0 .775.63 1.406 1.407 1.406h7.03C29.37 30 30 29.369 30 28.594c0-.776-.63-1.407-1.406-1.407zM18 13.031c-.776 0-1.406.631-1.406 1.406v7.032c0 .775.63 1.406 1.406 1.406.776 0 1.406-.631 1.406-1.406v-7.032c0-.775-.63-1.406-1.406-1.406zM14.438 13.734V10.22H7.405v3.515c0 3.503 2.426 6.495 5.63 7.425.014 0 .042.014.056.014.661.183 1.364.296 2.095.296v-7.032c-.393 0-.75-.309-.75-.703zM22.964 14.747c-.014 0-.042-.014-.056-.014a7.85 7.85 0 00-2.096-.296v7.032c.394 0 .75.31.75.703v3.61h7.032v-3.61c0-3.742-2.65-6.56-5.63-7.425z"
        fill={fill}
      />
    </svg>
  )
}
