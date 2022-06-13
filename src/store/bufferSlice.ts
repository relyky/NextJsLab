import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

interface BufferState {
  payload: any
}

const initialState: BufferState = {
  payload: null
}

/// 資料交換緩衝區
const bufferSlice = createSlice({
  name: 'buffer',
  initialState,
  reducers: {
    setBuffer: (state, action: PayloadAction<object>) => {
      state.payload = { ...action.payload }
    },
  },
})

export const { setBuffer } = bufferSlice.actions

export default bufferSlice.reducer
