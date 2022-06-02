import type { DcsStatement } from './interfaces'
import { useState } from 'react'
import { useAppSelector, useAppDispatch } from 'hooks/hooks'
import { Container } from '@mui/material'
import { H3, AButton } from 'components/highorder'
import TreeContainer from './TreeContainer'
import Swal from 'sweetalert2'

export default (props) => {
    const decisionTree = useAppSelector(store => store.decisionTree)
    const dispatch = useAppDispatch()

    function handleClick() {
        Swal.fire('未實作')
    }

    return (
        <Container>
            <H3>DM2010: Decision Tree UI 畫面試作</H3>
            <pre>decisionTree 筆數:{decisionTree.length}</pre>
            <AButton label='驗證' mutant='primary' onClick={handleClick} />

            <TreeContainer />
            {/* <TreeCustomLayer /> */}

        </Container>
    )
}
