import type { SyntheticEvent, FC } from 'react'
import { useState, useMemo } from 'react'
import { useAppSelector, useAppDispatch } from 'hooks/hooks'
import { Box, Button, IconButton, Divider, Typography, Stack } from '@mui/material'
import { TreeView } from '@mui/lab'
import TreeContent from './TreeContent'
import TreeItem from './widgets/StyledTreeItem'
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

// TreeContainer
export default (props) => {
    const dispatch = useAppDispatch()
    const decisionTree = useAppSelector(store => store.decisionTree)

    const [expanded, setExpanded] = useState<string[]>([]);
    const [selected, setSelected] = useState<string>(null);

    const notExpand = useMemo(() => expanded.length === 0 || expanded.length === 1 && expanded[0] === 'root', [expanded])

    const handleToggle = (event: SyntheticEvent, nodeIds: string[]) => {
        setExpanded(nodeIds);
    };

    const handleSelect = (event: SyntheticEvent, nodeIds: string) => {
        console.log('handleSelect', nodeIds)
        setSelected(nodeIds);
    };

    const handleExpandClick = () => {
        setExpanded((oldExpanded) =>
            notExpand
                ? ['root', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19']
                : ['root']
        );
    };

    return (
        <div>


            <Divider sx={{ my: 3 }} />

            <Box>
                <Box sx={{ mb: 1 }}>
                    <Button onClick={handleExpandClick}>
                        {notExpand ? '展開' : '褶疊'}
                    </Button>
                </Box>
                <Box sx={{ display: 'none' }}>
                    selected:{JSON.stringify(selected)} <br />
                    expanded:{JSON.stringify(expanded)}
                </Box>

                <TreeView
                    defaultCollapseIcon={<MinusIcon color="primary" />}
                    defaultExpandIcon={<PlusIcon color="primary" />}
                    defaultEndIcon={<ForwardIcon color="secondary" />}
                    expanded={expanded}
                    selected={selected}
                    onNodeToggle={handleToggle}
                    onNodeSelect={handleSelect}
                >
                    <TreeItem nodeId="root" label="開始">
                        <TreeCondItem nodeId="1" desc="當 是否為DBS員工 = Y, Staff" >
                            <TreeAssimtItem nodeId="2" desc="值為 Y," />
                        </TreeCondItem>

                        <TreeCondItem nodeId="3" desc="當 Small_White = Y, 信用小白(沒有JCIC紀錄申請)" >
                            <TreeAssimtItem nodeId="4" desc="值為 0," />
                        </TreeCondItem>

                        <TreeCondItem nodeId="5" desc="當 客戶層級 = Z, Customer Segment" >
                            <TreeAssimtItem nodeId="6" desc="值為 0," />
                        </TreeCondItem>

                        <TreeCondItem nodeId="7" desc="當 職稱 in '16','29','36','34', Occupation" >
                            <TreeCondItem nodeId="8" desc="當 年齡 > 65 , Age" >
                                <TreeAssimtItem nodeId="9" desc="值為 A," />
                            </TreeCondItem>
                            <TreeCondItem nodeId="10" desc="當 New_To_Bureau = Y, 近6個月沒有貸款或信貸記錄" >
                                <TreeAssimtItem nodeId="11" desc="值為 N," />
                            </TreeCondItem>
                            <TreeCondItem nodeId="12" desc="當 月收入 > 300000, Declared_ monthly_income" >
                                <TreeAssimtItem nodeId="13" desc="值為 A," />
                            </TreeCondItem>
                            <TreeCondItem nodeId="14" desc="當 財力證明 < 4000, " >
                                <TreeAssimtItem nodeId="15" desc="值為 B," />
                            </TreeCondItem>
                            <TreeItem nodeId="16" label="否則" >
                                <TreeAssimtItem nodeId="17" desc="值為 GUEST, 來賓層級" />
                            </TreeItem>
                        </TreeCondItem>

                        <TreeItem nodeId="18" label="否則" >
                            <TreeAssimtItem nodeId="19" desc="值為 Otherwise, 其他" />
                        </TreeItem>

                    </TreeItem>
                </TreeView>
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* <TreeContent path={[]} decisionTree={decisionTree} /> */}

        </div>
    )
}


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
                <Stack direction="row">
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
                </Stack>

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



