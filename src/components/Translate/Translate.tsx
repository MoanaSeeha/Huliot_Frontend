interface Props {
  id: string
  defaultMessage: string
}

export const Translate = ({ id, defaultMessage }: Props) => {
  return <>{defaultMessage}</>
}
