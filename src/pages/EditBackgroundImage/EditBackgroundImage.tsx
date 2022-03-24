import { useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { HuliotCropper } from '@/utils/cropper'
import { Area } from 'react-easy-crop/types'
import makeStyles from '@mui/styles/makeStyles'

import { useStorage, useImageBlob, useAppDispatch, useContainerSize } from '@/hooks'
import { RouteNames } from '@/routes'
import { readBlobAsArrayBuffer, urlToBlob } from '@/utils'

import { PreviewDialog, CropperControls } from './components'
import getCroppedImg from './cropImage'
import { clearModel, resetLoading } from '@/store/reducers'

type Point = { x: number; y: number }
type Dimensions = { width: number; height: number }
type MediaSize = {
  width: number
  height: number
  naturalWidth: number
  naturalHeight: number
}

export const EditBackgroundImage = () => {
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useAppDispatch()
  const { loadRawBackground, resaveRawBackground, saveBackground } = useStorage()

  // Get image from IndexedDB storage and put it on background
  const [rawBackgroundUrl, setImageBlob] = useImageBlob()
  useEffect(() => {
    async function loadImage() {
      dispatch(resetLoading())
      setImageBlob(await loadRawBackground())
    }

    loadImage()
  }, [])

  const [imageSize, setImageSize] = useState<Dimensions>({ width: 1, height: 1 })
  const [imageAspect, setImageAspect] = useState<number>(1)

  const onMediaLoaded = (mediaSize: MediaSize) => {
    setImageSize({ width: mediaSize.naturalWidth, height: mediaSize.naturalHeight })
    setImageAspect(mediaSize.naturalWidth / mediaSize.naturalHeight)
  }

  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })
  const [rotationCrude, setRotationCrude] = useState<number>(0)
  const [rotationPrecise, setRotationPrecise] = useState<number>(0)
  const [zoom, setZoom] = useState<number>(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  })
  const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null)
  const [containerRef, containerWidth, containerHeight] = useContainerSize()

  const resetToDefaults = () => {
    setCrop({ x: 0, y: 0 })
    setRotationCrude(0)
    setRotationPrecise(0)
    setZoom(1)
    setImageAspect(imageSize.width / imageSize.height)
  }

  const onCropComplete = (_: any, newValue: Area) => {
    setCroppedAreaPixels(newValue)
  }

  const showCroppedImage = useCallback(async () => {
    try {
      const imgUrl = (await getCroppedImg(
        rawBackgroundUrl as string,
        croppedAreaPixels,
        rotationCrude + rotationPrecise,
      )) as string
      setCroppedImageUrl(imgUrl)
    } catch (e) {
      console.error(e)
    }
  }, [croppedAreaPixels, rotationCrude, rotationPrecise, rawBackgroundUrl])

  const goForward = useCallback(async () => {
    if (rotationCrude + rotationPrecise === 0 && zoom === 1 && crop.x === 0 && crop.y === 0) {
      await resaveRawBackground()
      dispatch(clearModel())
      history.push(RouteNames.SCALE_HINTER)
    } else {
      await showCroppedImage()
    }
  }, [rotationCrude, rotationPrecise, zoom, crop, showCroppedImage])

  const onPreviewClose = useCallback(() => {
    setCroppedImageUrl(null)
  }, [])

  const voidFn = () => {} // used as rotation change handler to prevent rotation by gestures

  const onPreviewSave = useCallback(async () => {
    if (!croppedImageUrl) return
    const blob = await urlToBlob(croppedImageUrl)
    const binaryData = await readBlobAsArrayBuffer(blob)
    await saveBackground(binaryData)
    dispatch(clearModel())
    history.push(RouteNames.SCALE_HINTER)
  }, [croppedImageUrl])

  return (
    <div className={classes.root}>
      <div className={classes.cropContainer} ref={containerRef}>
        <HuliotCropper
          image={rawBackgroundUrl as string}
          onMediaLoaded={onMediaLoaded}
          crop={crop}
          rotation={rotationCrude + rotationPrecise}
          zoom={zoom}
          aspect={imageAspect}
          restrictPosition={false}
          cropSize={{ width: containerWidth, height: containerHeight }}
          onCropChange={setCrop}
          onRotationChange={voidFn}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
      <CropperControls
        zoom={zoom}
        setZoom={setZoom}
        rotationCrude={rotationCrude}
        setRotationCrude={setRotationCrude}
        rotationPrecise={rotationPrecise}
        setRotationPrecise={setRotationPrecise}
        onOkClick={goForward}
        imageAspect={imageAspect}
        setImageAspect={setImageAspect}
        onCancelClick={() => history.goBack()}
        resetToDefaults={resetToDefaults}
      />
      <PreviewDialog
        croppedImage={croppedImageUrl}
        onClose={onPreviewClose}
        onSave={onPreviewSave}
      />
    </div>
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
