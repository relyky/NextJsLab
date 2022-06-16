import type { FC } from 'react'
import { useEffect, useState } from 'react'
import { Container, Box, Paper, Divider } from '@mui/material'
import { H3, P1, ASwitch } from 'components/highorder'
// icons
import InboxIcon from '@mui/icons-material/Inbox'
import DraftsIcon from '@mui/icons-material/Drafts'
import DeleteIcon from '@mui/icons-material/Delete';
// css
import { useSpring, animated, config } from 'react-spring'
import ss from './AppForm.module.css'

//import styles from 'styles/Home.module.css'

export default function AppForm() {
    const [f_show, setShow] = useState(true)
    const fadeInStyle = useSpring({ to: { opacity: 1 }, from: { opacity: 0 } })

    return (
        <Container>
            <H3>DM0007: react-spring Lab</H3>

            <P1>第一個練習：進場動畫 fade in。</P1>

            <SpringBasic1_FadeIn>
                <Paper sx={{ p: 3 }}>
                    <H3 >I will fade in</H3>
                </Paper>
            </SpringBasic1_FadeIn>

            <Divider sx={{ m: 1 }} />
            <P1>第二個練習：翻動 filp text。</P1>

            <SpringBasic2_FlipText>
                <H3>hello world</H3>
            </SpringBasic2_FlipText>

            {/* <ASwitch label="show animated" value={f_show} onChange={v => setShow(v.value)} /> */}

            <Divider sx={{ m: 1 }} />
            <P1>第三個練習: 透視變化過程: 0→1→0→1→...。</P1>

            <SpringBasic3_Number />

        </Container>
    )
}

//-----------------------------------------------------------------------------
const SpringBasic1_FadeIn: FC = (props) => {
    const aniStyle = useSpring({ to: { opacity: 1 }, from: { opacity: 0 } })
    return (
        <animated.div style={aniStyle}>
            {props.children}
        </animated.div>
    )
}

//-----------------------------------------------------------------------------
const SpringBasic2_FlipText: FC = (props) => {
    const [flip, setFlip] = useState(false)
    const aniStyle = useSpring({
        opacity: 0,
        from: { opacity: 1 },
        reset: true,
        reverse: flip,
        delay: 500,
        config: config.molasses,
        onRest: () => setFlip(f => !f),
    })

    return (
        <animated.div style={aniStyle}>
            {props.children}
        </animated.div>
    )
}

//-----------------------------------------------------------------------------
const SpringBasic3_Number: FC = (props) => {
    const [flip, setFlip] = useState(false)
    const { number } = useSpring({
        number: 1,
        from: { number: 0 },
        reset: true,
        reverse: flip,
        delay: 500,
        config: config.molasses,
        onRest: () => setFlip(f => !f),
    })

    return (
        <animated.div>
            {number.to(n => n.toFixed(3))}
            {/* 三位小數 */}
        </animated.div>
    )
}
