import { FunctionComponent, MouseEvent } from 'react'
import cn from 'classnames'
import makeStyles from '@mui/styles/makeStyles'
import { palette } from '@/styles'

type Props = {
  onClick?: (evt: MouseEvent<any>) => void
  icon: FunctionComponent<any>
  disabled?: boolean
  active?: boolean
  disableMargin?: boolean
  shadows?: boolean
}

const useStyles = makeStyles(() => ({
  buttonSecondary: {
    height: '36px',
    width: '36px',
    border: 0,
    borderRadius: 9,
    marginRight: 12,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: (props: Props) => (props.disabled ? palette.paleGrey : palette.paleGreen),
    cursor: (props: Props) => (props.disabled ? 'not-allowed' : 'pointer'),
  },

  disableMargin: {
    marginRight: 0,
  },

  boxShadows: {
    boxShadow: '0px 4px 9px 3px rgba(12, 18, 34, 0.2)',
  },
}))

export const IconButtonSecondary = (props: Props) => {
  const { icon, disabled, disableMargin, onClick, shadows = false } = props

  const classes = useStyles(props)
  const IconComponent = icon

  const fillColor = disabled ? palette.disabledGrey : palette.black

  return (
    <button
      onClick={disabled ? () => {} : onClick}
      className={cn(classes.buttonSecondary, {
        [classes.disableMargin]: disableMargin,
        [classes.boxShadows]: shadows,
      })}
    >
      <IconComponent fill={fillColor} />
    </button>
  )
}
