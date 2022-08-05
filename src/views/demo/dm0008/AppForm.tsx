import { Container, } from '@mui/material'
import { Box, Paper, IconButton, Divider } from '@mui/material'
import { H3, H4, P1, AButton } from 'components/highorder'
// hooks
import { useState, useReducer, useRef } from 'react'
// icons
import InboxIcon from '@mui/icons-material/Inbox'
import DraftsIcon from '@mui/icons-material/Drafts'
import DeleteIcon from '@mui/icons-material/Delete';
// CSS
import clsx from 'clsx'
import { CSSTransition } from "react-transition-group";
import ss from './AppForm.module.css'


export default (props) => {
    //const [show, setShow] = useState(true)
    const [show, toggleShow] = useReducer(f => !f, true)
    const [itemList, setItemList] = useState(['項目一號', '項目二號', '項目三號'])

    return (
        <Container>
            <H3>DM0008: Animate.css Lab</H3>

            <AButton mutant='primary' label={`show:${show}`} onClick={toggleShow} />

            <H4>bounce</H4>
            <div className={clsx("animate__animated", show && "animate__bounce")}>
                <h1>An animated element</h1>
            </div>

            <H4>fadeInLeft/OutRight</H4>
            <Paper sx={{ p: 4 }}
                onAnimationEnd={(e) => console.log('onAnimationEnd', { animationName: e.animationName })}
                className={clsx(["animate__animated", { "animate__fadeInUp": show, "animate__fadeOutDown": !show }])}>
                <H3>
                    一個動畫元素<br />
                    An animated element
                </H3>
            </Paper>

            <H4>CSSTransition </H4>
            <CSSTransition
                in={show}
                timeout={300}
                classNames={{
                    enter: "animate__animated",
                    enterActive: "animate__fadeInUp",
                    exit: "animate__animated",
                    exitActive: "animate__fadeOutDown"
                }}
                unmountOnExit
            >
                <Paper sx={{ p: 4 }}>
                    <H3>
                        一個動畫元素<br />
                        An animated element
                    </H3>
                </Paper>
            </CSSTransition>


            <H4>EOF</H4>
        </Container >
    )

}

//=============================================================================
