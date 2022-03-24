import {
  limitObjectMoveToCanvasBoundaries,
  resetAllHandlers,
  objectModifiedHandler,
  snapWhileMoving,
  HuliotIcon,
  findPointToSnap,
  selectionHandler,
} from '@/fabric'

export function setConstantsModeHandlers({ canvas, currentIcon }) {
  resetAllHandlers(canvas)

  canvas.on('object:moving', limitObjectMoveToCanvasBoundaries)
  canvas.on('object:moving', snapWhileMoving)
  canvas.on('mouse:down', (event) => mouseDownHandler(event, canvas, currentIcon))
  canvas.on('object:modified', (event) => objectModifiedHandler(event, canvas))
  canvas.on('selection:created', (event) => selectionHandler(event, canvas))
  canvas.on('selection:updated', (event) => selectionHandler(event, canvas))
  canvas.on('selection:cleared', (event) => selectionHandler(event, canvas))
}

function mouseDownHandler({ pointer, target }, canvas, svgString) {
  const canDrawConstant = !target || ['pipe', 'pipeTip'].includes(target.huliotProps?.type)
  if (canDrawConstant) {
    const snapPoint = findPointToSnap(canvas, pointer, ['pipe'])
    const icon = new HuliotIcon(canvas, {
      subType: 'constant',
      x: snapPoint.x,
      y: snapPoint.y,
      svgString,
    })
    canvas.add(icon).requestRenderAll()
  }
}
