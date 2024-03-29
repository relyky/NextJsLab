import type { SyntheticEvent, FC } from 'react'
import { DecisionTreeState, DcsStatement } from './interfaces'
import { Box, Button, IconButton, Divider, Typography, Paper, Chip, Stack } from '@mui/material'
import { TreeView } from '@mui/lab'
import TreeContent from './TreeContent'
import TreeItem from './widgets/StyledTreeItem'
// hooks
import { useState, useMemo, useCallback, useRef } from 'react'
import { useAppSelector, useAppDispatch } from 'hooks/hooks'
import { isDcsAssignment } from './decisionTreeSlice'
import html2canvas from 'html2canvas'
import { clearBuffer } from 'store/bufferSlice'
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
    const refPhoto = useRef<HTMLDivElement>(null)
    const dispatch = useAppDispatch()
    const [decisionTree, buffer] = useAppSelector(store => [store.decisionTree, store.buffer])

    const [expanded, setExpanded] = useState<string[]>(['root']);
    const [selected, setSelected] = useState<string>(null);

    const notExpand = useMemo(() => expanded.length === 0 || expanded.length === 1 && expanded[0] === 'root', [expanded])

    const hasCloned = useMemo(() => !!buffer.payload, [buffer.payload])

    const handleToggle = (event: SyntheticEvent, nodeIds: string[]) => {
        setExpanded(nodeIds);
    }

    const handleSelect = (event: SyntheticEvent, nodeIds: string) => {
        setSelected(nodeIds);
    }

    const handleExpand = () => {
        const expandNodeList: string[] = ['root']
        function procExpandNodeList(subTree: DcsStatement[]) {
            subTree.forEach(c => {
                expandNodeList.push(c.nodeId)
                if (!isDcsAssignment(c.action)) {
                    procExpandNodeList(c.action)
                }
            })
        }

        if (notExpand) {
            procExpandNodeList(decisionTree)
            setExpanded(expandNodeList)
        }
        else {
            setExpanded(['root'])
        }
    }

    function handleTakeCanvas() {
        html2canvas(refPhoto.current).then(canvas => {
            const dataUrl = canvas.toDataURL('image/png')
            const link = document.createElement('a')
            link.download = 'tree-image.png'
            link.href = dataUrl
            link.click()
        })
    }

    return (
        <div>
            <Stack direction="row" alignItems="baseline" spacing={1}>
                <Button variant="contained" color="primary" onClick={handleExpand}>
                    {notExpand ? '展開' : '褶疊'}
                </Button>
                <Button variant="contained" color="primary" onClick={handleTakeCanvas}>
                    取得圖片
                </Button>

                {hasCloned ?
                    <Chip label="有複製" variant="outlined" color="info" onClick={() => dispatch(clearBuffer())} />
                    :
                    <Chip label="未複製" variant="outlined" />
                }

            </Stack>
            <pre>
                selected:{JSON.stringify(selected)} <br />
                expanded:{JSON.stringify(expanded)}
            </pre>

            <Paper sx={{ p: 2, my: 2 }}>
                <div ref={refPhoto}>{/* <Paper> 會讓 html2canvas 取圖底色變灰！搬到Paper內層以避免。 */}
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
                            <TreeContent path={[]} decisionTree={decisionTree} selectedNodeId={selected} />
                        </TreeItem>
                    </TreeView>
                </div>
            </Paper>
        </div>
    )
}
