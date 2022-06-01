import type { AppState, AppThunk } from 'store/store'
import type { DcsCondision, DcsAssignment, DcsStatement, DecisionTreeState } from './interfaces'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import assert from 'assert'

//DecisionTree   := Statement[] & ElseStatement
//Statement      := IF Condision Then DecisionAction
//DecisionAction := Assignment | DecisionTree
//ElseStatemnet  := Special-Statement

export function isDcsAssignment(obj: any): obj is DcsAssignment {
  return 'fdNote' in obj && 'retValue' in obj;
}

const initialState: DecisionTreeState = [
  {
    isElse: false,
    cond: {
      fdNote: '是否為DBS員工',
      fdName: 'Staff',
      cmpAct: 'eq',
      cmpValue: 'Y',
    },
    action: {
      fdNote: '',
      retValue: 'Y'
    }
  },
  {
    isElse: false,
    cond: {
      fdNote: '信用小白(沒有JCIC紀錄申請)',
      fdName: 'Small_White',
      cmpAct: 'eq',
      cmpValue: 'Y',
    },
    action: {
      fdNote: '',
      retValue: '0'
    }
  },
  {
    isElse: false,
    cond: {
      fdNote: 'Customer Segment',
      fdName: '職稱',
      cmpAct: 'in',
      cmpValue: "'16','29','36','34'",
    },
    action: [
      {
        isElse: false,
        cond: {
          fdNote: 'Customer Segment',
          fdName: '客戶層級',
          cmpAct: 'eq',
          cmpValue: 'VIP',
        },
        action: {
          fdNote: '',
          retValue: 'Z'
        }
      },
      {
        isElse: true,
        cond: null,
        action: {
          fdNote: '來賓層級',
          retValue: 'GUEST'
        }
      },
    ]
  },
  {
    isElse: true,
    cond: null,
    action: {
      fdNote: '其他',
      retValue: 'Otherwise'
    }
  },
]

export const decisionTreeSlice = createSlice({
  name: 'decisionTree',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<DcsStatement>) => {
      const len = state.length
      assert(len > 0, 'decisionTree 筆數不可少於１筆。')
      state.splice(len - 1, 0, action.payload)
    },
    updateByIndex: (state, action: PayloadAction<{ item: DcsStatement, index: bigint }>) => {
      const { item, index } = action.payload
      state.splice(Number(index), 1, item)
    },
    removeByIndex: (state, action: PayloadAction<bigint>) => {
      state.splice(Number(action.payload), 1)
    },
  },
  extraReducers: (builder) => { },
})

export const {
  add,
  updateByIndex,
  removeByIndex,
} = decisionTreeSlice.actions

export default decisionTreeSlice.reducer
