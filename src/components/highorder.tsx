import type { FC, MouseEventHandler, ReactChild } from 'react'
import { Typography, Button } from "@mui/material"

export const H3: FC<{
    text?: string,
    children?: ReactChild
}> = props => (
    <Typography variant='h3'>
        {props.text ? props.text : props.children}
    </Typography>
)

export const AButton: FC<{
    mutant: 'primary' | 'secondary',
    label: string,
    onClick: MouseEventHandler<HTMLButtonElement>
}> = props => (
    <Button color={props.mutant} variant='contained' onClick={props.onClick} >
        {props.label}
    </Button>
)