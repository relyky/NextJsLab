import type { DcsStatement, DecisionTreeState } from './decisionTreeSlice'
import { useState } from 'react'
import { useAppSelector, useAppDispatch } from 'hooks/hooks'
import { add } from './decisionTreeSlice'

import StatementCard from './StatementCard'


// TreeContainer
export default (props) => {
    const dispatch = useAppDispatch()
    const decisionTree = useAppSelector(store => store.decisionTree)

    return (
        <div>
            {decisionTree.map((item, index) => 
                <StatementCard key={index} item={item} />
            )}
        </div>
    )
}