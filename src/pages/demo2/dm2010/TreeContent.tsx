import type { FC } from 'react'
import type { DecisionTreeState } from './decisionTreeSlice'

import StatementCard from './StatementCard'

const TreeContent: FC<{
    decisionTree: DecisionTreeState
}> = props => {
    return (
        <div>
            {props.decisionTree.map((item, index) =>
                <StatementCard key={index} item={item} />
            )}
        </div>
    )
}

export default TreeContent