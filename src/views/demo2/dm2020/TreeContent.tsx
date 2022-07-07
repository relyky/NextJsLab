import type { FC } from 'react'
import { DecisionTreeState } from './interfaces'
import TreeStatement from './TreeStatement'

const TreeContent: FC<{
    decisionTree: DecisionTreeState
    path: number[]
    selectedNodeId: string // 用來識別是否被選取了
}> = props => {
    return (
        <>
            {/* <code style={{ border: 'dashed thin pink', padding: '4px' }}>
                path: {JSON.stringify(props.path)}
            </code> */}

            {props.decisionTree.map((item, index) =>
                <TreeStatement key={index} pos={index} item={item} path={props.path} selectedNodeId={props.selectedNodeId} />
            )}
        </>
    )
}

export default TreeContent