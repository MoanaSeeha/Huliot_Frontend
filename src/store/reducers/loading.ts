import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '@/store'

interface LoadingState {
  loading: boolean
}

const initialState: LoadingState = {
  loading: false,
}

const loadingSlice = createSlice({
  name: 'selection',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true
    },
    resetLoading: (state) => {
      state.loading = false
    },
  },
})

export const { setLoading, resetLoading } = loadingSlice.actions

export const selectLoadingState = ({ loading }: RootState) => {
  return loading.loading
}

export const loadingReducer = loadingSlice.reducer
