import { fabric } from 'fabric'
import {
  HuliotCanvas,
  HuliotObject,
  HuliotIconSubtype,
  rotationWithSnapping,
  rotationStyleHandler,
  loadCommentIcon,
} from '@/fabric'
import { uuid } from '@/utils'
import { addToHistory } from '@/store/reducers'

interface IconOptions {
  existingId?: string
  subType: HuliotIconSubtype
  x: number
  y: number
  angle?: number
  svgString: string
  comment?: string
}

export const HuliotIcon = fabric.util.createClass(fabric.Group, {
  initialize: function (
    canvas: HuliotCanvas,
    { x, y, subType, svgString, existingId, comment = '', angle = 0 }: IconOptions,
  ) {
    fabric.loadSVGFromString(svgString, (objects: HuliotObject[], options) => {
      const centerPoint = { x: options.width / 2, y: options.height / 2 }
      this.callSuper('initialize', objects, {
        ...options,

        hasControls: true,
        centerPoint,
        left: x,
        top: y,
        originX: 'center',
        originY: 'center',
        angle,
        controls: {
          mtr: new fabric.Control({
            x: 0,
            y: -0.5,
            actionHandler: rotationWithSnapping,
            cursorStyleHandler: rotationStyleHandler,
            offsetY: -40,
            withConnection: true,
            actionName: 'rotate',
          }),
        },
      })
      this.huliotProps = {
        id: existingId || uuid(),
        type: 'icon',
        subType,
        svgString,
      }
      loadCommentIcon((commentSvg) => {
        this.commentSvg = commentSvg
        this._setCommentPosition()
      })

      this.on('added', () => {
        this.canvas.add(this.commentSvg)
        this.setComment(comment)
        if (!existingId) {
          const { id, subType, comment } = this.huliotProps
          const angle = 0
          canvas.reduxDispatch(
            addToHistory({ userAction: 'add/icon', id, subType, svgString, x, y, angle, comment }),
          )
        }
      })

      this.on('removed', () => this.canvas.remove(this.commentSvg))

      this.on('moving', () => {
        this._setCommentPosition()
      })

      // @ts-ignore
      this.on('modified', ({ transform }) => {
        if (transform.action === 'rotate') {
          canvas.reduxDispatch(
            addToHistory({
              userAction: 'rotate/icon',
              id: this.huliotProps.id,
              angle: transform.original.angle,
              newAngle: transform.target.angle,
            }),
          )
        }
      })
    })
  },

  translate: function (dx: number, dy: number) {
    this.set({ left: this.left - dx, top: this.top - dy })
    this._setCommentPosition()
    this.setCoords()
  },

  remove: function () {
    const x = this.left
    const y = this.top
    const { id, svgString, subType, comment = '' } = this.huliotProps
    const angle = this.angle
    this.canvas.reduxDispatch(
      addToHistory({ userAction: 'remove/icon', id, x, y, svgString, angle, subType, comment }),
    )
  },

  setComment: function (comment: string) {
    this.huliotProps.comment = comment
    const opacity = !!comment ? 0.5 : 0
    this.commentSvg.set({ opacity })
    this.canvas.requestRenderAll()
  },

  _setCommentPosition: function () {
    this.commentSvg.set({ left: this.left + 24, top: this.top })
  },
})
