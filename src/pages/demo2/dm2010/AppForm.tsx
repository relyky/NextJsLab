import { useState } from 'react'
import { useAppSelector, useAppDispatch } from 'hooks/hooks'
import { Container } from '@mui/material'
import { H3, AButton } from 'components/highorder'
import TreeContainer from './TreeContainer'
import { add, DcsStatement } from './decisionTreeSlice'

export default (props) => {
    const decisionTree = useAppSelector(store => store.decisionTree)
    const dispatch = useAppDispatch()

    function handleClick() {
        const newItem: DcsStatement = {
            isElse: false,
            cond: {
                fdName: 'NewTest',
                fdNote: '新測試欄位',
                cmpAct: 'eq',
                cmpValue: '新比較值'
            },
            action: {
                fdNote: '新結果',
                retValue: '新回傳值'
            }
        }

        dispatch(add(newItem))

        console.info('Pass');
    }

    return (
        <Container>
            <H3>DM2010: Decision Tree UI 畫面試作</H3>
            <pre>decisionTree 筆數:{decisionTree.length}</pre>
            <AButton label='測試' mutant='primary' onClick={handleClick} />

            <TreeContainer />
            {/* <TreeCustomLayer /> */}

        </Container>
    )
}
