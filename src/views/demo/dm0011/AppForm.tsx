import { useState, useReducer } from 'react'
import { Container, Divider, FormControlLabel, Switch } from '@mui/material'
import { H1, P1 } from './widgets/StyledWidgets'

export default (props) => {
    const [blob, toggleBlob] = useReducer((f) => !f, false)
    return (
        <Container>
            <H1>I am AppForm 0011</H1>

            <FormControlLabel label="blob" 
                control={<Switch checked={blob} onChange={toggleBlob} />} 
            />

            <P1 blob={blob}>Show me tne moeny.</P1>
        </Container>
    )
}
