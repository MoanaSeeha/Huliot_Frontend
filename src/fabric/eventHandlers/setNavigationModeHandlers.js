import { resetAllHandlers } from '@/fabric'

export function setNavigationModeHandlers({ canvas }) {
  resetAllHandlers(canvas)

  canvas.on('mouse:wheel', (event) => canvasZoomHandler(event, canvas))
  canvas.on('mouse:down', (event) => canvasMouseDownHandler(event, canvas))
  canvas.on('mouse:up', (event) => canvasMouseUpHandler(event, canvas))
  canvas.on('mouse:move', (event) => canvasMouseMoveHandler(event, canvas))
}

let isDragging = false
let lastPosX = 0
let lastPosY = 0
let vpt = null

function canvasZoomHandler({ e }, canvas) {
  e.preventDefault()
  e.stopPropagation()

  const minZoom = getMinZoom(canvas)
  const curZoom = canvas.getZoom()
  let newZoom = curZoom * 0.999 ** e.deltaY
  if (newZoom > 1) newZoom = 1
  if (newZoom < minZoom) newZoom = minZoom
  canvas.setZoom(newZoom)
  canvas.requestRenderAll()
}

function getMinZoom(canvas) {
  const { width, height } = canvas
  const { width: imgWidth, height: imgHeight } = canvas.backgroundImage
  const minZoom = Math.min(width / imgWidth, height / imgHeight)
  return minZoom <= 1 ? minZoom : 1
}

function canvasMouseDownHandler({ e }, canvas) {
  isDragging = true
  lastPosX = e.clientX ?? e.targetTouches[0].clientX
  lastPosY = e.clientY ?? e.targetTouches[0].clientY
}

function canvasMouseUpHandler({ e }, canvas) {
  isDragging = false
  canvas.setViewportTransform(vpt)
}

function canvasMouseMoveHandler({ e }, canvas) {
  if (isDragging) {
    const clientX = e.clientX ?? e.targetTouches[0].clientX
    const clientY = e.clientY ?? e.targetTouches[0].clientY
    vpt = canvas.viewportTransform
    vpt[4] += clientX - lastPosX
    vpt[5] += clientY - lastPosY
    canvas.requestRenderAll()
    lastPosX = clientX
    lastPosY = clientY
  }
}
