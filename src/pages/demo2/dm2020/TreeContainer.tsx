import type { SyntheticEvent } from 'react'
import React, { useState } from 'react'
import { useAppSelector, useAppDispatch } from 'hooks/hooks'
import { Box, Button, IconButton, Divider, Typography } from '@mui/material'
import { TreeView, TreeItem } from '@mui/lab'
import TreeContent from './TreeContent'
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

// TreeContainer
export default (props) => {
    const dispatch = useAppDispatch()
    const decisionTree = useAppSelector(store => store.decisionTree)

    const [expanded, setExpanded] = useState<string[]>([]);
    const [selected, setSelected] = useState<string>(null);

    const handleToggle = (event: SyntheticEvent, nodeIds: string[]) => {
        setExpanded(nodeIds);
    };

    const handleSelect = (event: SyntheticEvent, nodeIds: string) => {
        console.log('handleSelect', nodeIds)
        setSelected(nodeIds);
    };

    const handleExpandClick = () => {
        setExpanded((oldExpanded) =>
            oldExpanded.length === 0 ? ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'] : [],
        );
    };

    return (
        <div>


            <Divider sx={{ my: 3 }} />

            <Box>
                <Box sx={{ mb: 1 }}>
                    <Button onClick={handleExpandClick}>
                        {expanded.length === 0 ? '展開' : '褶疊'}
                    </Button>
                </Box>
                <pre>
                    selected:{JSON.stringify(selected)} <br />
                    expanded:{JSON.stringify(expanded)}
                </pre>

                <TreeView
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                    expanded={expanded}
                    selected={selected}
                    onNodeToggle={handleToggle}
                    onNodeSelect={handleSelect}
                >
                    <TreeItem nodeId="1" label="開始">
                        <TreeItem nodeId="2" label="當 Staff = Y, 是否為DBS員工" >
                            <TreeItem nodeId="3" label="值為 Y," />
                        </TreeItem>
                        <TreeItem nodeId="4" label="當 Small_White = Y, 信用小白(沒有JCIC紀錄申請)" >
                            <TreeItem nodeId="5" label="值為 0," />
                        </TreeItem>
                        <TreeItem nodeId="6" label="當 職稱 in '16','29','36','34', Customer Segment" >
                            <TreeItem nodeId="7" label="當 客戶層級 = VIP, Customer Segment" >
                                <TreeItem nodeId="8" label="值為 Z," />
                            </TreeItem>

                            <TreeItem nodeId="13" label={
                                <Box className={ss.item} sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0 }}>
                                    {/* <Box component={InfoIcon} color="inherit" sx={{ mr: 1 }} /> */}
                                    <Typography variant="body1" sx={{ fontWeight: 'inherit', flexGrow: 0, mr: 1 }}>
                                        {'當 客戶層級 = VIP, Customer Segment'}
                                    </Typography>
                                    <IconButton className={ss.command} color="primary" size="small" component="span" onClick={e => {
                                        e.stopPropagation();
                                        console.log('按一下', e);
                                    }}>
                                        <InfoIcon />
                                    </IconButton>
                                </Box>
                            }>
                                <TreeItem nodeId="8" label="值為 Z," />
                            </TreeItem>

                            <TreeItem nodeId="14" label={
                                <Box className={ss.item} sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0 }}>
                                    {/* <Box component={InfoIcon} color="inherit" sx={{ mr: 1 }} /> */}
                                    <Typography variant="body1" sx={{ fontWeight: 'inherit', flexGrow: 0, mr: 1 }}>
                                        {'當 客戶層級 = VIP, Customer Segment'}
                                    </Typography>
                                    <IconButton className={ss.command} color="primary" size="small" component="span" onClick={e => {
                                        e.stopPropagation();
                                        console.log('按一下', e);
                                    }}>
                                        <InfoIcon />
                                    </IconButton>
                                </Box>
                            }>
                                <TreeItem nodeId="8" label="值為 Z," />
                            </TreeItem>

                            <TreeItem nodeId="15" label={
                                <Box className={ss.item} sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0 }}>
                                    {/* <Box component={InfoIcon} color="inherit" sx={{ mr: 1 }} /> */}
                                    <Typography variant="body1" sx={{ fontWeight: 'inherit', flexGrow: 0, mr: 1 }}>
                                        {'當 客戶層級 = VIP, Customer Segment'}
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
                                        console.log('按一下', e);
                                    }}>
                                        <InfoIcon />
                                    </IconButton>
                                </Box>
                            }>
                                <TreeItem nodeId="8" label={
                                    <Box className={ss.item} sx={{ display: 'flex', alignItems: 'center', py: 0.5 }}>
                                        {/* <Box component={InfoIcon} color="inherit" sx={{ mr: 1 }} /> */}
                                        <Typography variant="body1" sx={{ fontWeight: 'inherit', flexGrow: 0, mr: 1 }}>
                                            {'值為 Z, 我是值的說明。'}
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

                            </TreeItem>

                            <TreeItem nodeId="9" label="否則" >
                                <TreeItem nodeId="10" label="值為 GUEST, 來賓層級" />
                            </TreeItem>
                        </TreeItem>
                        <TreeItem nodeId="11" label="否則" >
                            <TreeItem nodeId="12" label="值為 Otherwise, 其他" />
                        </TreeItem>
                    </TreeItem>
                </TreeView>
            </Box>

            <Divider sx={{ my: 3 }} />

            <TreeContent path={[]} decisionTree={decisionTree} />

        </div>
    )
}