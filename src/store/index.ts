import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'

import {
  editorModeReducer,
  historyReducer,
  loadingReducer,
  selectionReducer,
  modelReducer,
} from './reducers'

const reducer = {
  editorMode: editorModeReducer,
  history: historyReducer,
  loading: loadingReducer,
  model: modelReducer,
  selection: selectionReducer,
}

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: true,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
