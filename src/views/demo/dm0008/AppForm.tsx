import { useState } from 'react'
import { Container, } from '@mui/material'
import { Box, Paper, IconButton, Divider } from '@mui/material'
import { H3, H4, AButton } from 'components/highorder'
import clsx from 'clsx'
// CSS
import InboxIcon from '@mui/icons-material/Inbox'
import DraftsIcon from '@mui/icons-material/Drafts'
import DeleteIcon from '@mui/icons-material/Delete';
import ss from './AppForm.module.css'

export default (props) => {
    const [show, setShow] = useState(true);  

    return (
        <Container>
            <H3>DM0008: Animate.css Lab</H3>

            <AButton mutant='primary' label='Show' onClick={() => setShow(f => !f)} />
            <pre>{`show:${show}`}</pre>

            <H4>bounce</H4>
            <div>
                <h1 className={clsx("animate__animated", show && "animate__bounce")}>
                    An animated element
                </h1>
            </div>

            <H4>fadeInLeft</H4>
            <Paper sx={{ p: 4, display: (!show ? 'block' : 'none') }} className={clsx("animate__animated", !show && "animate__fadeInLeft")}>
                <H3>
                    An animated element
                </H3>
            </Paper>
            <Paper sx={{ p: 4, display: (show ? 'block' : 'none') }} className={clsx("animate__animated", show && "animate__fadeInLeft")}>
                <H3>
                    一個動畫元素
                </H3>
            </Paper>

        </Container >
    )

}
