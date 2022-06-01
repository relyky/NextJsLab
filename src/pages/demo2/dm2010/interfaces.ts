export interface DcsCondision {
    fdNote: string
    fdName: string
    cmpAct: 'gt' | 'ls' | 'ge' | 'le' | 'eq' | 'in'
    cmpValue: string | number | boolean
  }
  
  export interface DcsAssignment {
    fdNote: string
    retValue: string | number | boolean
  }
  
  export interface DcsStatement {
    isElse: boolean
    cond: DcsCondision
    action: DcsAssignment | DecisionTreeState
  }
  
  export type DecisionTreeState = DcsStatement[]
  