import { useEffect } from 'react'
import { fabric as Fabric } from 'fabric'

import {
  selectCommentedObjectId,
  selectLayoutModel,
  selectSelectedObjectId,
} from '@/store/reducers'
import { HuliotCanvas, setFixedHandlers, setupFabric, restoreLayout } from '@/fabric'
import { useAppDispatch, useAppSelector, useContainerSize, useImageBlob, useStorage } from '@/hooks'

import { SelectedObjectMenu } from './SelectedObjectMenu'
import { CommentEditor } from './CommentEditor'
import { useEditorContext, useCanvasHandlers } from '../hooks'

type Props = {
  canvasId: string
}
export const EditorCanvas = ({ canvasId }: Props) => {
  const { canvas, setCanvas } = useEditorContext()
  const [backgroundUrl, setBackgroundBlob] = useImageBlob()
  const { loadBackground } = useStorage()
  const selectedObjectId = useAppSelector(selectSelectedObjectId)
  const commentedObjectId = useAppSelector(selectCommentedObjectId)
  const layoutModel = useAppSelector(selectLayoutModel)
  const dispatch = useAppDispatch()

  const [ref, width, height] = useContainerSize()
  if (canvas) {
    // Update fabric canvas size according to container size
    // @TODO: take into account zoom to prevent object positioning
    // beyond canvas (background)
    canvas.setWidth(width)
    canvas.setHeight(height)
  }
  useCanvasHandlers()

  useEffect(() => {
    setFixedHandlers() // Canvas behavior should be heavily fixed for mobile purposes
    setupFabric() // Fabric.JS settings and controls setup
    setCanvas(new HuliotCanvas(canvasId, dispatch))
  }, [canvasId, dispatch])

  useEffect(() => {
    async function loadImage() {
      setBackgroundBlob(await loadBackground())
    }

    loadImage()
  }, [])

  useEffect(() => {
    if (canvas && backgroundUrl) {
      Fabric.Image.fromURL(backgroundUrl, (img) => {
        canvas.clear()
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
          scaleX: layoutModel.hintK,
          scaleY: layoutModel.hintK,
        })
        restoreLayout(canvas, layoutModel)
      })
    }
  }, [backgroundUrl, canvas])

  return (
    <div ref={ref} style={{ display: 'flex', flex: '1 1 auto', position: 'relative' }}>
      <canvas id={canvasId} />
      {canvas && selectedObjectId && (
        <SelectedObjectMenu
          canvas={canvas}
          selectedObjectId={selectedObjectId}
          commentedObjectId={commentedObjectId}
        />
      )}
      {canvas && commentedObjectId && (
        <CommentEditor
          canvas={canvas}
          selectedObjectId={selectedObjectId}
          commentedObjectId={commentedObjectId}
        />
      )}
    </div>
  )
}
