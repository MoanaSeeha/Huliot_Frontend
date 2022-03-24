import { fabric } from 'fabric'
import { palette } from '@/styles'
import { uuid } from '@/utils'
import { HuliotCanvas, HuliotGroup, loadCommentIcon, PipeCoords } from '@/fabric'
import { Object } from 'fabric/fabric-impl'
import { addToHistory } from '@/store/reducers'

const multiply = fabric.util.multiplyTransformMatrices
const invert = fabric.util.invertTransform
const decompose = fabric.util.qrDecompose

interface PipeOptions extends PipeCoords {
  label: string
  existingId?: string
  comment?: string
}

export const HuliotPipe = fabric.util.createClass(fabric.Line, {
  initialize: function (
    canvas: HuliotCanvas,
    { x1, y1, x2, y2, label, existingId, comment = '' }: PipeOptions,
  ) {
    const { lineCoords, angleDeg } = rotatedLine({ x1, y1, x2, y2 })

    // Keeps points coordinates before any modification to save for history
    this._coordsBeforeModify = { x1, x2, y1, y2 }
    // Used for snapping the pipe when moved as a whole. Here we keep offsets from the cursor to the pipe ends
    // when we start pipe moving. Needs to be cleared in 'modified' handler.
    this._snapOnMoveOffset = null

    // Initialize using transform points to make a horizontal line rotated to some angle around the center.
    // This is needed to keep the selection box following the pipe shape and rotation.
    this.callSuper('initialize', lineCoords, { ...pipeLineOptions, angle: angleDeg })
    const id = existingId || uuid()
    this.huliotProps = { id, type: 'pipe', label, comment }
    this.canvas = canvas
    const [startTip, endTip, textBox] = pipeElements(x1, y1, x2, y2, label, id)
    this.startTip = startTip
    this.endTip = endTip
    this.textBox = textBox

    loadCommentIcon((commentSvg) => {
      this.commentSvg = commentSvg
      this._setCommentPosition()
    })

    // Auxiliary elements get their own helper transforms to follow the pipe changes
    this._updateRelations.apply(this)

    this.on('added', () => {
      this.canvas.add(startTip, endTip, textBox, this.commentSvg)
      this.setComment(comment)
      if (!existingId) {
        // The pipe is new so should be added to history
        const id = this.huliotProps.id
        const coords = { x1, y1, x2, y2 }
        canvas.reduxDispatch(addToHistory({ userAction: 'add/pipe', id, coords, label }))
      }
    })

    this.on('removed', () => this.canvas.remove(startTip, endTip, textBox, this.commentSvg))
    this.on('moving', this._followPipeOnMovement)

    // Different tip handlers
    ;[startTip, endTip].forEach((obj: Object) => {
      obj.on('selected', () => {
        if (this.canvas.getActiveObjects().length === 1) {
          // Pipe tip is highlighted if it's the only selected object, not the part of the selection group
          obj.set({ opacity: 0.5 })
        }
      })
      obj.on('deselected', () => obj.set({ opacity: 0 }))
      obj.on('moving', this._onCircleMoving.bind(this))
      obj.on('modified', this._onCircleStoppedMoving.bind(this))
    })
  },

  // Undoing move pipe ('move' history record) by moving pipe center to given offset
  translate: function (dx: number, dy: number) {
    this.setCenterPointPosition(this.left - dx, this.top - dy)
  },

  // Move pipe so start tip matches given coordinates
  setStartTipPosition: function (x: number, y: number) {
    const start = new fabric.Point(x, y)
    const end = new fabric.Point(x + this._getPipeLength(), y)
    const angleRadians = fabric.util.degreesToRadians(this.angle)
    const rotatedEnd = fabric.util.rotatePoint(end, start, angleRadians)
    const { x: newX, y: newY } = start.midPointFrom(rotatedEnd)
    this.setCenterPointPosition(newX, newY)
  },

  // Move pipe so end tip matches given coordinates
  setEndTipPosition: function (x: number, y: number) {
    const start = new fabric.Point(x - this._getPipeLength(), y)
    const end = new fabric.Point(x, y)
    const angleRadians = fabric.util.degreesToRadians(this.angle)
    const rotatedStart = fabric.util.rotatePoint(start, end, angleRadians)
    const { x: newX, y: newY } = end.midPointFrom(rotatedStart)
    this.setCenterPointPosition(newX, newY)
  },

  setCenterPointPosition: function (x: number, y: number) {
    this.set({ left: x, top: y }).setCoords()
    this._followPipeOnMovement()
  },

  remove: function () {
    const { left: x1, top: y1 } = this.startTip
    const { left: x2, top: y2 } = this.endTip
    const id = this.huliotProps.id
    const label = this.huliotProps.label
    const coords = { x1, y1, x2, y2 }
    this.canvas.reduxDispatch(addToHistory({ userAction: 'remove/pipe', id, coords, label }))
  },

  // Undoing adjusting the pipe by one of the tips ('pipe/modified' history record)
  updatePipeTips: function (pos: PipeCoords) {
    const {
      lineCoords: [x1, y1, x2, y2],
      angleDeg,
    } = rotatedLine(pos)
    this.set({ x1, y1, x2, y2, angle: angleDeg }).setCoords()
    this.textBox.set({ left: (pos.x1 + pos.x2) / 2, top: (pos.y1 + pos.y2) / 2 })
    this._setCommentPosition()
    this.startTip.set({ left: pos.x1, top: pos.y1 }).setCoords()
    this.endTip.set({ left: pos.x2, top: pos.y2 }).setCoords()
    this._updateRelations.apply(this)
    this.canvas.discardActiveObject().requestRenderAll()
    this._coordsBeforeModify = pos
  },

  _getPipeLength: function () {
    const a = new fabric.Point(this.x1, this.y1)
    const b = new fabric.Point(this.x2, this.y2)
    return b.distanceFrom(a)
  },

  // http://fabricjs.com/using-transformations - see transform example
  // Update transformation matrices of all additional elements
  _followPipeOnMovement: function () {
    ;[this.textBox, this.startTip, this.endTip, this.commentSvg].forEach((minionObj) => {
      const transform = multiply(this.calcTransformMatrix(), minionObj.relation)
      const opt = decompose(transform)
      minionObj.setPositionByOrigin({ x: opt.translateX, y: opt.translateY }, 'center', 'center')
      minionObj.set(opt).setCoords()
    })

    const sCP = this.startTip.getCenterPoint()
    const eCP = this.endTip.getCenterPoint()
    this._coordsBeforeModify = { x1: sCP.x, y1: sCP.y, x2: eCP.x, y2: eCP.y }
  },

  _onCircleMoving: function () {
    // Update moving circle and text label coordinates
    const sCP = this.startTip.getCenterPoint()
    const eCP = this.endTip.getCenterPoint()
    // Line is drawn as unrotated line while moving (original coordinates and 0 rotation angle)
    this.set({ x1: sCP.x, y1: sCP.y, x2: eCP.x, y2: eCP.y, angle: 0 })
    this.textBox.set({ left: (sCP.x + eCP.x) / 2, top: (sCP.y + eCP.y) / 2 })
    this._setCommentPosition()
  },

  _onCircleStoppedMoving: function () {
    const sCP = this.startTip.getCenterPoint()
    const eCP = this.endTip.getCenterPoint()
    const newCoords = { x1: sCP.x, y1: sCP.y, x2: eCP.x, y2: eCP.y }
    // Circle movement complete so we should turn line into rotated one again
    const {
      lineCoords: [x1, y1, x2, y2],
      angleDeg,
    } = rotatedLine(newCoords)
    this.set({ x1, y1, x2, y2, angle: angleDeg })
    this.setCoords()
    this._updateRelations.apply(this)
    // Select the line instead of the circle we just dropped
    this.canvas.setActiveObject(this)
    this.canvas.reduxDispatch(
      addToHistory({
        id: this.huliotProps.id,
        userAction: 'modify/pipe',
        coords: this._coordsBeforeModify,
        newCoords,
      }),
    )
    this._coordsBeforeModify = newCoords
  },

  _updateRelations: function () {
    const lineTransform = this.calcTransformMatrix()
    const invertedLineTransform = invert(lineTransform)
    ;[this.textBox, this.startTip, this.endTip, this.commentSvg].forEach((minionObj) => {
      minionObj.relation = multiply(invertedLineTransform, minionObj.calcTransformMatrix())
    })
  },

  _setCommentPosition: function () {
    this.commentSvg.set({ left: this.textBox.left + 24, top: this.textBox.top })
  },

  setComment: function (comment: string) {
    this.huliotProps.comment = comment
    const opacity = !!comment ? 0.5 : 0
    this.commentSvg.set({ opacity })
    this.canvas.requestRenderAll()
  },
})

