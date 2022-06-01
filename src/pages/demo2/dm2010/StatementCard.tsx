import type { FC } from 'react'
import type { DcsStatement } from './decisionTreeSlice'
import { useState, useMemo } from 'react'
import { Paper, Box, Switch, Collapse, IconButton } from '@mui/material'
import { isDcsAssignment } from './decisionTreeSlice'
import TreeContent from './TreeContent'

import WhenIcon from '@mui/icons-material/PlaylistAddCheckOutlined'
import MoreIcon from '@mui/icons-material/MoreVert'
import OnIcon from '@mui/icons-material/VisibilityOutlined';
import OffIcon from '@mui/icons-material/VisibilityOffOutlined';

const StatementCard: FC<{
  item: DcsStatement
}> = props => {
  const [f_show, setShowFlag] = useState(true)
  const { isElse, cond, action } = props.item

  const isTreeAction = !isDcsAssignment(action)
  const toggleShow = () => setShowFlag(f => !f)

  return (
    <div>
      {isElse ?
        <Paper sx={{ m: 1, p: 1 }}>
          <Box display="flex" alignItems="center">
            <WhenIcon sx={{ mr: 1 }} />
            <Box flexGrow={1}>否則</Box>

            {isTreeAction && <IconButton onClick={toggleShow} color={f_show ? 'primary' : 'default'}>{f_show ? <OnIcon /> : <OffIcon />}</IconButton>}

          </Box>
        </Paper>
        :
        <Paper sx={{ m: 1, p: 1 }}>
          <Box display="flex" alignItems="center">
            <WhenIcon sx={{ mr: 1 }} />
            <Box flexGrow={1}>當 {cond.fdName} {codeName(cond.cmpAct)} {cond.cmpValue}, {cond.fdNote}</Box>

            {isTreeAction && <IconButton onClick={toggleShow} color={f_show ? 'primary' : 'default'}>{f_show ? <OnIcon /> : <OffIcon />}</IconButton>}

            <IconButton color="primary">
              <MoreIcon />
            </IconButton>
          </Box>
        </Paper>
      }

      <Collapse in={f_show} >
        {isDcsAssignment(action) ?
          <Box sx={{ m: 1, pl: '2em' }}>
            <Paper sx={{ m: 1, p: 1 }} elevation={0}>
              值為 {action.retValue}, {action.fdNote}
            </Paper>
          </Box>
          :
          <Box sx={{ m: 1, pl: '2em' }}>
            <TreeContent parent={props.item} decisionTree={action} />
          </Box>
        }
      </Collapse>

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
