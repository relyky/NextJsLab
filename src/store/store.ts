import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
// customized reducers
import counterReducer from 'components/counter/counterSlice'
import decisionTreeReducer from 'pages/demo2/dm2010/decisionTreeSlice'

export function makeStore() {
  return configureStore({
    reducer: { 
      counter: counterReducer,
      decisionTree:  decisionTreeReducer,
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
