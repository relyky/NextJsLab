import type { FC, MouseEventHandler, ReactChild } from 'react'
import { Typography, Button, FormControlLabel, Switch } from "@mui/material"

export const H3: FC<{
    text?: string,
    children?: ReactChild
}> = props => (
    <Typography variant='h3'>
        {props.text ? props.text : props.children}
    </Typography>
)

export const AButton: FC<{
    mutant: 'primary' | 'secondary' | 'primary0' | 'secondary0',
    label: string,
    onClick: MouseEventHandler<HTMLButtonElement>
}> = ({ mutant, label, onClick }) => {
    const color = mutant.startsWith('secondary') ? 'secondary'
        : 'primary';

    const variant = mutant.endsWith('0') ? 'outlined'
        : 'contained';

    return (
        <Button color={color} variant={variant} sx={{ mr: 1 }} onClick={onClick} >
            {label}
        </Button >
    )
}

export const ASwitch: FC<{
    name?: string
    value: boolean
    label: string
    onChange: (v: { name: string, value: boolean }) => void
}> = props => {
    return (
        <FormControlLabel label={props.label} control={
            <Switch
                name={props.name}
                value={props.value}
                onChange={(e, checked) => props.onChange({ name: props.name, value: checked })}
            />
        } />
    )
}
