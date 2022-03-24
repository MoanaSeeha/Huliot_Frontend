import { addToHistory, deselectObject, selectObject } from '@/store/reducers'
import { HuliotCanvas, HuliotObject, HuliotPipe, setSelectionHandlers } from '@/fabric'

export function resetAllHandlers(canvas: HuliotCanvas) {
  canvas.off('mouse:down')
  canvas.off('mouse:up')
  canvas.off('mouse:move')
  canvas.off('object:moving')
  canvas.off('object:modified')
  canvas.off('mouse:wheel')
  canvas.off('selection:created')
  canvas.off('selection:updated')
  canvas.off('selection:cleared')

  canvas.selection = false
  canvas.allowTouchScrolling = false

  canvas.forEachObject((object: any) => (object.selectable = false))

  // There are selected objects
  if (canvas.getActiveObjects().length) {
    canvas.reduxDispatch(deselectObject())
    canvas.discardActiveObject().requestRenderAll()
  }
}

export function allowObjectsSelection(canvas: HuliotCanvas) {
  canvas.forEachObject((object: any) => (object.selectable = true))
  setSelectionHandlers(canvas, selectionHandler)
}

export function selectionHandler({ selected }: any, canvas: HuliotCanvas) {
  if (selected && selected?.length === 1) {
    const selectedObject = selected[0]
    const { top, left, width, height, huliotProps } = selectedObject
    if (huliotProps?.id) {
      canvas.reduxDispatch(
        selectObject({
          selectedObjectId: huliotProps.id,
          selectedArea: { top, left, width, height },
        }),
      )
    } else {
      console.warn('No huliotProps while selecting the object')
      canvas.reduxDispatch(deselectObject())
    }
  } else {
    canvas.reduxDispatch(deselectObject())
  }
}

// Separate drag handler is needed to allow multiobject movement
// @TODO: check and fix history if needed
export function objectModifiedHandler({ target, transform, action }: any, canvas: HuliotCanvas) {
  if (action === 'drag') {
    const dx = target.left - transform.lastX + transform.offsetX
    const dy = target.top - transform.lastY + transform.offsetY
    const ids = getModifiedIds(target).filter(Boolean)
    // Mass object move
    if (ids.length)
      canvas.reduxDispatch(addToHistory({ userAction: 'move/selection', ids, dx, dy }))
    const activeObject: HuliotObject = canvas.getActiveObject()
    // Single object move
    if (activeObject?.huliotProps?.id) {
      const { left, top, width, height } = activeObject
      canvas.reduxDispatch(
        selectObject({
          selectedObjectId: activeObject.huliotProps.id,
          selectedArea: { left: left!, top: top!, width: width!, height: height! },
        }),
      )
    }
    if (activeObject?.huliotProps?.type === 'pipe') {
      ;(activeObject as typeof HuliotPipe)._snapOnMoveOffset = null
    }
  }
}

function getModifiedIds(target: HuliotObject): string[] {
  return target.huliotProps
    ? [target.huliotProps.id]
    : // @ts-ignore
      target._objects.map((obj: HuliotObject) => obj.huliotProps?.id).filter(Boolean)
}
