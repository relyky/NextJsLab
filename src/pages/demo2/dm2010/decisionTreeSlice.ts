import type { AppState, AppThunk } from 'store/store'
import type { WritableDraft } from 'immer/dist/internal';
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
    updateByIndex: (state, action: PayloadAction<{ item: DcsStatement, index: number }>) => {
      const { item, index } = action.payload
      state.splice(index, 1, item)
    },
    removeByIndex: (state, action: PayloadAction<number>) => {
      state.splice(action.payload, 1)
    },
    updCond(state, action: PayloadAction<{ cond: DcsCondision, index: number, path: number[] }>) {
      const { cond, index, path } = action.payload
      //console.debug('updCond', { cond, index, path })
      
      let branch = state
      path.forEach(i => {
        branch = branch[i].action as WritableDraft<DcsStatement>[]
      });

      branch[index].cond = cond
    },
    updAssimt(state, action: PayloadAction<{ assimt: DcsAssignment, index: number, path: number[] }>) {
      const { assimt, index, path } = action.payload
      //console.debug('updCond', { cond, index, path })
      
      let branch = state
      path.forEach(i => {
        branch = branch[i].action as WritableDraft<DcsStatement>[]
      });

      branch[index].action = assimt
    },
  },
  extraReducers: (builder) => { },
})

export const {
  updCond,
  updAssimt,
  add,
  updateByIndex,
  removeByIndex,
} = decisionTreeSlice.actions

export default decisionTreeSlice.reducer
