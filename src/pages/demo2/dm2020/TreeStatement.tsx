// types
import type { SyntheticEvent, FC } from 'react'
import type { DcsStatement, DcsCondision, DcsAssignment } from './interfaces'
// 
import { useState, useMemo } from 'react'
import { useAppSelector, useAppDispatch } from 'hooks/hooks'
import { Box, Button, IconButton, Divider, Typography, TextField } from '@mui/material'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, colors } from '@mui/material'
import { TreeView } from '@mui/lab'
import TreeContent from './TreeContent'
import TreeItem from './widgets/StyledTreeItem'
// hooks
import { isDcsAssignment, updCond, updAssimt, newStatement, rmvStatement, moveUpward, assimtAsTree } from './decisionTreeSlice'
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
import NewIcon from '@mui/icons-material/AddComment'
import ClearIcon from '@mui/icons-material/Clear'
import UpwardIcon from '@mui/icons-material/ArrowUpward'
import TransIcon from '@mui/icons-material/Transform'
import PlusIcon from '@mui/icons-material/AddBoxOutlined'
import MinusIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined'
import EndIcon from '@mui/icons-material/DisabledByDefaultOutlined'
import ForwardIcon from '@mui/icons-material/ForwardTwoTone';
import ItemTypes from 'pages/demo/dm0003/ItemTypes'

const TreeStatement: FC<{
    item: DcsStatement,
    path: number[],
    pos: number
}> = props => {
    const { nodeId, isElse, cond, action } = props.item

    const dispatch = useAppDispatch()

    const isTreeAction = !isDcsAssignment(action)
    const [f_showCond, setShowCond] = useState(false)

    return (
        <>
            {isElse ?
                <TreeItem nodeId={`${nodeId}`} label={`[${nodeId}]否則`} >
                    {isDcsAssignment(action) ?
                        <TreeAssimtItem assimt={action}
                            onOk={info => dispatch(updAssimt({
                                assimt: info,
                                index: props.pos,
                                path: props.path
                            }))}
                        />
                        :
                        <TreeContent path={[...props.path, props.pos]} decisionTree={action} />
                    }
                </TreeItem>
                :
                <TreeCondItem nodeId={nodeId} desc={`[${nodeId}]當 ${cond.fdName} ${codeName(cond.cmpAct)} ${cond.cmpValue}, ${cond.fdNote}`} >
                    {isDcsAssignment(action) ?
                        <TreeAssimtItem assimt={action}
                            onOk={info => dispatch(updAssimt({
                                assimt: info,
                                index: props.pos,
                                path: props.path
                            }))}
                        />
                        :
                        <TreeContent path={[...props.path, props.pos]} decisionTree={action} />
                    }
                </TreeCondItem>
            }
        </>
    )

    // if (isElse) return (
    //     <TreeItem nodeId={`${nodeId}`} label={`[${nodeId}]否則`} >
    //         {isDcsAssignment(action) ?
    //             <TreeAssimtItem nodeId={action.nodeId} desc={`[${action.nodeId}]值為 ${action.retValue}, ${action.fdNote}`} />
    //             :
    //             <TreeContent path={[...props.path, props.pos]} decisionTree={action} />
    //         }
    //     </TreeItem>
    // )

    // return (
    //     <TreeCondItem nodeId={nodeId} desc={`[${nodeId}]當 ${cond.fdName} ${codeName(cond.cmpAct)} ${cond.cmpValue}, ${cond.fdNote}`} >
    //         {isDcsAssignment(action) ?
    //             <TreeAssimtItem nodeId={action.nodeId} desc={`[${action.nodeId}]值為 ${action.retValue}, ${action.fdNote}`} />
    //             :
    //             <TreeContent path={[...props.path, props.pos]} decisionTree={action} />
    //         }
    //     </TreeCondItem>
    // )
}

export default TreeStatement

//------------------------
const TreeCondItem: FC<{
    nodeId: string,
    desc: string,
}> = (props) => {
    return (
        <TreeItem nodeId={props.nodeId} label={
            <Box className={ss.item} sx={{ display: 'flex', alignItems: 'center' }}>
                {/* <Box component={InfoIcon} color="inherit" sx={{ mr: 1 }} /> */}
                <Typography variant="body1" sx={{ fontWeight: 'inherit', flexGrow: 0, mr: 1 }}>
                    {props.desc}
                    {/* {'當 客戶層級 = VIP16, Customer Segment 17'} */}
                </Typography>

                <IconButton className={ss.command} color="primary" size="small" component="span">
                    <UpwardIcon />
                </IconButton>
                <IconButton className={ss.command} color="primary" size="small" component="span">
                    <EditIcon />
                </IconButton>
                <IconButton className={ss.command} color="primary" size="small" component="span">
                    <ClearIcon />
                </IconButton>
                <IconButton className={ss.command} color="primary" size="small" component="span" onClick={e => {
                    e.stopPropagation();
                    alert('回應按一下');
                }}>
                    <InfoIcon />
                </IconButton>
            </Box>
        }>
            {props.children}
        </TreeItem>
    )
}

//------------------------
const TreeAssimtItem: FC<{
    assimt: DcsAssignment
    onOk: (info: DcsAssignment) => void
}> = (props) => {
    const { assimt } = props
    const [f_showAssimt, setShowAssimt] = useState(false)
    return (
        <>
            <TreeItem nodeId={assimt.nodeId} label={
                <Box className={ss.item} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body1" mr="1">
                        {`[${assimt.nodeId}]值為 ${assimt.retValue}, ${assimt.fdNote}`}
                    </Typography>

                    <IconButton className={ss.command} color="primary" size="small" component="span"
                        onClick={e => {
                            e.stopPropagation()
                            setShowAssimt(true)
                        }}>
                        <EditIcon />
                    </IconButton>
                    <IconButton className={ss.command} color="primary" size="small" component="span"
                        onClick={e => {
                            e.stopPropagation();
                            console.log('按一下', e);
                        }}>
                        <TransIcon />
                    </IconButton>
                </Box>
            } />

            {f_showAssimt &&
                <AssimtEditDialog
                    assimt={assimt}
                    onCancel={() => setShowAssimt(false)}
                    onOk={(info) => {
                        setShowAssimt(false)
                        props.onOk(info)
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
