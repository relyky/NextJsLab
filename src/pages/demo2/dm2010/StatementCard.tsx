import type { DcsStatement, DcsCondision } from './interfaces'
import { FC, useEffect } from 'react'
import { useState } from 'react'
import { Paper, Box, Collapse, IconButton, Button } from '@mui/material'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material'
import { TextField } from '@mui/material'

import { isDcsAssignment } from './decisionTreeSlice'
import TreeContent from './TreeContent'

import WhenIcon from '@mui/icons-material/PlaylistAddCheckOutlined'
import MoreIcon from '@mui/icons-material/MoreVert'
import OnIcon from '@mui/icons-material/VisibilityOutlined'
import OffIcon from '@mui/icons-material/VisibilityOffOutlined'
import EditIcon from '@mui/icons-material/EditRounded'

const StatementCard: FC<{
  item: DcsStatement
}> = props => {
  const { isElse, cond, action } = props.item

  const [f_showDetail, setShowDetail] = useState(true)
  const [f_showCond, setShowCond] = useState(false)

  const toggleShowDetail = () => setShowDetail(f => !f)

  const isTreeAction = !isDcsAssignment(action)

  return (
    <div>
      {isElse ?
        <Paper sx={{ m: 1, p: 1 }}>
          <Box display="flex" alignItems="center">
            <WhenIcon sx={{ mr: 1 }} />
            <Box flexGrow={1}>否則</Box>

            {isTreeAction &&
              <IconButton onClick={toggleShowDetail} color={f_showDetail ? 'primary' : 'default'}>
                {f_showDetail ? <OnIcon /> : <OffIcon />}
              </IconButton>
            }

          </Box>
        </Paper>
        :
        <Paper sx={{ m: 1, p: 1 }}>
          <Box display="flex" alignItems="center">
            <WhenIcon sx={{ mr: 1 }} />
            <Box flexGrow={1}>當 {cond.fdName} {codeName(cond.cmpAct)} {cond.cmpValue}, {cond.fdNote}</Box>

            {isTreeAction &&
              <IconButton onClick={toggleShowDetail} color={f_showDetail ? 'primary' : 'default'}>
                {f_showDetail ? <OnIcon /> : <OffIcon />}
              </IconButton>
            }

            <IconButton onClick={() => setShowCond(true)} color={'primary'}>
              <EditIcon />
            </IconButton>

            <IconButton color="primary">
              <MoreIcon />
            </IconButton>
          </Box>
        </Paper>
      }

      <Collapse in={f_showDetail} >
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

      <CondEditDialog
        open={f_showCond}
        cond={cond}
        onCancel={() => setShowCond(false)}
        onOk={() => setShowCond(false)}
      />

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

//---------------------------
const CondEditDialog: FC<{
  open: boolean,
  cond: DcsCondision,
  onCancel: () => void,
  onOk: (info: object) => void,
}> = props => {
  const { open, cond } = props
  const [info, setInfo] = useState<DcsCondision>({ fdNote: '', fdName: '', cmpAct: 'eq', cmpValue: '' })

  useEffect(() => {
    if (open) {
      setInfo({ ...cond })
    }
  }, [open])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name
    const value = event.target.value
    setInfo({ ...info, [name]: value })
  }

  console.log('CondEditDialog', { cond })
  return (
    <Dialog open={props.open} onClose={() => props.onCancel()}>
      <DialogTitle>編輯條件</DialogTitle>
      <DialogContent>
        <DialogContentText>
          選取節點：當 {cond?.fdName} {codeName(cond?.cmpAct)} {cond?.cmpValue}, {cond?.fdNote}
        </DialogContentText>

        <TextField
          label="說明"
          name="fdNode"
          value={info.fdNote}
          onChange={handleChange}
          autoFocus
          fullWidth
          variant="standard"
          margin="normal"
        />

        <TextField
          label="欄位"
          name="fdName"
          value={info.fdName}
          onChange={handleChange}
          fullWidth
          variant="standard"
          margin="normal"
        />

        <TextField
          label="比對"
          name="cmpAct"
          value={info.cmpAct}
          onChange={handleChange}
          fullWidth
          variant="standard"
          margin="normal"
        />

        <TextField
          label="設定值"
          name="cmpValue"
          value={info.cmpValue}
          onChange={handleChange}
          fullWidth
          variant="standard"
          margin="normal"
        />

      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.onCancel()}>取消</Button>
        <Button variant='contained' onClick={() => props.onOk(info)}>確認</Button>
      </DialogActions>
    </Dialog>
  )
}
