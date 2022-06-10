import type { FC } from 'react'
import { DecisionTreeState } from './interfaces'
import TreeStatement from './TreeStatement'

const TreeContent: FC<{
    decisionTree: DecisionTreeState,
    path: number[],
}> = props => {
    return (
        <>
            {/* <code style={{ border: 'dashed thin pink', padding: '4px' }}>
                path: {JSON.stringify(props.path)}
            </code> */}
            
            {props.decisionTree.map((item, index) =>
                <TreeStatement key={index} pos={index} item={item} path={props.path} />
            )}
        </>
    )
}

export default TreeContent