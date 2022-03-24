import React, { useEffect, useState } from 'react'

import { useItemList } from '@/pages/Editor/hooks'
import { setCurrentElementId, setDefaultEditorMode, selectEditorModeState } from '@/store/reducers'
import { useAppDispatch, useAppSelector } from '@/hooks'

import { EditorModeMenu } from './EditorModeMenu'
import { CatalogMenu } from './CatalogMenu'

export const ToolsPanel = () => {
  const dispatch = useAppDispatch()
  const [menuItems, setMenuItems] = useState<any>([])
  const { editorMode } = useAppSelector(selectEditorModeState)

  const constantsItems = useItemList('constants')
  const elementsItems = useItemList('elements')
  const pipesItems = useItemList('pipes')
  const showToolsMenu = ['pipes', 'constants', 'elements'].includes(editorMode)

  const onGoBackClick = () => {
    dispatch(setDefaultEditorMode())
  }

  const onItemClick = (item: any) => {
    dispatch(setCurrentElementId({ type: editorMode, elementId: item.id }))
  }

  useEffect(() => {
    switch (editorMode) {
      case 'constants':
        setMenuItems(constantsItems)
        break

      case 'elements':
        setMenuItems(elementsItems)
        break

      case 'pipes':
        setMenuItems(pipesItems)
        break

      default:
        setMenuItems(constantsItems)
    }
  }, [editorMode])

  if (!showToolsMenu) {
    return <EditorModeMenu />
  } else {
    if (editorMode === 'constants' || editorMode === 'elements' || editorMode === 'pipes') {
      return (
        <CatalogMenu items={menuItems} onGoBackClick={onGoBackClick} onItemClick={onItemClick} />
      )
    } else {
      return null
    }
  }
}
