import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { AppState, AppThunk } from 'store/store'

export interface TodoItem {
  id: number, // a unique number
  text: string, // the text the user typed in
  completed: boolean, // a boolean flag
  color: string, // An optional color category
}

const initialState: TodoItem[] = [
  { id: 1, text: 'Learn React', completed: true, color: null },
  { id: 2, text: 'Learn Redux', completed: false, color: 'purple' },
  { id: 3, text: 'Build something fun!', completed: false, color: 'blue' },
]

export const todoListSlice = createSlice({
  name: 'todoList',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addItem: (todoList /* state */, action: PayloadAction<string>) => {
      const newId = todoList.reduce((max,cur)=> (max <= cur.id ? cur.id + 1 : max), 1);
      const newItem:TodoItem ={
        id: newId,
        text: action.payload,
        completed: false,
        color: null
      };      
      todoList.push(newItem)
    },
    rmvItem: (todoList /* state */, action: PayloadAction<number>) => {
      const itemId = action.payload
      const itemIdx = todoList.findIndex(c => c.id === itemId)
      todoList.splice(itemIdx, 1)
    },
    clearCompleted: (todoList /* state */) => {
      return todoList.filter(cur => !cur.completed)
    },
    toggleItem: (todoList /* state */, action: PayloadAction<number>) => {
      const itemId = action.payload
      todoList.map(cur => {
        if(cur.id === itemId) cur.completed = !cur.completed;
        return cur
      })
    },
    checkAllItem: (todoList /* state */) => {
      const isAllChecked = todoList.reduce((chk,cur)=> chk && cur.completed, true);
      todoList.map(cur => {
        cur.completed = !isAllChecked;
        return cur
      })
    }
  },
})

export const {
  addItem,
  rmvItem,
  toggleItem,
  clearCompleted,
  checkAllItem,
} = todoListSlice.actions

export default todoListSlice.reducer

//## Store Selectors → useSelector(storeSelector)`
export const activeCount = (store: AppState) => store.todoList.reduce((count, cur)=> !cur.completed ? count + 1 : count ,0)
