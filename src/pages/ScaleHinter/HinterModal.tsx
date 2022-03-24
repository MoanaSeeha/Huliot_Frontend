import React, {
  FC,
  MouseEventHandler,
  MouseEvent,
  ChangeEvent,
  useState,
  useEffect,
  ReactNode,
} from 'react'
import {
  Modal,
  Box,
  Select,
  MenuItem,
  Typography,
  TextField,
  FormControl,
  SelectChangeEvent,
} from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import { palette } from '@/styles'
import { getSizeInM, MINIMAL_DIMENSION, MAXIMAL_DIMENSION } from '@/utils'
import { Button } from '@components/Button'

type Props = {
  isModalOpen: boolean
  handleClose: MouseEventHandler<HTMLDivElement>
  handleContinue: (hintK: number) => void
  lengthPx: number
  imgDimensions: { width: number; height: number }
}
// Hinting length is measured in either meters or centimeters
type Unit = 'm' | 'cm'
// the value is not a number, either too big or to small. '' means no error
type HintError = 'nan' | 'too_big' | 'too_small' | ''

export const HinterModal: FC<Props> = ({
  isModalOpen,
  handleClose,
  handleContinue,
  lengthPx,
  imgDimensions,
}) => {
  const classes = useStyles()

  const measuredLength = getSizeInM(lengthPx)
  const measuredWidth = getSizeInM(imgDimensions.width)
  const measuredHeight = getSizeInM(imgDimensions.height)

  const [unit, setUnit] = useState<Unit>('m')
  const [hintLength, setNewHintLength] = useState<number>(0)
  const [hintError, setHintError] = useState<HintError>('')

  useEffect(() => {
    setNewHintLength(measuredLength) // Initial measured hint length
  }, [measuredLength])

  // The main value we need - hinting coefficient allowing us to match the size of the image or photo
  // with real-life (and given) scale. Number.EPSILON prevents division by zero error.
  const hintK = ((unit === 'm' ? 1 : 0.01) * hintLength) / (measuredLength || Number.EPSILON)

  const hintWidth = getSizeInM(imgDimensions.width * hintK)
  const hintHeight = getSizeInM(imgDimensions.height * hintK)

  useEffect(() => {
    if (!isModalOpen) return // Disable checking while the modal is closed
    if (Math.min(hintWidth, hintHeight) < MINIMAL_DIMENSION) {
      setHintError('too_small')
    } else if (Math.max(hintWidth, hintHeight) > MAXIMAL_DIMENSION) {
      setHintError('too_big')
    }
  }, [hintWidth, hintHeight, isModalOpen])

  const stopPropagation = (event: MouseEvent<HTMLElement>) => event.stopPropagation()

  const onHintChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value)
    if (Number.isNaN(newValue)) {
      setHintError('nan')
    } else {
      setHintError('')
      setNewHintLength(newValue)
    }
  }

  const onUnitChange = (event: SelectChangeEvent) => {
    setUnit(event.target.value as Unit)
  }

  const select = (
    <FormControl variant="standard" style={{ flexDirection: 'row' }}>
      <TextField
        error={!!hintError}
        id="standard-basic"
        defaultValue={hintLength}
        variant="standard"
        onChange={onHintChange}
        label={getErrorLabel(hintError)}
      />{' '}
      <Select value={unit} label="Unit" onChange={onUnitChange}>
        <MenuItem value={'m'}>m</MenuItem>
        <MenuItem value={'cm'}>cm</MenuItem>
      </Select>
    </FormControl>
  )

  const buttons = (
    <Box bottom="20px" position="absolute">
      <Button
        style={{ minWidth: 100, marginRight: 60 }}
        disabled={!!hintError}
        onClick={() => handleContinue(hintK)}
      >
        Continue
      </Button>
      {/* @ts-ignore */}
      <Button style={{ minWidth: 100, backgroundColor: palette.red }} onClick={handleClose}>
        Cancel
      </Button>
    </Box>
  )

  return (
    <Modal open={isModalOpen}>
      <div className={classes.modalContainer} onClick={handleClose}>
        <Box
          flexDirection="column"
          width="80%"
          height="75%"
          display="flex"
          bgcolor={palette.white}
          borderRadius={10}
          padding="20px"
          alignItems="center"
          position="relative"
          onClick={stopPropagation}
        >
          <Typography>
            Measured length is &nbsp;<b>{Math.round(lengthPx)}</b>px long and equals to{' '}
            <b>{measuredLength}</b>m.
          </Typography>
          <Typography>
            Given image dimensions (
            <b>
              {imgDimensions.width} x {imgDimensions.height}
            </b>
            px) correspond to{' '}
            <b>
              {measuredWidth} x {measuredHeight}
            </b>
            m area.
          </Typography>
          <br />
          <Typography>Please set the new hinting size if needed:</Typography>
          {select}
          {hintK === 1 && !hintError ? null : (
            <Typography>
              Given size corresponds to{' '}
              <b>
                {hintWidth} x {hintHeight}
              </b>
              m area.
            </Typography>
          )}
          {hintError === 'too_small' && (
            <Typography style={{ color: palette.red }}>
              The minimal dimension should be more than {MINIMAL_DIMENSION}m, <br />
              please adjust the hint value or re-crop the image.
            </Typography>
          )}
          {hintError === 'too_big' && (
            <Typography style={{ color: palette.red }}>
              The maximal dimension should be less than {MAXIMAL_DIMENSION}m, <br />
              please adjust the hint value or re-crop the image.
            </Typography>
          )}
          {buttons}
        </Box>
      </div>
    </Modal>
  )
}

function getErrorLabel(errorCode: HintError): ReactNode {
  switch (errorCode) {
    case 'nan':
      return 'The value is not a number!'

    case 'too_big':
      return 'The value is too big!'

    case 'too_small':
      return 'The value is too small!'

    case '':
    default:
      return ''
  }
}

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
}))
