import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
// customized reducers
import counter from 'components/counter/counterSlice'
import decisionTree from 'pages/demo2/dm2020/decisionTreeSlice'
import dm0009 from 'pages/demo/dm0009/dm0009Slice'
import buffer from './bufferSlice'

export function makeStore() {
  return configureStore({
    reducer: {
      counter,
      buffer,
      decisionTree,
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
