import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/store'
import { HuliotIconSubtype, PipeCoords } from '@/fabric'

interface HistoryState {
  userActions: Array<HistoryUserAction>
}

const initialState: HistoryState = {
  userActions: [],
}

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addToHistory: (state, action: PayloadAction<HistoryUserAction>) => {
      state.userActions.push(action.payload)
    },
    undoLastHistoryStep: (state) => {
      state.userActions.pop()
    },
    clearHistory: (state) => {
      state.userActions = []
    },
  },
})

export const { addToHistory, clearHistory, undoLastHistoryStep } = historySlice.actions

export const selectHistoryUserActions = ({ history }: RootState) => history.userActions
export const selectHistoryLastUserAction = ({ history }: RootState) => {
  const length = history.userActions.length
  return length ? history.userActions[length - 1] : null
}
export const selectHistoryUndoIsAvailable = ({ history }: RootState) => !!history.userActions.length

export const historyReducer = historySlice.reducer

export type AddIconHistoryAction = {
  userAction: 'add/icon'
  id: string
  subType: HuliotIconSubtype
  svgString: string
  x: number
  y: number
  angle: number
  comment?: string
}

export type RemoveIconHistoryAction = {
  userAction: 'remove/icon'
  id: string
  subType: HuliotIconSubtype
  svgString: string
  x: number
  y: number
  angle: number
  comment?: string
}

export type AddPipeHistoryAction = {
  userAction: 'add/pipe'
  id: string
  coords: PipeCoords
  label: string
  comment?: string
}

export type RemovePipeHistoryAction = {
  userAction: 'remove/pipe'
  id: string
  label: string
  coords: PipeCoords
  comment?: string
}

export type ModifyPipeHistoryAction = {
  userAction: 'modify/pipe'
  id: string
  coords: PipeCoords
  newCoords: PipeCoords
}

export type RotateIconHistoryAction = {
  userAction: 'rotate/icon'
  id: string
  angle: number
  newAngle: number
}

export type UpdateCommentHistoryAction = {
  userAction: 'update/comment'
  id: string
  comment: string
  newComment: string
}

export type MoveSelectionHistoryAction = {
  userAction: 'move/selection'
  ids: string[]
  dx: number
  dy: number
}

export type HistoryUserAction =
  | AddIconHistoryAction
  | RemoveIconHistoryAction
  | AddPipeHistoryAction
  | RemovePipeHistoryAction
  | ModifyPipeHistoryAction
  | RotateIconHistoryAction
  | UpdateCommentHistoryAction
  | MoveSelectionHistoryAction
