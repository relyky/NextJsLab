import type { SecUnit } from 'pages/api/form09/interfaces'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { AppState, AppThunk } from 'store/store'
import { Color } from '@mui/material'

export interface ToDoItem {
  id: number, // a unique number
  text: string, // the text the user typed in
  completed: boolean, // a boolean flag
  color: string, // An optional color category
  outer: boolean,
}

const initialState: ToDoItem[] = [
  { id: 1, text: 'Learn React', completed: true, color: null, outer: false },
  { id: 2, text: 'Learn Redux', completed: false, color: 'purple', outer: false },
  { id: 3, text: 'Build something fun!', completed: false, color: 'blue', outer: false },
]

export const todoListSlice = createSlice({
  name: 'todoList',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addItem: (todoList /* state */, action: PayloadAction<string>) => {
      const newId = todoList.reduce((max,cur)=> (max <= cur.id ? cur.id + 1 : max), 1);
      const newItem:ToDoItem ={
        id: newId,
        text: action.payload,
        completed: false,
        color: null,
        outer: false
      };      
      todoList.push(newItem)
    },
    rmvItem: (todoList /* state */, action: PayloadAction<number>) => {
      const itemId = action.payload
      const itemIdx = todoList.findIndex(c => c.id === itemId)
      todoList.splice(itemIdx, 1)
    },
    shiftOutItem: (todoList /* state */, action: PayloadAction<number>) => {
      const itemId = action.payload
      todoList.map(cur => {
        if(cur.id === itemId) cur.outer = true;
        return cur
      })
    },
    toggleItem: (todoList /* state */, action: PayloadAction<number>) => {
      const itemId = action.payload
      todoList.map(cur => {
        if(cur.id === itemId) cur.completed = !cur.completed;
        return cur
      })
    }
  },
})

export const {
  addItem,
  rmvItem,
  toggleItem,
  shiftOutItem,
} = todoListSlice.actions

export default todoListSlice.reducer
