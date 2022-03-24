import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Box, IconButton, Toolbar } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import { MenuIcon } from '@/assets/icons/navigation'
import logo from '@/assets/img/logo.png'
import { palette } from '@/styles'
import { NavbarMenu } from '../NavbarMenu'

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: 'flex',
  },

  appbar: {
    color: palette.black,
    backgroundColor: palette.white,
  },

  logoWrapper: {
    position: 'absolute',
    left: 'calc(50% - 15px)',

    height: 30,
    width: 70,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo: {
    width: '100%',
    height: '100%',
  },

  iconButton: {
    width: 36,
    height: 36,
    padding: 0,
    margin: theme.spacing(0, 0.5),
    borderRadius: 9,

    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
}))

export const Navbar = () => {
  const classes = useStyles()
  const [isMenuOpened, setIsMenuOpened] = useState(false)

  const toggleDrawer = () => {
    setIsMenuOpened(!isMenuOpened)
  }

  return (
    <>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar variant="dense" className={classes.toolbar}>
          <Box className={classes.logoWrapper} component={Link} to="/welcome">
            <img className={classes.logo} src={logo} alt="Huliot" />
          </Box>

          <Box display="flex" ml="auto">
            <IconButton
              color="inherit"
              aria-label="menu"
              className={classes.iconButton}
              onClick={toggleDrawer}
              size="large"
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <NavbarMenu isMenuOpened={isMenuOpened} handleToggleDrawer={toggleDrawer} />
    </>
  )
}
