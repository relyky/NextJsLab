import type { FC } from 'react'
import type { DecisionTreeState } from './interfaces'
import StatementCard from './StatementCard'

const TreeContent: FC<{
    decisionTree: DecisionTreeState,
    path: number[],
}> = props => {
    return (
        <div>
            {/* <code style={{ border: 'dashed thin pink', padding: '4px' }}>
                path: {JSON.stringify(props.path)}
            </code> */}
            
            {props.decisionTree.map((item, index) =>
                <StatementCard key={index} pos={index} item={item} path={props.path} />
            )}
        </div>
    )
}

export default TreeContent