// https://stackoverflow.com/a/53424718/8467261 - but with the line rotated around central point
export const rotatedLine = (crd: PipeCoords) => {
  const a = new fabric.Point(crd.x1, crd.y1)
  const b = new fabric.Point(crd.x2, crd.y2)
  const center = a.midPointFrom(b)

  // find angle between line's vector and x axis
  let angleRad = Math.atan2(crd.y2 - crd.y1, crd.x2 - crd.x1)
  if (angleRad < 0) angleRad = 2 * Math.PI + angleRad

  const angleDeg = fabric.util.radiansToDegrees(angleRad)

  // find initial horizontal position by rotating the tips back
  const rotatedA = fabric.util.rotatePoint(a.clone(), center, -angleRad)
  const rotatedB = fabric.util.rotatePoint(b.clone(), center, -angleRad)
  return { lineCoords: [rotatedA.x, rotatedA.y, rotatedB.x, rotatedB.y], angleDeg }
}

// Helpers for auxiliary pipe elements
export const pipeElements = (
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  label: string,
  id: string,
) => {
  const startOuterCircle = new fabric.Circle({
    left: x1,
    top: y1,
    radius: 8,
    ...pipeTipCircleOptions,
  })
  const startInnerCircle = new fabric.Circle({
    left: x1,
    top: y1,
    radius: 2,
    ...pipeTipCircleOptions,
    fill: palette.black,
  })
  const startTip = new fabric.Group([startInnerCircle, startOuterCircle], groupedTipOptions)
  // @ts-ignore
  startTip.huliotProps = {
    pipeId: id,
    type: 'pipeTip',
  }

  const endOuterCircle = new fabric.Circle({
    left: x2,
    top: y2,
    radius: 8,
    ...pipeTipCircleOptions,
  })
  const endInnerCircle = new fabric.Circle({
    left: x2,
    top: y2,
    radius: 2,
    ...pipeTipCircleOptions,
    fill: palette.black,
  })
  const endTip = new HuliotGroup([endInnerCircle, endOuterCircle], groupedTipOptions)
  endTip.huliotProps = {
    pipeId: id,
    type: 'pipeTip',
  }

  const text = new fabric.Text(label, {
    left: (x1 + x2) / 2,
    top: (y1 + y2) / 2,
    fontSize: 15,
    fontWeight: 'bold',
    originX: 'center',
    originY: 'center',
  })
  const box = new fabric.Rect({
    left: text.left!,
    top: text.top!,
    width: text.width! + 8,
    height: text.height! + 4,
    fill: palette.white,
    stroke: palette.black,
    strokeWidth: 1,
    originX: 'center',
    originY: 'center',
  })
  const textBox = new HuliotGroup([box, text], {
    hasControls: false,
    originX: 'center',
    originY: 'center',
    selectable: false,
    evented: false,
  })
  textBox.huliotProps = {
    pipeId: id,
    type: 'pipeLabel',
  }

  return [startTip, endTip, textBox]
}

const pipeLineOptions = {
  originX: 'center',
  originY: 'center',

  hasControls: false,

  fill: palette.black,
  stroke: palette.black,
  strokeWidth: 2,
}

const pipeTipCircleOptions = {
  originX: 'center',
  originY: 'center',

  fill: 'transparent',
  stroke: palette.black,
  strokeWidth: 2,
}

const groupedTipOptions = {
  originX: 'center',
  originY: 'center',

  hasControls: false,

  borderColor: 'transparent',
  opacity: 0,
}
