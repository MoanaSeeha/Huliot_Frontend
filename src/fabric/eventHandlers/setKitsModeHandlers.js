import { objectModifiedHandler, resetAllHandlers } from '@/fabric'

export function setKitsModeHandlers({ canvas }) {
  resetAllHandlers(canvas)

  canvas.on('object:modified', (event) => objectModifiedHandler(event, canvas))
}
