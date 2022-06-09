// types
import type { TransitionProps } from '@mui/material/transitions'
import type { TreeItemProps } from '@mui/lab'
import type { FC } from 'react'
// 
import { alpha, styled } from '@mui/material/styles'
import { TreeItem, treeItemClasses } from '@mui/lab'
import { Collapse } from '@mui/material'
import { useSpring, animated } from 'react-spring'

// 客製化：加強動畫
const TransitionComponent: FC<TransitionProps> = (props) => {
    const style = useSpring({
        from: {
            opacity: 0,
            transform: 'translate3d(30px,0,0)',
        },
        to: {
            opacity: props.in ? 1 : 0,
            transform: `translate3d(${props.in ? 0 : 30}px,0,0)`,
        },
    });

    return (
        <animated.div style={style}>
            <Collapse {...props} />
        </animated.div>
    );
}

const StyledTreeItem = styled((props: TreeItemProps) => (
    <TreeItem {...props} TransitionComponent={TransitionComponent} />
))(({ theme }) => ({
    [`& .${treeItemClasses.iconContainer}`]: {
        '& .close': {
            opacity: 0.3,
        },
    },
    [`& .${treeItemClasses.group}`]: {
        marginLeft: 15,
        paddingLeft: 18,
        borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
    },
}));

export default StyledTreeItem;
