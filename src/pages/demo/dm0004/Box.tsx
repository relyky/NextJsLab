import type { CSSProperties, FC } from 'react'
import { memo } from 'react'

const styles: CSSProperties = {
    border: '1px dashed gray',
    padding: '0.5em 1em',
    cursor: 'move',
}

export interface BoxProps {
    title: string
    yellow?: boolean
    preview?: boolean
}

export const Box: FC<BoxProps> = memo(function Box(props) {
    const backgroundColor = props.yellow ? 'yellow' : 'white'
    return (
        <div
            style={{ ...styles, backgroundColor }}
            role={props.preview ? 'BoxPreview' : 'Box'}
        >
            {props.title}
        </div>
    )
})
