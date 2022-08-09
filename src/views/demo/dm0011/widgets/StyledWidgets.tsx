import type { FC } from 'react'
import React from 'react';
import { Switch, FormControlLabel, Theme } from '@mui/material'
import { styled } from '@mui/material'
import { withStyles } from 'tss-react/mui';
import clsx from 'clsx';

// styled with theme
export const H1 = styled('h1')(({ theme }) => ({
    color: theme.palette.primary.dark,
    border: 'solid 2px pink',
    borderRadius: '2px'
}));

// styled with theme & props
export const P1 = styled('p')<{
    bold?: string // 自訂 props
}>(props => {
    const { theme: { palette } } = props
    console.log('P1', { palette, props })
    return {
        borderStyle: 'solid',
        borderRadius: 3,
        padding: 3,
        color: palette.info.main,
        borderColor: palette.warning.light,
        borderWidth: props.bold === "true" ? 3 : 1,
        fontWeight: props.bold === "true" ? 900 : 300
    }
});


//===================================================

export const ASwitch: FC<{
    label: string,
    checked?: boolean,
    onChange: (checked: boolean) => void,
    className?: string
}> = (props) => (
    <FormControlLabel className={props.className} label={props.label}
        control={<Switch checked={props.checked} onChange={(event, checked) => props.onChange(checked)} />}
    />
)

export const ASwitch2 = withStyles(ASwitch, (theme: Theme, props) => {
    const { palette } = theme
    return {
        root: {
            background: props.checked ? palette.secondary.main : palette.error.light,
            color: palette.primary.dark,
        }
    }
})

//===================================================

const ANote0: FC<{
    className?: string,
    children: React.ReactNode,
    primary: boolean
}> = (props) => (
    <div className={props.className}> {/* ※ 注：外殼必需有 className={props.className} 屬性來銜接 withStyle 產生的 root css-class。 */}
        <p className={clsx(props.primary && 'primary')}>
            {props.children}
        </p>
    </div>
)

export const ANote = withStyles(ANote0, (theme: Theme, props) => {
    const { palette, spacing } = theme
    return {
        root: {
            background: palette.info.light,
            color: palette.primary.dark,
            '& .primary': {
                padding: spacing(2),
                background: palette.warning.light
            }
        }
    }
})

//===================================

const ANoteB0: FC<{
    className?: string,
    children: React.ReactNode,
    primary: boolean
}> = (props) => (
    <div className={props.className}> {/* ※ 注：外殼必需有 className={props.className} 屬性來銜接 withStyle 產生的 root css-class。 */}
        <p>
            {props.children}
        </p>
    </div>
)

export const ANoteB = withStyles(ANote0, (theme: Theme, props) => {
    const { palette, spacing } = theme
    return {
        root: {
            background: palette.info.light,
            color: palette.primary.dark,
            '& > p': {
                padding: spacing(2),
                background: palette.warning.light
            }
        }
    }
})
