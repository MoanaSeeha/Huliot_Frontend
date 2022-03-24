import {
  limitObjectMoveToCanvasBoundaries,
  allowObjectsSelection,
  objectModifiedHandler,
  resetAllHandlers,
  snapWhileMoving,
} from '@/fabric'

export function setToolsModeHandlers({ canvas }) {
  resetAllHandlers(canvas)
  allowObjectsSelection(canvas)
  canvas.selection = true
  canvas.allowTouchScrolling = true

  canvas.on('object:moving', limitObjectMoveToCanvasBoundaries)
  canvas.on('object:moving', snapWhileMoving)
  canvas.on('object:modified', (event) => objectModifiedHandler(event, canvas))
}
