import type { FC } from 'react'
import type { DcsStatement, DcsAssignment, DecisionTreeState } from './decisionTreeSlice'
import { isDcsAssignment } from './decisionTreeSlice'

const StatementCard: FC<{
  item: DcsStatement
}> = props => {
  const { isElse, cond, action } = props.item

  return (
    <div>
      {isElse ?
        <div>否則</div> :
        <div>
          當 {cond.fdName} {codeName(cond.cmpAct)} {cond.cmpValue}, {cond.fdNote}
        </div>
      }

      {isDcsAssignment(action) ?
        <div style={{ marginLeft: '2em' }}>
          值為 {action.retValue}, {action.fdNote}
        </div> :
        <pre>
          {JSON.stringify(action, null, ' ')}
        </pre>
      }
    </div>
  )
}

export default StatementCard

//---------------------------
function codeName(code: string) {
  return code === 'eq' ? '='
    : code === 'gt' ? '>'
      : code === 'ls' ? '<'
        : code === 'ge' ? '>='
          : code === 'le' ? '<='
            : code === 'eq' ? '='
              : code === 'in' ? 'in'
                : ''
}
