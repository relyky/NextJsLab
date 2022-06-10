// types
import type { SyntheticEvent, FC } from 'react'
import type { DcsStatement, DcsCondision, DcsAssignment } from './interfaces'
// 
import { useState, useMemo } from 'react'
import { useAppSelector, useAppDispatch } from 'hooks/hooks'
import { Box, Button, IconButton, Divider, Typography } from '@mui/material'
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
    const isTreeAction = !isDcsAssignment(action)

    if (isElse) return (
        <TreeItem nodeId={`${nodeId}else`} label="否則" >
            {isDcsAssignment(action) ?
                <TreeAssimtItem nodeId={action.nodeId} desc={`[${action.nodeId}]值為 ${action.retValue}, ${action.fdNote}`} />
                :
                <Box sx={{ mt: 1, mr: 1, mb: 0, ml: 1, pl: '2em' }}>
                    <p>Sub Tree Content</p>
                </Box>
            }
        </TreeItem>
    )

    const description = `[${nodeId}]當 ${cond.fdName} ${codeName(cond.cmpAct)} ${cond.cmpValue}, ${cond.fdNote}`
    return (
        <TreeCondItem nodeId={nodeId} desc={description} >
            {isDcsAssignment(action) ?
                <TreeAssimtItem nodeId={action.nodeId} desc={`[${action.nodeId}]值為 ${action.retValue}, ${action.fdNote}`} />
                :
                <Box sx={{ mt: 1, mr: 1, mb: 0, ml: 1, pl: '2em' }}>
                    <p>Sub Tree Content</p>
                </Box>
            }
        </TreeCondItem>
    )
}

{/* <TreeCondItem nodeId="1" desc="當 是否為DBS員工 = Y, Staff" >
    <TreeAssimtItem nodeId="2" desc="值為 Y," />
</TreeCondItem> */}

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
    nodeId: string,
    desc: string
}> = (props) => {
    return (
        <TreeItem nodeId={props.nodeId} label={
            <Box className={ss.item} sx={{ display: 'flex', alignItems: 'center' }}>
                {/* <Box component={InfoIcon} color="inherit" sx={{ mr: 1 }} /> */}
                <Typography variant="body1" sx={{ fontWeight: 'inherit', mr: 1 }}>
                    {props.desc}
                    {/* {'值為 Z, 我是值的說明。'} */}
                </Typography>

                <IconButton className={ss.command} color="primary" size="small" component="span">
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