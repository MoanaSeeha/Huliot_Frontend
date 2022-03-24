import { KeyboardEvent, MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SvgIcon,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Theme } from '@mui/material/styles'
import { AddIcon, DownloadIcon } from '@/assets/icons'
import { ReactComponent as DoorOpenSvg } from '@/assets/svg/door-open.svg'
import { ReactComponent as InfoSvg } from '@/assets/svg/info.svg'
import { ReactComponent as PicturesSvg } from '@/assets/svg/pictures.svg'
import { ReactComponent as QuestionMarkSvg } from '@/assets/svg/questionmark-cloud.svg'
import { ReactComponent as ScreenSvg } from '@/assets/svg/screen.svg'
import { ReactComponent as UserSvg } from '@/assets/svg/user.svg'
import { useAppSelector, useDownloadPdf } from '@/hooks'
import { selectLayoutModel } from '@/store/reducers'
import { Translate } from '@components/Translate'
import { palette } from '@/styles'

const useStyles = makeStyles((theme: Theme) => ({
  list: {
    width: 250,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },

  fullList: {
    width: 'auto',
  },

  listItem: {
    width: '100%',
    padding: theme.spacing(0.75, 2),
    borderBottom: '2px solid rgba(201, 201, 201, 0.16)',

    '&:last-child': {
      borderBottom: 'none',
    },
  },

  hamburgerIcon: {
    '& svg path': {
      fill: palette.green,
    },
  },

  linkButton: {
    textDecoration: 'none',
  },

  iconButton: {
    width: '100%',
    height: 32,
    padding: 0,
    fontSize: 14,
    fontWeight: 500,
    borderRadius: 9,
    color: palette.black,

    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    background: palette.paleGreen,

    '&:disabled': {
      fill: palette.paleGrey,
      background: 'inherit',
      border: `1px solid ${palette.paleGrey}`,
    },
  },
}))

type Props = {
  isMenuOpened: boolean
  handleToggleDrawer: (evt: MouseEvent<any> | KeyboardEvent<any>) => void
}

export const NavbarMenu = ({ isMenuOpened, handleToggleDrawer }: Props) => {
  const classes = useStyles()
  const layoutModel = useAppSelector(selectLayoutModel)
  const savePdf = useDownloadPdf()

  return (
    <div>
      <Drawer anchor="right" open={isMenuOpened} onClose={handleToggleDrawer}>
        <div
          className={classes.list}
          role="presentation"
          onClick={handleToggleDrawer}
          onKeyDown={handleToggleDrawer}
        >
          <List>
            <ListItem>
              <Box display="flex" justifyContent="space-between" flexGrow={1}>
                <Box height="32" px={0.25} flexBasis="50%">
                  <IconButton
                    className={classes.iconButton}
                    onClick={() => savePdf(layoutModel)}
                    size="large"
                  >
                    <Box mr={1} height="100%" display="flex" alignItems="center">
                      <DownloadIcon height={15} width={15} />
                    </Box>
                    <Translate id="App.NavigationMenu.Save" defaultMessage="Save" />
                  </IconButton>
                </Box>

                <Box height="32" px={0.25} flexBasis="50%">
                  <Link to="/welcome" className={classes.linkButton}>
                    <IconButton className={classes.iconButton} size="large">
                      <Box mr={1} height="100%" display="flex" alignItems="center">
                        <AddIcon height={14} width={14} />
                      </Box>
                      <Translate id="App.NavigationMenu.New" defaultMessage="New" />
                    </IconButton>
                  </Link>
                </Box>
              </Box>
            </ListItem>

            <ListItem button className={classes.listItem} component={Link} to="/editor">
              <ListItemIcon>
                <SvgIcon>
                  <ScreenSvg />
                </SvgIcon>
              </ListItemIcon>

              <ListItemText
                primary={
                  <Translate
                    id="NavbarMenu.ListItem.DrawingScreen"
                    defaultMessage="Drawing Screen"
                  />
                }
              />
            </ListItem>

            <ListItem button className={classes.listItem} disabled>
              <ListItemIcon>
                <SvgIcon>
                  <PicturesSvg />
                </SvgIcon>
              </ListItemIcon>

              <ListItemText
                primary={
                  <Translate id="NavbarMenu.ListItem.MyDrawings" defaultMessage="My Drawings" />
                }
              />
            </ListItem>

            <ListItem button className={classes.listItem} disabled>
              <ListItemIcon>
                <SvgIcon>
                  <UserSvg />
                </SvgIcon>
              </ListItemIcon>

              <ListItemText
                primary={
                  <Translate id="NavbarMenu.ListItem.MyProfile" defaultMessage="My Profile" />
                }
              />
            </ListItem>

            <ListItem button className={classes.listItem} disabled>
              <ListItemIcon>
                <SvgIcon>
                  <QuestionMarkSvg />
                </SvgIcon>
              </ListItemIcon>

              <ListItemText
                primary={
                  <Translate id="NavbarMenu.ListItem.ContactUs" defaultMessage="Contact Us" />
                }
              />
            </ListItem>

            <ListItem button className={classes.listItem} component={Link} to="/about-us">
              <ListItemIcon>
                <SvgIcon>
                  <InfoSvg />
                </SvgIcon>
              </ListItemIcon>

              <ListItemText
                primary={<Translate id="NavbarMenu.ListItem.AboutUs" defaultMessage="About Us" />}
              />
            </ListItem>

            <ListItem button className={classes.listItem}>
              <ListItemIcon>
                <SvgIcon>
                  <DoorOpenSvg />
                </SvgIcon>
              </ListItemIcon>

              <ListItemText
                primary={<Translate id="NavbarMenu.ListItem.AboutUs" defaultMessage="Log out" />}
              />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </div>
  )
}
