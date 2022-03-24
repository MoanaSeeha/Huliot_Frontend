const PiBy180 = Math.PI / 180

const radiansToDegrees = (radians) => {
  return radians / PiBy180
}

// @TODO: add some explanation
export function rotationStyleHandler(eventData, control, fabricObject) {
  if (fabricObject.lockRotation) {
    return 'not-allowed'
  }
  return control.cursorStyle
}

export function rotationWithSnapping(eventData, transform, x, y) {
  let t = transform,
    target = t.target,
    pivotPoint = target.translateToOriginPoint(target.getCenterPoint(), t.originX, t.originY)

  if (target.lockRotation) {
    return false
  }

  let lastAngle = Math.atan2(t.ey - pivotPoint.y, t.ex - pivotPoint.x),
    curAngle = Math.atan2(y - pivotPoint.y, x - pivotPoint.x),
    angle = radiansToDegrees(curAngle - lastAngle + t.theta),
    hasRotated = true

  if (target.snapAngle > 0) {
    let snapAngle = target.snapAngle,
      snapThreshold = target.snapThreshold || snapAngle,
      rightAngleLocked = Math.ceil(angle / snapAngle) * snapAngle,
      leftAngleLocked = Math.floor(angle / snapAngle) * snapAngle

    if (Math.abs(angle - leftAngleLocked) < snapThreshold) {
      angle = leftAngleLocked
    } else if (Math.abs(angle - rightAngleLocked) < snapThreshold) {
      angle = rightAngleLocked
    }
  }

  if (angle < 0) {
    angle = 360 + angle
  }
  angle %= 360

  hasRotated = target.angle !== angle
  target.angle = angle
  return hasRotated
}
