import type { AppState, AppThunk } from 'store/store'
import type { WritableDraft } from 'immer/dist/internal';
import type { DcsCondision, DcsAssignment, DcsStatement, DecisionTreeState } from './interfaces'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import assert from 'assert'
import { ConstructionOutlined } from '@mui/icons-material';

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
    newStatement(state, action: PayloadAction<{ path: number[] }>) {
      /// 新增一筆條件陳述

      const { path } = action.payload

      let branch = state
      path.forEach(i => {
        branch = branch[i].action as WritableDraft<DcsStatement>[]
      });

      // 新增一筆空白陳述。
      const newItem: DcsStatement = {
        isElse: false,
        cond: {
          fdName: 'New Field Name',
          fdNote: '新欄位說明',
          cmpAct: 'eq',
          cmpValue: '欄位比較值'
        },
        action: {
          fdNote: '回傳值說明',
          retValue: '回傳值'
        }
      }

      const len = branch.length
      assert(len > 0, '條件陳述筆數不可少於１筆。')
      branch.splice(len - 1, 0, newItem)
    },
    rmvStatement(state, action: PayloadAction<{ path: number[], index: number }>) {
      /// 移除一筆條件陳述

      const { path, index } = action.payload

      let parent: DcsStatement = null;
      let branch = state
      path.forEach(i => {
        parent = branch[i]
        branch = branch[i].action as WritableDraft<DcsStatement>[]
      });

      branch.splice(index, 1)

      //## 若剩最後一筆 ElseStatement 則轉換成 DcsAssignmnet。然頂層不可轉換。
      if (branch.length === 1 && parent !== null) {
        const assimt = branch[0].action
        parent.action = assimt
      }
    },
    moveUpward(state, action: PayloadAction<{ path: number[], index: number }>) {
      /// 移除一筆條件陳述

      const { path, index } = action.payload
      assert(index > 0, '位罝為0時不可能再上移。')

      let branch = state
      path.forEach(i => {
        branch = branch[i].action as WritableDraft<DcsStatement>[]
      });

      const prev = branch[index - 1]
      const curr = branch[index]

      //效果等同：與前面換位置
      branch.splice(index, 1, prev)     // 前位後罝
      branch.splice(index - 1, 1, curr) // 現位前置
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
    assimtAsTree(state, action: PayloadAction<{ index: number, path: number[] }>) {
      const { index, path } = action.payload
      //console.debug('updCond', { cond, index, path })

      let branch = state
      path.forEach(i => {
        branch = branch[i].action as WritableDraft<DcsStatement>[]
      });

      const assimt = branch[index].action as DcsAssignment

      const newSubTree: DecisionTreeState = [
        {
          isElse: false,
          cond: {
            fdName: 'New Field Name',
            fdNote: '新欄位說明',
            cmpAct: 'eq',
            cmpValue: '欄位比較值'
          },
          action: {
            fdNote: '回傳值說明',
            retValue: '回傳值'
          }
        },
        {
          isElse: true,
          cond: null,
          action: {
            fdNote: assimt.fdNote,
            retValue: assimt.retValue
          }
        },
      ]

      // 轉換成 Decision-Tree 模式
      branch[index].action = newSubTree
    },
  },
  extraReducers: (builder) => { },
})

export const {
  updCond,
  updAssimt,
  newStatement,
  rmvStatement,
  moveUpward,
  assimtAsTree,
} = decisionTreeSlice.actions

export default decisionTreeSlice.reducer