import {
  limitObjectMoveToCanvasBoundaries,
  resetAllHandlers,
  objectModifiedHandler,
  snapWhileMoving,
  HuliotIcon,
  findPointToSnap,
  setSelectionHandlers,
  selectionHandler,
} from '@/fabric'

export function setElementsModeHandlers({ canvas, currentIcon }) {
  resetAllHandlers(canvas)
  setSelectionHandlers(canvas, selectionHandler)

  canvas.on('object:moving', limitObjectMoveToCanvasBoundaries)
  canvas.on('object:moving', snapWhileMoving)
  canvas.on('mouse:down', (event) => mouseDownHandler(event, canvas, currentIcon))
  canvas.on('object:modified', (event) => objectModifiedHandler(event, canvas))
}

function mouseDownHandler({ pointer, target }, canvas, svgString) {
  const canDrawElement = !target || ['pipe', 'pipeTip'].includes(target.huliotProps?.type)
  if (canDrawElement) {
    const snapPoint = findPointToSnap(canvas, pointer, ['pipe'])
    const icon = new HuliotIcon(canvas, {
      subType: 'element',
      x: snapPoint.x,
      y: snapPoint.y,
      svgString,
    })
    canvas.add(icon).requestRenderAll()
  }
}
