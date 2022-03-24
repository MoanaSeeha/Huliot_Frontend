import { Touch as ReactTouch } from 'react'
import Cropper from 'react-easy-crop'
import { getCorrectTouchPosition } from '@/utils/device'

// Special hack for rotated screen
Cropper.getTouchPoint = (touch: Touch | ReactTouch) => {
  const { clientX: x, clientY: y } = getCorrectTouchPosition(touch)
  return { x, y }
}

export class HuliotCropper extends Cropper {}
