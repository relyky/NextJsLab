import type { DcsStatement, DecisionTreeState } from './decisionTreeSlice'
import { useState } from 'react'
import { useAppSelector, useAppDispatch } from 'hooks/hooks'
import { add } from './decisionTreeSlice'

import TreeContent from './TreeContent'

// TreeContainer
export default (props) => {
    const dispatch = useAppDispatch()
    const decisionTree = useAppSelector(store => store.decisionTree)

    return (
        <div>
            <TreeContent parent={null} decisionTree={decisionTree} />
        </div>
    )
}