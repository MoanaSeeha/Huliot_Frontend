import { Button as DefaultButton } from '@mui/material'
import withStyles from '@mui/styles/withStyles'
import { darken } from '@mui/material/styles'
import { palette } from '@/styles'

export const Button = withStyles(() => ({
  root: {
    color: palette.white,
    backgroundColor: palette.green,

    '&:hover': {
      backgroundColor: darken(palette.green, 0.4),
    },
  },
}))(DefaultButton)
