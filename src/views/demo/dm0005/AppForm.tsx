// types
import type { TransitionProps } from '@mui/material/transitions'
import type { TreeItemProps } from '@mui/lab'
// 
import { alpha, styled } from '@mui/material/styles'
import { TreeView, TreeItem, treeItemClasses } from '@mui/lab'
import StyledTreeItem from './StyledTreeItem'
// icons
import PlusIcon from '@mui/icons-material/AddBoxOutlined'
import MinusIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined'
import EndIcon from '@mui/icons-material/DisabledByDefaultOutlined'

export default () => {
    return (
        <TreeView
            aria-label="customized"
            defaultExpanded={['1']}
            defaultCollapseIcon={<MinusIcon />}
            defaultExpandIcon={<PlusIcon />}
            defaultEndIcon={<EndIcon className="close" />}
            sx={{ height: 400, flexGrow: 1, maxWidth: 600, overflowY: 'auto' }}
        >
            <StyledTreeItem nodeId="1" label="Main">
                <StyledTreeItem nodeId="2" label="Hello" />
                <StyledTreeItem nodeId="3" label="Subtree with children">
                    <StyledTreeItem nodeId="6" label="Hello" />
                    <StyledTreeItem nodeId="7" label="Sub-subtree with children">
                        <StyledTreeItem nodeId="9" label="Child 1" />
                        <StyledTreeItem nodeId="10" label="Child 2" />
                        <StyledTreeItem nodeId="11" label="Child 3" />
                    </StyledTreeItem>
                    <StyledTreeItem nodeId="8" label="Hello" />
                </StyledTreeItem>
                <StyledTreeItem nodeId="4" label="World" />
                <StyledTreeItem nodeId="5" label="Something something" />
            </StyledTreeItem>
        </TreeView>
    );
}
