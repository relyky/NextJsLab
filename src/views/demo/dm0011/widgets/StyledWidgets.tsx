import { useState } from 'react'
import { Box, Divider } from '@mui/material'
import { styled } from '@mui/material'
import { fontWeight } from '@mui/system';

// styled with theme
export const H1 = styled('h1')(({ theme }) => ({
    color: theme.palette.primary.dark,
    border: 'solid 2px pink',
    borderRadius: '2px'
}));

// styled with theme & props
export const P1 = styled('p')<{
    blob?: boolean // 自訂 props
}>(props => {
    const { theme: { palette } } = props
    //console.log('P1', { palette, props })
    return {
        borderStyle: 'solid',
        borderRadius: 3,
        padding: 3,
        color: palette.info.main,
        borderColor: palette.warning.light,
        borderWidth: props.blob ? 3 : 1,
        fontWeight: props.blob ? 900 : 300
    }
});


// const MyThemeComponent = styled('div')(({ theme }) => ({
//     color: theme.palette.primary.contrastText,
//     backgroundColor: theme.palette.primary.main,
//     padding: theme.spacing(1),
//     borderRadius: theme.shape.borderRadius,
//   }));

const MyComponent = styled('div')({
    color: 'darkslategray',
    backgroundColor: 'aliceblue',
    padding: 8,
    borderRadius: 4,
});

export default function BasicUsage() {
    return <MyComponent>Styled div</MyComponent>;
}
