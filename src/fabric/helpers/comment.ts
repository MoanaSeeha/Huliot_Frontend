import { fabric } from 'fabric'
import { findObjectBySingleId, HuliotCanvas, HuliotObject } from '@/fabric'
import { palette } from '@/styles'
import { addToHistory } from '@/store/reducers'

export function updateComment(
  canvas: HuliotCanvas,
  objectId: string,
  newComment: string,
  skipDispatch?: boolean,
) {
  const target = findObjectBySingleId(canvas, objectId)
  if (target && target?.huliotProps?.id) {
    if (!skipDispatch) {
      const comment = target?.huliotProps?.comment || ''
      canvas.reduxDispatch(
        addToHistory({
          userAction: 'update/comment',
          id: target.huliotProps.id,
          comment,
          newComment,
        }),
      )
    }

    // @ts-ignore
    target.setComment?.(newComment)
  }
}

export function getComment(canvas: HuliotCanvas, objectId: string): string {
  const target = findObjectBySingleId(canvas, objectId)
  return target?.huliotProps?.comment || ''
}

type LoadCommentCallback = (svg: HuliotObject) => void
export const loadCommentIcon = (callback: LoadCommentCallback) => {
  fabric.loadSVGFromString(commentSvg, (objects, options) => {
    const svg = objects[0]
    if (svg) {
      svg.set({
        originX: 'center',
        originY: 'center',
        selectable: false,
        evented: false,
        opacity: 0,
      })
      svg.scaleToWidth(24)
      svg.scaleToHeight(24)
      callback(svg)
    }
  })
}

const commentSvg = `<svg 
    width="512px" 
    height="512px" 
    viewBox="0 0 512 512"
    fill="${palette.green}" 
    xmlns="http://www.w3.org/2000/svg">
        <path d="M256 32C114.6 32 0 125.1 0 240c0 49.6 21.4 95 57 130.7C44.5 421.1 2.7 466 2.2 466.5c-2.2 2.3-2.8 5.7-1.5 8.7S4.8 480 8 480c66.3 0 116-31.8 140.6-51.4 32.7 12.3 69 19.4 107.4 19.4 141.4 0 256-93.1 256-208S397.4 32 256 32z"/>
    </svg>`
