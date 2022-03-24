import { fabric as Fabric } from 'fabric'
import { palette } from '@/styles'
import {
  findPointToSnap,
  HuliotPipe,
  limitObjectMoveToCanvasBoundaries,
  objectModifiedHandler,
  resetAllHandlers,
  selectionHandler,
  setSelectionHandlers,
  snapWhileMoving,
} from '@/fabric'

export function setPipesModeHandlers({ canvas, pipeDiameter }) {
  resetAllHandlers(canvas)

  canvas.on('object:moving', limitObjectMoveToCanvasBoundaries)
  canvas.on('object:moving', snapWhileMoving)
  canvas.on('mouse:down', (event) => mouseDownHandler(event, canvas))
  canvas.on('mouse:up', () => mouseUpHandler(canvas, pipeDiameter))
  canvas.on('mouse:move', (event) => mouseMoveHandler(event, canvas))
  canvas.on('object:modified', (event) => objectModifiedHandler(event, canvas))

  setSelectionHandlers(canvas, selectionHandler)
}

let isMouseButtonPressed = false
let pipeDraft = null

function mouseDownHandler({ e, target, pointer }, canvas) {
  isMouseButtonPressed = true
  // Don't draw if the existing pipe is clicked
  if (target && ['pipe', 'pipeTip'].includes(target.huliotProps?.type)) return

  const { x, y } = findPointToSnap(canvas, pointer, ['pipe', 'icon'])

  pipeDraft = new Fabric.Line([x, y, x, y], pipeDraftOptions)
  canvas.add(pipeDraft)
}

function mouseMoveHandler({ e, target, pointer }, canvas) {
  const canDrawPipe = isMouseButtonPressed && pipeDraft
  // Draw the pipe only when mouse is pressed or screen is touched
  // drawing the pipe already started
  const perpendicularOnly = false
  if (canDrawPipe) {
    const { x, y } = findPointToSnap(canvas, pointer, ['pipe', 'icon'])
    const { x1, y1 } = pipeDraft
    if (perpendicularOnly) {
      const dx = Math.abs(x1 - x)
      const dy = Math.abs(y1 - y)
      if (dx >= dy) {
        pipeDraft.set({ x2: x, y2: y1 }) // horizontal pipe
      } else {
        pipeDraft.set({ x2: x1, y2: y }) // vertical pipe
      }
    } else {
      pipeDraft.set({ x2: x, y2: y })
    }

    pipeDraft.setCoords() // Update interaction coords to match the new line height
    canvas.requestRenderAll()
  }
}

const MINIMAL_PIPE_LENGTH = 45

function mouseUpHandler(canvas, pipeDiameter) {
  isMouseButtonPressed = false

  if (!pipeDraft) return // Mouse Up on object move or other activity

  const { x1, x2, y1, y2 } = pipeDraft

  const pipeDraftLength = Math.hypot(x2 - x1, y2 - y1)
  canvas.remove(pipeDraft)

  // Don't draw too short pipe
  if (pipeDraftLength > MINIMAL_PIPE_LENGTH) {
    const newPipe = new HuliotPipe(canvas, {
      x1,
      y1,
      x2,
      y2,
      label: String(pipeDiameter) || null,
    })
    canvas.add(newPipe).requestRenderAll()
  }
  pipeDraft = null // Pipe is created
}

const pipeDraftOptions = {
  hasControls: false, // @TODO allow 90 degree rotation, probably via special controller
  strokeDashArray: [4, 3],
  strokeWidth: 1,
  fill: palette.black,
  stroke: palette.green,
  originX: 'center',
  originY: 'center',
}
