import type { FC } from 'react'
import type { DcsStatement, DecisionTreeState } from './decisionTreeSlice'

import StatementCard from './StatementCard'

const TreeContent: FC<{
    decisionTree: DecisionTreeState,
    parent: DcsStatement | null,
}> = props => {
    return (
        <div>
            <code style={{ border: 'dashed thin pink', padding: '4px' }}>parent node: {JSON.stringify(props.parent?.cond)}</code>
            {props.decisionTree.map((item, index) =>
                <StatementCard key={index} item={item} />
            )}
        </div>
    )
}

export default TreeContent