import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/store'

interface SelectedArea {
  top: number
  left: number
  width: number
  height: number
}

interface SelectionState {
  selectedObjectId: string | null
  selectedArea: SelectedArea | null
  commentedObjectId: string | null
}

const initialState: SelectionState = {
  selectedObjectId: null,
  selectedArea: null,
  commentedObjectId: null,
}

const selectionSlice = createSlice({
  name: 'selection',
  initialState,
  reducers: {
    selectObject: (
      state,
      { payload }: PayloadAction<{ selectedObjectId: string; selectedArea: SelectedArea }>,
    ) => {
      state.selectedObjectId = payload.selectedObjectId
      state.selectedArea = payload.selectedArea
    },
    deselectObject: (state) => {
      state.selectedObjectId = null
      state.selectedArea = null
    },
    editComment: (state, { payload }: PayloadAction<{ commentedObjectId: string }>) => {
      state.commentedObjectId = payload.commentedObjectId
    },
    editingCommentDone: (state) => {
      state.commentedObjectId = null
    },
  },
})

export const { selectObject, deselectObject, editComment, editingCommentDone } =
  selectionSlice.actions

export const selectSelectedObjectId = ({ selection }: RootState) => {
  return selection.selectedObjectId
}
export const selectSelectedArea = ({ selection }: RootState) => {
  return selection.selectedArea
}
export const selectCommentedObjectId = ({ selection }: RootState) => {
  return selection.commentedObjectId
}

export const selectionReducer = selectionSlice.reducer
