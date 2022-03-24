import React, { FC } from 'react'

import { ContextMenu } from '@/components'

import { EditorContextProvider } from './hooks'
import { EditorCanvas, ToolsPanel, CommonButtons } from './components'

export const Editor: FC = () => {
  return (
    <EditorContextProvider>
      <ContextMenu>
        <ToolsPanel />
        <CommonButtons />
      </ContextMenu>

      <EditorCanvas canvasId="editor" />
    </EditorContextProvider>
  )
}
