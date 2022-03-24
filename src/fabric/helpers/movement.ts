export function limitObjectMoveToCanvasBoundaries(event: any) {
  const object = event.target
  const canvas = object.canvas

  // if the object is too big ignore
  if (object.currentHeight > canvas.height || object.currentWidth > canvas.width) {
    return
  }
  object.setCoords()
  // top-left  corner
  if (object.getBoundingRect().top < 0 || object.getBoundingRect().left < 0) {
    object.top = Math.max(object.top, object.top - object.getBoundingRect().top)
    object.left = Math.max(object.left, object.left - object.getBoundingRect().left)
  }
  // bot-right corner
  if (
    object.getBoundingRect().top + object.getBoundingRect().height > canvas.height ||
    object.getBoundingRect().left + object.getBoundingRect().width > canvas.width
  ) {
    object.top = Math.min(
      object.top,
      canvas.height - object.getBoundingRect().height + object.top - object.getBoundingRect().top,
    )
    object.left = Math.min(
      object.left,
      canvas.width - object.getBoundingRect().width + object.left - object.getBoundingRect().left,
    )
  }
}
