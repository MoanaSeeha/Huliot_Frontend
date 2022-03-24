import React, { FC, MouseEventHandler, useEffect, useState, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { HuliotCropper } from '@/utils/cropper'
import makeStyles from '@mui/styles/makeStyles'

import { RouteNames } from '@/routes'
import { getSizeInM } from '@/utils'
import { useAppDispatch, useContainerSize, useImageBlob, useStorage } from '@/hooks'
import { Translate } from '@components/Translate'

import { Header } from './Header'
import { HinterPoints } from './HinterPoints'
import { HinterModal } from './HinterModal'
import { setHintK } from '@/store/reducers'

type Point = { x: number; y: number }
type Dimensions = { width: number; height: number }
type MediaSize = {
  width: number
  height: number
  naturalWidth: number
  naturalHeight: number
}

export const ScaleHinter: FC = () => {
  const [backgroundUrl, setBackgroundBlob] = useImageBlob()
  const { loadBackground } = useStorage()
  const history = useHistory()
  const dispatch = useAppDispatch()

  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })
  const [touched, setTouched] = useState<boolean>(false)
  const [measuredLength, setMeasuredLength] = useState<number>(0)
  const [isModalOpen, setModalOpen] = useState<boolean>(false)
  const [imageSize, setImageSize] = useState<Dimensions>({ width: 1, height: 1 })
  const [imageAspect, setImageAspect] = useState<number>(1)
  const [zoom, setZoom] = useState<number>(1)

  const [containerRef, containerWidth, containerHeight] = useContainerSize()

  const onMediaLoaded = (mediaSize: MediaSize) => {
    setImageSize({ width: mediaSize.naturalWidth, height: mediaSize.naturalHeight })
    setImageAspect(mediaSize.naturalWidth / mediaSize.naturalHeight)
  }

  useEffect(() => {
    async function loadImage() {
      setBackgroundBlob(await loadBackground())
    }

    loadImage()
  }, [])

  const labelChoose = (
    <Translate
      id="ScaleHinter.ChooseElement"
      defaultMessage="Please choose one element in the background or even the entire wall"
    />
  )

  const labelNext = (
    <>
      The length is {Math.round(measuredLength)} px (or <b>{getSizeInM(measuredLength)}</b>m)
    </>
  )

  const handleClose: MouseEventHandler<HTMLButtonElement | HTMLDivElement> = (event) => {
    event.stopPropagation()
    setModalOpen(false)
  }

  const handleContinue = useCallback((hintK: number) => {
    dispatch(setHintK(hintK))
    history.push(RouteNames.EDITOR)
  }, [])

  const classes = useStyles()

  return (
    <Header
      label={touched ? labelNext : labelChoose}
      setHintDisabled={!touched}
      setModalOpen={setModalOpen}
    >
      <div className={classes.root}>
        <div className={classes.cropContainer} ref={containerRef}>
          {backgroundUrl ? (
            <HuliotCropper
              image={backgroundUrl as string}
              onMediaLoaded={onMediaLoaded}
              restrictPosition={false}
              showGrid={false}
              crop={crop}
              cropSize={{ width: containerWidth, height: containerHeight }}
              onCropChange={setCrop}
              zoom={zoom}
              maxZoom={10}
              onZoomChange={setZoom}
              aspect={imageAspect}
            />
          ) : null}
          <HinterPoints
            touched={touched}
            setTouched={setTouched}
            setMeasuredLength={setMeasuredLength}
          />
          <HinterModal
            isModalOpen={isModalOpen}
            handleClose={handleClose}
            handleContinue={handleContinue}
            lengthPx={measuredLength}
            imgDimensions={imageSize}
          />
        </div>
      </div>
    </Header>
  )
}

const useStyles = makeStyles(() => ({
  root: {
    height: '100vh',
    overflow: 'hidden',
    display: 'flex',
  },

  cropContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
}))
