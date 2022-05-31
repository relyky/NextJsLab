import type { FC } from 'react'
import type { DcsStatement } from './decisionTreeSlice'
import { useState } from 'react'
import { Paper, Box } from '@mui/material'
import { isDcsAssignment } from './decisionTreeSlice'
import TreeContent from './TreeContent'

import WhenIcon from '@mui/icons-material/PlaylistAddCheckOutlined'

const StatementCard: FC<{
  item: DcsStatement
}> = props => {
  const [f_show, setShowFlag] = useState(true)
  const { isElse, cond, action } = props.item



  return (
    <div>
      {isElse ?
        <Paper sx={{ m: 1, p: 1 }}>
          <WhenIcon sx={{ mr: 1, verticalAlign: 'middle' }} />否則
        </Paper>
        :
        <Paper sx={{ m: 1, p: 1 }}>
          <WhenIcon sx={{ mr: 1, verticalAlign: 'middle' }} />當 {cond.fdName} {codeName(cond.cmpAct)} {cond.cmpValue}, {cond.fdNote}
        </Paper>
      }

      {isDcsAssignment(action) ?
        <Box sx={{ m: 1, pl: '2em' }}>
          <Paper sx={{ m: 1, p: 1 }} elevation={0}>
            值為 {action.retValue}, {action.fdNote}
          </Paper>
        </Box>
        :
        <Box sx={{ m: 1, pl: '2em' }}>
          <TreeContent decisionTree={action} />
        </Box>
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
