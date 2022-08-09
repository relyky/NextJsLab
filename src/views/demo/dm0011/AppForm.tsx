import { useReducer } from 'react'
import { Container } from '@mui/material'
import { H1, P1, ASwitch2, ASwitch, ANote } from './widgets/StyledWidgets'

export default (props) => {
    const [bold, toggleBold] = useReducer((f) => !f, false)
    return (
        <Container>
            <H1>I am AppForm 0011</H1>

            <ASwitch label="blob" checked={bold} onChange={toggleBold} />
            <ASwitch2 label="blob2" checked={bold} onChange={toggleBold} />

            <ANote primary={bold}>
                this is foo.<br/>
                that is bar.
            </ANote> 

            <P1 bold={bold.toString()}>Show me the moeny. 111</P1>
        </Container>
    )
}
