import { AppBar, Dialog, IconButton, Toolbar, Typography } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import CloseIcon from '@mui/icons-material/Close'
import { Button } from '@components/Button'
import { Translate } from '@components/Translate'
import { palette } from '@/styles'

export const PreviewDialog = ({ croppedImage, onClose, onSave }) => {
  const classes = useStyles()

  return (
    <Dialog fullScreen open={!!croppedImage} onClose={onClose}>
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <IconButton color="inherit" onClick={onClose} aria-label="Close" size="large">
            <CloseIcon />
          </IconButton>
          <Typography variant="body1" color="inherit" className={classes.flex}>
            <Translate id="App.Cropper.Preview" defaultMessage="Preview cropped image" />
          </Typography>

          <Button onClick={onSave}>
            <Translate id="App.Cropper.Save" defaultMessage="Save" />
          </Button>
        </Toolbar>
      </AppBar>

      <div className={classes.imgContainer}>
        <img src={croppedImage} alt="Cropped" className={classes.img} />
      </div>
    </Dialog>
  )
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
    backgroundColor: palette.green,
  },

  toolBar: {
    minHeight: theme.spacing(6),
  },

  flex: {
    flex: 1,
  },

  imgContainer: {
    position: 'relative',
    flex: 1,
    padding: theme.spacing(),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  img: {
    maxWidth: '100%',
    maxHeight: '100%',
  },
}))
