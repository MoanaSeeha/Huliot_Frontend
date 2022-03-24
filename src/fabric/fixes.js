import { fabric as Fabric } from 'fabric'
import { getDeviceOrientation } from '@/utils'

export function setFixedHandlers() {
  // Replace event handler with custom one completely
  Fabric.util.object.extend(Fabric.Canvas.prototype, { _onTouchStart: _onTouchStartFixed })

  Fabric.Canvas.prototype.getPointer = getPointerFixed
}

const getPointerFixed = (function (originalHandler) {
  return function (e, ignoreZoom) {
    const originalResult = originalHandler.call(this, e, ignoreZoom)
    const hasCachedValue = (this._absolutePointer && !ignoreZoom) || (this._pointer && ignoreZoom)

    // No hack should be applied in landscape position or if pointer value is cached
    // The latter can be buggy!
    if (getDeviceOrientation() === 'landscape' || hasCachedValue) {
      return originalResult
    } else {
      // Portrait mode hack should be applied for getting correct pointer position
      const x = (originalResult.y * this.width) / this.height
      const y = ((this.width - originalResult.x) * this.height) / this.width
      return { x, y }
    }
  }
})(Fabric.Canvas.prototype.getPointer)

// Custom Fix for touch scrolling - canvas is not scrollable even if allowTouchScrolling is set
function _onTouchStartFixed(e) {
  // This object is available to original event handler
  const addEventOptions = {
    passive: false,
  }
  // Fix part (conditional prevention of event handler)
  if (!this.allowTouchScrolling || this.findTarget(e)) {
    e.preventDefault()
  }

  // Original event handler (without e.preventDefault() unconditional part)
  if (this.mainTouchId === null) {
    this.mainTouchId = this.getPointerId(e)
  }
  this.__onMouseDown(e)
  this._resetTransformEventData()
  const canvasElement = this.upperCanvasEl
  const eventTypePrefix = this._getEventPrefix()
  Fabric.util.addListener(Fabric.document, 'touchend', this._onTouchEnd, addEventOptions)
  Fabric.util.addListener(Fabric.document, 'touchmove', this._onMouseMove, addEventOptions)
  // Unbind mousedown to prevent double triggers from touch devices
  Fabric.util.removeListener(canvasElement, eventTypePrefix + 'down', this._onMouseDown)
}
