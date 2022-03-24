import { useCallback } from 'react'
import { selectHistoryLastUserAction, undoLastHistoryStep } from '@/store/reducers'
import { useAppDispatch, useAppSelector } from '@/hooks'
import {
  HuliotIcon,
  HuliotPipe,
  removeObject,
  translateObjects,
  updatePipe,
  rotateObject,
  updateComment,
} from '@/fabric'

import { useEditorContext } from './useEditorContext'

export const useEditorUndo = () => {
  const dispatch = useAppDispatch()
  const last = useAppSelector(selectHistoryLastUserAction)
  const { canvas } = useEditorContext()

  return useCallback(() => {
    if (!canvas) return

    switch (last?.userAction) {
      case 'add/icon':
      case 'add/pipe':
        removeObject(canvas, last.id)
        dispatch(undoLastHistoryStep())
        return
      case 'remove/icon':
        const newIcon = new HuliotIcon(canvas, {
          existingId: last.id,
          x: last.x,
          y: last.y,
          svgString: last.svgString,
          subType: last.subType,
          comment: last.comment,
          angle: last.angle,
        })
        canvas.add(newIcon).requestRenderAll()
        dispatch(undoLastHistoryStep())
        return
      case 'remove/pipe':
        const newPipe = new HuliotPipe(canvas, {
          existingId: last.id,
          ...last.coords,
          label: last.label,
          comment: last.comment,
        })
        canvas.add(newPipe).requestRenderAll()
        dispatch(undoLastHistoryStep())
        return
      case 'move/selection':
        translateObjects(canvas, last.ids, last.dx, last.dy)
        dispatch(undoLastHistoryStep())
        return
      case 'rotate/icon':
        rotateObject(canvas, last.id, last.angle)
        dispatch(undoLastHistoryStep())
        return
      case 'modify/pipe':
        updatePipe(canvas, last.id, last.coords)
        dispatch(undoLastHistoryStep())
        return
      case 'update/comment':
        updateComment(canvas, last.id, last.comment, true)
        dispatch(undoLastHistoryStep())
        return
      default:
        return
    }
  }, [last, canvas, dispatch])
}
