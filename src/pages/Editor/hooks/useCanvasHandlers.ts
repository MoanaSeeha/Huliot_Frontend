import { useEffect, useState } from 'react'

import {
  setConstantsModeHandlers,
  setElementsModeHandlers,
  setPipesModeHandlers,
  setNavigationModeHandlers,
  setKitsModeHandlers,
  setToolsModeHandlers,
} from '@/fabric'
import { useAppSelector } from '@/hooks'
import { selectEditorModeState } from '@/store/reducers'

import { useEditorContext } from './useEditorContext'
import { useItem } from './useItems'

export const useCanvasHandlers = () => {
  const { canvas } = useEditorContext()
  const { editorMode, drawingElements } = useAppSelector(selectEditorModeState)
  const currentConstantsItem = useItem('constants', drawingElements['constants'])
  const currentElementsItem = useItem('elements', drawingElements['elements'])
  const currentPipesItem = useItem('pipes', drawingElements['pipes'])
  const [pipeDiameter, setPipeDiameter] = useState('32')

  useEffect(() => {
    setPipeDiameter(drawingElements.pipes)
  }, [drawingElements.pipes])

  useEffect(() => {
    if (!canvas) {
      console.log('Warning: canvas is empty for some reason')
      return
    }

    switch (editorMode) {
      case 'navigation':
        setNavigationModeHandlers({ canvas })
        return

      case 'elements':
        setElementsModeHandlers({
          canvas,
          // @ts-ignore
          currentIcon: currentElementsItem.svgIcon,
        })
        return

      case 'constants':
        setConstantsModeHandlers({
          canvas,
          // @ts-ignore
          currentIcon: currentConstantsItem.svgIcon,
        })
        return

      case 'kits':
        setKitsModeHandlers({ canvas })
        return

      case 'pipes':
        setPipesModeHandlers({ canvas, pipeDiameter })
        return

      case 'tools':
        setToolsModeHandlers({ canvas })
        return

      default:
        console.log('There is no handlers for editor mode ' + editorMode)
    }
  }, [
    canvas,
    editorMode,
    currentConstantsItem,
    currentElementsItem,
    currentPipesItem,
    pipeDiameter,
  ])
}
