import { fabric } from 'fabric'
import { Point } from 'fabric/fabric-impl'

import {
  findObjectsByType,
  HuliotCanvas,
  HuliotIcon,
  HuliotObject,
  HuliotObjectType,
  HuliotPipe,
} from '@/fabric'

const snapsTo = {
  icon: ['pipe'],
  pipe: ['pipe', 'icon'],
  pipeTip: ['pipe', 'icon'],
}

const MINIMAL_SNAPPING_DISTANCE = 30

interface Pointer {
  x: number
  y: number
}

// Snapping is done by comparing cursor position with the potential snapping points. If the distance from the cursor to
// the nearest points is less than a given limit, we lock the object movement by setting its coordinates to the given point
// until we move cursor further than a minimal distance.
export function snapWhileMoving(evt: any) {
  const movingObject: HuliotObject = evt.target
  const pointer = new fabric.Point(evt.pointer.x, evt.pointer.y)
  const movingObjectType = movingObject.huliotProps?.type as HuliotObjectType | undefined
  const canvas = movingObject.canvas as HuliotCanvas

  const potentialSnappingPoints = findObjectsByType(
    canvas,
    // @ts-ignore
    snapsTo[movingObjectType] || [],
  )
    .filter(
      // Exclude current object
      (obj: HuliotObject) => {
        return ![movingObject.huliotProps?.id, movingObject.huliotProps?.pipeId].includes(
          obj.huliotProps?.id,
        )
      },
    )
    .map(getObjectSnapPoints)
    .flat()

  if (!potentialSnappingPoints.length) return // There is nothing to snap to

  if (movingObjectType === 'pipe') {
    const pipe = movingObject as typeof HuliotPipe

    // Snapping of the whole pipe is somewhat complicated. When we start dragging, we should save the offset of the
    // initial pipe tips offsets regarding to the initial cursor position. Then we use these 'virtual pipe tips' to
    // find the closest point to each of them.
    if (!pipe._snapOnMoveOffset) {
      pipe._snapOnMoveOffset = {
        start: pipe.startTip.getCenterPoint().subtract(pointer),
        end: pipe.endTip.getCenterPoint().subtract(pointer),
      }
    }

    // Calculate where the start tip of the pipe should be if we moved cursor to the current position.
    // We cannot use real pipe start tip coordinates here because the pipe is 'locked' when in snapped state
    // while cursor is moving so pipe will never release.
    const str = pointer.add(pipe._snapOnMoveOffset.start)
    const { closestPoint: cpStr, distance: dStr } = findClosestPoint(str, potentialSnappingPoints)
    if (dStr <= MINIMAL_SNAPPING_DISTANCE) {
      pipe.setStartTipPosition(cpStr.x, cpStr.y)
      return
    }

    // If there is no match for start tip do the same for the end tip.
    const end = pointer.add(pipe._snapOnMoveOffset.end)
    const { closestPoint: cpEnd, distance: dEnd } = findClosestPoint(end, potentialSnappingPoints)
    if (dEnd <= MINIMAL_SNAPPING_DISTANCE) {
      pipe.setEndTipPosition(cpEnd.x, cpEnd.y)
      return
    }
  } else {
    // Snapping for icons or pipe tips as point is much simpler as it's only one point that has the same coordinates
    // as cursor. So we just find potential objects nearest to the cursor and snap if distance is less than minimal.
    const { closestPoint, distance } = findClosestPoint(pointer, potentialSnappingPoints)
    if (distance <= MINIMAL_SNAPPING_DISTANCE) {
      movingObject.set({ left: closestPoint.x, top: closestPoint.y })
    }
  }
}

// Used during the creation of a pipe or icon. Allows snapping of the newly put icon or pipe tip to the nearest
// potential point.
export function findPointToSnap(
  canvas: HuliotCanvas,
  pointer: Pointer,
  objectType: ('pipe' | 'icon')[],
) {
  const potentialSnappingPoints = findObjectsByType(canvas, objectType)
    .map(getObjectSnapPoints)
    .flat()
  const { closestPoint, distance } = findClosestPoint(pointer, potentialSnappingPoints)
  if (distance < MINIMAL_SNAPPING_DISTANCE) {
    return { x: closestPoint.x, y: closestPoint.y }
  } else {
    return pointer
  }
}

// Icon has only one snapping point that is center of the icon (the icon origin is set to center for convenience).
// Pipe has two snapping points matching both pipe tips.
// For every object we return arrays (empty array for unknown object type for safety) so after mapping every object
// through this function we need to flatten the result to have just array of points.
export function getObjectSnapPoints(object: HuliotObject) {
  if (object.huliotProps?.type === 'icon') {
    return [new fabric.Point((object as typeof HuliotIcon).left, (object as typeof HuliotIcon).top)]
  }
  if (object.huliotProps?.type === 'pipe') {
    return [
      new fabric.Point(
        (object as typeof HuliotPipe).startTip.left,
        (object as typeof HuliotPipe).startTip.top,
      ),
      new fabric.Point(
        (object as typeof HuliotPipe).endTip.left,
        (object as typeof HuliotPipe).endTip.top,
      ),
    ]
  }
  return []
}

// After providing the array of points and current pointer position we simply calculate distances from the pointer
// to every of the given points. Then we find the minimal distance and return the point itself and distance to it.
// The distance is needed as we want to compare it with some threshold value and make a decision if we want to snap.
export function findClosestPoint(pointer: Pointer, points: Point[]) {
  const distances = points.map((p) => p.distanceFrom(pointer))
  const minIndex = distances.indexOf(Math.min(...distances))
  return { closestPoint: points[minIndex], distance: distances[minIndex] }
}
