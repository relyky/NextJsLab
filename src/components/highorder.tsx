import type { FC, ReactChild } from 'react'
import { Typography } from "@mui/material"

export const H3: FC<{ text?: string, children?: ReactChild }> = (props) => (
    <Typography variant='h3'>
        {props.text ? props.text : props.children}
    </Typography>
)
