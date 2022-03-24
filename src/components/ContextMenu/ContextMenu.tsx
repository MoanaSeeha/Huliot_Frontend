import { ReactNode } from 'react'
import { AppBar, Box } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'

import { palette, TOP_PANEL_HEIGHT } from '@/styles'

const useStyles = makeStyles(() => ({
  appBar: {
    height: TOP_PANEL_HEIGHT,
    zIndex: 1,

    color: palette.black,
    backgroundColor: palette.white,
  },
}))

type Props = {
  children?: ReactNode
}

export const ContextMenu = ({ children }: Props) => {
  const classes = useStyles()

  return children ? (
    <AppBar position="static" color="primary" component="header" className={classes.appBar}>
      <Box
        position="relative"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexGrow={1}
      >
        {children}
      </Box>
    </AppBar>
  ) : null
}
