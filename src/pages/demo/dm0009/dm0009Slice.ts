import type { SecUnit } from 'pages/api/form09/interfaces'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { AppState, AppThunk } from 'store/store'

interface Dm0009State {
  dataList: SecUnit[]
}

const initialState: Dm0009State = {
  dataList: []
}

export const dm0009Slice = createSlice({
  name: 'dm0009',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    updDataList: (state, action: PayloadAction<SecUnit[]>) => {
      const dataList = action.payload
      state.dataList = dataList
    },
  },
})

export const {
  updDataList,
} = dm0009Slice.actions

export default dm0009Slice.reducer
