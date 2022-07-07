import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
// customized reducers
import counter from 'components/counter/counterSlice'
import decisionTree from 'views/demo2/dm2020/decisionTreeSlice'
import buffer from './bufferSlice'
import metaData from './metaDataSlice'
import dm0009 from 'pages/demo/dm0009/dm0009Slice'

export function makeStore() {
  return configureStore({
    reducer: {
      counter,
      decisionTree,
      buffer,
      metaData,
      dm0009,
    },
  })
}

const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>

export default store
