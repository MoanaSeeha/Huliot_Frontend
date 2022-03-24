import {
  createAction,
  createReducer,
  createSelector,
  AnyAction,
  PayloadAction,
} from '@reduxjs/toolkit'
import {
  AddIconHistoryAction,
  RemoveIconHistoryAction,
  AddPipeHistoryAction,
  RemovePipeHistoryAction,
  ModifyPipeHistoryAction,
  RotateIconHistoryAction,
  UpdateCommentHistoryAction,
  MoveSelectionHistoryAction,
} from '@/store/reducers/history'
import { RootState } from '@/store'
import { HuliotModel } from '@/fabric'

const initialState: HuliotModel = {
  objects: {
    icons: {},
    pipes: {},
  },
  hintK: 1,
}

const isAddIcon = (action: AnyAction): action is PayloadAction<AddIconHistoryAction> =>
  action.type === 'history/addToHistory' && action.payload.userAction === 'add/icon'
const isRemoveIcon = (action: AnyAction): action is PayloadAction<RemoveIconHistoryAction> =>
  action.type === 'history/addToHistory' && action.payload.userAction === 'remove/icon'
const isAddPipe = (action: AnyAction): action is PayloadAction<AddPipeHistoryAction> =>
  action.type === 'history/addToHistory' && action.payload.userAction === 'add/pipe'
const isRemovePipe = (action: AnyAction): action is PayloadAction<RemovePipeHistoryAction> =>
  action.type === 'history/addToHistory' && action.payload.userAction === 'remove/pipe'
const isModifyPipe = (action: AnyAction): action is PayloadAction<ModifyPipeHistoryAction> =>
  action.type === 'history/addToHistory' && action.payload.userAction === 'modify/pipe'
const isRotateIcon = (action: AnyAction): action is PayloadAction<RotateIconHistoryAction> =>
  action.type === 'history/addToHistory' && action.payload.userAction === 'rotate/icon'
const isUpdateComment = (action: AnyAction): action is PayloadAction<UpdateCommentHistoryAction> =>
  action.type === 'history/addToHistory' && action.payload.userAction === 'update/comment'
const isMoveSelection = (action: AnyAction): action is PayloadAction<MoveSelectionHistoryAction> =>
  action.type === 'history/addToHistory' && action.payload.userAction === 'move/selection'

export const loadModel = createAction<HuliotModel>('load/model')
export const clearModel = createAction<undefined>('clear/model')
export const setHintK = createAction<number>('setHintK/model')

export const modelReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(clearModel, (state) => {
      state.objects.icons = {}
      state.objects.pipes = {}
      state.hintK = 1
    })
    .addCase(loadModel, (state, { payload }) => {
      state.objects = payload.objects
      state.hintK = payload.hintK
    })
    .addCase(setHintK, (state, { payload }) => {
      state.hintK = payload
    })
    .addMatcher(isAddIcon, (state, { payload }) => {
      const { id, subType, x, y, comment, svgString, angle } = payload
      const newIcon = { id, subType, x, y, comment, svgString, angle }
      state.objects.icons[id] = newIcon
    })
    .addMatcher(isRemoveIcon, (state, { payload }) => {
      delete state.objects.icons[payload.id]
    })
    .addMatcher(isAddPipe, (state, { payload }) => {
      const { id, coords, label, comment } = payload
      const newPipe = { id, coords, label, comment }
      state.objects.pipes[id] = newPipe
    })
    .addMatcher(isRemovePipe, (state, { payload }) => {
      delete state.objects.pipes[payload.id]
    })
    .addMatcher(isModifyPipe, (state, { payload }) => {
      const pipe = state.objects.pipes[payload.id]
      if (pipe) {
        pipe.coords = payload.newCoords
      }
    })
    .addMatcher(isRotateIcon, (state, { payload }) => {
      const icon = state.objects.icons[payload.id]
      if (icon) {
        icon.angle = payload.newAngle
      }
    })
    .addMatcher(isUpdateComment, (state, { payload }) => {
      const element = state.objects.icons[payload.id] || state.objects.pipes[payload.id]
      if (element) {
        element.comment = payload.newComment
      }
    })
    .addMatcher(isMoveSelection, (state, { payload }) => {
      payload.ids.forEach((id) => {
        const icon = state.objects.icons[id]
        if (icon) {
          icon.x += payload.dx
          icon.y += payload.dy
        }
        const pipe = state.objects.pipes[id]
        if (pipe) {
          pipe.coords.x1 += payload.dx
          pipe.coords.y1 += payload.dy
          pipe.coords.x2 += payload.dx
          pipe.coords.y2 += payload.dy
        }
      })
    })
})

const selectSelf = (state: RootState) => state
export const selectLayoutModel = createSelector(selectSelf, (state) => state.model)
