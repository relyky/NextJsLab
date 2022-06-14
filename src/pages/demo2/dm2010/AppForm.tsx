import type { FC } from 'react'
import { useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'
import { useAppSelector } from 'hooks/hooks'
import { Container } from '@mui/material'
import { H3, AButton } from 'components/highorder'
import Swal from 'sweetalert2'

export default (props) => {
    //const decisionTree = useAppSelector(store => store.decisionTree)
    //const dispatch = useAppDispatch()

    return (
        <Container>
            <H3>DM2010: Decision Tree UI 試作(reset)</H3>
        </Container>
    )
}

