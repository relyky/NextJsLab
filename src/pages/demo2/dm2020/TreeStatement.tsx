// types
import type { SyntheticEvent, FC } from 'react'
import type { DcsStatement, DcsCondision, DcsAssignment } from './interfaces'
// 
import { useState, useMemo } from 'react'
import { useAppSelector, useAppDispatch } from 'hooks/hooks'
import { Box, Stack, Button, IconButton, Divider, Typography, TextField, MenuItem } from '@mui/material'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Chip, colors } from '@mui/material'
import { TreeView } from '@mui/lab'
import TreeContent from './TreeContent'
import TreeItem from './widgets/StyledTreeItem'
import Swal from 'sweetalert2'
// hooks
import { useContext } from 'react'
import { isDcsAssignment, updCond, updAssimt, newStatement, rmvStatement, moveUpward, assimtAsTree, cloneStatement } from './decisionTreeSlice'
import { AppFormContext } from './AppForm'

// CSS style
import ss from './AppForm.module.css'
// icons
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import InfoIcon from '@mui/icons-material/Info';
import WhenIcon from '@mui/icons-material/PlaylistAddCheckOutlined'
import MoreIcon from '@mui/icons-material/MoreVert'
import OnIcon from '@mui/icons-material/VisibilityOutlined'
import OffIcon from '@mui/icons-material/VisibilityOffOutlined'
import EditIcon from '@mui/icons-material/EditRounded'
import NewIcon from '@mui/icons-material/AddComment';
import ClearIcon from '@mui/icons-material/Clear'
import UpwardIcon from '@mui/icons-material/ArrowUpward'
import ForkIcon from '@mui/icons-material/CallSplit'
import PlusIcon from '@mui/icons-material/AddBoxOutlined'
import MinusIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined'
import EndIcon from '@mui/icons-material/DisabledByDefaultOutlined'
import ForwardIcon from '@mui/icons-material/ForwardTwoTone';
import ItemTypes from 'pages/demo/dm0003/ItemTypes'
import CopyIcon from '@mui/icons-material/ContentCopy'
import PasteIcon from '@mui/icons-material/CopyAll'

const TreeStatement: FC<{
    item: DcsStatement
    path: number[]
    pos: number
    selectedNodeId: string // 用來識別是否被選取了
}> = props => {
    const { isElse, action } = props.item
    //const isTreeAction = useMemo(() => !isDcsAssignment(action), [action])

    return (isElse ?
        <TreeElseItem {...props} >
            {isDcsAssignment(action) ?
                <TreeAssimtItem
                    assimt={action}
                    path={props.path}
                    pos={props.pos}
                />
                :
                <TreeContent
                    path={[...props.path, props.pos]}
                    decisionTree={action}
                    selectedNodeId={props.selectedNodeId}
                />
            }
        </TreeElseItem>
        :
        <TreeCondItem {...props}>
            {isDcsAssignment(action) ?
                <TreeAssimtItem
                    assimt={action}
                    path={props.path}
                    pos={props.pos}
                />
                :
                <TreeContent
                    path={[...props.path, props.pos]}
                    decisionTree={action}
                    selectedNodeId={props.selectedNodeId}
                />
            }
        </TreeCondItem>
    )
}

export default TreeStatement

//------------------------
const TreeCondItem: FC<{
    item: DcsStatement
    path: number[]
    pos: number
    selectedNodeId: string
}> = (props) => {
    const { item } = props
    const { cond } = props.item
    const [f_showCond, setShowCond] = useState(false)
    const appEnv = useContext(AppFormContext)
    const dispatch = useAppDispatch()

    const isSelected = item.nodeId === props.selectedNodeId;

    return (
        <>
            <TreeItem nodeId={item.nodeId}
                label={
                    <Stack direction="row" alignItems="center" className={ss.item}>
                        <Typography variant="body1" mr="1">
                            {appEnv.showNodeId && <span style={{ color: 'grey' }}>[{item.nodeId}]&nbsp;</span>}
                            {`當 ${cond.fdName} ${codeName(cond.cmpAct)} ${cond.cmpValue}, ${cond.fdNote}`}
                            {/* {appEnv.showNodeId && <Chip label={item.nodeId} variant="outlined" size="small" color="info" sx={{ mx: 1 }} />} */}
                        </Typography>

                        {(props.pos > 0) &&
                            <IconButton className={ss.command} color={'primary'} children={<UpwardIcon />}
                                onClick={e => {
                                    e.stopPropagation()
                                    dispatch(moveUpward({
                                        path: props.path,
                                        index: props.pos
                                    }))
                                }}
                            />
                        }

                        <IconButton className={ss.command} color="primary" children={<EditIcon />}
                            onClick={e => {
                                e.stopPropagation()
                                setShowCond(true)
                            }}
                        />

                        <IconButton className={ss.command} color="primary" children={<ClearIcon />}
                            onClick={e => {
                                e.stopPropagation()
                                Swal.fire({
                                    title: '確定要移除嗎？',
                                    icon: 'question',
                                    showCancelButton: true,
                                    confirmButtonText: '確定',
                                    cancelButtonText: '取消'
                                }).then(result => {
                                    if (result.isConfirmed) {
                                        dispatch(rmvStatement({
                                            path: props.path,
                                            index: props.pos
                                        }))
                                    }
                                })
                            }}
                        />

                        {(isSelected) &&
                            <IconButton className={ss.command} color="primary" children={<CopyIcon />}
                                onClick={e => {
                                    e.stopPropagation()
                                    dispatch(cloneStatement(props.pos, props.path))
                                }}
                            />
                        }

                        {(isSelected) &&
                            <IconButton className={ss.command} color="primary" children={<PasteIcon />}
                                onClick={e => {
                                    e.stopPropagation()
                                    Swal.fire('貼上複製條件，未實作。')
                                }}
                            />
                        }


                        {/* <IconButton className={ss.command} color="primary" onClick={e => {
                        e.stopPropagation()
                        alert('回應按一下')
                    }}>
                        <InfoIcon />
                    </IconButton> */}
                    </Stack>
                }
            >
                {props.children}
            </TreeItem>

            {f_showCond &&
                <CondEditDialog
                    nodeId={item.nodeId}
                    cond={cond}
                    onCancel={() => setShowCond(false)}
                    onOk={(info) => {
                        setShowCond(false)
                        dispatch(updCond({
                            cond: info,
                            index: props.pos,
                            path: props.path
                        }))
                    }}
                />
            }
        </>

    )
}

