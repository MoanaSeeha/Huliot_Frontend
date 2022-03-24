import { Button } from '@components/Button'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import Rotate90Cw from '@mui/icons-material/Rotate90DegreesCw'
import Rotate90Ccw from '@mui/icons-material/Rotate90DegreesCcw'
import { Slider, Typography, Button as MuiButton } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { darken, Theme } from '@mui/material/styles'
import { palette } from '@/styles'
import { Translate } from '@components/Translate'

type Props = {
  zoom: number
  setZoom: (zoom: number) => void
  rotationCrude: number
  setRotationCrude: (rotation: number) => void
  rotationPrecise: number
  setRotationPrecise: (rotation: number) => void
  onOkClick: () => void
  onCancelClick: () => void
  imageAspect: number
  setImageAspect: (aspect: number) => void
  resetToDefaults: () => void
}
export const CropperControls = ({
  zoom,
  setZoom,
  rotationCrude,
  rotationPrecise,
  setRotationCrude,
  setRotationPrecise,
  onOkClick,
  onCancelClick,
  imageAspect,
  setImageAspect,
  resetToDefaults,
}: Props) => {
  const classes = useStyles()

  return (
    <div className={classes.controls}>
      <div className={classes.controlsButtons}>
        <Button className={classes.applyButton} onClick={onOkClick}>
          <CheckIcon />
        </Button>

        <Button className={classes.discardButton} onClick={onCancelClick}>
          <CloseIcon />
        </Button>
      </div>

      <div className={classes.sliders}>
        <div className={classes.sliderContainer}>
          <Typography variant="overline" classes={{ root: classes.sliderLabel }}>
            <Translate id="App.Cropper.Zoom" defaultMessage="Zoom" />
          </Typography>
          <Slider
            value={zoom}
            min={1}
            max={4}
            step={0.1}
            aria-labelledby="Zoom"
            classes={{ root: classes.slider }}
            onChange={(e, zoom) => setZoom(zoom as number)}
          />
        </div>

        <div className={classes.sliderContainer}>
          <Typography variant="overline" classes={{ root: classes.sliderLabel }}>
            <Translate id="App.Cropper.ImageAspect" defaultMessage="Aspect Ratio" />
          </Typography>
          <Slider
            value={imageAspect}
            min={0.2}
            max={5}
            step={0.025}
            aria-labelledby="Aspect Ratio"
            classes={{ root: classes.slider }}
            onChange={(e, aspect) => setImageAspect(aspect as number)}
          />
        </div>

        <div className={classes.sliderContainer}>
          <Typography variant="overline" classes={{ root: classes.sliderLabel }}>
            <Translate id="App.Cropper.Rotate" defaultMessage="Rotate" />
          </Typography>
          <Slider
            value={rotationPrecise}
            min={-45}
            max={45}
            step={0.25}
            aria-labelledby="Rotation"
            classes={{ root: classes.slider }}
            onChange={(e, rotation) => setRotationPrecise(rotation as number)}
          />
        </div>

        <div className={classes.sliderContainer} style={{ flexDirection: 'row' }}>
          <MuiButton
            className={classes.rotateButton}
            onClick={() => {
              setRotationCrude(rotationCrude + 90)
            }}
          >
            <Rotate90Cw />
          </MuiButton>
          <MuiButton
            className={classes.rotateButton}
            onClick={() => {
              setRotationPrecise(0)
            }}
          >
            0
          </MuiButton>
          <MuiButton
            className={classes.rotateButton}
            onClick={() => {
              setRotationCrude(rotationCrude - 90)
            }}
          >
            <Rotate90Ccw />
          </MuiButton>
        </div>
      </div>

      <div className={classes.controlsButtons}>
        <Button className={classes.applyButton} onClick={resetToDefaults}>
          <Translate id="App.Cropper.Reset" defaultMessage="Reset" />
        </Button>
      </div>
    </div>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  controls: {
    padding: theme.spacing(1, 2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',

    minWidth: 150,
  },

  controlsButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: 0,

    '& > button': {
      minWidth: 'auto',
    },
  },

  rotateButton: {
    minWidth: 36,
  },

  applyButton: {
    backgroundColor: palette.green,
  },

  discardButton: {
    backgroundColor: palette.red,

    '&:hover': {
      backgroundColor: darken(palette.red, 0.2),
    },
  },

  sliders: {
    margin: '10px 0',
  },

  sliderContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  sliderLabel: {
    [theme.breakpoints.down('sm')]: {
      minWidth: 65,
    },
  },

  slider: {
    color: palette.green,
    padding: theme.spacing(1, 0),
    marginLeft: theme.spacing(2),

    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      alignItems: 'center',
      margin: theme.spacing(0, 1),
    },
  },
}))
