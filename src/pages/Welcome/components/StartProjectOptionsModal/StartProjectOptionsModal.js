import { useTakePhoto, useUploadImage, useUploadPdf, useStartEmpty } from '@/hooks'
import { List, ListItem, ListItemText, Modal } from '@mui/material'

import makeStyles from '@mui/styles/makeStyles'

import { palette } from '@/styles'
import { stopPropagation } from '@/utils/stopPropagation'
import { Translate } from '@components/Translate'

const useStyles = makeStyles(() => ({
  modalContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    width: '100vw',
    height: '100vh',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    '@media only screen and (orientation:portrait)': {
      width: '100vh',
      height: '100vw',
    },
  },

  list: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: '0 0 240px',
    backgroundColor: palette.white,
    borderRadius: '12px',
  },

  disabled: {
    cursor: 'not-allowed',
  },

  fullList: {
    width: 'auto',
  },

  link: {
    color: palette.black,
  },

  takePhoto: {
    '& input': {
      display: 'none',
    },
  },
}))

export const StartProjectOptionsModal = ({ isModalOpen, handleClose }) => {
  const classes = useStyles()
  const handleUploadImage = useUploadImage()
  const handleUploadPdf = useUploadPdf()
  const [takePhotoRef, handleTakePhoto, handlePhotoWasTaken] = useTakePhoto()
  const handleStartEmpty = useStartEmpty()

  return (
    <Modal
      open={isModalOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className={classes.modalContainer} onClick={stopPropagation(handleClose)}>
        <List className={classes.list}>
          <ListItem button onClick={stopPropagation(() => handleUploadPdf())}>
            <ListItemText
              primary={
                <Translate
                  id="StartProjectOptions.UploadPdfFile"
                  defaultMessage="Upload PDF file"
                />
              }
            />
          </ListItem>

          <ListItem
            className={classes.link}
            button
            onClick={stopPropagation(() => handleUploadImage())}
          >
            <ListItemText
              primary={
                <Translate id="StartProjectOptions.UploadImage" defaultMessage="Upload an image" />
              }
            />
          </ListItem>

          <ListItem
            className={classes.takePhoto}
            button
            onClick={stopPropagation(() => handleTakePhoto())}
          >
            <>
              <input
                type="file"
                accept="image/*"
                capture="camera"
                ref={takePhotoRef}
                onChange={handlePhotoWasTaken}
              />
              <ListItemText
                primary={
                  <Translate id="StartProjectOptions.TakePhoto" defaultMessage="Take a photo" />
                }
              />
            </>
          </ListItem>

          <ListItem button disabled>
            <ListItemText
              primary={
                <Translate
                  id="StartProjectOptions.OpenExisting"
                  defaultMessage="Open existing drawing"
                />
              }
            />
          </ListItem>

          <ListItem button onClick={stopPropagation(() => handleStartEmpty())}>
            <ListItemText
              primary={
                <Translate
                  id="StartProjectOptions.DrawWithoutBg"
                  defaultMessage="Draw without background"
                />
              }
            />
          </ListItem>
        </List>
      </div>
    </Modal>
  )
}
