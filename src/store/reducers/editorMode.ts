import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/store'

const DEFAULT_EDITOR_MODE = 'tools'
export type EditorMode =
  | 'navigation'
  | 'constants'
  | 'elements'
  | 'kits'
  | 'pipes'
  | 'verticals'
  | 'tools'
  | 'more'

interface EditorModeState {
  editorMode: EditorMode
  drawingElements: {
    [key: string]: string
  }
}

const initialState: EditorModeState = {
  editorMode: DEFAULT_EDITOR_MODE,
  drawingElements: {
    constants: '07f2e764-ab98-4ef5-9bdf-136da6fbf07d',
    elements: '12b72533-4fc0-41be-92f9-471866cd610c',
    pipes: '32',
  },
}

const editorModeSlice = createSlice({
  name: 'editorMode',
  initialState,
  reducers: {
    setEditorMode: (state, { payload }: PayloadAction<{ editorMode: EditorMode }>) => {
      state.editorMode = payload.editorMode
    },
    setDefaultEditorMode: (state) => {
      state.editorMode = DEFAULT_EDITOR_MODE
    },
    setCurrentElementId: (
      state,
      { payload }: PayloadAction<{ type: EditorMode; elementId: string }>,
    ) => {
      state.drawingElements[payload.type] = payload.elementId
    },
  },
})

export const { setEditorMode, setDefaultEditorMode, setCurrentElementId } = editorModeSlice.actions

export const selectEditorModeState = ({ editorMode }: RootState) => {
  return editorMode
}

export const editorModeReducer = editorModeSlice.reducer
