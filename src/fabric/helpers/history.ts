import {
  findObjectBySingleId,
  findObjectsByMultipleIds,
  HuliotCanvas,
  HuliotPipe,
  PipeCoords,
} from '@/fabric'

export function removeObject(canvas: HuliotCanvas, objectId: string) {
  const target = findObjectBySingleId(canvas, objectId)
  if (target) {
    canvas.remove(target)
  } else {
    console.error('object with id ', objectId, ' is not found on canvas!')
  }
  canvas.discardActiveObject().requestRenderAll()
}

export function translateObjects(canvas: HuliotCanvas, ids: string[], dx: number, dy: number) {
  const targets = findObjectsByMultipleIds(canvas, ids)
  targets.forEach((obj: any) => {
    obj.translate(dx, dy)
  })
  canvas.discardActiveObject().requestRenderAll()
}

export function rotateObject(canvas: HuliotCanvas, id: string, angle: number) {
  const target = findObjectBySingleId(canvas, id)
  if (target) {
    target.angle = angle
    canvas.discardActiveObject().requestRenderAll()
  }
}

export function updatePipe(canvas: HuliotCanvas, pipeId: string, position: PipeCoords) {
  const target = findObjectBySingleId(canvas, pipeId) as typeof HuliotPipe
  if (target) {
    target.updatePipeTips(position)
    canvas.requestRenderAll()
  } else {
    console.error('object with id ', pipeId, ' is not found on canvas!')
  }
}
