import type { FC } from 'react'
import type { DcsStatement, DcsCondision, DcsAssignment } from './interfaces'
import { useState, useEffect } from 'react'
import { useAppSelector, useAppDispatch } from 'hooks/hooks'
import { Paper, Box, Collapse, IconButton, Button } from '@mui/material'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material'
import { TextField } from '@mui/material'

import { isDcsAssignment, updCond, updAssimt, newStatement } from './decisionTreeSlice'
import TreeContent from './TreeContent'

import WhenIcon from '@mui/icons-material/PlaylistAddCheckOutlined'
import MoreIcon from '@mui/icons-material/MoreVert'
import OnIcon from '@mui/icons-material/VisibilityOutlined'
import OffIcon from '@mui/icons-material/VisibilityOffOutlined'
import EditIcon from '@mui/icons-material/EditRounded'
import NewIcon from '@mui/icons-material/AddComment'

const StatementCard: FC<{
  item: DcsStatement,
  path: number[],
  pos: number
}> = props => {
  //const decisionTree = useAppSelector(store => store.decisionTree)
  const dispatch = useAppDispatch()

  const { isElse, cond, action } = props.item

  const [f_showDetail, setShowDetail] = useState(true)
  const [f_showCond, setShowCond] = useState(false)
  const [f_showAss, setShowAss] = useState(false)

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

            <IconButton color="primary" onClick={() => dispatch(newStatement({ path: props.path }))}>
              <NewIcon />
            </IconButton>
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

            <IconButton color={'primary'} onClick={() => setShowCond(true)} >
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
              <Box display="flex" alignItems="center">
                <Box flexGrow={1}>值為 {action.retValue}, {action.fdNote}</Box>
                <IconButton onClick={() => setShowAss(true)} color={'primary'}>
                  <EditIcon />
                </IconButton>
              </Box>
            </Paper>
          </Box>
          :
          <Box sx={{ m: 1, pl: '2em' }}>
            <TreeContent path={[...props.path, props.pos]} decisionTree={action} />
          </Box>
        }
      </Collapse>

      {f_showCond &&
        <CondEditDialog
          cond={cond}
          onCancel={() => setShowCond(false)}
          onOk={(info) => {
            //console.info('CondEditDialog:Ok', { info })
            dispatch(updCond({
              cond: info,
              index: props.pos,
              path: props.path
            }))
            setShowCond(false)
          }}
        />
      }

      {f_showAss &&
        <AssimtEditDialog
          assimt={action as DcsAssignment}
          onCancel={() => setShowAss(false)}
          onOk={(info) => {
            dispatch(updAssimt({
              assimt: info,
              index: props.pos,
              path: props.path
            }))
            setShowAss(false)
          }}
        />
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

//---------------------------
const CondEditDialog: FC<{
  cond: DcsCondision,
  onCancel: () => void,
  onOk: (info: DcsCondision) => void,
}> = props => {
  const { cond } = props
  const [info, setInfo] = useState<DcsCondision>({ ...cond })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name
    const value = event.target.value
    setInfo({ ...info, [name]: value })
  }

  return (
    <Dialog open={true} onClose={() => props.onCancel()}>
      <DialogTitle>編輯條件</DialogTitle>
      <DialogContent>
        <DialogContentText>
          選取節點：當 {cond?.fdName} {codeName(cond?.cmpAct)} {cond?.cmpValue}, {cond?.fdNote}
        </DialogContentText>

        <TextField
          label="說明"
          name="fdNote"
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

//---------------------------
const AssimtEditDialog: FC<{
  assimt: DcsAssignment,
  onCancel: () => void,
  onOk: (info: DcsAssignment) => void,
}> = props => {
  const { assimt } = props
  const [info, setInfo] = useState<DcsAssignment>({ ...assimt })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name
    const value = event.target.value
    setInfo({ ...info, [name]: value })
  }

  return (
    <Dialog open={true} onClose={() => props.onCancel()}>
      <DialogTitle>編輯條件</DialogTitle>
      <DialogContent>

        <TextField
          label="說明"
          name="fdNote"
          value={info.fdNote}
          onChange={handleChange}
          autoFocus
          fullWidth
          variant="standard"
          margin="normal"
        />

        <TextField
          label="設定值"
          name="retValue"
          value={info.retValue}
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
