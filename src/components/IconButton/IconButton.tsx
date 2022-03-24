import { cloneElement, isValidElement, MouseEvent, ReactNode } from 'react'
import cn from 'classnames'
import { palette } from '@/styles'
import { makeStyles } from '@mui/styles'

type Props = {
  onClick?: (evt: MouseEvent<any>) => void
  disabled?: boolean
  active?: boolean
  disableMargin?: boolean
  children: ReactNode
  size?: string
}

const useStyles = makeStyles(() => ({
  button: {
    minWidth: 36,
    height: 36,
    padding: 0,
    border: 0,
    borderRadius: 9,
    marginRight: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: (props: Props) =>
      props.disabled ? palette.paleGrey : props.active ? palette.green : palette.white,
    cursor: (props: Props) => (props.disabled ? 'not-allowed' : 'pointer'),
  },

  disableMargin: {
    marginRight: 0,
  },
}))

export const IconButton = (props: Props) => {
  const { disabled = false, active, disableMargin = false, onClick, children } = props

  const classes = useStyles(props)

  const fill = disabled ? palette.disabledGrey : active ? palette.white : palette.grey
  return (
    <button
      onClick={disabled ? () => {} : onClick}
      className={cn(classes.button, {
        [classes.disableMargin]: disableMargin,
      })}
    >
      {isValidElement(children) ? cloneElement(children, { fill }) : children}
    </button>
  )
}
