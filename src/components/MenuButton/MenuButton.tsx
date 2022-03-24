import { MouseEvent } from 'react'
import cn from 'classnames'
import { palette } from '@/styles'
import { Theme } from '@mui/material/styles'
import { makeStyles } from '@mui/styles'

type Props = {
  onClick?: (evt: MouseEvent<any>) => void
  children: any
  disabled?: boolean
  active?: boolean
  disableMargin?: boolean
}

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    minWidth: 36,
    height: 36,
    padding: theme.spacing(0, 1),
    border: 0,
    borderRadius: 9,
    marginRight: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    color: (props: Props) => (props.active ? palette.white : palette.black),
    backgroundColor: (props: Props) =>
      props.disabled ? palette.paleGrey : props.active ? palette.green : palette.white,
    cursor: (props: Props) => (props.disabled ? 'not-allowed' : 'pointer'),
  },

  disableMargin: {
    marginRight: 0,
  },
}))

export const MenuButton = (props: Props) => {
  const { children, disabled = false, disableMargin = false, onClick } = props

  const classes = useStyles(props)

  return (
    <button
      onClick={disabled ? () => {} : onClick}
      className={cn(classes.button, {
        [classes.disableMargin]: disableMargin,
      })}
    >
      {children}
    </button>
  )
}
