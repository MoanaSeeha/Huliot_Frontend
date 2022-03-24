import { IconPropTypes } from '@/assets/icons/IconPropTypes'

export const KitsIcon = ({ width = 36, height = 36, fill = '#666' }: IconPropTypes) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.5 9V9C14.5 8.44772 14.9477 8 15.5 8H20.5C21.0523 8 21.5 8.44772 21.5 9V9"
        strokeWidth="2"
        stroke={fill}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 12C6 11.4477 6.44772 11 7 11H29C29.5523 11 30 11.4477 30 12V16.2792L21 19.2792V18C21 17.4477 20.5523 17 20 17H16C15.4477 17 15 17.4477 15 18V19.2792L6 16.2792V12ZM6 18.3874V27C6 27.5523 6.44772 28 7 28H29C29.5523 28 30 27.5523 30 27V18.3874L21 21.3874V22C21 22.5523 20.5523 23 20 23H16C15.4477 23 15 22.5523 15 22V21.3874L6 18.3874ZM17 19V21H19V19H17Z"
        fill={fill}
      />
    </svg>
  )
}
