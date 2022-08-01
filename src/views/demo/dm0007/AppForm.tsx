import type { CSSProperties, FC } from 'react'
import { useState } from 'react'
import { Container, Paper, Divider } from '@mui/material'
import { H3, P1, AButton } from 'components/highorder'
// css
import { useSpring, animated, config } from 'react-spring'

export default function AppForm() {
    const [f_show, setShow] = useState(true)
    const fadeInStyle = useSpring({ to: { opacity: 1 }, from: { opacity: 0 } })

    return (
        <Container>
            <H3>DM0007: react-spring Lab</H3>

            <P1>第一個練習: 進場動畫 fade in。</P1>
            <SpringBasic1_FadeIn>
                <Paper sx={{ p: 3 }}>
                    <H3 >I will fade in</H3>
                </Paper>
            </SpringBasic1_FadeIn>

            <Divider sx={{ m: 1 }} />
            <P1>第二個練習: 翻動 filp text。</P1>
            <SpringBasic2_FlipText>
                <H3>hello world</H3>
            </SpringBasic2_FlipText>

            <Divider sx={{ m: 1 }} />
            <P1>第三個練習: 透視變化過程: 0→1→0→1→...。</P1>
            <SpringBasic3_Number />

            <Divider sx={{ m: 1 }} />
            <P1>第四個練習: api 用程式觸發CSS變化。</P1>
            <SpringBasic4_SpringApi>
                <H3>hello world</H3>
            </SpringBasic4_SpringApi>

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
        <div>
            {/* animated element 方式 */}
            <animated.div style={aniStyle}>
                {props.children}
            </animated.div>

            {/* React components 結合 spring 方式 */}
            <AniH3 style={aniStyle}>
                {props.children}
            </AniH3>
        </div>
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

//-----------------------------------------------------------------------------
const SpringBasic4_SpringApi: FC = (props) => {
    const [aniStyle, api] = useSpring(() => ({ opacity: 1 }))
    // CSS 初始狀態:顯現

    return (
        <div>
            <AButton mutant='primary' label="隱藏 "
                onClick={() => api.start({ opacity: 0 })} // CSS 變化目標:隱藏
            />
            <AButton mutant='primary' label="顯現"
                onClick={() => api.start({ opacity: 1 })} // CSS 變化目標:顯現
            />

            {/* animated element 方式 */}
            <animated.div style={aniStyle}>
                {props.children}
            </animated.div>

            {/* React components 結合 srping 方式 */}
            <AniH3 style={aniStyle}>
                {props.children}
            </AniH3>
        </div>
    )
}

//-----------------------------------------------------------------------------
//## 一個簡單的 React 元件
// 將用來 結合 spring.animated。
// 其中 props 至少要有 style 屬性。
const MyH3: FC<{
    style: CSSProperties
}> = props => {
    const baseStyle = { color: 'red' }
    return (
        <h3 style={{ ...baseStyle, ...props.style }}>
            {props.children}
        </h3>
    )
}

//## 將 React 元件結合 spring.animated
// 把 spring style 物件轉換成 CSSProperties
const AniH3 = animated(MyH3)
 