//------------------------
const TreeElseItem: FC<{
    item: DcsStatement
    path: number[]
    pos: number
}> = (props) => {
    const { item } = props
    const appEnv = useContext(AppFormContext)
    const dispatch = useAppDispatch()
    return (
        <TreeItem nodeId={item.nodeId} label={
            <Stack direction="row" alignItems="center" className={ss.item}>
                <Typography variant="body1" mr="1">
                    {appEnv.showNodeId && <span style={{ color: 'grey' }}>[{item.nodeId}]&nbsp;</span>}
                    {`否則`}
                    {/* {appEnv.showNodeId && <Chip label={item.nodeId} variant="outlined" size="small" color="info" sx={{ mx: 1 }} />} */}
                </Typography>

                <IconButton className={ss.command} color="primary" children={<NewIcon />}
                    onClick={e => {
                        e.stopPropagation()
                        dispatch(newStatement({
                            path: props.path
                        }))
                    }}
                />
            </Stack>
        }>
            {props.children}
        </TreeItem>
    )
}

//------------------------
const TreeAssimtItem: FC<{
    assimt: DcsAssignment
    path: number[]
    pos: number
}> = (props) => {
    const { assimt } = props
    const [f_showAssimt, setShowAssimt] = useState(false)
    const appEnv = useContext(AppFormContext)
    const dispatch = useAppDispatch()
    return (
        <>
            <TreeItem nodeId={assimt.nodeId} label={
                <Stack direction="row" alignItems="center" className={ss.item}>
                    <Typography variant="body1" mr="1">
                        {appEnv.showNodeId && <span style={{ color: 'grey' }}>[{assimt.nodeId}]&nbsp;</span>}
                        {`值為 ${assimt.retValue}, ${assimt.fdNote}`}
                        {/* {appEnv.showNodeId && <Chip label={assimt.nodeId} variant="outlined" size="small" color="info" sx={{ mx: 1 }} />} */}
                    </Typography>

                    <IconButton className={ss.command} color="primary" children={<EditIcon />}
                        onClick={e => {
                            e.stopPropagation()
                            setShowAssimt(true)
                        }}
                    />

                    <IconButton className={ss.command} color="primary" children={<ForkIcon />}
                        onClick={e => {
                            e.stopPropagation()
                            dispatch(assimtAsTree({
                                path: props.path,
                                index: props.pos
                            }))
                        }}
                    />
                </Stack>
            } />

            {f_showAssimt &&
                <AssimtEditDialog
                    assimt={assimt}
                    onCancel={() => setShowAssimt(false)}
                    onOk={(info) => {
                        setShowAssimt(false)
                        dispatch(updAssimt({
                            assimt: info,
                            index: props.pos,
                            path: props.path
                        }))
                    }}
                />
            }
        </>
    )
}

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
                    label="節點"
                    value={`值[${info.nodeId}]`}
                    inputProps={{ readOnly: true }}
                    variant="standard"
                    margin="normal"
                    fullWidth
                />

                <TextField
                    label="說明"
                    name="fdNote"
                    value={info.fdNote}
                    onChange={handleChange}
                    variant="standard"
                    margin="normal"
                    fullWidth
                    autoFocus
                />

                <TextField
                    label="設定值"
                    name="retValue"
                    value={info.retValue}
                    onChange={handleChange}
                    variant="standard"
                    margin="normal"
                    fullWidth
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
const CondEditDialog: FC<{
    nodeId: string
    cond: DcsCondision
    onCancel: () => void
    onOk: (info: DcsCondision) => void
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
                    選取節點：條件[{props.nodeId}] 當 {cond?.fdName} {codeName(cond?.cmpAct)} {cond?.cmpValue}, {cond?.fdNote}
                </DialogContentText>

                <TextField
                    label="節點"
                    value={`條件[${props.nodeId}]`}
                    inputProps={{ readOnly: true }}
                    variant="standard"
                    margin="normal"
                    fullWidth
                />

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

                <TextField select
                    label="比對"
                    name="cmpAct"
                    value={info.cmpAct}
                    onChange={handleChange}
                    fullWidth
                    variant="standard"
                    margin="normal"
                >
                    <MenuItem value={'gt'}>{'>'}</MenuItem>
                    <MenuItem value={'ge'}>{'>='}</MenuItem>
                    <MenuItem value={'ls'}>{'<'}</MenuItem>
                    <MenuItem value={'le'}>{'<='}</MenuItem>
                    <MenuItem value={'eq'}>{'='}</MenuItem>
                    <MenuItem value={'in'}>{'in'}</MenuItem>
                </TextField>

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