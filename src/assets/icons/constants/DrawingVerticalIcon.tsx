import { IconPropTypes } from '@/assets/icons/IconPropTypes'

export const DrawingVerticalIcon = ({ width = 36, height = 36, fill = '#666' }: IconPropTypes) => {
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
        d="M20 12.8C20 12.3582 19.6418 12 19.2 12H17C16.4477 12 16 12.4477 16 13V20L20 12.8Z"
        fill={fill}
      />
      <path
        d="M21.8258 13H14.1742C13.3199 13 12.859 11.9979 13.415 11.3492L17.2407 6.8858C17.6398 6.42019 18.3602 6.42019 18.7593 6.8858L22.585 11.3492C23.141 11.9979 22.6801 13 21.8258 13Z"
        fill={fill}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 23.1C16 23.5971 16.4029 24 16.9 24L19 24C19.5523 24 20 23.5523 20 23L20 15L16 23.1Z"
        fill={fill}
      />
      <path
        d="M14.1742 23L21.8258 23C22.6801 23 23.141 24.0021 22.585 24.6508L18.7593 29.1142C18.3602 29.5798 17.6398 29.5798 17.2407 29.1142L13.415 24.6508C12.859 24.0021 13.3199 23 14.1742 23Z"
        fill={fill}
      />
    </svg>
  )
}
