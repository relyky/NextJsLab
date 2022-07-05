import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

interface MetaDataState {
  blocking: boolean | undefined,
  dataList: object[] | undefined,
}

const initialState: MetaDataState = {
  blocking: false,
  dataList: [],
}

/// 資料交換緩衝區
const metaDataSlice = createSlice({
  name: 'metaData',
  initialState,
  reducers: {
    updMeta: (state, action: PayloadAction<MetaDataState>) => {
      const { payload } = action
      state = { ...state, ...payload }
    },
    resetMeta: (state) => {
      state = initialState
    },
    blockUi: (state) => {
      state.blocking = true
    },
    unblockUi: (state) => {
      state.blocking = false
    },
  },
})

export const {
  updMeta,
  resetMeta,
  blockUi,
  unblockUi,
} = metaDataSlice.actions

export default metaDataSlice.reducer
